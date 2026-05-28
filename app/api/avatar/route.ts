import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json({ error: "Manjkata file ali userId." }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const path = `${userId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createServiceClient();

    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Napaka strežnika." }, { status: 500 });
  }
}
