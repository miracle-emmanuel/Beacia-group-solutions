import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gold)]/15 bg-[var(--color-cream)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[var(--color-espresso-light)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-gold-deep)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
            £{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 rounded-full bg-[var(--color-espresso)] px-4 py-2 text-xs font-medium text-[var(--color-ivory)] transition-colors duration-300 hover:bg-[var(--color-gold-deep)] dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)] dark:hover:bg-[var(--color-gold-light)]"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}
