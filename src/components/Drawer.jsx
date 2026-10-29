import { useCart } from '../context/CartContext'
import { money } from '../utils'

export default function Drawer() {
  const { items, open, setOpen, remove } = useCart()
  if (!open) return null
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <aside className="fixed top-0 right-0 bottom-0 z-50 flex w-full flex-col overflow-hidden bg-gradient-to-b from-primary-soft/40 via-white to-white shadow-2xl sm:w-[440px] sm:rounded-l-3xl">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-violet to-sky px-6 pb-5 pt-6 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Your bag</p>
              <h2 className="text-2xl font-bold">Your cart</h2>
              <p className="text-sm text-white/75">{items.length} item{items.length === 1 ? '' : 's'}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-xl leading-none ring-1 ring-white/25 transition hover:bg-white/25">×</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-6">
          {items.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-primary/25 bg-white/70 p-6 text-center"><p className="font-semibold text-ink">Your cart is empty.</p><p className="mt-1 text-sm">Add something great and it will show up here.</p></div>}
          {items.map((i) => <div className="flex justify-between gap-3 border-b border-line py-4 text-sm" key={i.p.slug}>
            <div><p className="font-semibold text-ink">{i.p.title}</p><p className="text-text">{i.qty} × {money(i.p.price)}</p></div>
            <button onClick={() => remove(i.p.slug)} className="h-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-danger transition hover:bg-red-100 hover:text-error">Remove</button>
          </div>)}
        </div>
        <div className="border-t border-line bg-white/80 p-6 backdrop-blur">
          <div className="mb-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary-soft via-white to-amber-50 px-4 py-3"><span className="font-semibold text-ink">Total</span><b className="text-lg text-primary">{money(total)}</b></div>
          <button className="btn-gradient w-full rounded-full px-6 py-3.5 font-bold" disabled={!items.length} onClick={() => alert('Checkout is not wired up yet. Connect it to your backend or payment provider.')}>Checkout</button>
        </div>
      </aside>
    </>
  )
}
