import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = window.localStorage.getItem('beacia-cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('beacia-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const checkoutOnWhatsApp = (customer = {}) => {
    if (items.length === 0) return
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} (${i.category}) — Qty: ${i.quantity} — £${(i.price * i.quantity).toFixed(2)}`
    )
    const messageParts = [
      `Hello Beacia Group Solutions, I would like to place an order:`,
      '',
      ...lines,
      '',
      `Total: £${totalPrice.toFixed(2)}`,
    ]
    if (customer.name) messageParts.push('', `Name: ${customer.name}`)
    if (customer.address) messageParts.push(`Delivery address: ${customer.address}`)
    const message = messageParts.join('\n')
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setCartOpen,
    checkoutOnWhatsApp,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
