import { createClient } from '@supabase/supabase-js';
// Use Vite's environment variables (prefixed with VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nqcwwrbrdyxxmecnsvci.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is not set. Please create a .env file with your Supabase key.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };