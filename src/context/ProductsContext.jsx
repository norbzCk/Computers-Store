import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as seedProducts } from '../data'
import { canonicalCategory } from '../utils'

const STORAGE_KEY = 'billionaires-products-v1'
const ProductsContext = createContext(null)

const emptySpecs = {
  cpu: '',
  ram: '',
  storage: '',
  screen: '',
  gpu: '',
  os: '',
  batteryHealth: '',
  yearReleased: '',
  notes: [],
}

const normalizeStock = (stock) => {
  if (['in-stock', 'low', 'sold'].includes(stock)) return stock
  if (stock === 0 || stock === '0') return 'sold'
  if (typeof stock === 'number') return stock <= 2 ? 'low' : 'in-stock'
  return ''
}

const normalizeProduct = (product, index) => {
  const oldSpecs = product.specs
  const specs = Array.isArray(oldSpecs)
    ? { ...emptySpecs, notes: oldSpecs.filter(Boolean) }
    : { ...emptySpecs, ...oldSpecs, notes: oldSpecs?.notes || [] }

  return {
    id: product.id || product.slug || `custom-${index}`,
    slug: product.slug,
    name: product.name || product.title || '',
    brand: product.brand || '',
    category: canonicalCategory(product.category || 'accessories'),
    price: Number(product.price) || 0,
    oldPrice: product.oldPrice ?? product.compare,
    condition: product.condition || '',
    specs,
    warranty: product.warranty || '',
    stock: normalizeStock(product.stock),
    stockQty: product.stockQty ?? (typeof product.stock === 'number' ? product.stock : null),
    images: Array.isArray(product.images) ? product.images : product.image ? [product.image] : [],
    videoUrl: product.videoUrl || '',
    description: product.description || '',
    featured: Boolean(product.featured),
    custom: product.custom ?? true,
    createdAt: product.createdAt,
  }
}

function readSavedProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : []
    return Array.isArray(saved) ? saved.map(normalizeProduct) : []
  } catch {
    return []
  }
}

export function ProductsProvider({ children }) {
  const [customProducts, setCustomProducts] = useState(readSavedProducts)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customProducts))
      setStorageError('')
    } catch {
      setStorageError('These products could not be saved in this browser. Try a smaller image or remove older uploads.')
    }
  }, [customProducts])

  const products = useMemo(() => {
    const customSlugs = new Set(customProducts.map((p) => p.slug))
    return [...customProducts, ...seedProducts.filter((p) => !customSlugs.has(p.slug))]
  }, [customProducts])

  const addProduct = (product) => {
    setCustomProducts((current) => [normalizeProduct(product, 0), ...current.filter((p) => p.slug !== product.slug)])
  }

  const removeProduct = (slug) => {
    setCustomProducts((current) => current.filter((p) => p.slug !== slug))
  }

  return (
    <ProductsContext.Provider value={{ products, customProducts, addProduct, removeProduct, storageError }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
