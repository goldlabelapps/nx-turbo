import { NextResponse } from "next/server";
import { runWorkbench } from "@/lib/agent-history";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      goal?: string;
      context?: string;
      mode?: "balanced" | "creative" | "strict";
      creativity?: number;
    };

    const goal = body.goal?.trim();
    const context = body.context?.trim();
    const mode = body.mode ?? "balanced";
    const creativity = typeof body.creativity === "number" ? body.creativity : 42;

    if (!goal || !context) {
      return NextResponse.json({ error: "Goal and context are required." }, { status: 400 });
    }

    if (creativity < 0 || creativity > 100) {
      return NextResponse.json({ error: "Creativity must be between 0 and 100." }, { status: 400 });
    }

    const result = await runWorkbench({ goal, context, mode, creativity });
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to process workbench request." }, { status: 500 });
  }
}
