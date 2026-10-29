import { Link } from 'react-router-dom'
import { money } from '../utils'
import Art from './Art'

export default function Card({ p, list }) {
  const sold = p.stock === 0
  if (list) {
    return (
      <Link to={`/products/${p.slug}`} className="group relative flex flex-col gap-4 overflow-hidden border-b border-line p-4 transition-colors duration-300 hover:bg-gradient-to-br hover:from-white hover:to-primary-soft/60 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-violet to-sun transition-transform duration-300 group-hover:scale-x-100" />
        {p.compare && <span className="badge-sale absolute top-3 left-0 rounded-r-full px-3 py-0.5 text-xs font-bold sm:text-sm">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
        {sold && <span className="absolute top-3 right-4 rounded-full bg-[#8a959b] px-3 py-0.5 text-xs font-semibold text-white sm:text-sm">Sold out</span>}
        <div className="art-stage aspect-[4/3] grid w-full flex-none place-items-center rounded-xl p-3 sm:w-[200px]"><Art kind={p.category} /></div>
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-medium uppercase text-ink transition-colors group-hover:text-primary sm:mb-1">{p.title}</h3>
          <div className="text-lg font-bold text-primary sm:text-xl"><span className="price-gradient">{money(p.price)}</span>{p.compare && <s className="ml-2.5 text-base text-[#9aa5ab]">{money(p.compare)}</s>}</div>
          {p.stock > 0 && <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 sm:text-sm">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/products/${p.slug}`} className="group relative flex flex-col gap-1.5 overflow-hidden border-r border-b border-line p-4 transition-colors duration-300 hover:bg-gradient-to-br hover:from-white hover:to-primary-soft/60 sm:p-5">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-violet to-sun transition-transform duration-300 group-hover:scale-x-100" />
      {p.compare && <span className="badge-sale absolute top-3 left-0 rounded-r-full px-3 py-0.5 text-xs font-bold sm:text-sm">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
      {sold && <span className="absolute top-3 right-4 rounded-full bg-[#8a959b] px-3 py-0.5 text-xs font-semibold text-white sm:text-sm">Sold out</span>}
      <div className="art-stage aspect-[4/3] grid place-items-center rounded-xl p-3"><Art kind={p.category} /></div>
      <div>
        <h3 className="mb-1 mt-2 text-xs font-medium uppercase text-ink transition-colors group-hover:text-primary sm:text-sm">{p.title}</h3>
        <div className="text-lg font-bold text-primary sm:text-xl"><span className="price-gradient">{money(p.price)}</span>{p.compare && <s className="ml-2.5 text-base text-[#9aa5ab]">{money(p.compare)}</s>}</div>
        {p.stock > 0 && <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 sm:text-sm">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
      </div>
    </Link>
  )
}
