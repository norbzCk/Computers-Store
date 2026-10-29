import { site } from '../data'

export default function About() {
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="bg-white border border-line p-5 sm:p-[30px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-brand mb-3">About {site.name}</h1>
        <p>{site.name} is a computer and accessories retailer in {site.address}. Edit this text in src/pages/About.jsx.</p>
      </div>
    </div>
  )
}
