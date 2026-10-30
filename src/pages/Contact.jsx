import { useState } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../data'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { whatsappUrl } from '../utils'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Website enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${store.email}?subject=${subject}&body=${body}`
    setSent(true)
  }
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="panel-gradient relative overflow-hidden rounded-3xl border border-line shadow-xl">
        <div className="p-5 sm:p-10">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm dark:border-primary/30">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
              We're here to help
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-gradient mb-2">Contact Us</h1>
            <p className="mx-auto max-w-xl text-text">Questions about a product, delivery or payment? Message us on WhatsApp, call, email or visit the shop.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
              <a href={whatsappUrl(`Hello ${store.name}, I'd like to ask about a product.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
              <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft">Call {store.phone}</a>
              <a href={`mailto:${store.email}`} className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary">Email us</a>
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Visit us</p>
              <a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-ink hover:text-primary hover:underline">{store.address}</a>
              <a href={store.mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-bold text-primary hover:underline">View on map</a>
            </div>
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet">Call or email</p>
              <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="mt-1 block font-semibold text-ink hover:text-primary hover:underline">{store.phone}</a>
              <a href={`mailto:${store.email}`} className="block text-sm text-text hover:text-primary hover:underline">{store.email}</a>
            </div>
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky">Opening hours</p>
              {store.openingHours.map((hours) => <p key={hours} className="mt-1 text-sm text-ink">{hours}</p>)}
            </div>
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300">Delivery</p>
              <p className="mt-1 text-sm text-ink">{store.deliveryInfo.summary}</p>
              <Link to="/delivery" className="mt-2 inline-block text-xs font-bold text-primary hover:underline">Delivery details</Link>
            </div>
          </div>
          <form onSubmit={submit} className="mx-auto mt-8 grid max-w-[680px] gap-3 rounded-2xl border border-line bg-surface/90 p-5 shadow-sm sm:p-6">
            <p className="text-center text-sm text-text">Send an email enquiry using the form below, or use WhatsApp for the fastest response.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Your name" value={form.name} onChange={update('name')} className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
              <input required type="email" placeholder="Your email" value={form.email} onChange={update('email')} className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
            </div>
            <textarea required placeholder="Your message" rows="5" value={form.message} onChange={update('message')} className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
            <button className="btn-gradient justify-self-center rounded-full px-7 py-3.5 font-bold">Open email app</button>
            {sent && <p className="rounded-2xl bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">Your email app should open with the message. If it does not, please use WhatsApp or call us.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
