import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://wkuhfuofhpjuwilhhtnj.supabase.co/functions/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbmJyaXBxeWJwbmZ6aHJtZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MTcsImV4cCI6MjAyNTM5ODQxN30.BmAJSHG9Eq_MhYO0VzgZeYGnKa3Yl_IwqXJQRBrOGXE';

export async function GET() {
  try {
    const response = await fetch(`${SUPABASE_URL}/list-images`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 