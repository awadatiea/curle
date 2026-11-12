import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, FileText, Plus } from 'lucide-react'

export default function AdminPage() {
  const [stats, setStats] = useState({ products: 0, posts: 0 })
  const [showProductForm, setShowProductForm] = useState(false)
  const [showPostForm, setShowPostForm] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [newProduct, setNewProduct] = useState({ name_ar: '', name_en: '', price: '', description_ar: '', image_url: '', slug: '' })
  const [newPost, setNewPost] = useState({ title_ar: '', title_en: '', content_ar: '', content_en: '', cover_image_url: '', slug: '' })

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) return
      const [pRes, bRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true })
      ])
      setStats({ products: pRes.count || 0, posts: bRes.count || 0 })
    }
    fetchStats()
  }, [])

  // رفع الصورة
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'post') => {
    const file = e.target.files?.[0]
    if (!file || !supabase) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('curle-media')
      .upload(fileName, file)

    if (uploadError) {
      alert('خطأ في رفع الصورة: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('curle-media')
      .getPublicUrl(fileName)

    if (type === 'product') {
      setNewProduct({ ...newProduct, image_url: publicUrl })
    } else {
      setNewPost({ ...newPost, cover_image_url: publicUrl })
    }
    setUploading(false)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    const { error } = await supabase.from('products').insert({
      name_ar: newProduct.name_ar,
      name_en: newProduct.name_en,
      slug: newProduct.slug,
      price: parseFloat(newProduct.price),
      description_ar: newProduct.description_ar,
      image_url: newProduct.image_url,
      is_active: true
    })
    if (error) alert('خطأ: ' + error.message)
    else {
      alert('تم إضافة المنتج بنجاح!')
      setShowProductForm(false)
      setNewProduct({ name_ar: '', name_en: '', price: '', description_ar: '', image_url: '', slug: '' })
    }
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    const { error } = await supabase.from('blog_posts').insert({
      title_ar: newPost.title_ar,
      title_en: newPost.title_en,
      slug: newPost.slug,
      content_ar: newPost.content_ar,
      content_en: newPost.content_en,
      cover_image_url: newPost.cover_image_url,
      status: 'published',
      published_at: new Date().toISOString()
    })
    if (error) alert('خطأ: ' + error.message)
    else {
      alert('تم إضافة المقال بنجاح!')
      setShowPostForm(false)
      setNewPost({ title_ar: '', title_en: '', content_ar: '', content_en: '', cover_image_url: '', slug: '' })
    }
  }

  return (
    <div className="section-pad" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '12px', color: '#674a3a' }}>
        <ArrowLeft size={16} /> العودة للرئيسية
      </Link>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '40px' }}>لوحة التحكم</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        <div style={{ background: '#f8f4ee', padding: '30px', borderRadius: '12px' }}>
          <Package size={32} color="#674a3a" />
          <h2 style={{ fontSize: '36px', margin: '15px 0 5px' }}>{stats.products}</h2>
          <p style={{ color: '#766b61', margin: 0 }}>إجمالي المنتجات</p>
        </div>
        <div style={{ background: '#f8f4ee', padding: '30px', borderRadius: '12px' }}>
          <FileText size={32} color="#674a3a" />
          <h2 style={{ fontSize: '36px', margin: '15px 0 5px' }}>{stats.posts}</h2>
          <p style={{ color: '#766b61', margin: 0 }}>إجمالي المقالات</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <button onClick={() => { setShowProductForm(true); setShowPostForm(false); }} style={{ padding: '15px 30px', background: '#674a3a', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> إضافة منتج جديد
        </button>
        <button onClick={() => { setShowPostForm(true); setShowProductForm(false); }} style={{ padding: '15px 30px', background: '#b58d70', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> إضافة مقال جديد
        </button>
      </div>

      {showProductForm && (
        <form onSubmit={handleAddProduct} style={{ background: '#fff', padding: '30px', borderRadius: '12px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ margin: '0 0 10px' }}>إضافة منتج</h2>
          <input required placeholder="الاسم بالعربي" value={newProduct.name_ar} onChange={e => setNewProduct({...newProduct, name_ar: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          <input required placeholder="الاسم بالإنجليزي" value={newProduct.name_en} onChange={e => setNewProduct({...newProduct, name_en: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          <input required placeholder="الرابط (slug)" value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          <input required type="number" placeholder="السعر" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>صورة المنتج</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'product')} />
            {uploading && <span style={{ fontSize: '12px', color: 'blue' }}>جاري الرفع...</span>}
            {newProduct.image_url && <img src={newProduct.image_url} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
          </div>

          <textarea placeholder="الوصف" value={newProduct.description_ar} onChange={e => setNewProduct({...newProduct, description_ar: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', minHeight: '80px' }} />
          <button type="submit" disabled={uploading} style={{ padding: '12px', background: '#674a3a', color: 'white', border: 'none', cursor: 'pointer' }}>حفظ المنتج</button>
        </form>
      )}

      {showPostForm && (
        <form onSubmit={handleAddPost} style={{ background: '#fff', padding: '30px', borderRadius: '12px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ margin: '0 0 10px' }}>إضافة مقال</h2>
          <input required placeholder="العنوان بالعربي" value={newPost.title_ar} onChange={e => setNewPost({...newPost, title_ar: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          <input required placeholder="العنوان بالإنجليزي" value={newPost.title_en} onChange={e => setNewPost({...newPost, title_en: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          <input required placeholder="الرابط (slug)" value={newPost.slug} onChange={e => setNewPost({...newPost, slug: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>صورة الغلاف</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'post')} />
            {uploading && <span style={{ fontSize: '12px', color: 'blue' }}>جاري الرفع...</span>}
            {newPost.cover_image_url && <img src={newPost.cover_image_url} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
          </div>

          <textarea required placeholder="المحتوى بالعربي" value={newPost.content_ar} onChange={e => setNewPost({...newPost, content_ar: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', minHeight: '150px' }} />
          <textarea placeholder="المحتوى بالإنجليزي" value={newPost.content_en} onChange={e => setNewPost({...newPost, content_en: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', minHeight: '150px' }} />
          <button type="submit" disabled={uploading} style={{ padding: '12px', background: '#b58d70', color: 'white', border: 'none', cursor: 'pointer' }}>حفظ المقال</button>
        </form>
      )}
    </div>
  )
}