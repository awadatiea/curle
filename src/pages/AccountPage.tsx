import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'

export default function AccountPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    async function fetchOrders() {
      if (!supabase) return
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [user, navigate])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={20} color="#f59e0b" />
      case 'processing': return <Package size={20} color="#3b82f6" />
      case 'shipped': return <Truck size={20} color="#8b5cf6" />
      case 'delivered': return <CheckCircle size={20} color="#10b981" />
      case 'cancelled': return <XCircle size={20} color="#ef4444" />
      default: return <Clock size={20} color="#666" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة'
      case 'processing': return 'قيد التجهيز'
      case 'shipped': return 'تم الشحن'
      case 'delivered': return 'تم التسليم'
      case 'cancelled': return 'ملغي'
      default: return 'غير معروف'
    }
  }

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>جاري التحميل...</div>

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للرئيسية
      </Link>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '10px' }}>طلباتي</h1>
      <p style={{ color: '#766b61', marginBottom: '40px' }}>أهلاً {user?.user_metadata?.full_name || 'بك'}، هنا تقدر تتابع كل طلباتك.</p>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f4ee', borderRadius: '12px' }}>
          <Package size={48} color="#b58d70" style={{ margin: '0 auto 20px' }} />
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>مفيش طلبات لحد دلوقتي.</p>
          <Link to="/shop" style={{ padding: '12px 30px', background: '#674a3a', color: 'white', textDecoration: 'none' }}>ابدأ التسوق</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ background: '#fff', border: '1px solid #e8d9c8', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0e6db' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#766b61' }}>رقم الطلب</p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600 }}>#{order.order_number}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getStatusIcon(order.status)}
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{getStatusText(order.status)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#766b61' }}>
                <span>التاريخ: {new Date(order.created_at).toLocaleDateString('ar-EG')}</span>
                <span style={{ fontWeight: 600, color: '#27231f' }}>الإجمالي: {order.total} ج.م</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}