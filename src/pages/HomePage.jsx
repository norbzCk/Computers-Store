import { Link } from 'react-router-dom'
import { cats, store } from '../data'
import Art from '../components/Art'
import Card from '../components/Card'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Seo from '../components/Seo'
import { useProducts } from '../context/ProductsContext'
import { useTestimonials } from '../context/TestimonialsContext'
import { isInStock, isSold, money, whatsappUrl } from '../utils'

const tileTones = [
  'from-sky-100 via-cyan-50 to-surface hover:border-sky-300 dark:from-sky-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-sky-500',
  'from-violet-100 via-indigo-50 to-surface hover:border-violet-300 dark:from-violet-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-violet-500',
  'from-emerald-100 via-teal-50 to-surface hover:border-emerald-300 dark:from-emerald-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-emerald-500',
  'from-amber-100 via-orange-50 to-surface hover:border-amber-300 dark:from-amber-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-amber-500',
  'from-cyan-100 via-sky-50 to-surface hover:border-cyan-300 dark:from-cyan-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-cyan-500',
  'from-indigo-100 via-blue-50 to-surface hover:border-indigo-300 dark:from-indigo-950/70 dark:via-slate-900 dark:to-surface dark:hover:border-indigo-500',
]

function TrustIcon({ type }) {
  if (type === 'warranty') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  if (type === 'delivery') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>
  if (type === 'shop') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  return <WhatsAppIcon className="h-5 w-5" />
}

export default function HomePage() {
  const { products } = useProducts()
  const { testimonials } = useTestimonials()
  const featured = products.filter((p) => p.featured && !isSold(p)).slice(0, 2)
  const fresh = products.filter((p) => isInStock(p) && !p.featured).slice(0, 8)
  const instaProducts = products.filter(isInStock).slice(0, 4)
  const seoJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${store.url}/#website`,
        url: store.url,
        name: store.name,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${store.url}/collections/all?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ComputerStore',
        '@id': `${store.url}/#store`,
        name: store.name,
        url: store.url,
        telephone: store.phone,
        email: store.email,
        image: `${store.url}${encodeURI("/Billionaire's computers logo.png")}`,
        address: { '@type': 'PostalAddress', streetAddress: store.address, addressLocality: 'Dar es Salaam', addressCountry: 'TZ' },
        sameAs: [store.instagramUrl],
        hasMap: store.mapLink,
      },
    ],
  }
  const instagramHandle = store.instagramUrl.replace(/\/+$/, '').split('/').pop()
  const trustItems = [
    { type: 'warranty', title: 'Warranty details', text: 'Shown on each product page where available.' },
    { type: 'delivery', title: 'Delivery in Dar es Salaam', text: store.deliveryInfo.summary },
    { type: 'whatsapp', title: 'Chat on WhatsApp', text: 'Ask about stock, price and delivery first.' },
    { type: 'shop', title: 'Visit our shop', text: store.address },
  ]
  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10">
      <Seo description={`${store.name} sells laptops, desktops, Macbooks, printers, toners and accessories in ${store.address}.`} jsonLd={seoJsonLd} />
      <section className="hero-panel relative overflow-hidden rounded-3xl border border-white/70 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-0 p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 mb-8 sm:mb-10 lg:mb-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 dark:border-primary/30 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
            Premium tech, local service
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] text-ink mb-4 leading-tight"><span className="text-gradient">Computers and accessories,</span> delivered in Dar es Salaam</h1>
          <p className="max-w-[460px] text-base sm:text-lg mb-6">Laptops, desktops, Macbooks, printers and more, with warranty details shown on each product.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-gradient inline-block rounded-full px-7 py-3.5 font-bold" to="/collections/laptops">Shop laptops</Link>
            <a className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-6 py-3.5 font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft" href={whatsappUrl(`Hello ${store.name}, I'd like to ask about a product.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5 text-emerald-700" /> WhatsApp</a>
          </div>
        </div>
        <div className="float-soft relative max-w-[380px] mx-auto w-full"><Art kind="laptops" /></div>
      </section>

      <section aria-label="Why shop with us" className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 lg:mb-12 lg:grid-cols-4">
        {trustItems.map((item, index) => (
          <div key={item.title} className="panel-gradient flex items-start gap-3 rounded-2xl border border-line p-4 shadow-sm">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${['bg-primary-soft text-primary', 'bg-violet/10 text-violet', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300', 'bg-sky/10 text-sky'][index]}`}><TrustIcon type={item.type} /></span>
            <div>
              <p className="text-sm font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs leading-5 text-text">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gradient">Shop by category</h2>
        <Link to="/collections/all" className="hidden text-sm font-semibold text-primary hover:text-violet hover:underline sm:block">View all products</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12 lg:mb-14">
        {cats.map((c, i) => <Link key={c.slug} to={`/collections/${c.slug}`} className={`group bg-gradient-to-br ${tileTones[i % tileTones.length]} rounded-2xl border border-line p-4 sm:p-5 lg:p-6 text-center text-ink font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}>
          <div className="mb-3 grid h-[90px] place-items-center rounded-xl bg-surface/70 ring-1 ring-white/60 transition dark:ring-white/10 duration-300 group-hover:scale-[1.02] sm:h-[100px] lg:h-[110px]"><Art kind={c.slug} /></div>
          <span className="transition group-hover:text-primary">{c.name}</span>
        </Link>)}
      </div>

      {featured.length > 0 && (
        <section className="mb-10 sm:mb-12 lg:mb-14" aria-labelledby="featured-heading">
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Featured products</p>
              <h2 id="featured-heading" className="text-xl sm:text-2xl lg:text-3xl text-gradient">Handpicked for you</h2>
            </div>
            <Link to="/collections/laptops" className="hidden text-sm font-semibold text-primary hover:text-violet hover:underline sm:block">Browse laptops</Link>
          </div>
          <div className="grid gap-3 rounded-3xl border border-line bg-surface/50 p-2 shadow-xl sm:grid-cols-2 sm:p-3">
            {featured.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card-gradient group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:flex-row sm:items-center sm:p-5">
                <span className="absolute top-3 right-4 rounded-full bg-gradient-to-r from-primary to-violet px-3 py-0.5 text-xs font-bold text-white">Featured</span>
                <div className="art-stage grid aspect-[4/3] w-full place-items-center rounded-xl p-3 sm:w-[220px] sm:flex-none">{p.images?.[0] ? <img src={p.images[0]} alt={p.name} loading="lazy" decoding="async" className="h-full w-full rounded-lg object-contain" /> : <Art kind={p.category} />}</div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{p.brand}</p>
                  <h3 className="mt-1 text-sm font-medium uppercase text-ink transition-colors group-hover:text-primary sm:text-base">{p.name}</h3>
                  <div className="mt-2 text-lg font-bold text-primary sm:text-xl"><span className="price-gradient">{money(p.price)}</span>{p.oldPrice && <s className="ml-2.5 text-base text-slate-400 dark:text-white/45">{money(p.oldPrice)}</s>}</div>
                  <p className="mt-2 text-xs font-semibold text-text group-hover:text-primary">View product →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gradient">New arrivals</h2>
        <Link to="/collections/all" className="text-sm font-semibold text-primary hover:text-violet hover:underline">View all</Link>
      </div>
      <div className="panel-gradient mb-10 overflow-hidden rounded-2xl border border-line p-2 shadow-lg sm:mb-12 sm:p-3 lg:mb-14">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {fresh.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>

      <section className="mb-10 sm:mb-12 lg:mb-14" aria-labelledby="testimonials-heading">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-violet">Customer feedback</p>
            <h2 id="testimonials-heading" className="text-xl sm:text-2xl lg:text-3xl text-gradient">Testimonials</h2>
          </div>
        </div>
        {testimonials.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <blockquote key={`${testimonial.name}-${index}`} className="panel-gradient rounded-2xl border border-line p-5 shadow-sm">
                <p className="text-sm leading-6 text-text">“{testimonial.quote}”</p>
                <footer className="mt-3 text-sm font-bold text-ink">{testimonial.name}{testimonial.location ? ` · ${testimonial.location}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="panel-gradient rounded-2xl border border-line p-6 text-center shadow-sm sm:p-8">
            <p className="font-bold text-ink">Customer testimonials will appear here.</p>
            <p className="mx-auto mt-1 max-w-xl text-sm text-text">We only publish feedback from real customers. New testimonials will appear here soon.</p>
          </div>
        )}
      </section>

      <section className="panel-gradient relative mb-4 overflow-hidden rounded-3xl border border-line p-5 shadow-lg sm:mb-6 sm:p-8" aria-labelledby="instagram-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky">Instagram</p>
            <h2 id="instagram-heading" className="text-xl sm:text-2xl lg:text-3xl text-gradient">Follow us on Instagram</h2>
            <p className="mt-1 text-sm text-text">Product highlights and store updates from @{instagramHandle}.</p>
          </div>
          <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft">Visit Instagram</a>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {instaProducts.map((p, index) => (
            <a key={p.slug} href={store.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} highlights on Instagram`} className="art-stage group relative grid aspect-square place-items-center overflow-hidden rounded-2xl border border-line p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              {p.images?.[0] ? <img src={p.images[0]} alt={p.name} loading="lazy" decoding="async" className="h-full w-full rounded-xl object-contain" /> : <Art kind={p.category} tone={index % 3} />}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-3 pt-6 pb-2 text-left text-[11px] font-bold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">Product highlight</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
