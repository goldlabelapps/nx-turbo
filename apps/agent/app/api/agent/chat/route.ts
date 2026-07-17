import { NextResponse } from "next/server";
import { runChat } from "../../../../lib/agent-history";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const result = await runChat({ message });
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to process chat request." }, { status: 500 });
  }
}
