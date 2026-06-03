-- =============================================
-- BOJAN ON BIKE — Supabase shema
-- Pobriše stare tabele in ustvari nove
-- =============================================

-- Pobriši stare tabele (vrstni red je pomemben)
drop table if exists predlogi_znamenitosti cascade;
drop table if exists predlogi_ponudnikov cascade;
drop table if exists predlogi_tur cascade;
drop table if exists dozivetja cascade;
drop table if exists znamenitosti cascade;
drop table if exists ponudniki cascade;
drop table if exists ture cascade;
drop table if exists ambasadorji cascade;
drop table if exists traili cascade;
drop table if exists providers cascade;
drop table if exists comments cascade;

-- =============================================
-- 1. AMBASADORJI
-- =============================================
create table ambasadorji (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  ime          text not null,
  email        text,
  regija       text,
  kraj         text,
  kratek_opis  text,
  foto_url     text,
  is_top       boolean not null default false,
  je_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

-- =============================================
-- 2. TURE
-- =============================================
create table ture (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  naslov              text not null,
  regija              text,
  obmocje             text,
  km                  numeric(6,1),
  visinska_razlika    int,
  cas_ur              numeric(4,1),
  tipi                text[] default '{}',
  tezavnost           text,
  podlaga_gozd        int default 0,
  podlaga_makadam     int default 0,
  podlaga_asfalt      int default 0,
  gpx_url             text,
  hero_image_url      text,
  opis                text,
  objavljena          boolean not null default false,
  created_at          timestamptz not null default now()
);

-- =============================================
-- 3. PONUDNIKI
-- =============================================
create table ponudniki (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  ime                   text not null,
  tipi                  text[] default '{}',
  regija                text,
  lokacija              text,
  naslov                text,
  telefon               text,
  spletna_stran         text,
  hero_image_url        text,
  zgodba                text,
  bike_friendly_opis    text,
  citat                 text,
  galerija              jsonb default '[]',
  features              jsonb default '[]',
  objavljen             boolean not null default false,
  predlagal_id          uuid references ambasadorji(id),
  created_at            timestamptz not null default now()
);

-- =============================================
-- 4. ZNAMENITOSTI
-- =============================================
create table znamenitosti (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  ime                 text not null,
  regija              text,
  obmocje             text,
  tipi                text[] default '{}',
  hero_image_url      text,
  kratek_opis         text,
  zgodba              text,
  lokacija_opis       text,
  latitude            text,
  longitude           text,
  razdalja_od_trase   text,
  namig_za_obisk      text,
  wikipedia_url       text,
  google_maps_url     text,
  objavljena          boolean not null default false,
  predlagal_id        uuid references ambasadorji(id),
  created_at          timestamptz not null default now()
);

-- =============================================
-- 5. DOZIVETJA
-- =============================================
create table dozivetja (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  naslov           text not null,
  podnaslov        text,
  regija           text,
  obmocje          text,
  cena_od          numeric(8,2),
  hero_image_url   text,
  opis             text,
  kaj_vkljuceno    jsonb default '[]',
  program          jsonb default '[]',
  objavljena       boolean not null default false,
  created_at       timestamptz not null default now()
);

-- =============================================
-- 6. PREDLOGI TUR
-- =============================================
create table predlogi_tur (
  id                  uuid primary key default gen_random_uuid(),
  ambasador_id        uuid references ambasadorji(id) on delete cascade,
  ime                 text not null,
  regija              text,
  obmocje             text,
  zakaj               text,
  prvi_vtis           text,
  je_doziveto         boolean default false,
  doziveto_naslov     text,
  doziveto_ciljna_skupina text[],
  doziveto_uvod       text,
  km                  numeric(6,1),
  visinska_razlika    int,
  cas_ur              numeric(4,1),
  tipi                text[] default '{}',
  tezavnost           text,
  podlaga_gozd        int default 0,
  podlaga_makadam     int default 0,
  podlaga_asfalt      int default 0,
  gpx_url             text,
  status              text not null default 'pending'
                      check (status in ('pending','approved','rejected','revision')),
  admin_opomba        text,
  created_at          timestamptz not null default now()
);

-- =============================================
-- 7. PREDLOGI PONUDNIKOV
-- =============================================
create table predlogi_ponudnikov (
  id              uuid primary key default gen_random_uuid(),
  ambasador_id    uuid references ambasadorji(id) on delete cascade,
  ime             text not null,
  tip             text,
  regija          text,
  lokacija        text,
  spletna_stran   text,
  zakaj           text,
  opis            text,
  foto_url        text,
  status          text not null default 'pending'
                  check (status in ('pending','approved','rejected','revision')),
  admin_opomba    text,
  created_at      timestamptz not null default now()
);

-- =============================================
-- 8. PREDLOGI ZNAMENITOSTI
-- =============================================
create table predlogi_znamenitosti (
  id              uuid primary key default gen_random_uuid(),
  ambasador_id    uuid references ambasadorji(id) on delete cascade,
  ime             text not null,
  tip             text,
  regija          text,
  lokacija        text,
  zakaj           text,
  opis            text,
  foto_url        text,
  status          text not null default 'pending'
                  check (status in ('pending','approved','rejected','revision')),
  admin_opomba    text,
  created_at      timestamptz not null default now()
);

-- =============================================
-- RLS (Row Level Security)
-- =============================================
alter table ambasadorji           enable row level security;
alter table ture                  enable row level security;
alter table ponudniki             enable row level security;
alter table znamenitosti          enable row level security;
alter table dozivetja             enable row level security;
alter table predlogi_tur          enable row level security;
alter table predlogi_ponudnikov   enable row level security;
alter table predlogi_znamenitosti enable row level security;

-- Javno branje objavljenih vsebin
create policy "Javno branje tur"
  on ture for select using (objavljena = true);

create policy "Javno branje ponudnikov"
  on ponudniki for select using (objavljen = true);

create policy "Javno branje znamenitosti"
  on znamenitosti for select using (objavljena = true);

create policy "Javno branje dozivetij"
  on dozivetja for select using (objavljena = true);

-- Ambasador vidi svoje predloge
create policy "Ambasador vidi svoje predloge tur"
  on predlogi_tur for select
  using (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

create policy "Ambasador vidi svoje predloge ponudnikov"
  on predlogi_ponudnikov for select
  using (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

create policy "Ambasador vidi svoje predloge znamenitosti"
  on predlogi_znamenitosti for select
  using (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

-- Ambasador oddaja predloge
create policy "Ambasador oddaja predloge tur"
  on predlogi_tur for insert
  with check (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

create policy "Ambasador oddaja predloge ponudnikov"
  on predlogi_ponudnikov for insert
  with check (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

create policy "Ambasador oddaja predloge znamenitosti"
  on predlogi_znamenitosti for insert
  with check (ambasador_id in (
    select id from ambasadorji where user_id = auth.uid()
  ));

-- Ambasador vidi svoj profil
create policy "Ambasador vidi svoj profil"
  on ambasadorji for select
  using (user_id = auth.uid());
