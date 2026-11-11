import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPostBySlug, type BlogPost } from '../services/blog'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="section-pad" style={{ minHeight: '100vh' }}>Loading...</div>
  
  if (!post) return (
    <div className="section-pad" style={{ minHeight: '100vh', textAlign: 'center' }}>
      <h1>Article not found</h1>
      <Link to="/blog" style={{ borderBottom: '1px solid #a98a70', paddingBottom: '4px' }}>Back to blog</Link>
    </div>
  )

  return (
    <article className="section-pad" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px' }}>
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> Back to journal
      </Link>
      
      <p className="eyebrow">ARTICLE</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 54px)', lineHeight: 1.1, margin: '16px 0 24px' }}>
        {post.title_ar}
      </h1>
      
      <img 
        src={post.cover_image_url || ''} 
        alt={post.title_ar} 
        style={{ width: '100%', height: '400px', objectFit: 'cover', marginBottom: '40px' }} 
      />

      <div style={{ fontSize: '16px', lineHeight: 1.9, color: '#3a332d' }}>
        {post.content_ar?.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h2 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', margin: '40px 0 16px' }}>{line.replace('# ', '')}</h2>
          if (line.startsWith('## ')) return <h3 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: '32px 0 12px' }}>{line.replace('## ', '')}</h3>
          if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} style={{ marginBottom: '8px' }}>{line.replace(/^[-*] /, '')}</li>
          if (line.trim() === '') return <br key={i} />
          return <p key={i} style={{ marginBottom: '16px' }}>{line}</p>
        })}
      </div>
    </article>
  )
}