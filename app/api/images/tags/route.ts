import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://wkuhfuofhpjuwilhhtnj.supabase.co/functions/v1';

export async function POST(request: Request) {
  try {
    const { imageId, tags } = await request.json();

    const response = await fetch(`${SUPABASE_URL}/add-image-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        imageId,
        tags
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add tags');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error adding tags:', error);
    return NextResponse.json(
      { error: 'Failed to add tags' },
      { status: 500 }
    );
  }
} 