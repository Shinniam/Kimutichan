// pages/api/search.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return new NextResponse("クエリが必要です", { status: 400 });
  }

  const targetUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  return NextResponse.redirect(targetUrl);
}
