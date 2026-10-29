import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const add = (p, qty = 1) => {
    setItems((l) =>
      l.find((i) => i.p.slug === p.slug)
        ? l.map((i) => (i.p.slug === p.slug ? { ...i, qty: i.qty + qty } : i))
        : [...l, { p, qty }],
    )
    setOpen(true)
  }

  const remove = (slug) => setItems((l) => l.filter((i) => i.p.slug !== slug))

  return <CartContext.Provider value={{ items, open, setOpen, add, remove }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
