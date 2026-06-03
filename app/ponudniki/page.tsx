import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";
import { createServiceClient } from "@/lib/supabase";
import PonudnikiList from "./PonudnikiList";

export const dynamic = "force-dynamic";

export default async function PonudnikiPage() {
  const supabase = createServiceClient();

  const { data } = await supabase
    .from("predlogi_ponudnikov")
    .select("id, ime, tip, regija, lokacija, opis, hero_image, bike_friendly_opis")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const ponudniki = data ?? [];

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="ponudniki" />

      <PageHero
        eyebrow="Lokalni ponudniki"
        title={<>Dobri postanki<br />ob poti.</>}
        description="Koče, kleti, bifeji in bike shopi, ki jih priporočajo naši ambasadorji. Vsak potrjen ponudnik pozna kolesarje in ve, kaj potrebuješ ob trasi."
        image="/hero-ponudniki.png"
        imageAlt="Lokalni ponudnik ob kolesarski poti"
        imagePosition="center"
        mobileImagePosition="center"
      />

      <PonudnikiList ponudniki={ponudniki} />
    </main>
  );
}
