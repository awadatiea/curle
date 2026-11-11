import { Instagram, ArrowUpRight } from 'lucide-react'
import type { Copy } from '../types'

export default function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="wordmark footer-logo">CURL<span>É</span></a>
          <p>{copy.footer.line}</p>
          <a className="social-link" href="#instagram" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
        <div className="footer-column">
          <p className="footer-label">{copy.footer.explore}</p>
          <a href="#shop">{copy.nav.shop}</a>
          <a href="#journal">{copy.nav.journal}</a>
          <a href="#story">{copy.nav.ourStory}</a>
        </div>
        <div className="footer-column">
          <p className="footer-label">{copy.footer.help}</p>
          <a href="#contact">Contact</a>
          <a href="#shipping">Shipping & returns</a>
          <a href="#faq">FAQs</a>
        </div>
        <div className="newsletter">
          <p className="footer-label">{copy.footer.newsletter}</p>
          <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
            <input type="email" placeholder={copy.footer.placeholder} aria-label={copy.footer.placeholder} />
            <button type="submit" aria-label={copy.footer.button}><ArrowUpRight size={18} /></button>
          </form>
          <small>{copy.footer.button} — coming soon.</small>
        </div>
      </div>
      <div className="footer-bottom"><span>{copy.footer.copyright}</span><span>Designed with intention.</span></div>
    </footer>
  )
}
