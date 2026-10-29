import { createContext, useContext, useState } from 'react'
import { Routes, Route, Link, NavLink, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { site, cats, moreCats, products } from './data'

const Cart = createContext()
const useCart = () => useContext(Cart)
const money = (n) => n.toLocaleString('en-US') + ' TZS'
const catName = (slug) => cats.find((c) => c.slug === slug)?.name || 'All products'

function Art({ kind, tone = 0 }) {
  const c = ['#2f3a40', '#46535b', '#7a868c'][tone % 3]
  const shapes = {
    laptops: <><rect x="40" y="20" width="120" height="80" rx="5" fill={c} /><rect x="48" y="28" width="104" height="64" fill="#7da7e8" /><path d="M20 108h160l-10 12H30z" fill="#9aa5ab" /></>,
    macbooks: <><rect x="40" y="20" width="120" height="80" rx="5" fill="#cfd6da" /><rect x="48" y="28" width="104" height="64" fill="#1c2a4a" /><path d="M20 108h160l-10 12H30z" fill="#b6bfc4" /></>,
    desktops: <><rect x="60" y="10" width="50" height="105" rx="4" fill={c} /><rect x="120" y="30" width="60" height="45" fill="#333" /><rect x="124" y="34" width="52" height="37" fill="#7da7e8" /></>,
    printers: <><rect x="40" y="40" width="120" height="55" rx="6" fill={c} /><rect x="62" y="18" width="76" height="26" fill="#e8ecee" stroke="#aab3b8" /><rect x="62" y="85" width="76" height="26" fill="#fff" stroke="#aab3b8" /></>,
  }
  return <svg viewBox="0 0 200 130" role="img" aria-label={kind} className="w-[78%] h-auto max-h-full">{shapes[kind] || <><rect x="55" y="25" width="90" height="80" rx="8" fill={c} /><circle cx="100" cy="65" r="14" fill="#d6185b" /></>}</svg>
}

function Card({ p, list }) {
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

function Header() {
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
        <div className="max-w-[1420px] mx-auto px-4 sm:px-5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 min-h-[42px] py-2 sm:py-0">
          <span className="text-center sm:text-left">FREE Delivery to Selected Locations in Dar Es Salaam. Call now on {site.phone}</span>
          <button className="bg-brand text-white px-4 sm:px-[18px] py-2 sm:py-[10px] font-semibold">Sign up for Monthly Deals</button>
        </div>
      </div>
      <div className="sticky top-0 z-20">
        <div className="bg-white border-b border-line">
          <div className="max-w-[1420px] mx-auto px-4 sm:px-5 flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-9 py-3 sm:py-[14px]">
            <Link to="/" className="font-bold leading-none text-[22px] sm:text-[26px] text-ink">Billionaires<b className="block text-brand text-[26px] sm:text-[30px]">Computers</b></Link>
            <form className="flex-1 w-full lg:w-auto order-3 lg:order-none flex bg-white border border-line" onSubmit={go}>
              <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border-0 px-3 sm:px-[14px] py-2.5 sm:py-3 outline-0 min-w-0" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="border-0 border-l border-line px-2 sm:px-[10px] bg-white text-text"><option value="all">All categories</option>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
              <button aria-label="Search" className="bg-brand text-white border-0 w-[50px] cursor-pointer text-lg">⌕</button>
            </form>
            <div className="hidden sm:block text-sm leading-[1.3]"><small className="block text-[#7c8cf0]">Language</small><span className="font-medium text-base">English</span></div>
            <div className="hidden sm:block text-sm leading-[1.3]"><small className="block text-[#7c8cf0]">Login / Signup</small><span className="font-medium text-base">My account</span></div>
            <button className="bg-none border-0 flex gap-2 items-center text-[17px] cursor-pointer relative text-ink ml-auto lg:ml-0" onClick={() => setOpen(true)}>🛒 {count > 0 && <i className="absolute -top-2 left-3.5 bg-brand text-white rounded-full w-5 h-5 text-xs grid place-items-center not-italic">{count}</i>} Cart</button>
          </div>
        </div>
        <nav className="bg-white border-b border-line hidden lg:block">
          <div className="max-w-[1420px] mx-auto px-5 flex gap-8 xl:gap-[34px] min-h-[64px] items-center flex-wrap">
            <NavLink to="/" end className={({isActive}) => isActive ? 'text-brand font-medium' : 'text-ink font-medium hover:text-brand'}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-brand font-medium' : 'text-ink font-medium hover:text-brand'}>About</NavLink>
            {main.map((s) => <NavLink key={s} to={`/collections/${s}`} className={({isActive}) => isActive ? 'text-brand font-medium' : 'text-ink font-medium hover:text-brand'}>{catName(s)}</NavLink>)}
            <div className="relative group">
              <span className="text-ink font-medium cursor-pointer hover:text-brand">More Categories ▾</span>
              <div className="hidden group-hover:block absolute top-full left-[-10px] bg-white border border-line py-3 px-5 min-w-[170px] shadow-[0_8px_20px_#0001]">
                {moreCats.map((s) => <Link key={s} to={`/collections/${s}`} className="block py-1.5 text-ink hover:text-brand">{catName(s)}</Link>)}
              </div>
            </div>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-brand font-medium' : 'text-ink font-medium hover:text-brand'}>Contact Us</NavLink>
          </div>
        </nav>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-[#f7f8f9] pb-8">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 py-8 sm:py-10 border-b border-[#dde2e5]">
          {[['Free delivery in Dar es Salaam', 'Available to selected areas'], ['Hassle free shopping', 'Get the best deals guaranteed'], ['Top-notch support', 'Get in touch to discuss your requirements'], ['Secure payments', 'Mobile money or cash on delivery']].map(([a, b]) => <div key={a}><b className="text-brand block">{a}</b><span className="text-sm">{b}</span></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-[60px] py-8 sm:py-10">
          <div><h4 className="text-brand uppercase text-sm mb-2.5">About {site.name}</h4><p className="text-sm">{site.name} sells computers and accessories in {site.address}. Call us on {site.phone} for more info.</p></div>
          <div><h4 className="text-brand uppercase text-sm mb-2.5">Quick links</h4><div className="flex flex-col gap-1"><Link to="/collections/all" className="hover:text-brand">Search</Link><Link to="/contact" className="hover:text-brand">Contact Us</Link><Link to="/about" className="hover:text-brand">About</Link></div></div>
          <div><h4 className="text-brand uppercase text-sm mb-2.5">Get deals and discounts</h4><p className="text-sm mb-3">Sign up with your email address to get monthly deals</p><input placeholder="Your email" className="p-3 w-full border border-line mb-2.5" /><button className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark">Subscribe</button></div>
        </div>
        <div className="text-sm">© {site.name}</div>
      </div>
    </footer>
  )
}

function Home() {
  const fresh = products.filter((p) => p.stock !== 0).slice(0, 8)
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5 pt-6 sm:pt-[30px]">
      <section className="bg-gradient-to-r from-white to-[#fbe3ec] border border-line grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-0 p-6 sm:p-10 md:p-[50px] lg:p-[56px] mb-6 sm:mb-[30px]">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-ink mb-3 leading-tight">Computers and accessories, delivered in Dar es Salaam</h1>
          <p className="max-w-[460px] text-base sm:text-lg mb-5">Laptops, desktops, Macbooks, printers and more, with warranty on every item.</p>
          <Link className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark" to="/collections/laptops">Shop laptops</Link>
        </div>
        <div className="max-w-[380px] mx-auto w-full"><Art kind="laptops" /></div>
      </section>
      <h2 className="text-xl sm:text-2xl text-brand mb-4">Shop by category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
        {cats.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`} className="bg-white border border-line p-4 sm:p-6 text-center text-ink font-semibold hover:border-brand hover:text-brand">
          <div className="h-[90px] sm:h-[110px] grid place-items-center mb-2"><Art kind={c.slug} /></div>
          {c.name}
        </Link>)}
      </div>repo
      <h2 className="text-xl sm:text-2xl text-brand mb-4">New arrivals</h2>
      <div className="bg-white border border-line overflow-hidden mb-10 sm:mb-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  )
}

function Collection() {
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
      <div className="text-xs sm:text-sm py-4 sm:py-[22px] sm:pb-[20px]"><Link to="/" className="hover:text-brand">Home</Link> › {catName(slug)}</div>
      <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-6 lg:gap-[30px] items-start pb-10 sm:pb-[50px]">
        <aside className="space-y-6 sm:space-y-[30px]">
          <div className="bg-white border border-line p-5 sm:p-[30px]">
            <h3 className="text-brand mb-3">Main menu</h3>
            <div className="flex flex-col gap-1">
              <Link to="/" className="hover:text-brand">Home</Link>
              <Link to="/about" className="hover:text-brand">About</Link>
              {cats.slice(0, 6).map((c) => <Link key={c.slug} to={`/collections/${c.slug}`} className={slug === c.slug ? 'text-ink font-semibold' : 'hover:text-brand'}>{c.name} ({products.filter((p) => p.category === c.slug).length})</Link>)}
              <Link to="/contact" className="hover:text-brand">Contact Us</Link>
            </div>
          </div>
          <div className="bg-white border border-line p-5 sm:p-[30px]">
            <h3 className="text-brand mb-3">Filters</h3>
            <div className="flex flex-col gap-1">
              {allBrands.map((b) => <label key={b} className="flex gap-2.5 items-center cursor-pointer"><input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(b)} />{b}</label>)}
            </div>
          </div>
        </aside>
        <main className="bg-white border border-line p-5 sm:p-[30px]">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-brand mb-3">{catName(slug)}</h1>
          <div className="flex flex-wrap gap-3 sm:gap-6 items-center text-sm mb-2">
            <span>Showing {items.length} of {items.length} products</span>
            <span className="flex-1 hidden sm:block" />
            <label className="flex items-center gap-2">Sort by: <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 bg-none text-ink font-medium"><option value="featured">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label>
            <span className="flex items-center gap-2">View <button onClick={() => setList(false)} className={list ? '' : 'text-brand'}>▦</button> <button onClick={() => setList(true)} className={list ? 'text-brand' : ''}>☰</button></span>
          </div>
          {items.length ? <div className={'grid mt-4 sm:mt-5 -mx-5 -mb-5 border-t border-line ' + (list ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>{items.map((p) => <Card key={p.slug} p={p} list={list} />)}</div> : <p className="py-4">No products match. Try another search or category.</p>}
        </main>
      </div>
    </div>
  )
}

function Product() {
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

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5 text-center py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-brand mb-2">Contact Us</h1>
      <p className="mb-1"><b>{site.address}</b></p>
      <p className="mb-1">{site.phone}</p>
      <p className="mb-1">{site.email}</p>
      <p className="mt-4 mb-1"><b>Store Timings</b></p>
      {site.hours.map((h) => <p key={h} className="mb-1">{h}</p>)}
      <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="max-w-[680px] mx-auto mt-6 sm:mt-[30px] grid gap-3">
        <input required placeholder="Your name" className="p-3 sm:p-3.5 border border-line" />
        <input required type="email" placeholder="Your email" className="p-3 sm:p-3.5 border border-line" />
        <textarea required placeholder="Your message" rows="5" className="p-3 sm:p-3.5 border border-line font-inherit" />
        <button className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark justify-self-center">Send message</button>
        {sent && <p className="text-green">Message sent. We will reply soon.</p>}
      </form>
    </div>
  )
}

const About = () => <div className="max-w-[1420px] mx-auto px-4 sm:px-5 py-10 sm:py-[40px] pb-12 sm:pb-[60px]"><div className="bg-white border border-line p-5 sm:p-[30px]"><h1 className="text-2xl sm:text-3xl md:text-4xl text-brand mb-3">About {site.name}</h1><p>{site.name} is a computer and accessories retailer in {site.address}. Edit this text in src/App.jsx.</p></div></div>

function Drawer() {
  const { items, open, setOpen, add, remove } = useCart()
  if (!open) return null
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-50 p-6 flex flex-col">
        <h2 className="text-xl text-brand mb-4">Your cart</h2>
        <div className="flex-1 overflow-auto">
          {items.length === 0 && <p>Your cart is empty.</p>}
          {items.map((i) => <div className="flex gap-3 justify-between py-3 border-b border-line text-sm" key={i.p.slug}>
            <div>{i.p.title}<br />{i.qty} × {money(i.p.price)}</div>
            <button onClick={() => remove(i.p.slug)} className="text-brand">Remove</button>
          </div>)}
        </div>
        <p className="py-3"><b>Total: {money(total)}</b></p>
        <button className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark disabled:bg-[#8a959b] disabled:cursor-not-allowed" disabled={!items.length} onClick={() => alert('Checkout is not wired up yet. Connect it to your backend or payment provider.')}>Checkout</button>
      </aside>
    </>
  )
}

export default function App() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const add = (p, qty = 1) => { setItems((l) => (l.find((i) => i.p.slug === p.slug) ? l.map((i) => (i.p.slug === p.slug ? { ...i, qty: i.qty + qty } : i)) : [...l, { p, qty }])); setOpen(true) }
  const remove = (slug) => setItems((l) => l.filter((i) => i.p.slug !== slug))
  return (
    <Cart.Provider value={{ items, open, setOpen, add, remove }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:slug" element={<Collection />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Collection />} />
      </Routes>
      <Footer />
      <Drawer />
    </Cart.Provider>
  )
}
