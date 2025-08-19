import { createClient } from '@supabase/supabase-js';

// Frontend client: use ONLY the public anon key. Configure RLS to allow read-only.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


