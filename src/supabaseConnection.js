require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supaBaseUrl = process.env.SUPABASE_URL || '';
const supaBaseKey = process.env.SUPABASE_KEY || '';

if (!supaBaseUrl || !supaBaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY environment variables are required.');
}

const supabase = createClient(supaBaseUrl, supaBaseKey, {
  auth: {
    persistSession: false,
  }
});

module.exports = { supabase };
