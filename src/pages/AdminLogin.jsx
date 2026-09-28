import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Loader2 } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { setAdminAuthed } from '../components/RequireAdmin'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePasscodeSubmit = (e) => {
    e.preventDefault()
    if (passcode === siteConfig.adminPasscode) {
      setAdminAuthed(true)
      navigate('/admin')
    } else {
      setError("That passcode isn't right — try again.")
      setAdminAuthed(false)
    }
  }

  const handleSupabaseSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) {
      setError('Incorrect email or password — try again.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
          <Lock size={20} />
        </div>
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
          Admin sign in
        </h1>
        <p className="mt-1 text-sm text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
          {isSupabaseConfigured
            ? 'Sign in with the admin account to manage products.'
            : 'Enter the product manager passcode to continue.'}
        </p>

        {isSupabaseConfigured ? (
          <form onSubmit={handleSupabaseSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Email"
              className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-center text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40 ${
                error ? 'border-red-400' : 'border-[var(--color-gold)]/30'
              }`}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Password"
              className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-center text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40 ${
                error ? 'border-red-400' : 'border-[var(--color-gold)]/30'
              }`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-espresso)] px-6 py-2.5 text-sm font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold-deep)] disabled:opacity-60 dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)] dark:hover:bg-[var(--color-gold-light)]"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasscodeSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="password"
              autoFocus
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value)
                setError('')
              }}
              placeholder="Passcode"
              className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-center text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40 ${
                error ? 'border-red-400' : 'border-[var(--color-gold)]/30'
              }`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--color-espresso)] px-6 py-2.5 text-sm font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold-deep)] dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)] dark:hover:bg-[var(--color-gold-light)]"
            >
              Sign in
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
