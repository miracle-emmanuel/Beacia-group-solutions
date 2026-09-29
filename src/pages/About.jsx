import { motion } from 'framer-motion'
import { Heart, Leaf, Award } from 'lucide-react'
import Testimonials from '../components/Testimonials'

const values = [
  {
    icon: Heart,
    title: 'Customer first',
    desc: 'Every order is treated like it matters, because it does. Real people, fast replies.',
  },
  {
    icon: Leaf,
    title: 'Honest sourcing',
    desc: 'We work directly with trusted suppliers so quality stays consistent, order after order.',
  },
  {
    icon: Award,
    title: 'Quality guaranteed',
    desc: 'Hair, jewelry and fragrance are checked for quality before they ever reach your door.',
  },
]

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pb-6 pt-14 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-wide text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]"
        >
          Our story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-5xl"
        >
          Built on quality, worn with confidence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base text-[var(--color-espresso)]/75 dark:text-[var(--color-ivory)]/75"
        >
          Beacia Group Solutions Ltd started with a simple belief: looking and feeling your best
          shouldn't mean compromising on quality. What began as a small hair supply business in
          the UK has grown into a full lifestyle brand spanning hair, jewelry and fragrance —
          trusted by customers across Manchester and beyond.
        </motion.p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-[var(--color-gold)]/25 shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=900&auto=format&fit=crop"
              alt="Beacia hair collection styled"
              className="h-[420px] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
              Why customers choose Beacia
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-espresso)]/75 dark:text-[var(--color-ivory)]/75">
              We hand-select every bundle, wig, piece of jewelry and fragrance in our catalogue,
              so what you see is exactly what arrives. No middlemen, no guesswork — just a
              straightforward way to shop premium hair, jewelry and perfume from anywhere in the
              UK, with support available every step of the way.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-1">
              {values.map((v, idx) => {
                const Icon = v.icon
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                        {v.title}
                      </h3>
                      <p className="text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                        {v.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </div>
  )
}
