import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('hi');

  return new NextResponse('hi');
}

export async function POST(req: Request) {
  const body = req.body;

  console.log(body);

  return new Response('Ok');
}
