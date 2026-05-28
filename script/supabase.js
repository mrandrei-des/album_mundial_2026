import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://yxiliudehkzuxvzvlhcp.supabase.co'
const SUPABASE_KEY = 'sb_publishable_XPvA5qzqXdb522536Cd4Bw_khzQfxY7'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)