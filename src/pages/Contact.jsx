import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react'
import GoogleMap from '../components/GoogleMap'
import { siteConfig } from '../data/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hello Beacia, my name is ${form.name}.\n\n${form.message}\n\nYou can reach me at ${form.email}`
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pb-6 pt-14 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-wide text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]"
        >
          Get in touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-5xl"
        >
          We'd love to hear from you
        </motion.h1>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:px-8">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-cream)] p-6 shadow-sm dark:bg-[var(--color-espresso-light)]"
        >
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
              Name
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-4 py-2.5 text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-4 py-2.5 text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
              Message
            </label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us what you're looking for..."
              className="w-full resize-none rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-4 py-2.5 text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40"
            />
          </div>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Send size={16} /> Send via WhatsApp
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-4 sm:grid-cols-1">
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-gold)]/20 p-4">
              <MapPin className="mt-0.5 shrink-0 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]" size={20} />
              <div>
                <p className="text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                  Visit us
                </p>
                <p className="text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  {siteConfig.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-gold)]/20 p-4">
              <Phone className="mt-0.5 shrink-0 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]" size={20} />
              <div>
                <p className="text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                  Call or WhatsApp
                </p>
                <p className="text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  {siteConfig.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-gold)]/20 p-4">
              <Mail className="mt-0.5 shrink-0 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]" size={20} />
              <div>
                <p className="text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                  Email
                </p>
                <p className="text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  {siteConfig.email}
                </p>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-6 py-3 text-sm font-medium text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
          >
            <MessageCircle size={16} /> Chat with us directly
          </a>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="h-[380px] overflow-hidden rounded-2xl border border-[var(--color-gold)]/20 shadow-sm">
          <GoogleMap />
        </div>
      </section>
    </div>
  )
}
