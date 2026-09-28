import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories } from '../data/products'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'

export default function Services() {
  const location = useLocation()
  const { products } = useProducts()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location])

  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pb-6 pt-14 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-wide text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]"
        >
          What we offer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:text-5xl"
        >
          Our collections
        </motion.h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
          Browse hair, jewelry and perfume, add your favourites to the bag, and checkout instantly
          on WhatsApp.
        </p>
      </section>

      {categories.map((cat, catIdx) => {
        const items = products.filter((p) => p.category === cat.slug)
        return (
          <section
            key={cat.slug}
            id={cat.slug}
            className={`mx-auto max-w-7xl scroll-mt-24 px-5 py-14 md:px-8 ${
              catIdx % 2 === 1 ? 'bg-[var(--color-ivory-dim)] dark:bg-[var(--color-espresso-light)] rounded-3xl' : ''
            }`}
          >
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                {cat.label}
              </h2>
              <span className="text-xs uppercase tracking-widest text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]">
                {items.length} items
              </span>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
                New pieces are on the way — check back soon.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
