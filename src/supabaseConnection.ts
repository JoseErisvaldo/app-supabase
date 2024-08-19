import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supaBaseUrl = process.env.SUPABASE_URL || '';
const supaBaseKey = process.env.SUPABASE_KEY || '';

if (!supaBaseUrl || !supaBaseKey) {
  throw new Error('As variáveis SUPABASE_URL e SUPABASE_KEY são obrigatórias.');
}

const supabase = createClient(supaBaseUrl, supaBaseKey, {
  auth: {
    persistSession: false,
  }
});

export { supabase };
