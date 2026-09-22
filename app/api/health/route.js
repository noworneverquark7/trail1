import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    project: "ashish-pandey-metamorphosis",
    timestamp: new Date().toISOString()
  });
}
