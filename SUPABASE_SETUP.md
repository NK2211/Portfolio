# Portfolio with Supabase Visitor Authentication

This project remains plain HTML, CSS and JavaScript. Supabase handles visitor accounts.

## Included
- `auth.html`: sign-in and create-account page
- `auth.js`: email/password, Google OAuth, password reset
- `supabase.js`: Supabase browser client configuration
- `supabase-schema.sql`: private visitor profile table, RLS policies and signup trigger
- `index.html` / `script.js`: navbar sign-in state and sign-out

## 1. Create a Supabase project
1. Create a project at https://supabase.com/dashboard.
2. Open Project Settings → API.
3. Copy the Project URL and publishable key (or legacy anon key).
4. Paste them into `supabase.js`.
5. Never use a `service_role` or secret key in browser code.

## 2. Create the profile table
1. Open Supabase → SQL Editor.
2. Paste and run all contents of `supabase-schema.sql`.
3. The `profiles` table stores only each user's own profile. RLS policies prevent users from reading or changing another user's profile.

## 3. Enable email/password
1. Open Authentication → Providers → Email.
2. Enable Email provider.
3. Decide whether to require email confirmation. Recommended: keep confirmation enabled for a public site.
4. Under Authentication → URL Configuration, set:
   - Site URL: your deployed portfolio origin, e.g. `https://your-site.example`
   - Redirect URLs: add `http://localhost:5500/**` for local testing and your deployed origin (e.g. `https://your-site.example/**`).
5. Use the actual origin where the portfolio is hosted. Do not include `auth.html` in the Site URL.

## 4. Enable Google login
1. In Google Cloud Console, create an OAuth 2.0 Client ID of type Web application.
2. Add the authorized JavaScript origin(s): your local origin and deployed portfolio origin.
3. Add the Supabase callback URL shown in Supabase → Authentication → Providers → Google to Google's Authorized redirect URIs. It usually looks like `https://<project-ref>.supabase.co/auth/v1/callback`.
4. Copy the Google Client ID and Client Secret into Supabase → Authentication → Providers → Google and enable the provider.
5. Add your portfolio origin to Supabase Authentication → URL Configuration → Redirect URLs.
6. Google OAuth will return to `index.html`.

## 5. Run locally
Do not open `index.html` directly using `file://`. Serve the folder over HTTP. For example, with VS Code Live Server use:
`http://127.0.0.1:5500`

Open `http://127.0.0.1:5500/index.html`, then select Sign in. Test:
- Create account with email/password
- Confirm email if confirmation is enabled
- Sign in and sign out using the navbar
- Google login after configuring Google provider
- Forgot password

## Important security notes
- The publishable/anon key is intended for browser use. It is not a secret; RLS is what protects data.
- Never put a service-role key in `supabase.js`.
- A signed-in visitor is not an administrator. Do not use “has a session” as an admin authorization check.
- The current contact form is still a front-end demo and does not store or email messages. Authentication does not automatically connect that form to a database.
- The current portfolio's sections remain public. Only the visitor account flow is authenticated.
