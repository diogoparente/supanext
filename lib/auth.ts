import { createClient } from './supabase/client'
import type { UserRole } from './supabase/client'

export async function getUserRole(): Promise<UserRole> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (user?.user_metadata?.role as UserRole) || 'user'
}

export async function updateUserRole(userId: string, role: UserRole) {
  const supabase = createClient()
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role }
  })
  return { error }
}