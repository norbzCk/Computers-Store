import { Link } from 'react-router-dom'
import { store } from '../data'
import { whatsappUrl } from '../utils'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'

const featureTones = [
  'from-sky-500/25 via-sky-400/10 to-transparent',
  'from-emerald-500/25 via-emerald-400/10 to-transparent',
  'from-violet-500/25 via-violet-400/10 to-transparent',
  'from-amber-500/25 via-orange-400/10 to-transparent',
]

function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

export default function Footer() {
  const generalEnquiry = `Hello ${store.name}, I'd like to ask about a product.`
  return (
    <footer className="footer-gradient relative mt-10 overflow-hidden pb-8 text-white/80 sm:mt-12 lg:mt-16">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 border-b border-white/10 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-4 lg:gap-6">
          {[['Free delivery in Dar es Salaam', 'Selected areas only. Confirm on WhatsApp.'], ['Warranty details', 'Shown on product pages where available.'], ['Support on WhatsApp', 'Ask about stock, delivery or payment.'], ['Visit our shop', 'Sinza Makaburini, Dar es Salaam.']].map(([a, b], i) => (
            <div key={a} className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${featureTones[i % featureTones.length]} p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:from-white/15`}>
              <b className="block bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">{a}</b>
              <span className="text-sm text-white/60">{b}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo size="sm" light className="mb-4" />
            <h4 className="mb-2 text-sm uppercase text-sky-200">About {store.name}</h4>
            <p className="text-sm text-white/65">{store.name} sells computers and accessories in {store.address}. Browse the store or message us on WhatsApp to confirm availability.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={whatsappUrl(generalEnquiry)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/15"><WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp</a>
              <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/15"><InstagramIcon /> Instagram</a>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 text-sm uppercase text-sky-200">Quick links</h4>
            <div className="flex flex-col gap-1">
              <Link to="/collections/all" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">All products</Link>
              <Link to="/delivery" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Delivery</Link>
              <Link to="/contact" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Contact us</Link>
              <Link to="/about" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">About</Link>
              <Link to="/admin" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Admin upload</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 text-sm uppercase text-sky-200">Get in touch</h4>
            <div className="space-y-2 text-sm">
              <a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="block text-white/65 transition hover:text-white">{store.address}</a>
              <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="block text-white/65 transition hover:text-white">{store.phone}</a>
              <a href={`mailto:${store.email}`} className="block text-white/65 transition hover:text-white">{store.email}</a>
              <div className="pt-1 text-white/50">
                {store.openingHours.map((hours) => <p key={hours}>{hours}</p>)}
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 text-sm uppercase text-sky-200">Store updates</h4>
            <p className="mb-3 text-sm text-white/65">Sign up with your email address to receive store updates.</p>
            <input placeholder="Your email" className="mb-2.5 w-full rounded-xl border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/45 focus:border-sky-300" />
            <button className="btn-gradient inline-block rounded-full px-6 py-3 font-semibold">Subscribe</button>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {store.name}</span>
          <span>{store.address}</span>
        </div>
      </div>
    </footer>
  )
}
