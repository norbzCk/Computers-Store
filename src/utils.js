import { cats, store } from './data'

export const money = (n) => `Tsh ${Number(n || 0).toLocaleString('en-US')}`

const categoryAliases = { 'toners-cartridges': 'toners' }

export const canonicalCategory = (slug) => categoryAliases[slug] || slug

export const catName = (slug) => cats.find((c) => c.slug === canonicalCategory(slug))?.name || 'All products'

export const stockLabel = (stock) => ({ 'in-stock': 'In stock', low: 'Low stock', sold: 'Sold' }[stock] || '')

export const isSold = (p) => p.stock === 'sold'

export const isInStock = (p) => p.stock === 'in-stock' || p.stock === 'low'

export const specFields = [
  ['cpu', 'Processor'],
  ['ram', 'RAM'],
  ['storage', 'Storage'],
  ['screen', 'Display'],
  ['gpu', 'Graphics'],
  ['os', 'Operating system'],
  ['batteryHealth', 'Battery health'],
  ['yearReleased', 'Year released'],
]

export const specEntries = (p) => specFields
  .map(([key, label]) => [label, p.specs?.[key]])
  .filter(([, value]) => value)

export const specNotes = (p) => (p.specs?.notes || []).filter(Boolean)

export const productPath = (p) => `/products/${p.slug}`

export const productUrl = (p) => `${typeof window === 'undefined' ? store.url : window.location.origin}${productPath(p)}`

export const whatsappUrl = (message) => `https://wa.me/${String(store.whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

export const productWhatsAppMessage = (p) => {
  const intro = `Hello ${store.name}, I'm interested in ${p.name} (${money(p.price)}).`
  const tail = isSold(p) ? ' It shows as sold. Do you have a similar product available?' : ' Is it available?'
  return `${intro}${tail} ${productUrl(p)}`
}

export const productWhatsAppUrl = (p) => whatsappUrl(productWhatsAppMessage(p))

export const conditionLabel = (condition) => ({ new: 'New', used: 'Used', refurbished: 'Refurbished' }[condition] || '')
