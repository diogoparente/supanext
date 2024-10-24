"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setIsAdmin(user?.user_metadata?.role === "admin");
    };
    checkUser();
  }, [supabase.auth]);

  const routes = isLoggedIn
    ? [
        {
          href: "/dashboard",
          label: "Dashboard",
        },
        ...(isAdmin
          ? [
              {
                href: "/admin",
                label: "Admin",
              },
            ]
          : []),
      ]
    : [
        {
          href: "/login",
          label: "Login",
        },
        {
          href: "/register",
          label: "Register",
        },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-10 flex h-14 items-center justify-between">
        <div className="flex flex-1 justify-between">
          <Button
            variant="ghost"
            className={cn("px-4", pathname === "/" && "bg-muted font-medium")}
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <div className="flex gap-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn(
                  "px-4",
                  pathname === route.href && "bg-muted font-medium"
                )}
                asChild
              >
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
