import { site } from '../data'
import logo from '../assets/Billionaire\'s computers logo.png'

export default function About() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="bg-white border border-line p-5 sm:p-[30px]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={logo} alt="Billionaires Computers" className="h-16 sm:h-20 lg:h-24 w-auto" />
          <div className="leading-tight">
            <div className="font-bold text-[26px] sm:text-[34px] lg:text-[40px] text-ink">Billionaires</div>
            <div className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] text-brand -mt-1">Computers</div>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-brand mb-3 text-center">About {site.name}</h1>
        <p className="text-center max-w-2xl mx-auto">{site.name} is a computer and accessories retailer in {site.address}. Edit this text in src/pages/About.jsx.</p>
      </div>
    </div>
  )
}
