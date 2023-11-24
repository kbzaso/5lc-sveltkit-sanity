import { createClient } from '@supabase/supabase-js'
import { ANON_KEY } from '$env/static/private'
import { PUBLIC_PROJECT_URL } from '$env/static/public'

export const supabase = createClient(`${PUBLIC_PROJECT_URL}`, `${ANON_KEY}`)