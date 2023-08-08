// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   connectDb();

//   const data = await Document.find({
//     email: { $all: [email] },
//   });

//   console.log(data);

//   return new Response('Ok');
// }
