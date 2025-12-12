import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { contentId, licenseType, price } = await request.json();
    
    const content = db.getContentById(contentId);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // Mock payment processing
    console.log(`Processing payment: $${price} for ${licenseType} license`);

    return NextResponse.json({
      success: true,
      message: 'Purchase successful',
      licenseType,
      contentId,
      downloadUrl: '/api/download/' + contentId
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}