import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as seedProducts } from '../data'

const STORAGE_KEY = 'billionaires-products-v1'
const ProductsContext = createContext(null)

function readSavedProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : []
    return Array.isArray(saved) ? saved : []
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
    setCustomProducts((current) => [product, ...current.filter((p) => p.slug !== product.slug)])
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
