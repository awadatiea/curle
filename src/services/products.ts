import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

export type Product = Database['public']['Tables']['products']['Row']

/** Returns active products. When Supabase is not configured, returns an empty list. */
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
