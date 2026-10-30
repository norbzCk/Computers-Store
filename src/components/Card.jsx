import { Link } from 'react-router-dom'
import { money } from '../utils'
import Art from './Art'

export default function Card({ p, list }) {
  const sold = p.stock === 0
  if (list) {
    return (
      <Link to={`/products/${p.slug}`} className="card-gradient group relative flex flex-col gap-4 overflow-hidden border-b border-line p-4 transition duration-300 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        {p.compare && <span className="badge-sale absolute top-3 left-0 rounded-r-full px-3 py-0.5 text-xs font-bold sm:text-sm">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
        {sold && <span className="absolute top-3 right-4 rounded-full bg-[#8a959b] dark:bg-slate-600 px-3 py-0.5 text-xs font-semibold text-white sm:text-sm">Sold out</span>}
        <div className="art-stage aspect-[4/3] grid w-full flex-none place-items-center rounded-xl p-3 sm:w-[200px]">{p.image ? <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full rounded-lg object-contain" /> : <Art kind={p.category} />}</div>
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-medium uppercase text-ink transition-colors group-hover:text-primary sm:mb-1">{p.title}</h3>
          <div className="text-lg font-bold text-primary sm:text-xl"><span className="price-gradient">{money(p.price)}</span>{p.compare && <s className="ml-2.5 text-base text-[#9aa5ab] dark:text-white/45">{money(p.compare)}</s>}</div>
          {p.stock > 0 && <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-1 dark:ring-emerald-800/60 sm:text-sm">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/products/${p.slug}`} className="card-gradient group relative flex flex-col gap-1.5 overflow-hidden border-r border-b border-line p-4 transition duration-300 sm:p-5">
      {p.compare && <span className="badge-sale absolute top-3 left-0 rounded-r-full px-3 py-0.5 text-xs font-bold sm:text-sm">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
      {sold && <span className="absolute top-3 right-4 rounded-full bg-[#8a959b] dark:bg-slate-600 px-3 py-0.5 text-xs font-semibold text-white sm:text-sm">Sold out</span>}
      <div className="art-stage aspect-[4/3] grid place-items-center rounded-xl p-3">{p.image ? <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full rounded-lg object-contain" /> : <Art kind={p.category} />}</div>
      <div>
        <h3 className="mb-1 mt-2 text-xs font-medium uppercase text-ink transition-colors group-hover:text-primary sm:text-sm">{p.title}</h3>
        <div className="text-lg font-bold text-primary sm:text-xl"><span className="price-gradient">{money(p.price)}</span>{p.compare && <s className="ml-2.5 text-base text-[#9aa5ab] dark:text-white/45">{money(p.compare)}</s>}</div>
        {p.stock > 0 && <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-1 dark:ring-emerald-800/60 sm:text-sm">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
      </div>
    </Link>
  )
}
