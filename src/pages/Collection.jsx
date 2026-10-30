import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { cats, store } from '../data'
import Card from '../components/Card'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Seo from '../components/Seo'
import { canonicalCategory, catName, conditionLabel, isInStock, isSold, whatsappUrl } from '../utils'
import { useProducts } from '../context/ProductsContext'

const conditions = ['new', 'used', 'refurbished']

export default function Collection() {
  const { products } = useProducts()
  const { slug = 'all' } = useParams()
  const category = canonicalCategory(slug)
  const [sp] = useSearchParams()
  const query = (sp.get('q') || '').trim()
  const q = query.toLowerCase()
  const [sort, setSort] = useState('featured')
  const [list, setList] = useState(false)
  const [brands, setBrands] = useState([])
  const [selectedConditions, setSelectedConditions] = useState([])
  const [availability, setAvailability] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setBrands([])
    setSelectedConditions([])
    setAvailability('all')
    setMinPrice('')
    setMaxPrice('')
  }, [category, q])

  useEffect(() => {
    if (!filtersOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setFiltersOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [filtersOpen])

  const matchesQuery = (p) => !q || `${p.name} ${p.brand} ${p.slug} ${p.description || ''} ${JSON.stringify(p.specs || {})}`.toLowerCase().includes(q)
  const base = products.filter((p) => (category === 'all' || p.category === category) && matchesQuery(p))
  const brandOptions = [...new Set(base.map((p) => p.brand).filter(Boolean))].sort()
  const min = minPrice === '' ? null : Number(minPrice)
  const max = maxPrice === '' ? null : Number(maxPrice)
  let items = base.filter((p) => {
    if (brands.length && !brands.includes(p.brand)) return false
    if (selectedConditions.length && !selectedConditions.includes(p.condition)) return false
    if (availability === 'in-stock' && !isInStock(p)) return false
    if (availability === 'sold' && !isSold(p)) return false
    if (min !== null && Number.isFinite(min) && p.price < min) return false
    if (max !== null && Number.isFinite(max) && p.price > max) return false
    return true
  })
  items = [...items].sort((a, b) => {
    if (sort === 'low') return a.price - b.price
    if (sort === 'high') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  })

  const activeFilterCount = brands.length + selectedConditions.length + (availability !== 'all' ? 1 : 0) + (minPrice !== '' ? 1 : 0) + (maxPrice !== '' ? 1 : 0)
  const clearFilters = () => {
    setBrands([])
    setSelectedConditions([])
    setAvailability('all')
    setMinPrice('')
    setMaxPrice('')
  }
  const toggleBrand = (brand) => setBrands((current) => current.includes(brand) ? current.filter((value) => value !== brand) : [...current, brand])
  const toggleCondition = (condition) => setSelectedConditions((current) => current.includes(condition) ? current.filter((value) => value !== condition) : [...current, condition])
  const categoryLink = (target) => {
    const params = new URLSearchParams(sp)
    return `/collections/${target}${params.toString() ? `?${params.toString()}` : ''}`
  }
  const enquiry = q
    ? `Hello ${store.name}, I'm looking for "${query}". Is it available?`
    : `Hello ${store.name}, I'm looking for a product in ${catName(category)}. Is it available?`
  const seoTitle = q ? `Search results for ${query}` : `${catName(category)} in Dar es Salaam`
  const seoDescription = q
    ? `Search results for "${query}" in ${catName(category)} at ${store.name} in ${store.address}.`
    : `Browse ${catName(category).toLowerCase()} at ${store.name} in ${store.address}.`
  const seoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seoTitle,
    description: seoDescription,
    url: `${store.url}/collections/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.slice(0, 20).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${store.url}/products/${product.slug}`,
        name: product.name,
      })),
    },
  }
  const categoryMenu = (
    <div className="flex flex-col gap-1">
      <Link to="/" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">Home</Link>
      <Link to="/about" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">About</Link>
      <Link to={categoryLink('all')} className={category === 'all' ? '-mx-2 rounded-lg bg-primary-soft px-2 py-1 font-semibold text-primary' : '-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary'}>All products ({products.length})</Link>
      {cats.map((c) => {
        const active = category === c.slug
        return (
          <Link key={c.slug} to={categoryLink(c.slug)} className={active ? '-mx-2 rounded-lg bg-primary-soft px-2 py-1 font-semibold text-primary' : '-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary'}>{c.name} ({products.filter((p) => p.category === c.slug).length})</Link>
        )
      })}
      <Link to="/contact" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">Contact Us</Link>
    </div>
  )
  const filterControls = (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-bold text-ink">Brand</p>
        <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
          {brandOptions.length ? brandOptions.map((brand) => (
            <label key={brand} className="-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition hover:bg-primary-soft/60">
              <input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} />
              <span>{brand}</span>
              <span className="ml-auto text-xs text-text">{base.filter((p) => p.brand === brand).length}</span>
            </label>
          )) : <p className="text-sm text-text">No brands available.</p>}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-ink">Condition</p>
        <div className="space-y-1">
          {conditions.map((condition) => (
            <label key={condition} className="-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition hover:bg-primary-soft/60">
              <input type="checkbox" checked={selectedConditions.includes(condition)} onChange={() => toggleCondition(condition)} />
              <span>{conditionLabel(condition)}</span>
              <span className="ml-auto text-xs text-text">{base.filter((p) => p.condition === condition).length}</span>
            </label>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-ink">Availability</span>
        <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm">
          <option value="all">All products</option>
          <option value="in-stock">In stock</option>
          <option value="sold">Sold</option>
        </select>
      </label>
      <div>
        <p className="mb-2 text-sm font-bold text-ink">Price range (Tsh)</p>
        <div className="flex items-center gap-2">
          <input type="number" inputMode="numeric" min="0" step="1000" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min" className="w-full min-w-0 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm" />
          <span className="text-text">to</span>
          <input type="number" inputMode="numeric" min="0" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max" className="w-full min-w-0 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm" />
        </div>
      </div>
      {activeFilterCount > 0 && <button type="button" onClick={clearFilters} className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-primary transition hover:border-primary/30 hover:bg-primary-soft">Clear all filters ({activeFilterCount})</button>}
    </div>
  )

  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <Seo title={seoTitle} description={seoDescription} path={`/collections/${category}`} robots={q ? 'noindex,follow' : 'index,follow'} jsonLd={seoJsonLd} />
      <div className="py-4 sm:py-[22px] sm:pb-[20px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:text-sm">
          <Link to="/" className="font-medium text-primary transition hover:text-violet">Home</Link>
          <span className="text-text/50">›</span>
          <span className="font-semibold text-ink">{catName(category)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-6 lg:gap-[30px] items-start pb-10 sm:pb-[50px]">
        <aside className="hidden space-y-6 lg:block sm:space-y-[30px]">
          <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-sm sm:p-[30px]">
            <h3 className="text-gradient mb-3">Main menu</h3>
            {categoryMenu}
          </div>
          <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-sm sm:p-[30px]">
            <h3 className="text-gradient mb-3">Filters</h3>
            {filterControls}
          </div>
        </aside>
        <main className="panel-gradient relative overflow-hidden rounded-2xl border border-line shadow-sm">
          <div className="p-5 sm:p-[30px]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl text-gradient">{catName(category)}</h1>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{items.length} products</span>
            </div>
            {q && <p className="mb-3 text-sm text-text">Search results for <strong className="text-ink">“{query}”</strong></p>}
            <div className="flex flex-wrap gap-3 sm:gap-6 items-center text-sm mb-2">
              <button type="button" onClick={() => setFiltersOpen(true)} aria-expanded={filtersOpen} aria-controls="mobile-filters" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-semibold text-ink shadow-sm lg:hidden">Filters {activeFilterCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-white">{activeFilterCount}</span>}</button>
              <span>Showing {items.length} of {base.length} products</span>
              <span className="flex-1 hidden sm:block" />
              <label className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-sm">Sort by: <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 bg-transparent text-ink font-medium outline-0"><option value="featured">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option><option value="name">Name, A–Z</option></select></label>
              <span className="flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm">View <button onClick={() => setList(false)} aria-label="Grid view" className={list ? 'grid h-7 w-7 place-items-center rounded-full text-text transition hover:bg-primary-soft hover:text-primary' : 'grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-white shadow-sm'}>▦</button> <button onClick={() => setList(true)} aria-label="List view" className={list ? 'grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-white shadow-sm' : 'grid h-7 w-7 place-items-center rounded-full text-text transition hover:bg-primary-soft hover:text-primary'}>☰</button></span>
            </div>
            {items.length ? <div className={'grid mt-4 sm:mt-5 -mx-5 -mb-5 border-t border-line ' + (list ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>{items.map((p) => <Card key={p.slug} p={p} list={list} />)}</div> : (
              <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 p-8 text-center">
                <p className="text-lg font-bold text-ink">No products match.</p>
                <p className="mt-1 text-sm text-text">Try clearing filters, another search, or ask us on WhatsApp.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button type="button" onClick={clearFilters} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary-soft">Clear filters</button>
                  <a href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"><WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {filtersOpen && (
        <div id="mobile-filters" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Product filters">
          <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
          <div className="absolute inset-y-0 left-0 w-[min(88vw,360px)] overflow-y-auto border-r border-line bg-surface p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl text-gradient">Categories and filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-lg font-bold text-ink shadow-sm">×</button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-gradient mb-3">Main menu</h3>
                {categoryMenu}
              </div>
              <div>
                <h3 className="text-gradient mb-3">Filters</h3>
                {filterControls}
              </div>
            </div>
            <button type="button" onClick={() => setFiltersOpen(false)} className="btn-gradient mt-6 w-full rounded-full px-5 py-3 font-bold">Show {items.length} products</button>
          </div>
        </div>
      )}
    </div>
  )
}
