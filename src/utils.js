import { cats } from './data'

export const money = (n) => n.toLocaleString('en-US') + ' TZS'

export const catName = (slug) => cats.find((c) => c.slug === slug)?.name || 'All products'
