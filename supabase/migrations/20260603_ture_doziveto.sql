-- Dodaj polja za doživetja na predlogi_tur
alter table predlogi_tur
add column if not exists je_doziveto boolean default false,
add column if not exists doziveto_naslov text,
add column if not exists doziveto_ciljna_skupina text[],
add column if not exists doziveto_uvod text;
