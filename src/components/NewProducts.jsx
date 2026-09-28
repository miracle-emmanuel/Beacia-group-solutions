import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'

export default function NewProducts() {
  const { products } = useProducts()
  const newItems = products.filter((p) => p.isNew)
  const looped = newItems.length > 0 ? [...newItems, ...newItems] : []
  const { addToCart } = useCart()

  if (newItems.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-[var(--color-espresso)] py-16 text-[var(--color-ivory)]">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-0 h-72 w-72 animate-[float_6s_ease-in-out_infinite] rounded-full bg-[var(--color-gold)] blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 animate-[float_7s_ease-in-out_infinite] rounded-full bg-[var(--color-cognac)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2"
        >
          <Sparkles className="text-[var(--color-gold)]" size={20} />
          <h2 className="font-[var(--font-display)] text-3xl font-semibold md:text-4xl">
            Just In
          </h2>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 pl-5 hover:[animation-play-state:paused]">
          {looped.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="group relative w-56 shrink-0 animate-pulse-glow overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-espresso-light)]"
              style={{ animationDelay: `${(idx % 4) * 0.4}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-2 top-2 rounded-full bg-[var(--color-gold)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-espresso)]">
                  New
                </span>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-gold-light)]">
                    £{product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full border border-[var(--color-gold)]/50 px-3 py-1 text-[11px] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-espresso)]"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
