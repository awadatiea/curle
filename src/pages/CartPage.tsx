import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) }
      }
      return item
    })
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للمتجر
      </Link>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '30px' }}>سلة المشتريات</h1>

      {cart.length === 0 ? (
        <p>السلة فاضية. <Link to="/shop" style={{ color: '#674a3a', textDecoration: 'underline' }}>تسوقي الآن</Link></p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
              <img src={item.image_url} alt={item.name_ar} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px' }}>{item.name_ar}</h3>
                <p style={{ margin: 0, color: '#674a3a' }}>{item.price} ج.م</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '5px', background: '#eee', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '5px', background: '#eee', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
              </div>
              <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={18} /></button>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #674a3a' }}>
            <h2 style={{ fontSize: '24px', margin: 0 }}>الإجمالي: {total} ج.م</h2>
            <Link to="/checkout" style={{ padding: '15px 30px', background: '#674a3a', color: 'white', textDecoration: 'none' }}>إتمام الطلب</Link>
          </div>
        </div>
      )}
    </div>
  )
}