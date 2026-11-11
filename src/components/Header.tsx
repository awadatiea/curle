import { useState } from 'react'
import { Menu, X, ShoppingBag, Search, Heart } from 'lucide-react'
import type { Language, Copy } from '../types'

interface HeaderProps {
  lang: Language
  copy: Copy
  onLanguageChange: (language: Language) => void
}

export default function Header({ lang, copy, onLanguageChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: copy.nav.home, href: '#home' },
    { label: copy.nav.shop, href: '#shop' },
    { label: copy.nav.journal, href: '#journal' },
    { label: copy.nav.ourStory, href: '#story' },
  ]

  return (
    <>
      <div className="announcement">{copy.announcement}</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <a href="#home" className="wordmark" aria-label="CURLÉ home">CURL<span>É</span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}>
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <button className="icon-button desktop-action" aria-label="Search"><Search size={19} strokeWidth={1.6} /></button>
          <button className="icon-button desktop-action" aria-label="Wishlist"><Heart size={19} strokeWidth={1.6} /></button>
          <button className="icon-button bag-button" aria-label="Shopping bag"><ShoppingBag size={19} strokeWidth={1.6} /><span>0</span></button>
        </div>
      </header>
    </>
  )
}
