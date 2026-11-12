import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Droplets, Leaf, Wind } from 'lucide-react'

const routines = {
  wavy: {
    title: 'روتين الشعر الويفي (Wavy)',
    steps: [
      { title: 'الغسيل', detail: 'اغسلي مرتين في الأسبوع بشامبو خالي من السلفات.', icon: <Droplets /> },
      { title: 'الترطيب', detail: 'استخدمي بلسم خفيف وفكي التشابك بأصابعك.', icon: <Leaf /> },
      { title: 'التصفيف', detail: 'حطي كريم تحديد خفيف واعصري الشعر بتشيرت قطني.', icon: <Wind /> },
      { title: 'التجفيف', detail: 'سيبيه ينشف في الهوا أو استخدمي ديفيوزر على حرارة منخفضة.', icon: <Wind /> },
    ]
  },
  curly: {
    title: 'روتين الشعر الكيرلي (Curly)',
    steps: [
      { title: 'الغسيل', detail: 'اغسلي مرة في الأسبوع بشامبو لطيف، وركزي على الفروة.', icon: <Droplets /> },
      { title: 'الترطيب', detail: 'استخدمي حمام كريم أسبوعيًا، وبلسم غني بعد كل غسلة.', icon: <Leaf /> },
      { title: 'التصفيف', detail: 'وزعي كريم التحديد وجل على شعر مبلول، واعصري الخصل.', icon: <Wind /> },
      { title: 'التجفيف', detail: 'استخدمي ديفيوزر على حرارة منخفضة، ومتلمسيش الشعر وهو بينشف.', icon: <Wind /> },
    ]
  },
  coily: {
    title: 'روتين الشعر الكويلي (Coily)',
    steps: [
      { title: 'الغسيل', detail: 'اغسلي كل 10 أيام بشامبو مرطب، واستخدمي بلسم غني.', icon: <Droplets /> },
      { title: 'الترطيب', detail: 'استخدمي ماسك زبدة الشيا مرتين أسبوعيًا لترطيب عميق.', icon: <Leaf /> },
      { title: 'التصفيف', detail: 'استخدمي كريم كثيف وزيت قافل (Seal) للحفاظ على الرطوبة.', icon: <Wind /> },
      { title: 'التجفيف', detail: 'جففي بالديفيوزر أو سيبيه ينشف في الهوا، ولفيه بستان وقت النوم.', icon: <Wind /> },
    ]
  }
}

export default function RoutinePage() {
  const [selectedType, setSelectedType] = useState<'wavy' | 'curly' | 'coily' | null>(null)

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للرئيسية
      </Link>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', marginBottom: '10px' }}>اكتشفي روتينك</h1>
      <p style={{ color: '#766b61', marginBottom: '40px' }}>اختاري نوع شعرك عشان نعرضلك روتين العناية المناسب ليكي.</p>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {(['wavy', 'curly', 'coily'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              padding: '15px 30px',
              background: selectedType === type ? '#674a3a' : '#f8f4ee',
              color: selectedType === type ? 'white' : '#674a3a',
              border: '1px solid #674a3a',
              cursor: 'pointer',
              fontSize: '14px',
              textTransform: 'capitalize'
            }}
          >
            {type === 'wavy' ? 'ويفي (Wavy)' : type === 'curly' ? 'كيرلي (Curly)' : 'كويلي (Coily)'}
          </button>
        ))}
      </div>

      {selectedType && (
        <div style={{ background: '#fff', border: '1px solid #e8d9c8', borderRadius: '12px', padding: '30px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '24px' }}>{routines[selectedType].title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {routines[selectedType].steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f8f4ee', padding: '12px', borderRadius: '50%', color: '#674a3a' }}>
                  {step.icon}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px' }}>{step.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#766b61', lineHeight: 1.6 }}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}