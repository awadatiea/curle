 import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw new Error(`فشل في جلب المقالات: ${error.message}`)
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }
  return data
}