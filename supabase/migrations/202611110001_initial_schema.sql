-- CURLÉ initial database schema
-- Run this migration in Supabase SQL Editor or with the Supabase CLI.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('customer','admin','editor')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.has_role(required_role text)
returns boolean language sql stable security definer
set search_path = public as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = required_role
  );
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  slug text not null unique,
  description_en text,
  description_ar text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name_en text not null,
  name_ar text not null,
  slug text not null unique,
  description_en text,
  description_ar text,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2) check (compare_at_price is null or compare_at_price >= price),
  sku text unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_en text,
  alt_ar text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  title_en text not null,
  title_ar text not null,
  slug text not null unique,
  excerpt_en text,
  excerpt_ar text,
  content_en text,
  content_ar text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  order_number bigint generated always as identity unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  payment_method text not null default 'cash_on_delivery' check (payment_method in ('cash_on_delivery','online','bank_transfer')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','failed','refunded')),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  shipping_fee numeric(10,2) not null default 0 check (shipping_fee >= 0),
  total numeric(10,2) not null check (total >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_en text not null,
  product_name_ar text not null,
  unit_price numeric(10,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(10,2) not null check (line_total >= 0)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  discount_value numeric(10,2) not null check (discount_value > 0),
  minimum_order numeric(10,2) not null default 0,
  usage_limit integer,
  used_count integer not null default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_active_created_idx on public.products(is_active, created_at desc);
create index if not exists blog_posts_status_published_idx on public.blog_posts(status, published_at desc);
create index if not exists orders_user_id_created_idx on public.orders(user_id, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists reviews_product_approved_idx on public.reviews(product_id, is_approved);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders for each row execute function public.set_updated_at();

-- Create a profile automatically after signup.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'customer')
  on conflict (user_id, role) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.blog_posts enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.coupons enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Profiles: read own" on public.profiles for select to authenticated using (auth.uid() = id or public.has_role('admin'));
create policy "Profiles: update own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Roles: users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role('admin'));
create policy "Categories: public read active" on public.categories for select to anon, authenticated using (is_active or public.has_role('admin'));
create policy "Categories: admins manage" on public.categories for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Products: public read active" on public.products for select to anon, authenticated using (is_active or public.has_role('admin'));
create policy "Products: admins manage" on public.products for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Product images: public read" on public.product_images for select to anon, authenticated using (exists(select 1 from public.products p where p.id = product_id and (p.is_active or public.has_role('admin'))));
create policy "Product images: admins manage" on public.product_images for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Blog: public read published" on public.blog_posts for select to anon, authenticated using (status = 'published' or public.has_role('admin') or public.has_role('editor'));
create policy "Blog: editors manage" on public.blog_posts for all to authenticated using (public.has_role('admin') or public.has_role('editor')) with check (public.has_role('admin') or public.has_role('editor'));
create policy "Orders: customer read own" on public.orders for select to authenticated using (auth.uid() = user_id or public.has_role('admin'));
create policy "Orders: customer create" on public.orders for insert to authenticated with check (auth.uid() = user_id);
create policy "Orders: admins manage" on public.orders for update to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Order items: owner read" on public.order_items for select to authenticated using (exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.has_role('admin'))));
create policy "Order items: owner insert" on public.order_items for insert to authenticated with check (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "Order items: admins manage" on public.order_items for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Reviews: public read approved" on public.reviews for select to anon, authenticated using (is_approved or auth.uid() = user_id or public.has_role('admin'));
create policy "Reviews: signed-in create" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Reviews: admins moderate" on public.reviews for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Wishlist: own rows" on public.wishlist_items for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Coupons: public read active" on public.coupons for select to anon, authenticated using (is_active and (starts_at is null or starts_at <= now()) and (expires_at is null or expires_at > now()));
create policy "Coupons: admins manage" on public.coupons for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "Newsletter: subscribe" on public.newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "Newsletter: admins manage" on public.newsletter_subscribers for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));

-- Public image bucket. Policies restrict management to admins/editors.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('curle-media', 'curle-media', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "CURLÉ media: public view" on storage.objects for select to anon, authenticated using (bucket_id = 'curle-media');
create policy "CURLÉ media: admin upload" on storage.objects for insert to authenticated with check (bucket_id = 'curle-media' and public.has_role('admin'));
create policy "CURLÉ media: admin update" on storage.objects for update to authenticated using (bucket_id = 'curle-media' and public.has_role('admin')) with check (bucket_id = 'curle-media' and public.has_role('admin'));
create policy "CURLÉ media: admin delete" on storage.objects for delete to authenticated using (bucket_id = 'curle-media' and public.has_role('admin'));
