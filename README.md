# CURLÉ — Phase 03: Supabase foundation

This phase adds the Supabase client, typed starter data access, and the initial SQL schema with Row Level Security.

## 1. Install dependencies
```bash
npm install
```

## 2. Create a Supabase project
Create a project at https://supabase.com/dashboard. In Project Settings → API, copy:
- Project URL
- Publishable key (or legacy anon key)

Create `.env.local` in the project root using `.env.example` as the template:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```
Never put a `service_role` / secret key in a Vite frontend or commit `.env.local`.

## 3. Apply the database schema
Open Supabase → SQL Editor → New query. Paste and run:
`supabase/migrations/202611110001_initial_schema.sql`

This creates profiles, roles, categories, products, product images, blog posts, orders, order items, reviews, wishlists, coupons and newsletter subscribers, plus indexes, signup profile trigger, RLS policies and the `curle-media` storage bucket.

## 4. Create the first admin safely
1. Sign up for CURLÉ through Supabase Auth (or create a user in Authentication).
2. In SQL Editor, replace the email below with the exact email used for your account and run:
```sql
insert into public.user_roles (user_id, role)
select id, 'admin'
from auth.users
where email = 'YOUR-LOGIN-EMAIL'
on conflict (user_id, role) do nothing;
```
Do not make public signup assign admin roles. Only an existing trusted admin should grant this role.

## 5. Start the app
```bash
npm run dev
```

## 6. What is connected in code
- `src/lib/supabase.ts`: safe browser client; it remains null until environment variables are supplied.
- `src/types/database.ts`: starter TypeScript types.
- `src/services/products.ts`: typed function to fetch active products.

## Security notes
- Only the public publishable/anon key belongs in browser environment variables. RLS is the actual data-access boundary.
- Never expose the service-role/secret key in frontend code.
- The initial order policies are a foundation, not a complete production checkout. Before accepting real payments, implement a trusted server/Edge Function to validate prices, stock, totals, coupon rules and payment callbacks. Never trust client-submitted totals.
- Test policies with both anon and authenticated users before launch.
