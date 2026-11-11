import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

export type Product = Database['public']['Tables']['products']['Row']

export async function getActiveProducts(): Promise<Product[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Could not load products: ${error.message}`)
  return data ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  return data
}