import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;
    const path = formData.get("path") as string;

    if (!file || !bucket || !path) {
      return NextResponse.json({ error: "Manjkajo parametri (file, bucket, path)." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const supabase = createServiceClient();

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Napaka strežnika." }, { status: 500 });
  }
}
