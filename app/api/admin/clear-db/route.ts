import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const dbFile = path.join(process.cwd(), 'data', 'content.json');
    
    if (fs.existsSync(dbFile)) {
      fs.unlinkSync(dbFile);
      console.log('🗑️ Database file deleted');
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database cleared successfully' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}