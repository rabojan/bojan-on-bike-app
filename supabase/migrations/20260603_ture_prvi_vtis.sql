-- Dodaj polje prvi_vtis v predlogi_tur
alter table predlogi_tur add column if not exists prvi_vtis text;
