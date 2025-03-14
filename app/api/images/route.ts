import { NextResponse } from 'next/server';
import { EXTREME_SPORT_TAG } from '../../constants';

const SUPABASE_URL = 'https://wkuhfuofhpjuwilhhtnj.supabase.co/functions/v1';

export async function GET() {
  try {
    const response = await fetch(`${SUPABASE_URL}/list-images?tags=${EXTREME_SPORT_TAG}`, {
      headers: {
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