import { Link } from 'react-router-dom'
import { site } from '../data'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-bg pb-8 mt-10 sm:mt-12 lg:mt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-8 sm:py-10 border-b border-[#dde2e5]">
          {[['Free delivery in Dar es Salaam', 'Available to selected areas'], ['Hassle free shopping', 'Get the best deals guaranteed'], ['Top-notch support', 'Get in touch to discuss your requirements'], ['Secure payments', 'Mobile money or cash on delivery']].map(([a, b]) => <div key={a}><b className="text-primary block">{a}</b><span className="text-sm">{b}</span></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 py-8 sm:py-10">
          <div>
            <Logo size="sm" className="mb-3" />
            <h4 className="text-primary uppercase text-sm mb-2">About {site.name}</h4>
            <p className="text-sm">{site.name} sells computers and accessories in {site.address}. Call us on {site.phone} for more info.</p>
          </div>
          <div><h4 className="text-primary uppercase text-sm mb-2.5">Quick links</h4><div className="flex flex-col gap-1"><Link to="/collections/all" className="hover:text-primary">Search</Link><Link to="/contact" className="hover:text-primary">Contact Us</Link><Link to="/about" className="hover:text-primary">About</Link></div></div>
          <div><h4 className="text-primary uppercase text-sm mb-2.5">Get deals and discounts</h4><p className="text-sm mb-3">Sign up with your email address to get monthly deals</p><input placeholder="Your email" className="p-3 w-full border border-line mb-2.5" /><button className="inline-block bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover">Subscribe</button></div>
        </div>
        <div className="text-sm">© {site.name}</div>
      </div>
    </footer>
  )
}
