"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SidebarNav } from "./sidebar"
import Link from "next/link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent transition-colors"
        aria-label="메뉴 열기"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border lg:hidden overflow-y-auto">
            <div className="flex h-14 items-center justify-between border-b border-border px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-bold">S</span>
                </div>
                <span>SoloBiz</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
                aria-label="메뉴 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}
