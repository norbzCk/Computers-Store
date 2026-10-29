import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { cats, moreCats, site } from '../data'
import { useCart } from '../context/CartContext'
import { catName } from '../utils'
import Logo from './Logo'

export default function Header() {
  const { items, setOpen } = useCart()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const go = (e) => { e.preventDefault(); nav(`/collections/${cat}?q=${encodeURIComponent(q)}`) }
  const count = items.reduce((s, i) => s + i.qty, 0)
  const main = ['laptops', 'desktops', 'macbooks', 'printers', 'external-hard-disks', 'toners-cartridges']
  return (
    <>
      <div className="bg-top text-white text-sm sm:text-[15px] font-semibold">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 min-h-[42px] py-2 sm:py-0">
          <span className="text-center sm:text-left">FREE Delivery to Selected Locations in Dar Es Salaam. Call now on {site.phone}</span>
          <button className="bg-brand text-white px-4 sm:px-[18px] py-2 sm:py-[10px] font-semibold">Sign up for Monthly Deals</button>
        </div>
      </div>
      <div className="sticky top-0 z-20">
        <div className="bg-white border-b border-line">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-8 xl:gap-10 py-3 sm:py-[14px]">
            <Link to="/" aria-label="Billionaire's Computers home">
              <Logo />
            </Link>
            <form className="flex-1 w-full lg:w-auto order-3 lg:order-none flex bg-white border border-line" onSubmit={go}>
              <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border-0 px-3 sm:px-[14px] py-2.5 sm:py-3 outline-0 min-w-0" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="border-0 border-l border-line px-2 sm:px-[10px] bg-white text-text"><option value="all">All categories</option>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
              <button aria-label="Search" className="bg-brand text-white border-0 w-[50px] cursor-pointer text-lg">⌕</button>
            </form>
            <div className="hidden sm:block text-sm leading-[1.3]"><small className="block text-[#7c8cf0]">Language</small><span className="font-medium text-base">English</span></div>
            <Link to="/login" className="hidden sm:block text-sm leading-[1.3] hover:opacity-80"><small className="block text-[#7c8cf0]">Login / Signup</small><span className="font-medium text-base">My account</span></Link>
            <button className="bg-none border-0 flex gap-2 items-center text-[17px] cursor-pointer relative text-ink ml-auto lg:ml-0" onClick={() => setOpen(true)}>🛒 {count > 0 && <i className="absolute -top-2 left-3.5 bg-brand text-white rounded-full w-5 h-5 text-xs grid place-items-center not-italic">{count}</i>} Cart</button>
          </div>
        </div>
        <nav className="bg-white border-b border-line hidden lg:block">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 xl:gap-8 items-center min-h-[64px] overflow-x-auto">
            <NavLink to="/" end className={({isActive}) => isActive ? 'text-brand font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-brand whitespace-nowrap'}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-brand font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-brand whitespace-nowrap'}>About</NavLink>
            {main.map((s) => <NavLink key={s} to={`/collections/${s}`} className={({isActive}) => isActive ? 'text-brand font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-brand whitespace-nowrap'}>{catName(s)}</NavLink>)}
            <div className="relative group">
              <span className="text-ink font-medium cursor-pointer hover:text-brand whitespace-nowrap">More Categories ▾</span>
              <div className="hidden group-hover:block absolute top-full left-[-10px] bg-white border border-line py-3 px-5 min-w-[190px] shadow-[0_8px_20px_#0001]">
                {moreCats.map((s) => <Link key={s} to={`/collections/${s}`} className="block py-1.5 text-ink hover:text-brand">{catName(s)}</Link>)}
              </div>
            </div>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-brand font-medium whitespace-nowrap' : 'text-ink font-medium hover:text-brand whitespace-nowrap'}>Contact Us</NavLink>
          </div>
        </nav>
      </div>
    </>
  )
}
