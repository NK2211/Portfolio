/* Supabase client configuration.
   Replace both placeholders with values from Supabase > Project Settings > API.
   Use the publishable key (or legacy anon key), NEVER the service_role/secret key.
*/
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

if (!window.supabase) {
  console.error("Supabase JS library did not load. Check your internet connection.");
}

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;
