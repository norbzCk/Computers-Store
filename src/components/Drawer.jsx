import { useCart } from '../context/CartContext'
import { money } from '../utils'

export default function Drawer() {
  const { items, open, setOpen, add, remove } = useCart()
  if (!open) return null
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-50 p-6 flex flex-col">
        <h2 className="text-xl text-brand mb-4">Your cart</h2>
        <div className="flex-1 overflow-auto">
          {items.length === 0 && <p>Your cart is empty.</p>}
          {items.map((i) => <div className="flex gap-3 justify-between py-3 border-b border-line text-sm" key={i.p.slug}>
            <div>{i.p.title}<br />{i.qty} × {money(i.p.price)}</div>
            <button onClick={() => remove(i.p.slug)} className="text-brand">Remove</button>
          </div>)}
        </div>
        <p className="py-3"><b>Total: {money(total)}</b></p>
        <button className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark disabled:bg-[#8a959b] disabled:cursor-not-allowed" disabled={!items.length} onClick={() => alert('Checkout is not wired up yet. Connect it to your backend or payment provider.')}>Checkout</button>
      </aside>
    </>
  )
}
