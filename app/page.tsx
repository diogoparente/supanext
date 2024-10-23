import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GithubIcon, BookOpenIcon, RocketIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Next.js + Supabase Starter
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          A modern starter template with Next.js 14, Supabase, shadcn/ui, and TypeScript
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">
              Get Started
              <RocketIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Built-in auth with Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Secure authentication with email/password, magic links, and social providers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>Powered by PostgreSQL</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Scalable database with real-time subscriptions and edge functions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
            <CardDescription>Built with shadcn/ui</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Beautiful, accessible components that you can copy and paste
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}