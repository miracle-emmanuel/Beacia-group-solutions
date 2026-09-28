import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    checkoutOnWhatsApp,
  } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--color-cream)] shadow-2xl dark:bg-[var(--color-espresso)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 px-5 py-4">
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                Your Bag
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-espresso)] hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
                  Your bag is empty. Start adding some Beacia favourites.
                </p>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 border-b border-[var(--color-gold)]/10 pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-[var(--color-espresso)]/40 transition-colors hover:text-red-500 dark:text-[var(--color-ivory)]/40"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
                          £{item.price.toFixed(2)} each
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid h-6 w-6 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-espresso)] dark:text-[var(--color-ivory)]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid h-6 w-6 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-espresso)] dark:text-[var(--color-ivory)]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--color-gold)]/20 px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                    Subtotal
                  </span>
                  <span className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
                    £{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mb-3 flex flex-col gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40"
                  />
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery address (optional)"
                    className="rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-espresso)]/40 focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)] dark:placeholder:text-[var(--color-ivory)]/40"
                  />
                </div>
                <button
                  onClick={() => checkoutOnWhatsApp({ name, address })}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle size={18} />
                  Checkout on WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
