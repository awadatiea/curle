import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getActiveProducts, type Product } from '../services/products'
import { ArrowUpRight } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p className="eyebrow">THE CURLÉ EDIT</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', margin: '0 0 16px' }}>
          Shop All Essentials
        </h1>
        <p style={{ color: '#766b61', maxWidth: '500px', margin: '0 auto' }}>
          Thoughtfully made products for every curl type.
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products yet. Check back soon.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image_url || ''} alt={product.name_ar} />
                <button className="quick-add" aria-label={`View ${product.name_ar}`}>
                  <ArrowUpRight size={19} />
                </button>
              </div>
              <div className="product-meta">
                <div>
                  <h3>{product.name_ar}</h3>
                  <p>{product.description_ar?.slice(0, 50)}...</p>
                </div>
                <strong>{product.price} ج.م</strong>
              </div>
              <Link to={`/shop/${product.slug}`} className="product-discover">
                اكتشفي المنتج
                <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}