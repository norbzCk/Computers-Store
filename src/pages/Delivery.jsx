import { Link } from 'react-router-dom'
import { store } from '../data'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { whatsappUrl } from '../utils'

export default function Delivery() {
  const enquiry = `Hello ${store.name}, I'd like to confirm delivery to my area.`
  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <section className="hero-panel relative overflow-hidden rounded-3xl border border-white/70 p-5 shadow-xl dark:border-white/10 sm:p-[30px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm dark:border-primary/30">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
            Delivery
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gradient mb-3">Delivery in Dar es Salaam</h1>
          <p className="max-w-2xl text-text sm:text-lg">{store.deliveryInfo.summary} {store.deliveryInfo.freeDeliveryNote}</p>
          <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2.5">
            <a href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:px-6 sm:py-3.5 sm:text-base"><WhatsAppIcon className="h-5 w-5" /> Confirm on WhatsApp</a>
            <a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft sm:px-6 sm:py-3.5 sm:text-base">View location</a>
            <Link to="/contact" className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary sm:px-6 sm:py-3.5 sm:text-base">Contact us</Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start sm:mt-8">
        <section className="panel-gradient rounded-3xl border border-line p-5 shadow-sm sm:p-7" aria-labelledby="delivery-areas">
          <h2 id="delivery-areas" className="text-xl sm:text-2xl text-gradient mb-2">Delivery areas and fees</h2>
          <p className="mb-4 text-sm text-text">Fees and timings depend on your location. We confirm them before you order.</p>
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary-soft/70 text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Area</th>
                  <th scope="col" className="px-4 py-3 font-bold">Fee</th>
                  <th scope="col" className="px-4 py-3 font-bold">Estimated time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-surface/70">
                {store.deliveryInfo.zones.map((zone) => (
                  <tr key={zone.name}>
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{zone.name}</th>
                    <td className="px-4 py-3 text-text">{zone.fee}</td>
                    <td className="px-4 py-3 text-text">{zone.estimatedTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-surface/80 p-4">
            {store.deliveryInfo.notes.map((note) => <p key={note} className="text-sm text-text">{note}</p>)}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="panel-gradient rounded-3xl border border-line p-5 shadow-sm sm:p-7" aria-labelledby="before-ordering">
            <h2 id="before-ordering" className="text-xl text-gradient mb-3">Before you order</h2>
            <ul className="space-y-2 text-sm text-text">
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Confirm your exact area and delivery fee on WhatsApp.</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />Delivery timing is confirmed when you place your order.</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />Orders outside Dar es Salaam are quoted on request.</li>
            </ul>
          </section>

          <section className="panel-gradient rounded-3xl border border-line p-5 shadow-sm sm:p-7" aria-labelledby="delivery-contact">
            <h2 id="delivery-contact" className="text-xl text-gradient mb-3">Need help?</h2>
            <div className="space-y-3 text-sm">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Visit us</p><a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-primary hover:underline">{store.address}</a></div>
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet">Call</p><a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="font-semibold text-ink hover:text-primary hover:underline">{store.phone}</a></div>
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky">Email</p><a href={`mailto:${store.email}`} className="font-semibold text-ink hover:text-primary hover:underline">{store.email}</a></div>
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300">Opening hours</p>{store.openingHours.map((hours) => <p key={hours} className="text-text">{hours}</p>)}</div>
            </div>
            <a href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
          </section>
        </aside>
      </div>
    </div>
  )
}
