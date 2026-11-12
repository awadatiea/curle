import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const egyptGovernorates = [
  { name: 'القاهرة', shipping: 50 }, { name: 'الجيزة', shipping: 50 }, { name: 'الإسكندرية', shipping: 60 },
  { name: 'القليوبية', shipping: 55 }, { name: 'الشرقية', shipping: 65 }, { name: 'الدقهلية', shipping: 65 },
  { name: 'الغربية', shipping: 65 }, { name: 'المنوفية', shipping: 65 }, { name: 'البحيرة', shipping: 70 },
  { name: 'كفر الشيخ', shipping: 70 }, { name: 'دمياط', shipping: 70 }, { name: 'بورسعيد', shipping: 75 },
  { name: 'الإسماعيلية', shipping: 75 }, { name: 'السويس', shipping: 75 }, { name: 'شمال سيناء', shipping: 90 },
  { name: 'جنوب سيناء', shipping: 90 }, { name: 'الفيوم', shipping: 70 }, { name: 'بني سويف', shipping: 70 },
  { name: 'المنيا', shipping: 75 }, { name: 'أسيوط', shipping: 80 }, { name: 'سوهاج', shipping: 85 },
  { name: 'قنا', shipping: 90 }, { name: 'الأقصر', shipping: 90 }, { name: 'أسوان', shipping: 100 },
  { name: 'البحر الأحمر', shipping: 100 }, { name: 'الوادي الجديد', shipping: 110 }, { name: 'مطروح', shipping: 100 },
]

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([])
  const [selectedGov, setSelectedGov] = useState('')
  const [loading, setLoading] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const MY_WHATSAPP = '201277773155'

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = egyptGovernorates.find(g => g.name === selectedGov)?.shipping || 0
  const total = subtotal + shippingCost

  const handleConfirmOrder = async () => {
    if (!supabase || cart.length === 0 || !selectedGov) return
    setLoading(true)

    const { error } = await supabase.from('orders').insert({
      user_id: user ? user.id : null, // تصحيح مشكلة TypeScript
      customer_name: customerName || 'عميل كيرلي',
      customer_email: user?.email || 'guest@curle.com',
      customer_phone: customerPhone || '01000000000',
      shipping_address: { governorate: selectedGov, address: customerAddress },
      status: 'pending',
      payment_method: 'cash_on_delivery',
      payment_status: 'unpaid',
      subtotal: subtotal,
      shipping_fee: shippingCost,
      total: total
    })

    if (error) {
      alert('خطأ في الطلب: ' + error.message)
      setLoading(false)
      return
    }

    let message = `*طلب جديد من CURLÉ*%0A%0A`
    message += `*الاسم:* ${customerName}%0A`
    message += `*رقم الهاتف:* ${customerPhone}%0A`
    message += `*المحافظة:* ${selectedGov}%0A`
    message += `*العنوان:* ${customerAddress}%0A%0A`
    message += `*المنتجات:*%0A`
    cart.forEach(item => {
      message += `- ${item.name_ar} (عدد ${item.quantity}) = ${item.price * item.quantity} ج.م%0A`
    })
    message += `%0A*المنتجات:* ${subtotal} ج.م%0A`
    message += `*الشحن:* ${shippingCost} ج.م%0A`
    message += `*الإجمالي:* ${total} ج.م`

    const whatsappUrl = `https://wa.me/${MY_WHATSAPP}?text=${message}`
    window.open(whatsappUrl, '_blank')

    localStorage.removeItem('cart')
    alert('تم تأكيد طلبك! جاري تحويلك للواتساب لتأكيد الطلب معنا.')
    navigate(user ? '/account' : '/')
    setLoading(false)
  }

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للسلة
      </Link>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '30px' }}>إتمام الطلب</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input required placeholder="الاسم بالكامل" value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ padding: '12px', border: '1px solid #ccc' }} />
        <input required placeholder="رقم الهاتف" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ padding: '12px', border: '1px solid #ccc' }} />
        <input required placeholder="العنوان بالتفصيل" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} style={{ padding: '12px', border: '1px solid #ccc' }} />
        
        <select value={selectedGov} onChange={(e) => setSelectedGov(e.target.value)} style={{ padding: '12px', border: '1px solid #ccc' }}>
          <option value="">اختر المحافظة</option>
          {egyptGovernorates.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
        </select>

        {selectedGov && (
          <div style={{ background: '#f8f4ee', padding: '20px', marginTop: '10px' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>المنتجات:</span> <strong>{subtotal} ج.م</strong></p>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>الشحن:</span> <strong>{shippingCost} ج.م</strong></p>
            <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}><span>الإجمالي:</span> <strong>{total} ج.م</strong></p>
          </div>
        )}

        <button onClick={handleConfirmOrder} disabled={loading || !selectedGov} style={{ padding: '15px', background: '#674a3a', color: 'white', border: 'none', cursor: 'pointer', opacity: (!selectedGov || loading) ? 0.5 : 1 }}>
          {loading ? 'جاري التأكيد...' : 'تأكيد الطلب (الدفع عند الاستلام)'}
        </button>
      </div>
    </div>
  )
}