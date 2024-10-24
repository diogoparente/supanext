'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient, UserRole } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  email: string
  user_metadata: {
    role?: UserRole
  }
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  const supabase = createClient()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login')
      } else {
        setUser(user as UserData)
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as UserData || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth, toast, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Badge variant="secondary">{user.user_metadata.role || 'user'}</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>You are signed in as {user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.user_metadata.role === 'admin' && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Admin Features</h3>
              <p className="text-sm text-muted-foreground">
                You have access to additional administrative features.
              </p>
            </div>
          )}
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
