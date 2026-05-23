export type ProviderTrail = {
  name: string;
  href: string;
  distance: string;
  tone?: string;
};

export type ProviderFeature = {
  title: string;
  description: string;
};

export type Provider = {
  name: string;
  slug: string;
  status: "Objavljeno" | "Čaka na objavo";
  types: string[];
  region: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  hasCharging?: boolean;
  partner?: boolean;
  heroImage: string;
  shortDescription: string;
  story: string;
  bikeFriendlyDescription: string;
  quote?: string;
  trails: ProviderTrail[];
  features: ProviderFeature[];
  gallery: string[];
  updated?: string;
};

export function hasProviderWebsite(website?: string) {
  if (!website) return false;
  const clean = website.trim();
  return clean.startsWith("https://") || clean.startsWith("http://");
}

export const providers: Provider[] = [
  {
    name: "Rudijev dom na Pohorju",
    slug: "rudijev-dom-na-pohorju",
    status: "Objavljeno",
    types: ["Kulinarika", "Prenočišče", "e-bike polnilnica"],
    region: "Štajerska",
    location: "Pohorje",
    address: "Hočko Pohorje",
    phone: "031 344 640",
    email: "info@rudijevdom.si",
    website: "https://rudijev-dom.si",
    bookingUrl: "",
    hasCharging: true,
    partner: true,
    heroImage:
      "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1800&auto=format&fit=crop",
    shortDescription:
      "Topel domač obrok, terasa med gozdovi in dobra izhodiščna točka za kolesarski dan na Pohorju.",
    story:
      "Topel domač postanek, terasa med gozdovi in tista točka, kjer tura dobi pravi ritem. Rudijev dom je kraj, kjer se kolesarski dan ne konča samo pri kilometrih, ampak pri hrani, razgledu in občutku, da si si postanek zaslužil.",
    bikeFriendlyDescription:
      "Primeren postanek za kolesarje, možnost polnjenja e-bike baterije in prostor za krajši počitek po turi.",
    quote:
      "Tukaj tura dobi svoj postanek — nekaj toplega, nekaj miru in dovolj razloga, da se ne mudi naprej.",
    trails: [
      {
        name: "Gozdni flow nad Mariborom",
        href: "/ture/gozdni-flow-nad-mariborom",
        distance: "ob trasi",
        tone: "MTB · gozdni pobeg",
      },
      {
        name: "Pohorski razgledi",
        href: "/ture",
        distance: "700 m od trase",
        tone: "razgledi · asfalt",
      },
    ],
    features: [
      {
        title: "Domača kuhinja",
        description: "Topel obrok po turi in postanek, ki dan lepo zaokroži.",
      },
      {
        title: "e-bike polnilnica",
        description: "Možnost polnjenja baterije med kosilom ali počitkom.",
      },
      {
        title: "Prenočišče",
        description: "Možnost daljšega kolesarskega oddiha na Pohorju.",
      },
      {
        title: "Kava in pijača",
        description: "Kratek postanek pred nadaljevanjem poti.",
      },
      {
        title: "Prostor za kolesa",
        description: "Postanek, kjer je kolo del obiska, ne ovira.",
      },
      {
        title: "Lokalni postanek",
        description: "Točka, ki se lepo poveže z doživetjem ture.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    ],
    updated: "Danes",
  },
  {
    name: "Vinska klet med griči",
    slug: "vinska-klet-med-grici",
    status: "Čaka na objavo",
    types: ["Vino", "Kulinarika"],
    region: "Štajerska",
    location: "Slovenske gorice",
    phone: "031 444 555",
    website: "",
    hasCharging: false,
    partner: false,
    heroImage:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1600&auto=format&fit=crop",
    shortDescription:
      "Butična vinska izkušnja med griči, primerna za počasnejše gravel ali e-bike ture.",
    story:
      "Vinska klet med griči je postanek za počasnejši ritem, razglede in lokalni okus prostora.",
    bikeFriendlyDescription:
      "Primerna točka za krajši postanek ob vinsko-kolesarskem dnevu.",
    trails: [
      {
        name: "Med vinogradi in griči",
        href: "/ture",
        distance: "300 m od trase",
      },
    ],
    features: [],
    gallery: [],
    updated: "Čaka na objavo",
  },
  {
    name: "Gorska hiša Pohorje",
    slug: "gorska-hisa-pohorje",
    status: "Objavljeno",
    types: ["Prenočišče", "Kulinarika", "e-bike polnilnica"],
    region: "Štajerska",
    location: "Pohorje",
    phone: "041 555 888",
    website: "",
    hasCharging: true,
    partner: false,
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    shortDescription:
      "Mirna nastanitev za kolesarje, z možnostjo večerje, zajtrka in varnega prostora za kolesa.",
    story:
      "Gorska hiša Pohorje je miren postanek za večdnevne ture in počasnejši oddih v naravi.",
    bikeFriendlyDescription:
      "Primerna za kolesarje, ki potrebujejo prenočišče, hrano in varno mesto za kolesa.",
    trails: [
      {
        name: "Gozdni flow nad Mariborom",
        href: "/ture/gozdni-flow-nad-mariborom",
        distance: "500 m od trase",
      },
    ],
    features: [],
    gallery: [],
    updated: "Včeraj",
  },
];

export function getProviderBySlug(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}
