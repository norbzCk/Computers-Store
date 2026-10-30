import { useState } from 'react'
import { store } from '../data'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <div className="panel-gradient relative overflow-hidden rounded-3xl border border-line shadow-xl">
        <div className="p-5 sm:p-10">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 py-1 dark:border-primary/30 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
              We're here to help
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-gradient mb-2">Contact Us</h1>
            <p className="mx-auto max-w-xl text-text">Questions about a product, delivery or payment? Send us a message and we will get back to you.</p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Visit us</p>
              <p className="mt-1 font-semibold text-ink">{store.address}</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet">Call or email</p>
              <p className="mt-1 font-semibold text-ink">{store.phone}</p>
              <p className="text-sm">{store.email}</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky">Opening hours</p>
              {store.openingHours.map((h) => <p key={h} className="mt-1 text-sm text-ink">{h}</p>)}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mx-auto mt-8 grid max-w-[680px] gap-3 rounded-2xl border border-line bg-surface/90 p-5 shadow-sm sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Your name" className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
              <input required type="email" placeholder="Your email" className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
            </div>
            <textarea required placeholder="Your message" rows="5" className="rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 sm:p-3.5" />
            <button className="btn-gradient justify-self-center rounded-full px-7 py-3.5 font-bold">Send message</button>
            {sent && <p className="rounded-full bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">Message sent. We will reply soon.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
