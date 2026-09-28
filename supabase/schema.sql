-- Beacia Group Solutions — Supabase schema
-- Run this once in your project's SQL Editor (Supabase Dashboard → SQL Editor → New query).
-- Then, optionally, run seed.sql in the same folder to load the starter catalogue.
--
-- Already ran this before and just added the "Hair Products" category? Run this
-- one-liner instead of the whole file to update the existing constraint:
--   alter table public.products drop constraint products_category_check;
--   alter table public.products add constraint products_category_check
--     check (category in ('hair', 'hair-product', 'jewelry', 'perfume'));

-- 1. Products table -----------------------------------------------------
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null check (category in ('hair', 'hair-product', 'jewelry', 'perfume')),
  price numeric(10, 2) not null default 0,
  image text,
  description text,
  is_new boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone (including logged-out shoppers) can read the catalogue.
drop policy if exists "Public can view products" on public.products;
create policy "Public can view products"
  on public.products for select
  using (true);

-- Only signed-in users (your admin account) can add, edit or remove
-- products. See step 3 below — make sure public sign-ups are disabled so
-- "signed in" only ever means your admin account.
drop policy if exists "Authenticated can manage products" on public.products;
create policy "Authenticated can manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Enable realtime updates so the site refreshes instantly everywhere when
-- the admin adds/edits/removes a product (no page reload needed).
alter publication supabase_realtime add table public.products;


-- 2. Storage bucket for product photos -----------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated can upload product images" on storage.objects;
create policy "Authenticated can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can manage product images" on storage.objects;
create policy "Authenticated can manage product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete product images" on storage.objects;
create policy "Authenticated can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');


-- 3. Admin account --------------------------------------------------------
-- Create the admin login in the Supabase Dashboard, NOT here:
--   Authentication → Users → Add user → set an email + password.
-- Then go to Authentication → Providers → Email and turn OFF "Allow new
-- users to sign up". This matters: the policies above trust *any* signed-in
-- user, so disabling public sign-up ensures only the account you created
-- can ever sign in and edit products.
