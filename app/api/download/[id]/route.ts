import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const content = db.getContentById(params.id);
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // In a real implementation, you would verify the purchase here
    // For demo purposes, we'll return the full content
    
    return new NextResponse(content.generatedContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${content.metadata.name}.txt"`,
      },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}