import { Link } from 'react-router-dom'
import { cats, products } from '../data'
import Art from '../components/Art'
import Card from '../components/Card'

export default function HomePage() {
  const fresh = products.filter((p) => p.stock !== 0).slice(0, 8)
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10">
      <section className="bg-gradient-to-r from-white to-primary-soft border border-line grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-0 p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 mb-8 sm:mb-10 lg:mb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] text-ink mb-4 leading-tight">Computers and accessories, delivered in Dar es Salaam</h1>
          <p className="max-w-[460px] text-base sm:text-lg mb-6">Laptops, desktops, Macbooks, printers and more, with warranty on every item.</p>
          <Link className="inline-block bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover" to="/collections/laptops">Shop laptops</Link>
        </div>
        <div className="max-w-[380px] mx-auto w-full"><Art kind="laptops" /></div>
      </section>
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary mb-5 sm:mb-6">Shop by category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-14">
        {cats.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`} className="bg-white border border-line p-4 sm:p-5 lg:p-6 text-center text-ink font-semibold hover:border-primary hover:text-primary">
          <div className="h-[90px] sm:h-[100px] lg:h-[110px] grid place-items-center mb-2"><Art kind={c.slug} /></div>
          {c.name}
        </Link>)}
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary mb-5 sm:mb-6">New arrivals</h2>
      <div className="bg-white border border-line overflow-hidden mb-12 sm:mb-14 lg:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fresh.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  )
}
