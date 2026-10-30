import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cats } from '../data'
import { useProducts } from '../context/ProductsContext'
import Art from '../components/Art'
import { catName, money } from '../utils'

const emptyForm = {
  title: '',
  category: 'laptops',
  brand: '',
  price: '',
  compare: '',
  stock: '1',
  specs: '',
  image: '',
}

const fieldClass = 'w-full rounded-xl border border-line bg-surface p-3 text-ink shadow-sm placeholder:text-text/60 focus:border-primary'

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 90)

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that image.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('That file is not a valid image.'))
      image.onload = () => {
        const maxSide = 1000
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp', 0.82))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Admin() {
  const { products, customProducts, addProduct, removeProduct, storageError } = useProducts()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [imageBusy, setImageBusy] = useState(false)
  const fileRef = useRef(null)

  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }))

  const makeSlug = (title) => {
    const base = slugify(title) || 'product'
    let slug = base
    let counter = 2
    while (products.some((p) => p.slug === slug)) slug = `${base}-${counter++}`
    return slug
  }

  const handleImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setImageBusy(true)
    setError('')
    try {
      const image = await compressImage(file)
      setForm((current) => ({ ...current, image }))
    } catch (err) {
      setError(err.message)
    } finally {
      setImageBusy(false)
      event.target.value = ''
    }
  }

  const submit = (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    const title = form.title.trim()
    const brand = form.brand.trim()
    const price = Number(form.price)
    const compare = form.compare === '' ? undefined : Number(form.compare)
    const stock = Number(form.stock)
    if (!title) return setError('Product name is required.')
    if (!brand) return setError('Brand is required.')
    if (!Number.isFinite(price) || price <= 0) return setError('Enter a valid price.')
    if (compare !== undefined && (!Number.isFinite(compare) || compare <= price)) return setError('Compare-at price must be higher than the selling price.')
    if (!Number.isFinite(stock) || stock < 0) return setError('Enter a valid stock quantity.')
    addProduct({
      slug: makeSlug(title),
      title,
      category: form.category,
      brand: brand.toUpperCase(),
      price: Math.round(price),
      compare: compare === undefined ? undefined : Math.round(compare),
      stock: Math.round(stock),
      specs: form.specs.split('\n').map((line) => line.trim()).filter(Boolean),
      image: form.image || undefined,
      custom: true,
      createdAt: Date.now(),
    })
    setMessage(`${title} was added and is now live in the storefront.`)
    setForm(emptyForm)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10 pb-12 sm:px-6 sm:pb-[60px] lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 py-1 dark:border-primary/30 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-violet" />
            Store admin
          </span>
          <h1 className="text-2xl text-gradient sm:text-3xl md:text-4xl">Upload products</h1>
          <p className="mt-2 max-w-2xl text-text">Add a product here and it will appear in the home, collection and product cards immediately.</p>
        </div>
        <Link to="/" className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow">
          Back to store
        </Link>
      </div>

      {storageError && <p className="mb-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">{storageError}</p>}

      <form onSubmit={submit} className="panel-gradient rounded-3xl border border-line p-5 shadow-xl sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Product name</span>
            <input required value={form.title} onChange={update('title')} placeholder="e.g. HP Laptop 15 Core i5 8GB 512GB" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Category</span>
            <select value={form.category} onChange={update('category')} className={fieldClass}>
              {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Brand</span>
            <input required value={form.brand} onChange={update('brand')} placeholder="e.g. HP" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Price (TZS)</span>
            <input required type="number" min="1" step="1" value={form.price} onChange={update('price')} placeholder="1500000" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Compare-at price (optional)</span>
            <input type="number" min="0" step="1" value={form.compare} onChange={update('compare')} placeholder="1800000" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Stock quantity</span>
            <input required type="number" min="0" step="1" value={form.stock} onChange={update('stock')} className={fieldClass} />
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Product image (optional)</span>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="block w-full rounded-xl border border-line bg-surface p-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary-soft file:px-3 file:py-1.5 file:font-semibold file:text-primary" />
            <p className="mt-1 text-xs text-text">{imageBusy ? 'Preparing image…' : 'Images are resized and saved in this browser.'}</p>
          </div>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Specifications</span>
            <textarea rows="4" value={form.specs} onChange={update('specs')} placeholder={'One specification per line\ne.g. Intel Core i5-1335U\n8GB RAM\n512GB SSD'} className={fieldClass} />
          </label>
        </div>

        {form.image && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3">
            <img src={form.image} alt="Product preview" className="h-16 w-20 rounded-xl bg-surface object-contain ring-1 ring-line" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">Image ready</p>
              <p className="text-xs text-text">This will be used on the product card.</p>
            </div>
            <button type="button" onClick={() => setForm((current) => ({ ...current, image: '' }))} className="text-sm font-bold text-danger hover:underline">Remove</button>
          </div>
        )}

        {error && <p className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-danger dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        {message && <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">{message} <Link to="/" className="underline">View store</Link></p>}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-gradient rounded-full px-7 py-3 font-bold" disabled={imageBusy}>{imageBusy ? 'Preparing image…' : 'Add product'}</button>
          <button type="button" onClick={() => { setForm(emptyForm); setError(''); setMessage(''); if (fileRef.current) fileRef.current.value = '' }} className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-primary/30 hover:text-primary">Clear form</button>
        </div>
      </form>

      <section className="mt-6 rounded-3xl border border-line bg-surface/70 p-5 shadow-sm sm:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl text-gradient sm:text-2xl">Uploaded products</h2>
            <p className="text-sm text-text">{customProducts.length} product{customProducts.length === 1 ? '' : 's'} added in this browser.</p>
          </div>
          <Link to="/collections/all" className="text-sm font-semibold text-primary hover:text-violet hover:underline">Open all products</Link>
        </div>

        {customProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 p-8 text-center text-sm text-text">
            No uploaded products yet. Use the form above to add the first one.
          </div>
        ) : (
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/80">
            {customProducts.map((p) => (
              <div key={p.slug} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                <div className="art-stage grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-xl p-1.5">
                  {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-contain" /> : <Art kind={p.category} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{p.title}</p>
                  <p className="text-xs text-text">{catName(p.category)} · {money(p.price)} · {p.stock} in stock</p>
                </div>
                <Link to={`/products/${p.slug}`} className="text-xs font-bold text-primary hover:underline">View</Link>
                <button type="button" onClick={() => removeProduct(p.slug)} className="text-xs font-bold text-danger hover:underline">Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
