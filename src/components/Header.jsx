import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cats, moreCats, site } from '../data'
import { useCart } from '../context/CartContext'
import { catName } from '../utils'
import Logo from './Logo'

export default function Header() {
  const { items, setOpen } = useCart()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const showDelivery = pathname === '/' || pathname.replace(/\/+$/, '') === '/collections/laptops'
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const go = (e) => { e.preventDefault(); nav(`/collections/${cat}?q=${encodeURIComponent(q)}`) }
  const count = items.reduce((s, i) => s + i.qty, 0)
  const main = ['laptops', 'desktops', 'macbooks', 'printers', 'external-hard-disks', 'toners-cartridges']
  return (
    <>
      <div className="sticky top-0 z-20">
        <div className="border-b border-line bg-gradient-to-r from-white via-primary-soft/30 to-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-7 xl:gap-9 py-3 sm:py-[14px]">
            <Link to="/" aria-label="Billionaire's Computers home">
              <Logo />
            </Link>
            <form className="order-3 flex w-full flex-1 overflow-hidden rounded-full border border-line bg-white shadow-sm transition focus-within:ring-2 focus-within:ring-primary/20 lg:order-none lg:w-auto" onSubmit={go}>
              <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border-0 px-3 sm:px-[14px] py-2.5 sm:py-3 outline-0 min-w-0" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="border-0 border-l border-line px-2 sm:px-[10px] bg-white text-text"><option value="all">All categories</option>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
              <button aria-label="Search" className="bg-primary text-white border-0 w-[50px] cursor-pointer text-lg hover:bg-primary-hover">⌕</button>
            </form>
            <div className="hidden sm:block text-sm leading-[1.3]"><small className="block text-[#7c8cf0]">Language</small><span className="font-medium text-base">English</span></div>
            <Link to="/login" className="hidden sm:block text-sm leading-[1.3] hover:opacity-80"><small className="block text-[#7c8cf0]">Login / Signup</small><span className="font-medium text-base">My account</span></Link>
            <button className="bg-none border-0 flex gap-2 items-center text-[17px] cursor-pointer relative text-ink ml-auto" onClick={() => setOpen(true)}>🛒 {count > 0 && <i className="absolute -top-2 left-3.5 bg-primary text-white rounded-full w-5 h-5 text-xs grid place-items-center not-italic">{count}</i>} Cart</button>
          </div>
        </div>
        <nav className="relative hidden border-b border-line bg-white/95 backdrop-blur lg:block">
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-violet to-sun" />
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 xl:gap-8 items-center min-h-[64px] overflow-x-auto">
            <NavLink to="/" end className={({isActive}) => isActive ? 'text-primary font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-primary whitespace-nowrap'}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-primary whitespace-nowrap'}>About</NavLink>
            {main.map((s) => <NavLink key={s} to={`/collections/${s}`} className={({isActive}) => isActive ? 'text-primary font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-primary whitespace-nowrap'}>{catName(s)}</NavLink>)}
            <div className="relative group">
              <span className="text-ink font-medium cursor-pointer hover:text-primary whitespace-nowrap">More Categories ▾</span>
              <div className="hidden group-hover:block absolute top-full left-[-10px] bg-white border border-line py-3 px-5 min-w-[190px] shadow-[0_8px_20px_#0001]">
                {moreCats.map((s) => <Link key={s} to={`/collections/${s}`} className="block py-1.5 text-ink hover:text-primary">{catName(s)}</Link>)}
              </div>
            </div>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-primary whitespace-nowrap'}>Contact Us</NavLink>
          </div>
        </nav>
      </div>
      {showDelivery && (
        <div aria-label="Free delivery announcement" className="delivery-bar relative overflow-hidden border-y border-white/15 text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
          <span aria-hidden="true" className="delivery-shine pointer-events-none absolute inset-y-0 w-[35%]" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-semibold sm:flex-row sm:justify-between sm:gap-4 sm:px-6 sm:py-3 sm:text-[15px] lg:px-8">
            <span className="flex items-center gap-2.5">
              <span className="delivery-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                  <path d="M3 6h11v10H3z" />
                  <path d="M14 9h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
              </span>
              <span><strong className="font-extrabold tracking-wide">FREE Delivery</strong> to Selected Locations in Dar Es Salaam.</span>
            </span>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-primary-soft hover:shadow-md sm:text-sm">
              Call now on {site.phone}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
