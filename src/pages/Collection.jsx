import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { cats, products } from '../data'
import Card from '../components/Card'
import { catName } from '../utils'

export default function Collection() {
  const { slug = 'all' } = useParams()
  const [sp] = useSearchParams()
  const q = (sp.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('featured')
  const [list, setList] = useState(false)
  const [brands, setBrands] = useState([])
  let items = products.filter((p) => (slug === 'all' || p.category === slug) && p.title.toLowerCase().includes(q))
  const allBrands = [...new Set(items.map((p) => p.brand))]
  if (brands.length) items = items.filter((p) => brands.includes(p.brand))
  items = [...items].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0)
  const toggle = (b) => setBrands((x) => (x.includes(b) ? x.filter((y) => y !== b) : [...x, b]))
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <div className="text-xs sm:text-sm py-4 sm:py-[22px] sm:pb-[20px]"><Link to="/" className="hover:text-primary">Home</Link> › {catName(slug)}</div>
      <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-6 lg:gap-[30px] items-start pb-10 sm:pb-[50px]">
        <aside className="space-y-6 sm:space-y-[30px]">
          <div className="bg-white border border-line p-5 sm:p-[30px]">
            <h3 className="text-primary mb-3">Main menu</h3>
            <div className="flex flex-col gap-1">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              {cats.slice(0, 6).map((c) => <Link key={c.slug} to={`/collections/${c.slug}`} className={slug === c.slug ? 'text-ink font-semibold' : 'hover:text-primary'}>{c.name} ({products.filter((p) => p.category === c.slug).length})</Link>)}
              <Link to="/contact" className="hover:text-primary">Contact Us</Link>
            </div>
          </div>
          <div className="bg-white border border-line p-5 sm:p-[30px]">
            <h3 className="text-primary mb-3">Filters</h3>
            <div className="flex flex-col gap-1">
              {allBrands.map((b) => <label key={b} className="flex gap-2.5 items-center cursor-pointer"><input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(b)} />{b}</label>)}
            </div>
          </div>
        </aside>
        <main className="bg-white border border-line p-5 sm:p-[30px]">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary mb-3">{catName(slug)}</h1>
          <div className="flex flex-wrap gap-3 sm:gap-6 items-center text-sm mb-2">
            <span>Showing {items.length} of {items.length} products</span>
            <span className="flex-1 hidden sm:block" />
            <label className="flex items-center gap-2">Sort by: <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 bg-none text-ink font-medium"><option value="featured">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label>
            <span className="flex items-center gap-2">View <button onClick={() => setList(false)} className={list ? '' : 'text-primary'}>▦</button> <button onClick={() => setList(true)} className={list ? 'text-primary' : ''}>☰</button></span>
          </div>
          {items.length ? <div className={'grid mt-4 sm:mt-5 -mx-5 -mb-5 border-t border-line ' + (list ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>{items.map((p) => <Card key={p.slug} p={p} list={list} />)}</div> : <p className="py-4">No products match. Try another search or category.</p>}
        </main>
      </div>
    </div>
  )
}
