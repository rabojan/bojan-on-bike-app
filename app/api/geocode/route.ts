import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.trim().length < 2) {
    return NextResponse.json({ features: [] });
  }

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6&lang=sl&bbox=13.3,45.4,16.6,46.9`;
    const res = await fetch(url, {
      headers: { "User-Agent": "BojanOnBike/1.0 (bojanonbike.si)" },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ features: [] }, { status: 500 });
  }
}
