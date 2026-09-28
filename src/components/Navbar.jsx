import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ShoppingBag, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { categories } from '../data/products'
// import LogoMark from './LogoMark'
import Logo from '../../src/img/Logo.png'

const navLinkBase =
  'text-sm tracking-wide transition-colors duration-300 hover:text-[var(--color-gold)]'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { totalItems, setCartOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-cream)]/90 dark:bg-[var(--color-espresso)]/90 backdrop-blur-md shadow-sm'
          : 'bg-[var(--color-cream)] dark:bg-[var(--color-espresso)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          {/* <LogoMark className="h-11 w-11" /> */}
          <img src={Logo} alt="" className="h-12 w-28"  />
          {/* <span className="flex flex-col leading-none max-sm:hidden">
            <span className="font-[var(--font-display)] text-2xl font-semibold tracking-wide text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
              Beacia
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]">
              Group Solutions Ltd
            </span>
          </span> */}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkBase} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkBase}>
            About
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`${navLinkBase} flex items-center gap-1`}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((o) => !o)}
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-2 w-52 -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-cream)] shadow-xl dark:bg-[var(--color-espresso-light)]"
                >
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/services#${c.slug}`}
                      className="block px-5 py-3 text-sm text-[var(--color-espresso)] transition-colors duration-200 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold-deep)] dark:text-[var(--color-ivory)] dark:hover:text-[var(--color-gold-light)]"
                      onClick={() => setProductsOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/services" className={navLinkBase}>
            Services
          </NavLink>
          <NavLink to="/contact" className={navLinkBase}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-cognac)] transition-colors duration-300 hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-gold-light)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-cognac)] transition-colors duration-300 hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-gold-light)]"
          >
            <ShoppingBag size={16} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[var(--color-gold-deep)] text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="grid h-9 w-9 place-items-center text-[var(--color-espresso)] dark:text-[var(--color-ivory)] md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--color-gold)]/20 bg-[var(--color-cream)] dark:bg-[var(--color-espresso)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-1 border-t border-[var(--color-gold)]/20 pt-2">
                <p className="px-3 pb-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-cognac)] dark:text-[var(--color-gold-light)]">
                  Shop by category
                </p>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/services#${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
