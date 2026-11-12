import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, type Product } from '../services/products'
import { ArrowLeft, ShoppingBag, ShoppingCart } from 'lucide-react'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!slug) return
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  const addToCart = () => {
    if (!product) return
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    setAdded(true)
    // تحديث عدد السلة في الهيدر
    window.dispatchEvent(new Event('storage'))
  }

  if (loading) return <div className="section-pad" style={{ minHeight: '100vh' }}>Loading...</div>
  if (!product) return <div className="section-pad" style={{ minHeight: '100vh', textAlign: 'center' }}><h1>Product not found</h1></div>

  return (
    <div className="section-pad" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '120px' }}>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للمتجر
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
        <div>
          <img src={product.image_url || ''} alt={product.name_ar} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
        </div>
        
        <div>
          <p className="eyebrow">CURLÉ PRODUCT</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', margin: '16px 0' }}>{product.name_ar}</h1>
          <p style={{ fontSize: '24px', color: '#674a3a', fontWeight: 600, marginBottom: '24px' }}>{product.price} ج.م</p>
          <p style={{ fontSize: '16px', lineHeight: 1.9, color: '#3a332d', marginBottom: '40px' }}>{product.description_ar}</p>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={addToCart} 
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
              <ShoppingBag size={18} /> {added ? 'تمت الإضافة!' : 'أضيفي للسلة'}
            </button>

            {added && (
              <Link 
                to="/cart" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  background: '#b58d70', 
                  color: 'white', 
                  padding: '18px 32px', 
                  textDecoration: 'none', 
                  fontSize: '14px' 
                }}
              >
                <ShoppingCart size={18} /> اذهبي للسلة
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}