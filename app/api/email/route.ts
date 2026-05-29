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
    const body = await request.json();
    const {
      type,
      // admin obvestilo (nova_prijava)
      predlogTip,
      predlogIme,
      predlogRegija,
      ambasadorIme,
      ambasadorRegija,
      km,
      vm,
      tezavnost,
      jeRevizija,
      jeObjavljena,
      // ambasador obvestilo (approved / revision)
      to,
      predlogId,
      opomba,
    } = body;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    let subject = "";
    let html = "";
    let sendTo = "";
    let sendFrom = "Bojan on Bike <noreply@bojanonbike.si>";

    // ── ADMIN OBVESTILO: ambasador oddal / posodobil predlog ──
    if (type === "nova_prijava") {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (!adminEmail) {
        return NextResponse.json({ error: "Admin email ni nastavljen." }, { status: 500 });
      }
      if (!predlogIme || !predlogTip) {
        return NextResponse.json({ error: "Manjkajo podatki." }, { status: 400 });
      }

      sendTo = adminEmail;
      const tipLabel = tipLabels[predlogTip] ?? predlogTip;
      const adminUrl = `${siteUrl}/admin/${tipUrls[predlogTip] ?? predlogTip}`;

      // Tri možna stanja
      const naslov = jeObjavljena
        ? `Posodobitev objavljene ture`
        : jeRevizija
          ? `Posodobljen${tipLabel === "tura" ? "a" : ""} ${tipLabel} v pregled`
          : `Nov${tipLabel === "tura" ? "a" : ""} ${tipLabel} v pregled`;

      subject = jeObjavljena
        ? `✏️ Posodobitev objavljene ture: ${predlogIme}`
        : jeRevizija
          ? `🔄 Posodobljeno v pregled: ${predlogIme}`
          : `🚵 Novo v pregled: ${predlogIme}`;

      const opisDogodka = jeObjavljena
        ? `<strong>${ambasadorIme ?? "Ambasador"}</strong> je posodobil že objavljeno turo. Tura je bila začasno umaknjena z objave in čaka na tvojo potrditev sprememb.`
        : jeRevizija
          ? "Ambasador je popravil predlog in ga znova oddal v pregled."
          : "Ambasador je oddal nov predlog, ki čaka na tvoj pregled.";

      const bannerObjavljena = jeObjavljena ? `
        <div style="background:#2a1a0a;border:1px solid rgba(197,139,70,0.4);border-radius:12px;padding:16px 20px;margin:0 0 20px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:20px;">⚠️</span>
          <p style="color:#f4d7ad;font-size:13px;font-weight:700;margin:0;">To ni nova tura — ambasador je posodobil že odobreno in objavljeno vsebino. Tura je trenutno skrita, dokler je ne odobrišt znova.</p>
        </div>` : "";

      html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#07110b;color:#fff;padding:40px;border-radius:16px;">
          <p style="color:#c58b46;font-size:11px;letter-spacing:.3em;text-transform:uppercase;margin:0 0 20px;">Bojan on Bike — Admin</p>
          <h1 style="font-size:26px;margin:0 0 8px;color:#f4d7ad;">${naslov}</h1>
          <p style="color:#71717a;font-size:13px;margin:0 0 20px;">${opisDogodka}</p>
          ${bannerObjavljena}

          <div style="background:#0b1a10;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px 24px;margin:0 0 28px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="color:#52525b;font-size:11px;text-transform:uppercase;letter-spacing:.2em;padding:7px 0;width:130px;">Tip</td>
                <td style="color:#e4e4e7;font-size:14px;padding:7px 0;">${tipLabel.charAt(0).toUpperCase() + tipLabel.slice(1)}</td>
              </tr>
              <tr>
                <td style="color:#52525b;font-size:11px;text-transform:uppercase;letter-spacing:.2em;padding:7px 0;">Naslov</td>
                <td style="color:#f4d7ad;font-size:16px;font-weight:900;padding:7px 0;">${predlogIme}</td>
              </tr>
              ${predlogRegija ? `<tr>
                <td style="color:#52525b;font-size:11px;text-transform:uppercase;letter-spacing:.2em;padding:7px 0;">Regija</td>
                <td style="color:#e4e4e7;font-size:14px;padding:7px 0;">${predlogRegija}</td>
              </tr>` : ""}
              ${(km || vm || tezavnost) ? `<tr>
                <td style="color:#52525b;font-size:11px;text-transform:uppercase;letter-spacing:.2em;padding:7px 0;">Trasa</td>
                <td style="color:#e4e4e7;font-size:14px;padding:7px 0;">${[km ? `${km} km` : null, vm ? `${vm} vm` : null, tezavnost].filter(Boolean).join(" · ")}</td>
              </tr>` : ""}
              <tr>
                <td style="color:#52525b;font-size:11px;text-transform:uppercase;letter-spacing:.2em;padding:7px 0;">Ambasador</td>
                <td style="color:#e4e4e7;font-size:14px;padding:7px 0;">${ambasadorIme ?? "—"}${ambasadorRegija ? ` · ${ambasadorRegija}` : ""}</td>
              </tr>
            </table>
          </div>

          <a href="${adminUrl}" style="display:inline-block;background:#c58b46;color:#000;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:900;font-size:14px;">
            Preglej v adminu →
          </a>

          <p style="color:#3f3f46;font-size:11px;margin:32px 0 0;">Bojan on Bike · avtomatsko obvestilo</p>
        </div>
      `;

    // ── AMBASADOR OBVESTILO: predlog odobren ──
    } else if (type === "approved") {
      if (!to || !predlogIme || !predlogTip) {
        return NextResponse.json({ error: "Manjkajo podatki." }, { status: 400 });
      }
      sendTo = to;
      const javnaStran = predlogId ? `${siteUrl}/${tipUrls[predlogTip]}/${predlogId}` : null;
      subject = `✅ Tvoj ${tipLabels[predlogTip] ?? "predlog"} je objavljen — Bojan on Bike`;
      html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#07110b;color:#fff;padding:40px;border-radius:16px;">
          <p style="color:#c58b46;font-size:12px;letter-spacing:.3em;text-transform:uppercase;margin:0 0 16px;">Bojan on Bike</p>
          <h1 style="font-size:28px;margin:0 0 16px;color:#f4d7ad;">Tvoj predlog je objavljen! 🚴</h1>
          <p style="color:#a1a1aa;line-height:1.7;margin:0 0 24px;">
            Ambasadorski predlog <strong style="color:#fff;">${predlogIme}</strong> je bil odobren in je zdaj javno dostopen na Bojan on Bike.
          </p>
          ${javnaStran ? `<a href="${javnaStran}" style="display:inline-block;background:#c58b46;color:#000;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:900;font-size:14px;">Poglej objavo →</a>` : ""}
          <p style="color:#52525b;font-size:12px;margin:32px 0 0;line-height:1.6;">Hvala za tvoj prispevek k skupnosti Bojan on Bike.<br/>Vsaka objava nosi tvoj podpis kot ambasadorja.</p>
        </div>
      `;

    // ── AMBASADOR OBVESTILO: predlog v revizijo ──
    } else if (type === "revision") {
      if (!to || !predlogIme) {
        return NextResponse.json({ error: "Manjkajo podatki." }, { status: 400 });
      }
      sendTo = to;
      subject = `↩️ Tvoj predlog potrebuje dopolnitev — Bojan on Bike`;
      html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#07110b;color:#fff;padding:40px;border-radius:16px;">
          <p style="color:#c58b46;font-size:12px;letter-spacing:.3em;text-transform:uppercase;margin:0 0 16px;">Bojan on Bike</p>
          <h1 style="font-size:28px;margin:0 0 16px;color:#f4d7ad;">Predlog potrebuje dopolnitev</h1>
          <p style="color:#a1a1aa;line-height:1.7;margin:0 0 24px;">
            Predlog <strong style="color:#fff;">${predlogIme}</strong> je bil vrnjen v dopolnitev.
          </p>
          ${opomba ? `
          <div style="background:#0b1a10;border:1px solid rgba(197,139,70,.3);border-radius:12px;padding:20px;margin:0 0 24px;">
            <p style="color:#c58b46;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin:0 0 8px;">Sporočilo urednika</p>
            <p style="color:#d4d4d8;line-height:1.7;margin:0;white-space:pre-line;">${opomba}</p>
          </div>` : ""}
          <a href="${siteUrl}/ambasador/koticek" style="display:inline-block;background:#c58b46;color:#000;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:900;font-size:14px;">Odpri kotiček →</a>
          <p style="color:#52525b;font-size:12px;margin:32px 0 0;line-height:1.6;">Po dopolnitvi bo predlog znova šel v uredniški pregled.</p>
        </div>
      `;

    } else {
      return NextResponse.json({ error: "Neznan tip emaila." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: sendFrom,
      to: sendTo,
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
