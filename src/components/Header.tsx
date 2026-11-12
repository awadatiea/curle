import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, Search, Heart, User, Shield } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { Language, Copy } from '../types'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  lang: Language
  copy: Copy
  onLanguageChange: (language: Language) => void
}

export default function Header({ lang, copy, onLanguageChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { label: copy.nav.home, href: '/' },
    { label: copy.nav.shop, href: '/shop' },
    { label: copy.nav.journal, href: '/blog' },
    { label: copy.nav.ourStory, href: '/#story' },
    { label: 'الخدمات', href: '/services' },
  ]

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [location.pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      <div className="announcement">{copy.announcement}</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link to="/" className="wordmark" aria-label="CURLÉ home">CURL<span>É</span></Link>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}>
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          
          {/* فورم البحث */}
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
            <input 
              type="text" 
              placeholder="ابحث..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '80px', fontSize: '11px', padding: '4px' }}
            />
            <button type="submit" className="icon-button" aria-label="Search" style={{ padding: '0 4px' }}>
              <Search size={16} strokeWidth={1.6} />
            </button>
          </form>

          <button className="icon-button desktop-action" aria-label="Wishlist"><Heart size={19} strokeWidth={1.6} /></button>
          <Link to="/cart" className="icon-button bag-button" aria-label="Shopping bag" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ShoppingBag size={19} strokeWidth={1.6} />
            <span>{cartCount}</span>
          </Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to="/admin" style={{ fontSize: '11px', color: '#674a3a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={16} /> لوحة التحكم
              </Link>
              <button onClick={signOut} style={{ fontSize: '11px', color: '#674a3a', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={16} /> خروج
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ fontSize: '11px', color: '#674a3a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={16} /> دخول
            </Link>
          )}
        </div>
      </header>
    </>
  )
}