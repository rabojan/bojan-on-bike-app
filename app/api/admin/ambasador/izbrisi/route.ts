import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Manjkata ime ali email." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Bojan on Bike <noreply@bojanonbike.si>",
      to: email,
      subject: "Vaš ambasadorski račun je bil odstranjen — Bojan on Bike",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
          <p style="font-size:15px;line-height:1.7;">Pozdravljeni ${name},</p>
          <p style="font-size:15px;line-height:1.7;">
            ker kljub prejšnjemu opozorilu vsebina na platformi <strong>Bojan on Bike</strong>
            ni bila prilagojena v skladu s smernicami skupnosti, smo bili prisiljeni vaš
            ambasadorski račun deaktivirati.
          </p>
          <p style="font-size:15px;line-height:1.7;">
            Vsa vaša vsebina — ture, ponudniki in znamenitosti — je bila odstranjena s platforme.
          </p>
          <p style="font-size:15px;line-height:1.7;">
            Če menite, da je prišlo do napake, nam pišite na
            <a href="mailto:bojan@bojanonbike.si">bojan@bojanonbike.si</a>.
          </p>
          <p style="font-size:15px;line-height:1.7;margin-top:32px;">
            Bojan Ratej<br/>
            Bojan on Bike
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Napaka pri pošiljanju." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Napaka strežnika." }, { status: 500 });
  }
}
