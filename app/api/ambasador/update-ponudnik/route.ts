import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ambasador_id, ...fields } = body;

    if (!id || !ambasador_id) {
      return NextResponse.json({ error: "Manjka id ali ambasador_id." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("predlogi_ponudnikov")
      .select("id, ambasador_id")
      .eq("id", id)
      .eq("ambasador_id", ambasador_id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Zapis ni najden ali nimate dostopa." }, { status: 403 });
    }

    const { error } = await supabase
      .from("predlogi_ponudnikov")
      .update({ ...fields, status: "pending", admin_opomba: null })
      .eq("id", id)
      .eq("ambasador_id", ambasador_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Napaka pri shranjevanju." }, { status: 500 });
  }
}
