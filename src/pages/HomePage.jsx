import { Link } from 'react-router-dom'
import { cats, products } from '../data'
import Art from '../components/Art'
import Card from '../components/Card'

const tileTones = [
  'from-sky-100 via-cyan-50 to-white hover:border-sky-300',
  'from-violet-100 via-indigo-50 to-white hover:border-violet-300',
  'from-emerald-100 via-teal-50 to-white hover:border-emerald-300',
  'from-amber-100 via-orange-50 to-white hover:border-amber-300',
  'from-cyan-100 via-sky-50 to-white hover:border-cyan-300',
  'from-indigo-100 via-blue-50 to-white hover:border-indigo-300',
]

export default function HomePage() {
  const fresh = products.filter((p) => p.stock !== 0).slice(0, 8)
  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10">
      <section className="hero-panel relative overflow-hidden rounded-3xl border border-white/70 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-0 p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 mb-8 sm:mb-10 lg:mb-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
            Premium tech, local service
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] text-ink mb-4 leading-tight"><span className="text-gradient">Computers and accessories,</span> delivered in Dar es Salaam</h1>
          <p className="max-w-[460px] text-base sm:text-lg mb-6">Laptops, desktops, Macbooks, printers and more, with warranty on every item.</p>
          <Link className="btn-gradient inline-block rounded-full px-7 py-3.5 font-bold" to="/collections/laptops">Shop laptops</Link>
        </div>
        <div className="float-soft relative max-w-[380px] mx-auto w-full"><Art kind="laptops" /></div>
      </section>
      <div className="mb-5 flex items-end gap-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gradient">Shop by category</h2>
        <span className="mb-2 hidden h-1 flex-1 rounded-full bg-gradient-to-r from-primary/30 via-violet/20 to-transparent sm:block" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-14">
        {cats.map((c, i) => <Link key={c.slug} to={`/collections/${c.slug}`} className={`group bg-gradient-to-br ${tileTones[i % tileTones.length]} rounded-2xl border border-line p-4 sm:p-5 lg:p-6 text-center text-ink font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}>
          <div className="mb-3 grid h-[90px] place-items-center rounded-xl bg-white/70 ring-1 ring-white/60 transition duration-300 group-hover:scale-[1.02] sm:h-[100px] lg:h-[110px]"><Art kind={c.slug} /></div>
          <span className="transition group-hover:text-primary">{c.name}</span>
        </Link>)}
      </div>
      <div className="mb-5 flex items-end gap-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gradient">New arrivals</h2>
        <span className="mb-2 hidden h-1 flex-1 rounded-full bg-gradient-to-r from-primary/30 via-violet/20 to-transparent sm:block" />
      </div>
      <div className="mb-12 overflow-hidden rounded-2xl border border-line bg-white shadow-lg sm:mb-14 lg:mb-16">
        <div className="h-1.5 bg-gradient-to-r from-primary via-violet to-sun" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fresh.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  )
}
