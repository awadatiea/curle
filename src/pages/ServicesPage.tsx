import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Zap, Shield, Star } from 'lucide-react'

const packages = [
  {
    name: 'باقة البداية',
    price: '7,000 - 15,000',
    description: 'مثالية لأصحاب الأنشطة اللي عايزين صفحة تعريفية سريعة.',
    features: ['موقع من 3-5 صفحات', 'تصميم متجاوب', 'نموذج تواصل', 'ربط واتساب'],
    icon: <Zap size={24} color="#674a3a" />,
    popular: false,
  },
  {
    name: 'باقة الأعمال',
    price: '20,000 - 35,000',
    description: 'موقع احترافي بهوية بصرية خاصة لشركتك.',
    features: ['تصميم مخصص بالكامل', 'لوحة تحكم بسيطة', 'دعم لغتين (عربي/إنجليزي)', 'تحسين محركات البحث (SEO)'],
    icon: <Shield size={24} color="#674a3a" />,
    popular: true,
  },
  {
    name: 'باقة المتجر الإلكتروني',
    price: '35,000 - 70,000',
    description: 'الحل الأمثل للبيع أونلاين وإدارة الطلبات.',
    features: ['سلة مشتريات', 'دفع عند الاستلام', 'شحن لكل المحافظات', 'لوحة تحكم للمنتجات', 'ربط الطلبات بالواتساب'],
    icon: <Star size={24} color="#674a3a" />,
    popular: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للرئيسية
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p className="eyebrow">OUR SERVICES</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', margin: '0 0 16px' }}>
          باقات تصميم المواقع
        </h1>
        <p style={{ color: '#766b61', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
          نقدم حلولاً رقمية متكاملة تناسب كل الاحتياجات والميزانيات. اختر الباقة التي تناسبك وابدأ رحلتك الرقمية اليوم.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {packages.map((pkg, index) => (
          <div key={index} style={{ 
            background: pkg.popular ? '#674a3a' : '#fff', 
            color: pkg.popular ? '#fff' : '#27231f',
            padding: '40px 30px', 
            borderRadius: '16px', 
            border: pkg.popular ? 'none' : '1px solid #e8d9c8',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            {pkg.popular && (
              <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#b58d70', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                الأكثر طلبًا
              </span>
            )}
            
            <div style={{ marginBottom: '20px' }}>{pkg.icon}</div>
            
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', margin: '0 0 10px' }}>{pkg.name}</h2>
            <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px', lineHeight: 1.6 }}>{pkg.description}</p>
            
            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '14px', opacity: 0.7 }}>يبدأ من</span>
              <br />
              <span style={{ fontSize: '32px', fontWeight: 700 }}>{pkg.price}</span>
              <span style={{ fontSize: '14px', opacity: 0.7 }}> ج.م</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              {pkg.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <Check size={16} color={pkg.popular ? '#b58d70' : '#674a3a'} />
                  {feature}
                </div>
              ))}
            </div>

            <Link to="https://wa.me/201277773155" target="_blank" style={{ 
              display: 'block', 
              textAlign: 'center', 
              padding: '14px', 
              background: pkg.popular ? '#fff' : '#674a3a', 
              color: pkg.popular ? '#674a3a' : '#fff', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontWeight: 600
            }}>
              اطلب الباقة
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8f4ee', padding: '40px', borderRadius: '16px' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>محتاج حاجة مخصصة؟</h3>
        <p style={{ color: '#766b61', marginBottom: '20px' }}>بنعمل حلول مخصصة للشركات الكبيرة والمشاريع المعقدة. كلمنا وهنعمل لك عرض سعر خاص.</p>
        <Link to="https://wa.me/201277773155" target="_blank" style={{ padding: '14px 40px', background: '#674a3a', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block' }}>
          تواصل معنا
        </Link>
      </div>
    </div>
  )
}