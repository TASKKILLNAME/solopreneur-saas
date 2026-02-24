"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface TimerState {
  isRunning: boolean
  projectId: string
  startTime: string | null
  description: string
}

const STORAGE_KEY = "solobiz-timer"

function getStoredState(): TimerState {
  if (typeof window === "undefined") {
    return { isRunning: false, projectId: "", startTime: null, description: "" }
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { isRunning: false, projectId: "", startTime: null, description: "" }
}

export function useTimer() {
  const [state, setState] = useState<TimerState>(getStoredState)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Tick elapsed time
  useEffect(() => {
    if (state.isRunning && state.startTime) {
      const updateElapsed = () => {
        const start = new Date(state.startTime!).getTime()
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }
      updateElapsed()
      intervalRef.current = setInterval(updateElapsed, 1000)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    } else {
      setElapsed(0)
    }
  }, [state.isRunning, state.startTime])

  const start = useCallback((projectId: string, description: string) => {
    setState({
      isRunning: true,
      projectId,
      startTime: new Date().toISOString(),
      description,
    })
  }, [])

  const stop = useCallback(() => {
    const result = {
      projectId: state.projectId,
      description: state.description,
      startTime: state.startTime!,
      endTime: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round(elapsed / 60)),
    }
    setState({ isRunning: false, projectId: "", startTime: null, description: "" })
    return result
  }, [state, elapsed])

  const formatElapsed = useCallback(() => {
    const hours = Math.floor(elapsed / 3600)
    const minutes = Math.floor((elapsed % 3600) / 60)
    const seconds = elapsed % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }, [elapsed])

  return {
    isRunning: state.isRunning,
    projectId: state.projectId,
    description: state.description,
    elapsed,
    formatElapsed,
    start,
    stop,
  }
}
