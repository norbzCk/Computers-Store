import { Link } from 'react-router-dom'
import { money } from '../utils'
import Art from './Art'

export default function Card({ p, list }) {
  const sold = p.stock === 0
  if (list) {
    return (
      <Link to={`/products/${p.slug}`} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 border-b border-line hover:bg-gray-50/50">
        {p.compare && <span className="absolute top-3 left-0 bg-brand text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
        {sold && <span className="absolute top-3 sm:top-4 left-4 bg-[#8a959b] text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5">Sold out</span>}
        <div className="w-full sm:w-[200px] flex-none aspect-[4/3] grid place-items-center"><Art kind={p.category} /></div>
        <div className="flex-1">
          <h3 className="text-sm uppercase font-medium text-ink mb-2 sm:mb-1">{p.title}</h3>
          <div className={'text-lg sm:text-xl font-medium ' + (p.compare ? 'text-brand' : 'text-ink')}>{money(p.price)}{p.compare && <s className="text-[#9aa5ab] text-base ml-2.5">{money(p.compare)}</s>}</div>
          {p.stock > 0 && <div className="text-green text-xs sm:text-sm font-semibold mt-1">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/products/${p.slug}`} className="relative flex flex-col gap-1.5 p-4 sm:p-5 border-r border-b border-line">
      {p.compare && <span className="absolute top-3 left-0 bg-brand text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5">Save {(p.compare - p.price).toLocaleString('en-US')} TZS</span>}
      {sold && <span className="absolute top-4 left-4 bg-[#8a959b] text-white text-xs sm:text-sm font-semibold px-2.5 py-0.5">Sold out</span>}
      <div className="aspect-[4/3] grid place-items-center"><Art kind={p.category} /></div>
      <div>
        <h3 className="text-xs sm:text-sm uppercase font-medium text-ink mt-2 mb-1">{p.title}</h3>
        <div className={'text-lg sm:text-xl font-medium ' + (p.compare ? 'text-brand' : 'text-ink')}>{money(p.price)}{p.compare && <s className="text-[#9aa5ab] text-base ml-2.5">{money(p.compare)}</s>}</div>
        {p.stock > 0 && <div className="text-green text-xs sm:text-sm font-semibold mt-1">● In stock, {p.stock} unit{p.stock > 1 ? 's' : ''}</div>}
      </div>
    </Link>
  )
}
