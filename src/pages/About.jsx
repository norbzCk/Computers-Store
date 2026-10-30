import { Link } from 'react-router-dom'
import { store } from '../data'
import Logo from '../components/Logo'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { whatsappUrl } from '../utils'
import Seo from '../components/Seo'

export default function About() {
  const enquiry = `Hello ${store.name}, I'd like to ask about a product.`
  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <Seo title='About us' description="Learn about Billionaire's Computers, a computer and accessories retailer in Sinza Makaburini, Dar es Salaam." path='/about' jsonLd={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About us', description: "Learn about Billionaire's Computers, a computer and accessories retailer in Sinza Makaburini, Dar es Salaam.", url: `${store.url}/about` }} />
      <div className="hero-panel relative overflow-hidden rounded-3xl border border-white/70 p-5 shadow-xl dark:border-white/10 sm:p-[30px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex justify-center">
            <div className="logo-on-light rounded-3xl bg-white/90 p-4 shadow-xl ring-1 ring-white/60">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gradient mb-3 text-center">About {store.name}</h1>
          <p className="mx-auto max-w-2xl text-center text-ink/80">{store.name} is a computer and accessories retailer in {store.address}. Browse laptops, desktops, Macbooks, printers, toners and accessories, then contact us on WhatsApp to confirm stock, delivery and payment.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {['Dar es Salaam', 'Warranty details on products', 'Delivery details available', 'Shop in Sinza Makaburini'].map((item) => <span key={item} className="rounded-full border border-white/70 bg-surface/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary shadow-sm dark:border-white/10">{item}</span>)}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
            <a href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 sm:px-6 sm:py-3.5 sm:text-base"><WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp</a>
            <Link to="/delivery" className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft sm:px-6 sm:py-3.5 sm:text-base">Delivery details</Link>
            <Link to="/contact" className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary sm:px-6 sm:py-3.5 sm:text-base">Contact us</Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        <section className="panel-gradient rounded-2xl border border-line p-5 shadow-sm">
          <h2 className="text-lg text-gradient mb-2">Visit the shop</h2>
          <p className="text-sm text-text">{store.address}</p>
          <a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:text-violet hover:underline">Open in Google Maps</a>
        </section>
        <section className="panel-gradient rounded-2xl border border-line p-5 shadow-sm">
          <h2 className="text-lg text-gradient mb-2">Opening hours</h2>
          {store.openingHours.map((hours) => <p key={hours} className="text-sm text-text">{hours}</p>)}
          <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="mt-3 inline-block text-sm font-semibold text-primary hover:text-violet hover:underline">Call {store.phone}</a>
        </section>
        <section className="panel-gradient rounded-2xl border border-line p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <h2 className="text-lg text-gradient mb-2">Delivery</h2>
          <p className="text-sm text-text">{store.deliveryInfo.summary}</p>
          <Link to="/delivery" className="mt-3 inline-block text-sm font-semibold text-primary hover:text-violet hover:underline">View delivery details</Link>
        </section>
      </div>
    </div>
  )
}
