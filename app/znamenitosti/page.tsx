import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";
import { createServiceClient } from "@/lib/supabase";
import ZnamenitostiList from "./ZnamenitostiList";

export const revalidate = 60; // osvezi vsakih 60 sekund

export default async function ZnamenitostiPage() {
  const supabase = createServiceClient();

  const { data } = await supabase
    .from("predlogi_znamenitosti")
    .select("id, ime, tip, regija, obmocje, kratek_opis, hero_image")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const znamenitosti = data ?? [];

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="znamenitosti" />

      <PageHero
        eyebrow="Točke ob poti"
        title="Znamenitosti, ki jih je vredno videti."
        description="Razgledi, naravne posebnosti, kulturna dediščina. Vsaka točka je predlagana s strani lokalnega ambasadorja, ki jo pozna od blizu."
        image="/hero-znamenitosti.png"
        imageAlt="Razgledna točka ob kolesarski poti"
        imagePosition="center"
        mobileImagePosition="center"
      />

      <ZnamenitostiList znamenitosti={znamenitosti} />
    </main>
  );
}
