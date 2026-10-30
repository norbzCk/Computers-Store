import { cats } from './data'

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
