import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Gem, Droplet, Truck, ShieldCheck, MessageCircle } from 'lucide-react'
import NewProducts from '../components/NewProducts'
import { siteConfig } from '../data/siteConfig'

const categoryCards = [
  {
    slug: 'hair',
    title: 'Hair',
    desc: 'Raw bundles, HD lace wigs and frontals, sourced and finished for a flawless install.',
    icon: Sparkles,
    image:
      'https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'jewelry',
    title: 'Jewelry',
    desc: 'Tarnish-resistant gold-plated pieces designed for everyday luxury.',
    icon: Gem,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'perfume',
    title: 'Perfume',
    desc: 'Signature fragrances layered with rich, long-lasting notes.',
    icon: Droplet,
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop',
  },
]

const features = [
  { icon: Truck, title: 'UK-wide delivery', desc: 'Fast, tracked shipping to your door.' },
  { icon: ShieldCheck, title: 'Quality checked', desc: 'Every piece inspected before it ships.' },
  { icon: MessageCircle, title: 'WhatsApp checkout', desc: 'Order in seconds, no account needed.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-cream)] dark:bg-[var(--color-espresso)]">
        <div className="pointer-events-none absolute inset-0">
          <svg
            viewBox="0 0 1200 700"
            className="absolute -right-40 top-0 h-full w-[80%] opacity-70 dark:opacity-40"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a5a34" />
                <stop offset="100%" stopColor="#e0be6e" />
              </linearGradient>
            </defs>
            <motion.path
              d="M-100,350 C150,200 300,500 550,350 C800,200 950,500 1300,300"
              fill="none"
              stroke="url(#hero-grad)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M-100,420 C180,300 320,560 560,420 C820,270 960,560 1300,380"
              fill="none"
              stroke="url(#hero-grad)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-medium tracking-wide text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]">
              {siteConfig.tagline}
            </p>
            <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-espresso)] dark:text-[var(--color-ivory)] sm:text-5xl md:text-6xl">
              Luxury you can wear, from head to signature scent
            </h1>
            <p className="mt-5 max-w-md text-base text-[var(--color-espresso)]/75 dark:text-[var(--color-ivory)]/75">
              Beacia Group Solutions is the UK home for premium hair, fine jewelry and
              designer-calibre perfumes — hand-picked and delivered with care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="rounded-full bg-[var(--color-espresso)] px-7 py-3 text-sm font-medium text-[var(--color-ivory)] transition-all duration-300 hover:bg-[var(--color-gold-deep)] dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)] dark:hover:bg-[var(--color-gold-light)]"
              >
                Shop the collection
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-[var(--color-gold)]/50 px-7 py-3 text-sm font-medium text-[var(--color-espresso)] transition-all duration-300 hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
              >
                Our story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="animate-float overflow-hidden rounded-[2rem] border border-[var(--color-gold)]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
                alt="Beacia hair and beauty collection"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category showcase */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-4xl">
            Shop by category
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
            Three collections, one standard of quality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categoryCards.map((c, idx) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={`/services#${c.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-[var(--color-gold)]/20 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <Icon size={22} className="mb-2 text-[var(--color-gold-light)]" />
                      <h3 className="font-[var(--font-display)] text-2xl font-semibold">
                        {c.title}
                      </h3>
                      <p className="mt-1 max-w-[85%] text-sm text-white/80">{c.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <NewProducts />

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((f, idx) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
                  <Icon size={22} />
                </div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  {f.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-[var(--color-espresso)] px-8 py-12 text-center text-[var(--color-ivory)] md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-[var(--font-display)] text-2xl font-semibold md:text-3xl">
              Ready to order?
            </h3>
            <p className="mt-2 text-sm text-[var(--color-ivory)]/75">
              Message us directly on WhatsApp for quick recommendations and checkout.
            </p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle size={18} /> Chat with us
          </a>
        </div>
      </section>
    </div>
  )
}
