import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      await signIn(email, password)
      navigate('/') // لو نجح، نروح للصفحة الرئيسية
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
          <ArrowLeft size={16} /> العودة للرئيسية
        </Link>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '30px' }}>
          تسجيل الدخول
        </h1>

        {error && <div style={{ background: '#fee', color: '#c00', padding: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#674a3a' }}>البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #e8d9c8', outline: 'none' }}
            />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#674a3a' }}>كلمة المرور</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #e8d9c8', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: '#674a3a', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center', color: '#766b61' }}>
          ليس لديك حساب؟ <Link to="/signup" style={{ color: '#674a3a', textDecoration: 'underline' }}>أنشئ حسابًا جديدًا</Link>
        </p>
      </div>
    </div>
  )
}