import { NextResponse } from "next/server";
import { readHistory } from "@/lib/agent-history";

export async function GET() {
  try {
    const entries = await readHistory();
    return NextResponse.json({ entries }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to load history." }, { status: 500 });
  }
}
