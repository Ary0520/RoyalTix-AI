import { NextResponse } from 'next/server';
import { StoryClient } from '@/lib/story-client';
import { db } from '@/lib/database';
import { Groq } from 'groq-sdk';

export async function POST(request: Request) {
  try {
    // Validate all required environment variables
    if (!process.env.STORY_PRIVATE_KEY || process.env.STORY_PRIVATE_KEY === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return NextResponse.json({ 
        success: false,
        error: 'STORY_PRIVATE_KEY not configured',
        message: 'Real Story Protocol private key required. Add your wallet private key to .env.local'
      }, { status: 500 });
    }

    if (!process.env.STORY_NFT_CONTRACT_ADDRESS) {
      return NextResponse.json({ 
        success: false,
        error: 'STORY_NFT_CONTRACT_ADDRESS not configured',
        message: 'NFT contract address required. Add STORY_NFT_CONTRACT_ADDRESS to .env.local'
      }, { status: 500 });
    }

    if (!process.env.HF_TOKEN) {
      return NextResponse.json({ 
        success: false,
        error: 'HF_TOKEN not configured',
        message: 'Hugging Face API token required. Add HF_TOKEN to .env.local'
      }, { status: 500 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'GROQ_API_KEY not configured',
        message: 'Groq API key required for text generation. Add GROQ_API_KEY to .env.local'
      }, { status: 500 });
    }

    // Initialize real Story Client
    const storyClient = new StoryClient({
      rpcUrl: process.env.NEXT_PUBLIC_STORY_RPC_URL!,
      privateKey: process.env.STORY_PRIVATE_KEY! as `0x${string}`,
    });

    const { mode, contentType, prompt, textPrompt, textContent, uploadedFile, fileName, fileType, title, description, licensing, collaborators } = await request.json();

    // 1. Handle content creation based on mode and type
    let imageBase64 = '';
    let generatedContent = '';
    let finalTitle = title || 'Untitled';
    let finalDescription = description || '';
    
    if (mode === 'ai-generate') {
      if (contentType === 'image') {
        // Generate AI Image using Hugging Face
        try {
          console.log('Generating image with Hugging Face API...');
          
          const response = await fetch('https://router.huggingface.co/nebius/v1/images/generations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.HF_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              response_format: 'b64_json',
              prompt: prompt,
              model: 'black-forest-labs/flux-dev',
            })
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Hugging Face API Error Response:', errorText);
            throw new Error(`Hugging Face API failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
          }
          
          const data = await response.json();
          console.log('Hugging Face API Success Response structure:', Object.keys(data));
          
          // Extract base64 image from response
          imageBase64 = data.data?.[0]?.b64_json || data.b64_json || data.image;
          
          if (!imageBase64) {
            throw new Error('No image generated from AI. Response structure: ' + JSON.stringify(data));
          }
          
          generatedContent = `AI-generated image: "${prompt}"`;
          finalTitle = title || prompt.substring(0, 50);
          finalDescription = description || `AI-generated image: ${prompt}`;
          console.log('Image generated successfully, base64 length:', imageBase64.length);
          
        } catch (aiError: any) {
          console.error('AI IMAGE GENERATION FAILED:', aiError);
          return NextResponse.json({ 
            success: false,
            error: 'AI IMAGE GENERATION FAILED',
            details: aiError.message,
            message: 'Real AI image generation required. Check your Hugging Face API token.'
          }, { status: 500 });
        }
      } else {
        // Generate AI Text using Groq
        try {
          console.log('Generating text with Groq API...');
          
          const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
          });

          const chatCompletion = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: textPrompt
              }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false, // We'll use non-streaming for simplicity
            stop: null
          });

          const aiGeneratedText = chatCompletion.choices[0]?.message?.content;
          
          if (!aiGeneratedText) {
            throw new Error('No text generated from Groq API');
          }

          generatedContent = aiGeneratedText;
          finalTitle = title || textPrompt.substring(0, 50);
          finalDescription = description || `AI-generated text: ${textPrompt}`;
          console.log('Text generated successfully, length:', aiGeneratedText.length);
          
        } catch (aiError: any) {
          console.error('AI TEXT GENERATION FAILED:', aiError);
          return NextResponse.json({ 
            success: false,
            error: 'AI TEXT GENERATION FAILED',
            details: aiError.message,
            message: 'Real AI text generation required. Check your Groq API key.'
          }, { status: 500 });
        }
      }
    } else {
      // Handle uploads
      if (contentType === 'image') {
        if (!uploadedFile) {
          return NextResponse.json({ 
            success: false,
            error: 'NO FILE UPLOADED',
            message: 'Please select an image file to upload.'
          }, { status: 400 });
        }
        imageBase64 = uploadedFile;
        generatedContent = `Uploaded image: ${fileName}`;
        finalTitle = title || fileName?.replace(/\.[^/.]+$/, "") || 'Uploaded Image';
        finalDescription = description || `Uploaded image: ${fileName}`;
      } else {
        if (!textContent) {
          return NextResponse.json({ 
            success: false,
            error: 'NO TEXT CONTENT',
            message: 'Please provide text content to register.'
          }, { status: 400 });
        }
        generatedContent = textContent;
        finalTitle = title || textContent.substring(0, 50);
        finalDescription = description || 'User-provided text content';
      }
    }

    // 2. Create metadata
    const metadata = {
      name: finalTitle,
      description: finalDescription,
      contentType: contentType,
      mode: mode,
      fullContent: generatedContent,
      imageBase64: imageBase64,
      licensing,
      collaborators,
      createdAt: new Date().toISOString()
    };

    // Create a proper IPFS-style metadata URI (in production, upload to real IPFS)
    const metadataUri = `ipfs://QmImageMetadata${Date.now()}`;

    // 3. Register on Story Protocol (REAL blockchain transaction!)
    try {
      console.log('Starting REAL Story Protocol registration...');
      
      const registrationResult = await storyClient.registerIpAsset({
        imageBase64: imageBase64,
        prompt: prompt || finalTitle,
        name: metadata.name,
        description: metadata.description,
      });

      const ipId = registrationResult.ipId as string;
      const txHash = registrationResult.txHash as string;
      const licenseId = registrationResult.licenseTermsId as string;
      
      console.log('✅ REAL IP Registration Success:', { ipId, txHash, licenseId });

      // 5. Save to database
      const contentId = `content_${Date.now()}`;
      db.addContent({
        contentId, ipId, txHash, licenseId, metadata, generatedContent, status: 'available'
      });

      return NextResponse.json({ 
        success: true, 
        contentId, 
        ipId, 
        txHash, 
        licenseId, 
        content: generatedContent,
        imageBase64: imageBase64,
        isRealBlockchain: true,
        message: `🎉 REAL BLOCKCHAIN SUCCESS! ${contentType === 'image' ? 'Image' : 'Text content'} registered as IP on Story Protocol!`
      });

    } catch (blockchainError: any) {
      console.error('❌ BLOCKCHAIN TRANSACTION FAILED:', blockchainError);
      
      // NO FALLBACK - FAIL HARD so you know it's not working
      return NextResponse.json({ 
        success: false,
        error: 'BLOCKCHAIN TRANSACTION FAILED',
        details: blockchainError.message,
        message: 'Real blockchain transaction required. Check your Story Protocol setup.',
        generatedImage: imageBase64 // Still show the image even if blockchain fails
      }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ items: db.getAllContent() });
}