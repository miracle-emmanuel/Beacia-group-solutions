import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultProducts } from '../data/products'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const STORAGE_KEY = 'beacia-products'
const ProductsContext = createContext(null)

function makeId(name) {
  const slug = (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug || 'product'}-${Date.now().toString(36)}`
}

function normalizeProduct(product) {
  return {
    id: product.id || makeId(product.name),
    name: product.name?.trim() || 'Untitled product',
    category: product.category || 'hair',
    price: Number(product.price) || 0,
    image:
      product.image?.trim() ||
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    description: product.description?.trim() || '',
    isNew: Boolean(product.isNew ?? product.is_new),
  }
}

// Convert between the camelCase shape used in the UI and the snake_case
// column names in the Supabase `products` table (see supabase/schema.sql).
function toRow(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    description: product.description,
    is_new: Boolean(product.isNew),
  }
}

function fromRow(row) {
  return normalizeProduct({ ...row, isNew: row.is_new })
}

function loadLocalProducts() {
  if (typeof window === 'undefined') return defaultProducts
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // fall through to defaults
  }
  return defaultProducts
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() =>
    isSupabaseConfigured ? [] : loadLocalProducts()
  )
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  // ---- Supabase-backed mode ----
  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    async function load() {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (cancelled) return
      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }
      setProducts((data || []).map(fromRow))
      setLoading(false)
    }

    load()

    // Keep every open tab/browser in sync in real time when the admin
    // adds, edits or removes a product.
    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, load)
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  // ---- localStorage fallback mode ----
  useEffect(() => {
    if (isSupabaseConfigured) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      if (error === 'QUOTA') setError(null)
    } catch (err) {
      // Local storage is full — almost always caused by uploaded photos
      // (stored as base64 text) piling up. Don't let this crash the app:
      // surface it so the admin panel can explain what to do instead.
      console.error('Could not save products to localStorage:', err)
      setError('QUOTA')
    }
  }, [products])

  const addProduct = async (input) => {
    const newProduct = normalizeProduct(input)
    if (isSupabaseConfigured) {
      const { error: insertError } = await supabase.from('products').insert(toRow(newProduct))
      if (insertError) throw new Error(insertError.message)
    } else {
      setProducts((prev) => [newProduct, ...prev])
    }
    return newProduct
  }

  const updateProduct = async (id, updates) => {
    if (isSupabaseConfigured) {
      const current = products.find((p) => p.id === id)
      const merged = normalizeProduct({ ...current, ...updates, id })
      const { error: updateError } = await supabase
        .from('products')
        .update(toRow(merged))
        .eq('id', id)
      if (updateError) throw new Error(updateError.message)
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? normalizeProduct({ ...p, ...updates }) : p))
      )
    }
  }

  const removeProduct = async (id) => {
    if (isSupabaseConfigured) {
      const { error: deleteError } = await supabase.from('products').delete().eq('id', id)
      if (deleteError) throw new Error(deleteError.message)
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const resetToDefaults = async () => {
    if (isSupabaseConfigured) {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '__none__')
      if (deleteError) throw new Error(deleteError.message)
      const { error: insertError } = await supabase
        .from('products')
        .insert(defaultProducts.map(toRow))
      if (insertError) throw new Error(insertError.message)
    } else {
      setProducts(defaultProducts)
    }
  }

  const importProducts = async (list) => {
    if (!Array.isArray(list)) throw new Error('Import file must contain an array of products')
    const normalized = list.map(normalizeProduct)
    if (isSupabaseConfigured) {
      const { error: upsertError } = await supabase
        .from('products')
        .upsert(normalized.map(toRow), { onConflict: 'id' })
      if (upsertError) throw new Error(upsertError.message)
    } else {
      setProducts(normalized)
    }
  }

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      removeProduct,
      resetToDefaults,
      importProducts,
    }),
    [products, loading, error]
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider')
  return ctx
}
