import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Server-side client for scripts: use service role key from .env (NEVER expose to frontend)
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // eslint-disable-next-line no-console
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export { supabase };