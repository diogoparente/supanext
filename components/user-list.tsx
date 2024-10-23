'use client'

import { useEffect, useState } from 'react'
import { createClient, UserRole } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'

interface TeamMember {
  id: string
  email: string
  created_at: string
  user_metadata: {
    role?: UserRole
    avatar_url?: string
  }
}

export function UserList() {
  const [users, setUsers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data: users, error } = await supabase.auth.admin.listUsers()
      if (error) throw error
      setUsers(users.users as TeamMember[])
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role: newRole }
      })
      
      if (error) throw error

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, user_metadata: { ...user.user_metadata, role: newRole } }
          : user
      ))

      toast({
        title: 'Role updated',
        description: 'User role has been updated successfully'
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>
                {user.email.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Joined {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={user.user_metadata.role || 'user'}
              onValueChange={(value: UserRole) => updateUserRole(user.id, value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  )
}