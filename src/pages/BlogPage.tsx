import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublishedPosts, type BlogPost } from '../services/blog'
import { ArrowUpRight } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p className="eyebrow">THE CURLÉ JOURNAL</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', margin: '0 0 16px' }}>
          Stories & Knowledge
        </h1>
        <p style={{ color: '#766b61', maxWidth: '500px', margin: '0 auto' }}>
          Thoughts, rituals, and honest advice for your natural texture.
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading articles...</p>
      ) : posts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No articles yet. Check back soon.</p>
      ) : (
        <div className="journal-grid">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} className="journal-card" key={post.id}>
              <div className="journal-image">
                <img src={post.cover_image_url || ''} alt={post.title_en} />
                <span><ArrowUpRight size={19} /></span>
              </div>
              <p className="eyebrow">ARTICLE</p>
              <h3>{post.title_ar}</h3>
              <div className="journal-read">
                <span>{new Date(post.published_at || '').toLocaleDateString('ar-EG')}</span>
                <span className="read-line" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}