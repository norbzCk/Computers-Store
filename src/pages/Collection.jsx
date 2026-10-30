import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { cats } from '../data'
import Card from '../components/Card'
import { canonicalCategory, catName } from '../utils'
import { useProducts } from '../context/ProductsContext'

export default function Collection() {
  const { products } = useProducts()
  const { slug = 'all' } = useParams()
  const category = canonicalCategory(slug)
  const [sp] = useSearchParams()
  const q = (sp.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('featured')
  const [list, setList] = useState(false)
  const [brands, setBrands] = useState([])
  let items = products.filter((p) => (category === 'all' || p.category === category) && p.name.toLowerCase().includes(q))
  const allBrands = [...new Set(items.map((p) => p.brand))]
  if (brands.length) items = items.filter((p) => brands.includes(p.brand))
  items = [...items].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0)
  const toggle = (b) => setBrands((x) => (x.includes(b) ? x.filter((y) => y !== b) : [...x, b]))
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <div className="py-4 sm:py-[22px] sm:pb-[20px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:text-sm">
          <Link to="/" className="font-medium text-primary transition hover:text-violet">Home</Link>
          <span className="text-text/50">›</span>
          <span className="font-semibold text-ink">{catName(category)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-6 lg:gap-[30px] items-start pb-10 sm:pb-[50px]">
        <aside className="space-y-6 sm:space-y-[30px]">
          <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-sm sm:p-[30px]">
            <h3 className="text-gradient mb-3">Main menu</h3>
            <div className="flex flex-col gap-1">
              <Link to="/" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">Home</Link>
              <Link to="/about" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">About</Link>
              {cats.slice(0, 6).map((c) => {
                const active = category === c.slug
                return (
                  <Link key={c.slug} to={`/collections/${c.slug}`} className={active ? '-mx-2 rounded-lg bg-primary-soft px-2 py-1 font-semibold text-primary' : '-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary'}>{c.name} ({products.filter((p) => p.category === c.slug).length})</Link>
                )
              })}
              <Link to="/contact" className="-mx-2 rounded-lg px-2 py-1 transition hover:bg-primary-soft/70 hover:text-primary">Contact Us</Link>
            </div>
          </div>
          <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-sm sm:p-[30px]">
            <h3 className="text-gradient mb-3">Filters</h3>
            <div className="flex flex-col gap-1">
              {allBrands.map((b) => <label key={b} className="-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition hover:bg-primary-soft/60"><input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(b)} />{b}</label>)}
            </div>
          </div>
        </aside>
        <main className="panel-gradient relative overflow-hidden rounded-2xl border border-line shadow-sm">
          <div className="p-5 sm:p-[30px]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl text-gradient">{catName(category)}</h1>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{items.length} products</span>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-6 items-center text-sm mb-2">
              <span>Showing {items.length} of {items.length} products</span>
              <span className="flex-1 hidden sm:block" />
              <label className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-sm">Sort by: <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 bg-transparent text-ink font-medium outline-0"><option value="featured">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label>
              <span className="flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm">View <button onClick={() => setList(false)} aria-label="Grid view" className={list ? 'grid h-7 w-7 place-items-center rounded-full text-text transition hover:bg-primary-soft hover:text-primary' : 'grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-white shadow-sm'}>▦</button> <button onClick={() => setList(true)} aria-label="List view" className={list ? 'grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-white shadow-sm' : 'grid h-7 w-7 place-items-center rounded-full text-text transition hover:bg-primary-soft hover:text-primary'}>☰</button></span>
            </div>
            {items.length ? <div className={'grid mt-4 sm:mt-5 -mx-5 -mb-5 border-t border-line ' + (list ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>{items.map((p) => <Card key={p.slug} p={p} list={list} />)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 p-8 text-center">No products match. Try another search or category.</div>}
          </div>
        </main>
      </div>
    </div>
  )
}
