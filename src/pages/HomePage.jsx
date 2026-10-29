import { Link } from 'react-router-dom'
import { cats, products } from '../data'
import Art from '../components/Art'
import Card from '../components/Card'

export default function HomePage() {
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
      </div>
      <h2 className="text-xl sm:text-2xl text-brand mb-4">New arrivals</h2>
      <div className="bg-white border border-line overflow-hidden mb-10 sm:mb-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  )
}
