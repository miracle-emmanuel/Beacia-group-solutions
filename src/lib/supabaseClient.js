import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Whether Supabase is configured. When false, the app falls back to
// storing everything in the browser's localStorage (see ProductsContext
// and RequireAdmin) so the site still works fully out of the box before
// you've set up a project.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
