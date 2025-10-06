'use server';

import { NextRequest, NextResponse } from 'next/server';

const DATA_URL = new URL(process.env.NEXTDATA_URL || '');

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || '';
    const timestamp = searchParams.get('timestamp') || Date.now();
    const localTime = new Date(Number(timestamp));
    const headers = req.headers;

    const body = {
      id,
      data: {
        origin: headers.get('origin') || headers.get('host'),
        userAgent: headers.get('user-agent'),
        languages: headers.get('accept-language'),
      },
      ip: headers.get('x-forwarded-for'),
      localTime,
    };

    await fetch(`${DATA_URL.origin}/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error('Error adding event: ', e);
  }
  return new Response('ok', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}
