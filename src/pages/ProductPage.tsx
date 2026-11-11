import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, type Product } from '../services/products'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="section-pad" style={{ minHeight: '100vh' }}>Loading...</div>
  
  if (!product) return (
    <div className="section-pad" style={{ minHeight: '100vh', textAlign: 'center' }}>
      <h1>Product not found</h1>
      <Link to="/shop" style={{ borderBottom: '1px solid #a98a70', paddingBottom: '4px' }}>Back to shop</Link>
    </div>
  )

  return (
    <div className="section-pad" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '120px' }}>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> Back to shop
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
        <div>
          <img 
            src={product.image_url || ''} 
            alt={product.name_ar} 
            style={{ width: '100%', height: '500px', objectFit: 'cover' }} 
          />
        </div>
        
        <div>
          <p className="eyebrow">CURLÉ PRODUCT</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', margin: '16px 0' }}>
            {product.name_ar}
          </h1>
          <p style={{ fontSize: '24px', color: '#674a3a', fontWeight: 600, marginBottom: '24px' }}>
            {product.price} ج.م
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.9, color: '#3a332d', marginBottom: '40px' }}>
            {product.description_ar}
          </p>
          
          <button 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px',
              background: '#674a3a', 
              color: 'white', 
              padding: '18px 32px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <ShoppingBag size={18} />
            أضيفي للسلة
          </button>
        </div>
      </div>
    </div>
  )
}