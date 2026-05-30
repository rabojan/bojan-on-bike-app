import { createServiceClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const supabase = createServiceClient();
    const { data, error, count } = await supabase
      .from("predlogi_znamenitosti")
      .select("id, ime, status, regija", { count: "exact" })
      .order("created_at", { ascending: false });

    return NextResponse.json({
      hasServiceKey,
      error: error?.message ?? null,
      count,
      items: data ?? [],
    });
  } catch (err: unknown) {
    return NextResponse.json({
      hasServiceKey,
      fatalError: err instanceof Error ? err.message : String(err),
    });
  }
}
