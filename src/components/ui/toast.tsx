"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

interface ToastContextType {
  toast: (t: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...t, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 4000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-lg border border-border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-5 fade-in",
              t.variant === "destructive" && "border-destructive/50 bg-destructive text-destructive-foreground"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {t.title && <p className="text-sm font-semibold">{t.title}</p>}
                {t.description && <p className="text-sm text-muted-foreground mt-1">{t.description}</p>}
              </div>
              <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
