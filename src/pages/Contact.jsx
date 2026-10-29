import { useState } from 'react'
import { site } from '../data'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5 text-center py-10 sm:py-[40px] pb-12 sm:pb-[60px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-primary mb-2">Contact Us</h1>
      <p className="mb-1"><b>{site.address}</b></p>
      <p className="mb-1">{site.phone}</p>
      <p className="mb-1">{site.email}</p>
      <p className="mt-4 mb-1"><b>Store Timings</b></p>
      {site.hours.map((h) => <p key={h} className="mb-1">{h}</p>)}
      <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="max-w-[680px] mx-auto mt-6 sm:mt-[30px] grid gap-3">
        <input required placeholder="Your name" className="p-3 sm:p-3.5 border border-line" />
        <input required type="email" placeholder="Your email" className="p-3 sm:p-3.5 border border-line" />
        <textarea required placeholder="Your message" rows="5" className="p-3 sm:p-3.5 border border-line font-inherit" />
        <button className="inline-block bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover justify-self-center">Send message</button>
        {sent && <p className="text-green">Message sent. We will reply soon.</p>}
      </form>
    </div>
  )
}
