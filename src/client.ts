import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;


if (!URL || !API_KEY) {
  throw new Error('Missing Supabase URL or API key');
}

export const supabase = createClient(URL, API_KEY);

