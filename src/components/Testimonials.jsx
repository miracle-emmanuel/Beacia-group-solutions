import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/products'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[index]

  return (
    <section className="bg-[var(--color-ivory-dim)] py-16 dark:bg-[var(--color-espresso-light)]">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="mb-10 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-4xl">
          What our customers say
        </h2>

        <div className="relative min-h-[200px]">
          <Quote className="mx-auto mb-4 text-[var(--color-gold)]" size={28} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-[var(--font-display)] text-xl italic leading-relaxed text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-5 text-sm font-medium text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
                {current.name} &mdash; {current.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-[var(--color-gold-deep)]' : 'bg-[var(--color-gold)]/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
