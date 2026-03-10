# Deployment Guide — लेखनी जितेंद्र की

## Step 1: Supabase Setup

1. Go to https://supabase.com → New Project
   - Name: lekhani-jitendra-ki
   - Password: (save it)
   - Region: South Asia (Mumbai)

2. In SQL Editor, paste and run the contents of `supabase-schema.sql`

3. Go to Storage → New Bucket
   - Name: `media`
   - Public: ✅ ON
   - Max file size: 50MB
   - Allowed MIME types: image/*, video/*

4. Go to Authentication → Users → Invite user
   - Email: (your father's email)
   - He will get a link to set his password

5. Copy your project credentials:
   - Settings → API → `Project URL` → save as NEXT_PUBLIC_SUPABASE_URL
   - Settings → API → `anon public` key → save as NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## Step 2: Deploy to Vercel

1. Go to https://vercel.com → New Project
2. Import: `ssuryanshi/Lekhani-Jitendra-ki`
3. Framework: Next.js (auto-detected)
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   NEXT_PUBLIC_SITE_URL          = https://lekhanijitendraki.in
   ```
5. Click Deploy → done in ~2 minutes

---

## Step 3: Domain

1. Buy `lekhanijitendraki.in` on Namecheap (~₹350/year)
2. In Vercel → Project → Settings → Domains → Add `lekhanijitendraki.in`
3. Vercel gives you DNS records → paste in Namecheap DNS settings
4. Done — live in ~10 minutes

---

## Step 4: Father's Photo

Put his photo at: `public/about-photo.jpg` (any size, will be cropped to circle)
Then run: `git add public/about-photo.jpg && git commit -m "add about photo" && git push`
Vercel auto-deploys on every push.

---

## Step 5: Update Social Links

In `src/components/layout/Footer.tsx`, replace:
- `href="https://facebook.com"` → actual Facebook profile URL
- `href="https://linkedin.com"` → actual LinkedIn profile URL

Then commit and push — Vercel auto-deploys.
