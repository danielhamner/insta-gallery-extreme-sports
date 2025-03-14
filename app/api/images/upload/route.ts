import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = 'https://wkuhfuofhpjuwilhhtnj.supabase.co/functions/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbmJyaXBxeWJwbmZ6aHJtZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MTcsImV4cCI6MjAyNTM5ODQxN30.BmAJSHG9Eq_MhYO0VzgZeYGnKa3Yl_IwqXJQRBrOGXE';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const response = await fetch(`${SUPABASE_URL}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 