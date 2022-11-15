import { createClient } from '@supabase/supabase-js'
import { env } from 'env/client.mjs'

const key = env.NEXT_PUBLIC_SUPABASE_KEY
const url = env.NEXT_PUBLIC_SUPABASE_URL

export const supabase = createClient(url, key)
