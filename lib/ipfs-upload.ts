import { PinataSDK } from "pinata-web3";

let pinata: PinataSDK | null = null;

// Initialize Pinata only if JWT is available
if (process.env.PINATA_JWT) {
  pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
  });
}

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
  if (!pinata) {
    console.warn('Pinata not configured, using mock IPFS hash');
    return `QmMock${Date.now()}${Math.random().toString(36).substring(7)}`;
  }

  try {
    const { IpfsHash } = await pinata.upload.json(jsonMetadata);
    console.log('✅ Uploaded to IPFS:', IpfsHash);
    return IpfsHash;
  } catch (error) {
    console.error('❌ IPFS upload failed:', error);
    // Fallback to mock hash if upload fails
    return `QmMock${Date.now()}${Math.random().toString(36).substring(7)}`;
  }
}

export async function uploadImageToIPFS(imageBase64: string): Promise<string> {
  if (!pinata) {
    console.warn('Pinata not configured, using mock IPFS hash');
    return `QmMockImg${Date.now()}${Math.random().toString(36).substring(7)}`;
  }

  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(imageBase64, 'base64');
    const blob = new Blob([buffer], { type: 'image/png' });
    
    const { IpfsHash } = await pinata.upload.file(blob);
    console.log('✅ Image uploaded to IPFS:', IpfsHash);
    return IpfsHash;
  } catch (error) {
    console.error('❌ Image IPFS upload failed:', error);
    // Fallback to mock hash if upload fails
    return `QmMockImg${Date.now()}${Math.random().toString(36).substring(7)}`;
  }
}