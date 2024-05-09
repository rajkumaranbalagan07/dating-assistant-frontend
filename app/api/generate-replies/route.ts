import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed, please use POST" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const data = await req.arrayBuffer();

  const DATING_ASSISTANT_ENDPOINT = process.env.DATING_ASSISTANT_ENDPOINT || "" ;

  const fetchResponse = await fetch(DATING_ASSISTANT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
    },
    body: data
  });

  if (!fetchResponse.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to process image" }),
      {
        status: fetchResponse.status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const responseData = await fetchResponse.json();

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
