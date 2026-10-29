import { site } from '../data'
import Logo from '../components/Logo'

export default function About() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="bg-white border border-line p-5 sm:p-[30px]">
        <div className="flex items-center justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-primary mb-3 text-center">About {site.name}</h1>
        <p className="text-center max-w-2xl mx-auto">{site.name} is a computer and accessories retailer in {site.address}. Edit this text in src/pages/About.jsx.</p>
      </div>
    </div>
  )
}
