export type Language = 'en' | 'ar'

export interface Copy {
  announcement: string
  nav: { home: string; shop: string; journal: string; ourStory: string }
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string; note: string }
  intro: { eyebrow: string; title: string; body: string; link: string }
  categories: { title: string; subtitle: string; items: { name: string; detail: string }[] }
  products: { eyebrow: string; title: string; link: string; add: string; items: { name: string; type: string; price: string; tag: string }[] }
  ritual: { eyebrow: string; title: string; body: string; steps: { number: string; title: string; body: string }[]; cta: string }
  journal: { eyebrow: string; title: string; link: string; articles: { category: string; title: string; read: string }[] }
  footer: { line: string; explore: string; help: string; newsletter: string; placeholder: string; button: string; copyright: string }
}
