-- Ambasador si ustvari profil ob registraciji
create policy "Ambasador ustvari profil"
  on ambasadorji for insert
  with check (user_id = auth.uid());

-- Ambasador posodablja svoj profil
create policy "Ambasador posodablja profil"
  on ambasadorji for update
  using (user_id = auth.uid());
