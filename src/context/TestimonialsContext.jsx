import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { store } from '../data'

const STORAGE_KEY = 'billionaires-testimonials-v1'
const TestimonialsContext = createContext(null)

const normalizeTestimonial = (testimonial, index, prefix = 'testimonial') => ({
  id: testimonial.id || `${prefix}-${index}`,
  name: (testimonial.name || '').trim(),
  location: (testimonial.location || '').trim(),
  quote: (testimonial.quote || '').trim(),
  createdAt: testimonial.createdAt,
})

function readSavedTestimonials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : []
    return Array.isArray(saved) ? saved.map((item, index) => normalizeTestimonial(item, index, 'saved-testimonial')) : []
  } catch {
    return []
  }
}

export function TestimonialsProvider({ children }) {
  const [customTestimonials, setCustomTestimonials] = useState(readSavedTestimonials)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTestimonials))
      setStorageError('')
    } catch {
      setStorageError('These testimonials could not be saved in this browser. Try removing older entries.')
    }
  }, [customTestimonials])

  const testimonials = useMemo(() => {
    const seeded = (store.testimonials || []).map((item, index) => normalizeTestimonial(item, index, 'seed-testimonial'))
    return [...customTestimonials, ...seeded]
  }, [customTestimonials])

  const addTestimonial = (testimonial) => {
    setCustomTestimonials((current) => [
      {
        ...normalizeTestimonial(testimonial, 0, 'custom-testimonial'),
        id: `custom-testimonial-${Date.now()}`,
        createdAt: Date.now(),
      },
      ...current,
    ])
  }

  const removeTestimonial = (id) => {
    setCustomTestimonials((current) => current.filter((item) => item.id !== id))
  }

  return (
    <TestimonialsContext.Provider value={{ testimonials, customTestimonials, addTestimonial, removeTestimonial, storageError }}>
      {children}
    </TestimonialsContext.Provider>
  )
}

export const useTestimonials = () => useContext(TestimonialsContext)
