import { Link } from 'react-router-dom'
import { site } from '../data'
import Logo from './Logo'

const featureTones = [
  'from-sky-500/25 via-sky-400/10 to-transparent',
  'from-emerald-500/25 via-emerald-400/10 to-transparent',
  'from-violet-500/25 via-violet-400/10 to-transparent',
  'from-amber-500/25 via-orange-400/10 to-transparent',
]

export default function Footer() {
  return (
    <footer className="footer-gradient relative mt-10 overflow-hidden pb-8 text-white/80 sm:mt-12 lg:mt-16">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 border-b border-white/10 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-4 lg:gap-6">
          {[['Free delivery in Dar es Salaam', 'Available to selected areas'], ['Hassle free shopping', 'Get the best deals guaranteed'], ['Top-notch support', 'Get in touch to discuss your requirements'], ['Secure payments', 'Mobile money or cash on delivery']].map(([a, b], i) => (
            <div key={a} className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${featureTones[i % featureTones.length]} p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:from-white/15`}>
              <b className="block bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">{a}</b>
              <span className="text-sm text-white/60">{b}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 py-8 sm:py-10 md:grid-cols-3 md:gap-10 lg:gap-12">
          <div>
            <Logo size="sm" light className="mb-4" />
            <h4 className="mb-2 text-sm uppercase text-sky-200">About {site.name}</h4>
            <p className="text-sm text-white/65">{site.name} sells computers and accessories in {site.address}. Call us on {site.phone} for more info.</p>
          </div>
          <div>
            <h4 className="mb-2.5 text-sm uppercase text-sky-200">Quick links</h4>
            <div className="flex flex-col gap-1">
              <Link to="/collections/all" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Search</Link>
              <Link to="/contact" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Contact Us</Link>
              <Link to="/about" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">About</Link>
              <Link to="/admin" className="w-fit text-white/65 transition hover:translate-x-1 hover:text-white">Admin upload</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 text-sm uppercase text-sky-200">Get deals and discounts</h4>
            <p className="mb-3 text-sm text-white/65">Sign up with your email address to get monthly deals</p>
            <input placeholder="Your email" className="mb-2.5 w-full rounded-xl border border-white/15 bg-white/10 p-3 text-white placeholder:text-white/45 focus:border-sky-300" />
            <button className="btn-gradient inline-block rounded-full px-6 py-3 font-semibold">Subscribe</button>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {site.name}</span>
          <span>{site.address}</span>
        </div>
      </div>
    </footer>
  )
}
