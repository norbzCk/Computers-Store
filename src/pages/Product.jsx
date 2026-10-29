import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, site } from '../data'
import { useCart } from '../context/CartContext'
import Art from '../components/Art'
import Card from '../components/Card'
import { catName, money } from '../utils'

export default function Product() {
  const { slug } = useParams()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [tone, setTone] = useState(0)
  const p = products.find((x) => x.slug === slug)
  if (!p) return <div className="max-w-[1420px] mx-auto px-4 sm:px-5"><div className="bg-white border border-line p-6 sm:p-[30px] my-6 sm:my-[30px]">Product not found. <Link to="/collections/all" className="text-brand hover:underline">Browse all products</Link></div></div>
  const sold = p.stock === 0
  const rel = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4)
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <div className="text-xs sm:text-sm py-4 sm:py-[22px] sm:pb-[20px]"><Link to="/" className="hover:text-brand">Home</Link> › <Link to={`/collections/${p.category}`} className="hover:text-brand">{catName(p.category)}</Link> › {p.title.slice(0, 40)}…</div>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-[30px] items-start">
        <div className="bg-white border border-line p-5 sm:p-[30px]">
          <div className="aspect-[4/3] grid place-items-center"><Art kind={p.category} tone={tone} /></div>
          <div className="flex gap-2 sm:gap-2.5 mt-2.5 flex-wrap">
            {[0, 1, 2].map((t) => <button key={t} onClick={() => setTone(t)} aria-label={`Image ${t + 1}`} className="border border-line bg-white w-14 sm:w-16 h-10 sm:h-12 grid place-items-center"><Art kind={p.category} tone={t} /></button>)}
          </div>
        </div>
        <div className="bg-white border border-line p-5 sm:p-[30px]">
          <h1 className="text-xl sm:text-2xl md:text-[28px] text-brand mb-3 leading-tight">{p.title}</h1>
          {p.compare && <span className="inline-block bg-brand text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5 mb-2.5">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
          <div className="text-xs uppercase border-b border-line pb-4 mb-4">{site.name}</div>
          <div className={'text-2xl sm:text-[24px] font-medium ' + (p.compare ? 'text-brand' : 'text-ink')}>{money(p.price)}{p.compare && <s className="text-[#9aa5ab] text-lg ml-2.5">{money(p.compare)}</s>}</div>
          <div className="flex gap-4 items-center my-5"><b>Quantity:</b><select value={qty} onChange={(e) => setQty(+e.target.value)} className="px-3 sm:px-4 py-2.5 sm:py-3 border border-line">{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select></div>
          <button className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark disabled:bg-[#8a959b] disabled:cursor-not-allowed" disabled={sold} onClick={() => add(p, qty)}>{sold ? 'Sold out' : 'Add to cart'}</button>
        </div>
      </div>
      <div className="bg-white border border-line p-5 sm:p-[30px] my-6 sm:my-[30px]">
        <h2 className="text-xl sm:text-2xl text-brand mb-3">Description</h2>
        <ul className="list-disc pl-5 space-y-1">{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      {rel.length > 0 && <>
        <h2 className="text-xl sm:text-2xl text-brand mb-3">You may also like</h2>
        <div className="bg-white border border-line overflow-hidden mb-10 sm:mb-[50px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {rel.map((x) => <Card key={x.slug} p={x} />)}
          </div>
        </div>
      </>}
    </div>
  )
}
