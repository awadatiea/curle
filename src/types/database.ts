// Minimal typed schema for the tables used by the frontend.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: { id: string; name_en: string; name_ar: string; slug: string; description_en: string | null; description_ar: string | null; image_url: string | null; sort_order: number; is_active: boolean; created_at: string }
        Insert: { id?: string; name_en: string; name_ar: string; slug: string; description_en?: string | null; description_ar?: string | null; image_url?: string | null; sort_order?: number; is_active?: boolean; created_at?: string }
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
        Relationships: []
      }
      products: {
        Row: { id: string; category_id: string | null; name_en: string; name_ar: string; slug: string; description_en: string | null; description_ar: string | null; price: number; compare_at_price: number | null; sku: string | null; stock_quantity: number; image_url: string | null; is_featured: boolean; is_active: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; category_id?: string | null; name_en: string; name_ar: string; slug: string; description_en?: string | null; description_ar?: string | null; price: number; compare_at_price?: number | null; sku?: string | null; stock_quantity?: number; image_url?: string | null; is_featured?: boolean; is_active?: boolean; created_at?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
        Relationships: []
      }
      profiles: {
        Row: { id: string; full_name: string | null; phone: string | null; preferred_language: string; created_at: string; updated_at: string }
        Insert: { id: string; full_name?: string | null; phone?: string | null; preferred_language?: string; created_at?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
        Relationships: []
      }
      blog_posts: {
        Row: { id: string; author_id: string | null; title_en: string; title_ar: string; slug: string; excerpt_en: string | null; excerpt_ar: string | null; content_en: string | null; content_ar: string | null; cover_image_url: string | null; status: string; published_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; author_id?: string | null; title_en: string; title_ar: string; slug: string; excerpt_en?: string | null; excerpt_ar?: string | null; content_en?: string | null; content_ar?: string | null; cover_image_url?: string | null; status?: string; published_at?: string | null; created_at?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
        Relationships: []
      }
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          shipping_address: Json;
          status: string;
          payment_method: string;
          payment_status: string;
          subtotal: number;
          shipping_fee: number;
          total: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          user_id?: string | null;
          order_number?: number;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          shipping_address: Json;
          status?: string;
          payment_method?: string;
          payment_status?: string;
          subtotal: number;
          shipping_fee?: number;
          total: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}