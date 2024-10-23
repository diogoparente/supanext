import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export type UserRole = 'user' | 'admin'

export interface UserMetadata {
  role?: UserRole
}

export const createClient = () =>
  createSupabaseClient<any, 'public', any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )