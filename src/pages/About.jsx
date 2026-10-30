import { store } from '../data'
import Logo from '../components/Logo'

export default function About() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="hero-panel relative overflow-hidden rounded-3xl border border-white/70 dark:border-white/10 p-5 shadow-xl sm:p-[30px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex justify-center">
            <div className="logo-on-light rounded-3xl bg-white/90 p-4 shadow-xl ring-1 ring-white/60">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gradient mb-3 text-center">About {store.name}</h1>
          <p className="mx-auto max-w-2xl text-center text-ink/80">{store.name} is a computer and accessories retailer in {store.address}. Edit this text in src/pages/About.jsx.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {['Dar es Salaam', 'Warranty on every item', 'Free delivery available'].map((item) => <span key={item} className="rounded-full border border-white/70 bg-surface/70 px-4 dark:border-white/10 py-2 text-xs font-bold uppercase tracking-wide text-primary shadow-sm">{item}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}
