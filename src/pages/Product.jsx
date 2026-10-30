import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { site } from '../data'
import { useCart } from '../context/CartContext'
import Art from '../components/Art'
import Card from '../components/Card'
import { catName, money } from '../utils'
import { useProducts } from '../context/ProductsContext'

export default function Product() {
  const { products } = useProducts()
  const { slug } = useParams()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [tone, setTone] = useState(0)
  const p = products.find((x) => x.slug === slug)
  if (!p) return <div className="max-w-[1420px] mx-auto px-4 sm:px-5"><div className="panel-gradient my-6 rounded-2xl border border-line p-6 shadow-sm sm:my-[30px] sm:p-[30px]">Product not found. <Link to="/collections/all" className="font-semibold text-primary hover:text-violet hover:underline">Browse all products</Link></div></div>
  const sold = p.stock === 0
  const rel = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4)
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <div className="py-4 sm:py-[22px] sm:pb-[20px]">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:text-sm">
          <Link to="/" className="font-medium text-primary transition hover:text-violet">Home</Link>
          <span className="text-text/50">›</span>
          <Link to={`/collections/${p.category}`} className="font-medium text-primary transition hover:text-violet">{catName(p.category)}</Link>
          <span className="text-text/50">›</span>
          <span className="font-semibold text-ink">{p.title.slice(0, 40)}…</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-[30px] items-start">
        <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line shadow-sm">
          <div className="p-5 sm:p-[30px]">
            <div className="art-stage aspect-[4/3] grid place-items-center rounded-2xl p-4 sm:p-8">{p.image ? <img src={p.image} alt={p.title} className="h-full w-full rounded-xl object-contain" /> : <Art kind={p.category} tone={tone} />}</div>
            {!p.image && (
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                {[0, 1, 2].map((t) => <button key={t} onClick={() => setTone(t)} aria-label={`Image ${t + 1}`} className={`grid h-10 w-14 place-items-center overflow-hidden rounded-lg border bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow sm:h-12 sm:w-16 ${tone === t ? 'border-primary ring-2 ring-primary/20' : 'border-line'}`}><Art kind={p.category} tone={t} /></button>)}
              </div>
            )}
          </div>
        </div>
        <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-lg sm:p-[30px]">
          <h1 className="text-xl sm:text-2xl md:text-[28px] text-gradient mb-3 leading-tight">{p.title}</h1>
          {p.compare && <span className="badge-sale mb-2.5 inline-block rounded-full px-3 py-1 text-xs font-bold sm:text-sm">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
          <div className="text-xs uppercase border-b border-line pb-4 mb-4">{site.name}</div>
          <div className="text-2xl font-bold sm:text-[28px]"><span className="price-gradient">{money(p.price)}</span>{p.compare && <s className="ml-2.5 text-lg text-[#9aa5ab] dark:text-white/45">{money(p.compare)}</s>}</div>
          <div className="flex gap-4 items-center my-5"><b>Quantity:</b><select value={qty} onChange={(e) => setQty(+e.target.value)} className="rounded-xl border border-line bg-surface px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select></div>
          <button className="btn-gradient inline-block rounded-full px-8 py-3.5 font-bold" disabled={sold} onClick={() => add(p, qty)}>{sold ? 'Sold out' : 'Add to cart'}</button>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-wide sm:text-[11px]">
            <div className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-primary">Warranty</div>
            <div className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-violet">Free delivery</div>
            <div className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-sky">Secure payment</div>
          </div>
        </div>
      </div>
      <div className="panel-gradient relative my-6 overflow-hidden rounded-2xl border border-line shadow-sm sm:my-[30px]">
        <div className="p-5 sm:p-[30px]">
          <h2 className="text-xl sm:text-2xl text-gradient mb-3">Description</h2>
          <ul className="list-disc space-y-1 pl-5 marker:text-primary dark:marker:text-sky-300">{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
      {rel.length > 0 && <>
        <div className="mb-3 flex items-end gap-4">
          <h2 className="text-xl sm:text-2xl text-gradient">You may also like</h2>
        </div>
        <div className="panel-gradient mb-10 overflow-hidden rounded-2xl border border-line p-2 shadow-lg sm:mb-[50px] sm:p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {rel.map((x) => <Card key={x.slug} p={x} />)}
          </div>
        </div>
      </>}
    </div>
  )
}
