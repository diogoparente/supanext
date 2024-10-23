'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function Navbar() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAdmin(user?.user_metadata?.role === 'admin')
    }
    checkAdmin()
  }, [supabase.auth])

  const routes = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
    },
    ...(isAdmin ? [{
      href: '/admin',
      label: 'Admin',
    }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Next.js Starter</span>
          </Link>
          <div className="hidden md:flex">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn(
                  'px-4',
                  pathname === route.href && 'bg-muted font-medium'
                )}
                asChild
              >
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}