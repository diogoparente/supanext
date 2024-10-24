'use client'

import { Button } from '@/components/ui/button'
import { GithubIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export function AuthButtons() {
  const supabase = createClient()
  const handleGithubLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  const handleGoogleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleGoogleLogin} variant="outline" className="flex items-center gap-2">
        <Image
          src="https://www.google.com/favicon.ico"
          alt="Google"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        Sign in with Google
      </Button>
      <Button onClick={handleGithubLogin} variant="outline" className="flex items-center gap-2">
        <GithubIcon className="w-4 h-4" />
        Sign in with GitHub
      </Button>
    </div>
  )
}
