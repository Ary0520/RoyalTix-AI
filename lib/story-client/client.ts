import { StoryClient as SDKClient, StoryConfig as SDKConfig, PILFlavor, WIP_TOKEN_ADDRESS } from '@story-protocol/core-sdk';
import { http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { StoryConfig } from './types';
import { uploadJSONToIPFS, uploadImageToIPFS } from '../ipfs-upload';

// Official Story Protocol SPG NFT Contract on Aeneid testnet
export const STORY_SPG_NFT_CONTRACT = '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc';

export class StoryClient {
  private client: SDKClient;

  constructor(config: StoryConfig) {
    const account = privateKeyToAccount(config.privateKey);
    const transport = http(config.rpcUrl);
    
    const sdkConfig: SDKConfig = {
      account: account,
      transport: transport,
      chainId: 1315, // Aeneid testnet
    };
    
    this.client = SDKClient.newClient(sdkConfig);
  }

  async registerIpAsset(params: {
    imageBase64: string;
    prompt: string;
    name: string;
    description: string;
  }) {
    try {
      console.log('🚀 Starting REAL Story Protocol IP Registration...');

      // 1. Upload image to IPFS first
      console.log('📤 Uploading image to IPFS...');
      const imageIpfsHash = await uploadImageToIPFS(params.imageBase64);
      const imageUrl = `https://ipfs.io/ipfs/${imageIpfsHash}`;

      // 2. Create proper IP metadata following Story Protocol standard
      const ipMetadata = {
        title: params.name,
        description: params.description,
        image: imageUrl,
        imageHash: this.createHash(params.imageBase64),
        mediaUrl: imageUrl,
        mediaHash: this.createHash(params.imageBase64),
        mediaType: "image/png",
        creators: [
          {
            name: "CreatorVault AI User",
            address: "0x0000000000000000000000000000000000000000", // Will be replaced with actual user address
            description: "AI-generated content creator",
            contributionPercent: 100,
          },
        ],
      };

      // 3. Create NFT metadata following ERC-721 standard
      const nftMetadata = {
        name: params.name,
        description: params.description,
        image: imageUrl,
      };

      // 4. Upload metadata to IPFS
      console.log('📤 Uploading metadata to IPFS...');
      const ipMetadataHash = await uploadJSONToIPFS(ipMetadata);
      const nftMetadataHash = await uploadJSONToIPFS(nftMetadata);

      // 5. Create hashes for metadata
      const ipHash = this.createHash(JSON.stringify(ipMetadata));
      const nftHash = this.createHash(JSON.stringify(nftMetadata));

      // 6. Create real IPFS URIs
      const ipMetadataURI = `https://ipfs.io/ipfs/${ipMetadataHash}`;
      const nftMetadataURI = `https://ipfs.io/ipfs/${nftMetadataHash}`;

      console.log('📝 Metadata uploaded to IPFS:', { ipMetadataURI, nftMetadataURI, imageUrl });

      // 7. Register IP Asset using the new SDK method
      const response = await this.client.ipAsset.registerIpAsset({
        nft: {
          type: "mint",
          spgNftContract: STORY_SPG_NFT_CONTRACT as `0x${string}`,
        },
        licenseTermsData: [
          {
            terms: PILFlavor.commercialRemix({
              commercialRevShare: 10, // 10% revenue share
              defaultMintingFee: 0n, // Free minting
              currency: WIP_TOKEN_ADDRESS,
            }),
          },
        ],
        ipMetadata: {
          ipMetadataURI: ipMetadataURI,
          ipMetadataHash: `0x${ipHash}`,
          nftMetadataURI: nftMetadataURI,
          nftMetadataHash: `0x${nftHash}`,
        },
      });

      console.log('✅ REAL IP Registration Success!', {
        txHash: response.txHash,
        ipId: response.ipId,
        tokenId: response.tokenId
      });

      return {
        success: true,
        ipId: response.ipId,
        txHash: response.txHash,
        tokenId: response.tokenId,
        licenseTermsId: response.licenseTermsId?.[0] || 'auto-attached',
      };

    } catch (error: any) {
      console.error('❌ Story Protocol Registration Failed:', error);
      throw new Error(`Story Protocol registration failed: ${error.message}`);
    }
  }

  private createHash(data: string): string {
    // Simple hash function for demo - in production use proper crypto
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }
}