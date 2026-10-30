import { store } from '../data'
import { whatsappUrl } from '../utils'
import WhatsAppIcon from './WhatsAppIcon'

const message = `Hello ${store.name}, I'd like to ask about a product.`

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-2xl sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
