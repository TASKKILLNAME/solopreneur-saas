"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Clock,
  Wallet,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ko } from "@/dict/ko"

const navItems = [
  { href: "/dashboard", label: ko.nav.dashboard, icon: LayoutDashboard },
  { href: "/clients", label: ko.nav.clients, icon: Users },
  { href: "/projects", label: ko.nav.projects, icon: FolderKanban },
  { href: "/invoices", label: ko.nav.invoices, icon: FileText },
  { href: "/time-tracking", label: ko.nav.timeTracking, icon: Clock },
  { href: "/finances", label: ko.nav.finances, icon: Wallet },
  { href: "/settings", label: ko.nav.settings, icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r border-border bg-card h-screen sticky top-0">
      <div className="flex h-14 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">S</span>
          </div>
          <span>SoloBiz</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="py-4 px-3">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
