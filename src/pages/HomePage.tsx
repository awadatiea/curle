import { useState, useEffect } from 'react'
import { ArrowDown, ArrowUpRight, ArrowRight, Star, Sparkles, Leaf, Droplets, ShoppingBag, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionHeading from '../components/SectionHeading'
import { en } from '../locales/en'
import { ar } from '../locales/ar'
import type { Language } from '../types'
import { getActiveProducts, type Product } from '../services/products'

// صور بنات بشعر كيرلي
const categoryImages = [
  'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?auto=format&fit=crop&w=900&q=85',
]

const journalImages = [
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1000&q=85',
]

// آراء العملاء
const testimonials = [
  { name: 'مريم', text: 'أول مرة أحس إن شعري الكيرلي سهل! الروتين والمنتجات غيروا شعري تمامًا.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80' },
  { name: 'سارة', text: 'بجد أحسن حاجة جربتها لشعري، بقى ناعم ومحدد من غير أي مجهود.', image: 'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?auto=format&fit=crop&w=150&q=80' },
  { name: 'نور', text: 'أخيرًا لقيت منتجات بتفهم شعري الكيرلي! أنصح كل بنت تجرب.', image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=150&q=80' },
]

export default function HomePage() {
  const [lang, setLang] = useState<Language>('en')
  const [products, setProducts] = useState<Product[]>([])
  const [sliderPos, setSliderPos] = useState(50)
  const copy = lang === 'en' ? en : ar
  const isArabic = lang === 'ar'

  useEffect(() => {
    getActiveProducts().then(setProducts).catch(console.error)
  }, [])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('تمت إضافة المنتج للسلة!')
  }

  return (
    <div className={`app-shell ${isArabic ? 'arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'} lang={lang}>
      <Header lang={lang} copy={copy} onLanguageChange={setLang} />

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow light">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title.split('\\n').map((line, i) => <span key={i}>{line}</span>)}</h1>
            <p className="hero-description">{copy.hero.body}</p>
            <div className="hero-buttons">
              <Link to="/routine" className="button button-light">{copy.hero.primary}<ArrowUpRight size={17} /></Link>
              <Link to="/shop" className="text-link light-link">{copy.hero.secondary}<ArrowRight size={17} /></Link>
            </div>
            <div className="hero-note"><span />{copy.hero.note}</div>
          </div>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>04</span></div>
          <a href="#story" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        {/* Intro */}
        <section className="intro-section section-pad" id="story">
          <div className="intro-image-wrap">
            <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1100&q=90" alt="Natural curly beauty" />
            <div className="image-caption"><Sparkles size={16} /><span>Beauty in every texture</span></div>
          </div>
          <div className="intro-copy">
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h2>{copy.intro.title}</h2>
            <p className="body-copy">{copy.intro.body}</p>
            <Link to="/blog" className="underlined-link">{copy.intro.link}<ArrowUpRight size={17} /></Link>
            <div className="intro-stamp"><span>CUR</span><strong>É</strong><span>LOVE YOUR TEXTURE</span></div>
          </div>
        </section>

        {/* Before/After Slider */}
        <section className="section-pad" style={{ background: '#f8f4ee' }}>
          <SectionHeading eyebrow="REAL RESULTS" title="شوفي الفرق بنفسك" centered />
          <div className="before-after-container">
            <div className="before-after-slider" style={{ '--pos': `${sliderPos}%` } as React.CSSProperties}>
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85" alt="Before" className="before-img" />
              <img src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=85" alt="After" className="after-img" />
              <div className="slider-handle" />
              <input 
                type="range" min="0" max="100" value={sliderPos} 
                onChange={(e) => setSliderPos(Number(e.target.value))} 
                className="slider-input" 
              />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="product-section section-pad" id="shop">
          <div className="section-topline">
            <SectionHeading eyebrow={copy.products.eyebrow} title={copy.products.title} />
            <Link to="/shop" className="underlined-link">{copy.products.link}<ArrowUpRight size={17} /></Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 3).map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image_url || ''} alt={product.name_ar} />
                  <button className="quick-add" onClick={() => addToCart(product)} aria-label="Add to cart">
                    <ShoppingBag size={19} />
                  </button>
                </div>
                <div className="product-meta">
                  <div><h3>{product.name_ar}</h3><p>{product.description_ar?.slice(0, 30)}...</p></div>
                  <strong>{product.price} ج.م</strong>
                </div>
                <Link to={`/shop/${product.slug}`} className="product-discover">اكتشفي المنتج <ArrowUpRight size={15} /></Link>
              </article>
            ))}
          </div>
        </section>

        {/* Ritual */}
        <section className="ritual-section section-pad" id="ritual">
          <div className="ritual-visual">
            <img src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1200&q=90" alt="Natural textured hair" />
            <div className="ritual-visual-label"><span>THE CURLÉ WAY</span><strong>Less rules.<br />More you.</strong></div>
          </div>
          <div className="ritual-content">
            <p className="eyebrow">{copy.ritual.eyebrow}</p>
            <h2>{copy.ritual.title}</h2>
            <p className="body-copy">{copy.ritual.body}</p>
            <div className="ritual-steps-interactive">
              {copy.ritual.steps.map((step, i) => (
                <div className="ritual-step-card" key={step.number}>
                  <div className="ritual-step-header">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <span className="step-icon">{i === 0 ? <Droplets /> : i === 1 ? <Leaf /> : <Sparkles />}</span>
                  </div>
                  <p className="ritual-step-body">{step.body}</p>
                </div>
              ))}
            </div>
            <Link to="/routine" className="button button-dark" style={{ marginTop: '30px' }}>{copy.ritual.cta}<ArrowUpRight size={17} /></Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-pad" style={{ background: '#eee5da' }}>
          <SectionHeading eyebrow="REAL WOMEN. REAL CURLS." title="بيحبوا CURLÉ" centered />
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <Quote size={32} color="#b58d70" style={{ marginBottom: '16px' }} />
                <p style={{ fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '24px' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.image} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '14px' }}>{t.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section className="journal-section section-pad" id="journal">
          <div className="section-topline">
            <SectionHeading eyebrow={copy.journal.eyebrow} title={copy.journal.title} />
            <Link to="/blog" className="underlined-link">{copy.journal.link}<ArrowUpRight size={17} /></Link>
          </div>
          <div className="journal-grid">
            {copy.journal.articles.map((article, i) => (
              <Link to="/blog" className="journal-card" key={article.title}>
                <div className="journal-image"><img src={journalImages[i]} alt="" /><span><ArrowUpRight size={19} /></span></div>
                <p className="eyebrow">{article.category}</p>
                <h3>{article.title}</h3>
                <div className="journal-read"><span>{article.read}</span><span className="read-line" /></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="quote-section">
          <div className="quote-mark">“</div>
          <p>{isArabic ? 'شعرك مش محتاج يتغير علشان يبقى جميل. هو جميل بطبيعته.' : 'Your hair doesn’t need to change to be beautiful. It already is.'}</p>
          <span>— THE CURLÉ PROMISE —</span>
          <div className="quote-stars"><Star /><Star /><Star /></div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-banner">
          <div><p className="eyebrow light">A NOTE FROM CURLÉ</p><h2>{isArabic ? 'خلّي العناية جزء من حكايتك.' : 'Make room for a little more self-love.'}</h2><p>{isArabic ? 'انضمي لمجتمعنا واكتشفي نصائح واختيارات معمولة لشعرك.' : 'Join our community for thoughtful tips, new rituals, and curl inspiration.'}</p></div>
          <form onSubmit={(e) => e.preventDefault()} className="banner-form"><input type="email" placeholder={copy.footer.placeholder} aria-label={copy.footer.placeholder} /><button type="submit"><ArrowUpRight size={19} /></button></form>
        </section>
      </main>

      <Footer copy={copy} />
    </div>
  )
}