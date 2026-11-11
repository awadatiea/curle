import { useState } from 'react'
import { ArrowDown, ArrowUpRight, ArrowRight, Star, Sparkles, Leaf, Droplets } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import SectionHeading from './components/SectionHeading'
import { en } from './locales/en'
import { ar } from './locales/ar'
import type { Language } from './types'

const categoryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85',
]
const productImages = [
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
]
const journalImages = [
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
]

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const copy = lang === 'en' ? en : ar
  const isArabic = lang === 'ar'

  return (
    <div className={`app-shell ${isArabic ? 'arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'} lang={lang}>
      <Header lang={lang} copy={copy} onLanguageChange={setLang} />

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow light">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title.split('\\n').map((line, i) => <span key={i}>{line}</span>)}</h1>
            <p className="hero-description">{copy.hero.body}</p>
            <div className="hero-buttons">
              <a href="#ritual" className="button button-light">{copy.hero.primary}<ArrowUpRight size={17} /></a>
              <a href="#shop" className="text-link light-link">{copy.hero.secondary}<ArrowRight size={17} /></a>
            </div>
            <div className="hero-note"><span />{copy.hero.note}</div>
          </div>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>04</span></div>
          <a href="#story" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="intro-section section-pad" id="story">
          <div className="intro-image-wrap">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1100&q=90" alt="Natural beauty portrait" />
            <div className="image-caption"><Sparkles size={16} /><span>Beauty in every texture</span></div>
          </div>
          <div className="intro-copy">
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h2>{copy.intro.title}</h2>
            <p className="body-copy">{copy.intro.body}</p>
            <a href="#ritual" className="underlined-link">{copy.intro.link}<ArrowUpRight size={17} /></a>
            <div className="intro-stamp"><span>CUR</span><strong>É</strong><span>LOVE YOUR TEXTURE</span></div>
          </div>
        </section>

        <section className="texture-section section-pad">
          <SectionHeading eyebrow="YOUR TEXTURE, YOUR STORY" title={copy.categories.title} subtitle={copy.categories.subtitle} centered />
          <div className="category-grid">
            {copy.categories.items.map((item, i) => (
              <a href="#quiz" className="category-card" key={item.name}>
                <div className="category-image"><img src={categoryImages[i]} alt={item.name} /><span className="category-number">0{i + 1}</span><span className="category-arrow"><ArrowUpRight size={20} /></span></div>
                <div className="category-info"><h3>{item.name}</h3><p>{item.detail}</p></div>
              </a>
            ))}
          </div>
          <a href="#quiz" className="center-link">{isArabic ? 'اكتشفي نوع شعرك' : 'Discover your curl type'}<ArrowUpRight size={17} /></a>
        </section>

        <section className="product-section section-pad" id="shop">
          <div className="section-topline">
            <SectionHeading eyebrow={copy.products.eyebrow} title={copy.products.title} />
            <a href="#shop-all" className="underlined-link">{copy.products.link}<ArrowUpRight size={17} /></a>
          </div>
          <div className="product-grid">
            {copy.products.items.map((item, i) => (
              <article className="product-card" key={item.name}>
                <div className="product-image"><img src={productImages[i]} alt={item.name} /><span className="product-tag">{item.tag}</span><button className="quick-add" aria-label={`Discover ${item.name}`}><ArrowUpRight size={19} /></button></div>
                <div className="product-meta"><div><h3>{item.name}</h3><p>{item.type}</p></div><strong>{item.price}</strong></div>
                <a href="#product" className="product-discover">{copy.products.add}<ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="ritual-section section-pad" id="ritual">
          <div className="ritual-visual">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90" alt="Woman with natural textured hair" />
            <div className="ritual-visual-label"><span>THE CURLÉ WAY</span><strong>Less rules.<br />More you.</strong></div>
          </div>
          <div className="ritual-content">
            <p className="eyebrow">{copy.ritual.eyebrow}</p>
            <h2>{copy.ritual.title}</h2>
            <p className="body-copy">{copy.ritual.body}</p>
            <div className="ritual-steps">
              {copy.ritual.steps.map((step, i) => (
                <div className="ritual-step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                  <span className="step-icon">{i === 0 ? <Droplets /> : i === 1 ? <Leaf /> : <Sparkles />}</span>
                </div>
              ))}
            </div>
            <a href="#quiz" className="button button-dark">{copy.ritual.cta}<ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="journal-section section-pad" id="journal">
          <div className="section-topline">
            <SectionHeading eyebrow={copy.journal.eyebrow} title={copy.journal.title} />
            <a href="#all-articles" className="underlined-link">{copy.journal.link}<ArrowUpRight size={17} /></a>
          </div>
          <div className="journal-grid">
            {copy.journal.articles.map((article, i) => (
              <a href="#article" className="journal-card" key={article.title}>
                <div className="journal-image"><img src={journalImages[i]} alt="" /><span><ArrowUpRight size={19} /></span></div>
                <p className="eyebrow">{article.category}</p>
                <h3>{article.title}</h3>
                <div className="journal-read"><span>{article.read}</span><span className="read-line" /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <p>{isArabic ? 'شعرك مش محتاج يتغير علشان يبقى جميل. هو جميل بطبيعته.' : 'Your hair doesn’t need to change to be beautiful. It already is.'}</p>
          <span>— THE CURLÉ PROMISE —</span>
          <div className="quote-stars"><Star /><Star /><Star /></div>
        </section>

        <section className="newsletter-banner">
          <div><p className="eyebrow light">A NOTE FROM CURLÉ</p><h2>{isArabic ? 'خلّي العناية جزء من حكايتك.' : 'Make room for a little more self-love.'}</h2><p>{isArabic ? 'انضمي لمجتمعنا واكتشفي نصائح واختيارات معمولة لشعرك.' : 'Join our community for thoughtful tips, new rituals, and curl inspiration.'}</p></div>
          <form onSubmit={(e) => e.preventDefault()} className="banner-form"><input type="email" placeholder={copy.footer.placeholder} aria-label={copy.footer.placeholder} /><button type="submit"><ArrowUpRight size={19} /></button></form>
        </section>
      </main>

      <Footer copy={copy} />
    </div>
  )
}
