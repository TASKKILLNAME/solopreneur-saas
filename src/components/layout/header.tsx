"use client"

import { LogOut, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav } from "./mobile-nav"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ko } from "@/dict/ko"

export function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 lg:px-6">
      <MobileNav />
      <div className="flex-1" />
      <div className="flex items-center gap-2 relative z-50">
        <ThemeToggle />
      </div>
      <div className="relative z-50" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
          aria-label="사용자 메뉴"
        >
          <User className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-card shadow-lg py-1 z-[60]">
            <button
              onClick={() => {
                setMenuOpen(false)
                router.push("/settings")
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              {ko.settings.title}
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {ko.nav.logout}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
