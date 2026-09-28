import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const SESSION_KEY = 'beacia-admin-session'

// Passcode-mode helpers (used only when Supabase isn't configured).
export function isAdminAuthed() {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function setAdminAuthed(value) {
  window.sessionStorage.setItem(SESSION_KEY, value ? 'true' : 'false')
}

export default function RequireAdmin({ children }) {
  const [checking, setChecking] = useState(isSupabaseConfigured)
  const [authed, setAuthed] = useState(isSupabaseConfigured ? false : isAdminAuthed())

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setAuthed(Boolean(data.session))
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session))
    })

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-gold)]" size={24} />
      </div>
    )
  }

  if (!authed) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
