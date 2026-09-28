import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react'
// import LogoMark from './LogoMark'
import Logo from '../../src/img/Logo.png'
import { siteConfig } from '../data/siteConfig'
import { categories } from '../data/products'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-gold)]/20 bg-[var(--color-cream)] dark:bg-[var(--color-espresso)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 md:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="" className="h-12 w-28"  />
            {/* <LogoMark className="h-10 w-10" /> */}
            {/* <span className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
              Beacia
            </span> */}
          </Link>
          <p className="mt-3 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
            Premium hair, fine jewelry and signature perfumes, delivered across the UK.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-cognac)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-gold-light)]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-cognac)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-gold-light)]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-cognac)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-gold-light)]"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
            Shop
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/services#${c.slug}`} className="transition-colors hover:text-[var(--color-gold-deep)] dark:hover:text-[var(--color-gold-light)]">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
            Company
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
            <li>
              <Link to="/about" className="transition-colors hover:text-[var(--color-gold-deep)] dark:hover:text-[var(--color-gold-light)]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition-colors hover:text-[var(--color-gold-deep)] dark:hover:text-[var(--color-gold-light)]">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-[var(--color-gold-deep)] dark:hover:text-[var(--color-gold-light)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
            Get in touch
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-[var(--color-gold)]" />
              {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-[var(--color-gold)]" />
              {siteConfig.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-[var(--color-gold)]/20 py-5 text-center text-xs text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
        <span>© {year} Beacia Group Solutions Ltd. All rights reserved.</span>
        <Link to="/admin/login" className="text-[var(--color-espresso)]/30 hover:text-[var(--color-gold-deep)] dark:text-[var(--color-ivory)]/30 dark:hover:text-[var(--color-gold-light)]">
          Staff login
        </Link>
      </div>
    </footer>
  )
}
