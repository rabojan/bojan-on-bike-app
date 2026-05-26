import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const tipUrls: Record<string, string> = {
  tura: "ture",
  ponudnik: "ponudniki",
  znamenitost: "znamenitosti",
};

const tipLabels: Record<string, string> = {
  tura: "tura",
  ponudnik: "ponudnik",
  znamenitost: "znamenitost",
};

export async function POST(request: Request) {
  try {
    const { to, type, predlogIme, predlogTip, predlogId, opomba } = await request.json();

    if (!to || !type || !predlogIme) {
      return NextResponse.json({ error: "Manjkajo podatki." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const javnaStran = predlogId ? `${siteUrl}/${tipUrls[predlogTip]}/${predlogId}` : null;

    let subject = "";
    let html = "";

    if (type === "approved") {
      subject = `✅ Tvoj ${tipLabels[predlogTip] ?? "predlog"} je objavljen — Bojan on Bike`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #07110b; color: #fff; padding: 40px; border-radius: 16px;">
          <p style="color: #c58b46; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px;">Bojan on Bike</p>
          <h1 style="font-size: 28px; margin: 0 0 16px; color: #f4d7ad;">Tvoj predlog je objavljen! 🚴</h1>
          <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 24px;">
            Ambasadorski predlog <strong style="color: #fff;">${predlogIme}</strong> je bil odobren in je zdaj javno dostopen na Bojan on Bike.
          </p>
          ${javnaStran ? `
          <a href="${javnaStran}" style="display: inline-block; background: #c58b46; color: #000; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 14px;">
            Poglej objavo →
          </a>
          ` : ""}
          <p style="color: #52525b; font-size: 12px; margin: 32px 0 0; line-height: 1.6;">
            Hvala za tvoj prispevek k skupnosti Bojan on Bike.<br/>
            Vsaka objava nosi tvoj podpis kot ambasadorja.
          </p>
        </div>
      `;
    } else if (type === "revision") {
      subject = `↩️ Tvoj predlog potrebuje dopolnitev — Bojan on Bike`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #07110b; color: #fff; padding: 40px; border-radius: 16px;">
          <p style="color: #c58b46; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px;">Bojan on Bike</p>
          <h1 style="font-size: 28px; margin: 0 0 16px; color: #f4d7ad;">Predlog potrebuje dopolnitev</h1>
          <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 24px;">
            Predlog <strong style="color: #fff;">${predlogIme}</strong> je bil vrnjen v dopolnitev.
          </p>
          ${opomba ? `
          <div style="background: #0b1a10; border: 1px solid rgba(197,139,70,0.3); border-radius: 12px; padding: 20px; margin: 0 0 24px;">
            <p style="color: #c58b46; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px;">Sporočilo urednika</p>
            <p style="color: #d4d4d8; line-height: 1.7; margin: 0; white-space: pre-line;">${opomba}</p>
          </div>
          ` : ""}
          <a href="${siteUrl}/ambasador/koticek" style="display: inline-block; background: #c58b46; color: #000; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 14px;">
            Odpri kotiček →
          </a>
          <p style="color: #52525b; font-size: 12px; margin: 32px 0 0; line-height: 1.6;">
            Po dopolnitvi bo predlog znova šel v uredniški pregled.
          </p>
        </div>
      `;
    } else {
      return NextResponse.json({ error: "Neznan tip emaila." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Bojan on Bike <noreply@bojanonbike.si>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email API error:", err);
    return NextResponse.json({ error: "Napaka pri pošiljanju." }, { status: 500 });
  }
}
