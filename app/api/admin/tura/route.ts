import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.naslov || !body.slug) {
      return NextResponse.json({ error: "Naslov in slug sta obvezna." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("ture")
      .insert(body)
      .select("id, slug")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug });
  } catch (err) {
    console.error("[tura]", err);
    return NextResponse.json({ error: "Napaka strežnika." }, { status: 500 });
  }
}
