import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.trim().length < 2) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=8&accept-language=sl&countrycodes=si&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "BojanOnBike/1.0 (bojanonbike.si)",
        "Accept": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
