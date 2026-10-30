import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cats } from '../data'
import { useProducts } from '../context/ProductsContext'
import { useTestimonials } from '../context/TestimonialsContext'
import Art from '../components/Art'
import { catName, money, stockLabel } from '../utils'
import Seo from '../components/Seo'

const emptyForm = {
  name: '',
  category: 'laptops',
  brand: '',
  price: '',
  oldPrice: '',
  condition: '',
  stock: 'in-stock',
  stockQty: '',
  warranty: '',
  description: '',
  videoUrl: '',
  featured: false,
  cpu: '',
  ram: '',
  storage: '',
  screen: '',
  gpu: '',
  os: '',
  batteryHealth: '',
  yearReleased: '',
  notes: '',
  image: '',
}

const emptyTestimonial = {
  name: '',
  location: '',
  quote: '',
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
  const { customTestimonials, addTestimonial, removeTestimonial, storageError: testimonialStorageError } = useTestimonials()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [imageBusy, setImageBusy] = useState(false)
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial)
  const [testimonialError, setTestimonialError] = useState('')
  const [testimonialMessage, setTestimonialMessage] = useState('')
  const fileRef = useRef(null)

  const update = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [name]: value }))
  }

  const updateTestimonial = (name) => (event) => {
    const value = event.target.value
    setTestimonialForm((current) => ({ ...current, [name]: value }))
  }

  const makeSlug = (name) => {
    const base = slugify(name) || 'product'
    let slug = base
    let counter = 2
    while (products.some((p) => p.slug === slug)) slug = `${base}-${counter++}`
    return slug
  }

  const submitTestimonial = (event) => {
    event.preventDefault()
    setTestimonialError('')
    setTestimonialMessage('')
    const name = testimonialForm.name.trim()
    const location = testimonialForm.location.trim()
    const quote = testimonialForm.quote.trim()
    if (!name) return setTestimonialError('Customer name is required.')
    if (!quote) return setTestimonialError('Testimonial text is required.')
    addTestimonial({ name, location, quote })
    setTestimonialMessage(`Testimonial from ${name} was added to the home page.`)
    setTestimonialForm(emptyTestimonial)
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
    const name = form.name.trim()
    const brand = form.brand.trim()
    const price = Number(form.price)
    const oldPrice = form.oldPrice === '' ? undefined : Number(form.oldPrice)
    const stockQty = form.stock === 'sold' ? 0 : form.stockQty === '' ? null : Number(form.stockQty)
    if (!name) return setError('Product name is required.')
    if (!brand) return setError('Brand is required.')
    if (!Number.isFinite(price) || price <= 0) return setError('Enter a valid price.')
    if (oldPrice !== undefined && (!Number.isFinite(oldPrice) || oldPrice <= price)) return setError('Old price must be higher than the selling price.')
    if (stockQty !== null && (!Number.isFinite(stockQty) || stockQty < 0)) return setError('Enter a valid stock quantity.')
    addProduct({
      id: `custom-${Date.now()}`,
      slug: makeSlug(name),
      name,
      category: form.category,
      brand: brand.toUpperCase(),
      price: Math.round(price),
      oldPrice: oldPrice === undefined ? undefined : Math.round(oldPrice),
      condition: form.condition,
      specs: {
        cpu: form.cpu.trim(),
        ram: form.ram.trim(),
        storage: form.storage.trim(),
        screen: form.screen.trim(),
        gpu: form.gpu.trim(),
        os: form.os.trim(),
        batteryHealth: form.batteryHealth.trim(),
        yearReleased: form.yearReleased.trim(),
        notes: form.notes.split('\n').map((line) => line.trim()).filter(Boolean),
      },
      warranty: form.warranty.trim(),
      stock: form.stock,
      stockQty,
      images: form.image ? [form.image] : [],
      videoUrl: form.videoUrl.trim(),
      description: form.description.trim(),
      featured: form.featured,
      custom: true,
      createdAt: Date.now(),
    })
    setMessage(`${name} was added and is now live in the storefront.`)
    setForm(emptyForm)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10 pb-12 sm:px-6 sm:pb-[60px] lg:px-8">
      <Seo title="Store admin" description="Manage uploaded products." path="/admin" robots="noindex,nofollow" />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm dark:border-primary/30">
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
            <input required value={form.name} onChange={update('name')} placeholder="e.g. HP Laptop 15 Core i5 8GB 512GB" className={fieldClass} />
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
            <span className="mb-1.5 block text-sm font-semibold text-ink">Price (Tsh)</span>
            <input required type="number" min="1" step="1" value={form.price} onChange={update('price')} placeholder="1500000" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Old price (optional)</span>
            <input type="number" min="0" step="1" value={form.oldPrice} onChange={update('oldPrice')} placeholder="1800000" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Condition</span>
            <select value={form.condition} onChange={update('condition')} className={fieldClass}>
              <option value="">Not specified</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Stock status</span>
            <select value={form.stock} onChange={update('stock')} className={fieldClass}>
              <option value="in-stock">In stock</option>
              <option value="low">Low stock</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Stock quantity (optional)</span>
            <input type="number" min="0" step="1" value={form.stockQty} onChange={update('stockQty')} placeholder="e.g. 5" className={fieldClass} />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Warranty</span>
            <input value={form.warranty} onChange={update('warranty')} placeholder="e.g. 3 months" className={fieldClass} />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Short description (optional)</span>
            <textarea rows="2" value={form.description} onChange={update('description')} placeholder="Short factual description of the product." className={fieldClass} />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Short video URL (optional)</span>
            <input type="url" value={form.videoUrl} onChange={update('videoUrl')} placeholder="https://example.com/product-video.mp4" className={fieldClass} />
          </label>
          <label className="sm:col-span-2 flex items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" checked={form.featured} onChange={update('featured')} />
            Feature this product on the home page
          </label>
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Specifications</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={form.cpu} onChange={update('cpu')} placeholder="Processor" className={fieldClass} />
              <input value={form.ram} onChange={update('ram')} placeholder="RAM" className={fieldClass} />
              <input value={form.storage} onChange={update('storage')} placeholder="Storage" className={fieldClass} />
              <input value={form.screen} onChange={update('screen')} placeholder="Display" className={fieldClass} />
              <input value={form.gpu} onChange={update('gpu')} placeholder="Graphics" className={fieldClass} />
              <input value={form.os} onChange={update('os')} placeholder="Operating system" className={fieldClass} />
              <input value={form.batteryHealth} onChange={update('batteryHealth')} placeholder="Battery health" className={fieldClass} />
              <input value={form.yearReleased} onChange={update('yearReleased')} placeholder="Year released" className={fieldClass} />
            </div>
          </div>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Other specifications (optional)</span>
            <textarea rows="3" value={form.notes} onChange={update('notes')} placeholder={'One line per item\ne.g. Keyboard and mouse included'} className={fieldClass} />
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Product image (optional)</span>
            <input ref={fileRef} type="file" accept="image/*" aria-label="Product image (optional)" onChange={handleImage} className="block w-full rounded-xl border border-line bg-surface p-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary-soft file:px-3 file:py-1.5 file:font-semibold file:text-primary" />
            <p className="mt-1 text-xs text-text">{imageBusy ? 'Preparing image…' : 'Images are resized and saved in this browser.'}</p>
          </div>
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

        {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-danger dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
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
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="h-full w-full object-contain" /> : <Art kind={p.category} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-text">{catName(p.category)} · {money(p.price)} · {stockLabel(p.stock)}{p.stockQty != null ? ` (${p.stockQty})` : ''}</p>
                </div>
                <Link to={`/products/${p.slug}`} className="text-xs font-bold text-primary hover:underline">View</Link>
                <button type="button" onClick={() => removeProduct(p.slug)} className="text-xs font-bold text-danger hover:underline">Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-line bg-surface/70 p-5 shadow-sm sm:p-7" aria-labelledby="testimonial-admin-heading">
        <div className="mb-4">
          <h2 id="testimonial-admin-heading" className="text-xl text-gradient sm:text-2xl">Customer testimonials</h2>
          <p className="text-sm text-text">Add real customer feedback. Testimonials added here are saved in this browser and appear on the home page.</p>
        </div>

        {testimonialStorageError && <p className="mb-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">{testimonialStorageError}</p>}

        <form onSubmit={submitTestimonial} className="grid gap-4 rounded-2xl border border-line bg-surface/80 p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-ink">Customer name</span>
              <input required value={testimonialForm.name} onChange={updateTestimonial('name')} placeholder="e.g. Amina M." className={fieldClass} />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-ink">Location (optional)</span>
              <input value={testimonialForm.location} onChange={updateTestimonial('location')} placeholder="e.g. Sinza, Dar es Salaam" className={fieldClass} />
            </label>
          </div>
          <label>
            <span className="mb-1.5 block text-sm font-semibold text-ink">Testimonial</span>
            <textarea required rows="4" value={testimonialForm.quote} onChange={updateTestimonial('quote')} placeholder="Write the customer's feedback here." className={fieldClass} />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-gradient rounded-full px-7 py-3 font-bold">Add testimonial</button>
            <button type="button" onClick={() => { setTestimonialForm(emptyTestimonial); setTestimonialError(''); setTestimonialMessage('') }} className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-primary/30 hover:text-primary">Clear</button>
          </div>
          {testimonialError && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-danger dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">{testimonialError}</p>}
          {testimonialMessage && <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">{testimonialMessage} <Link to="/" className="underline">View home page</Link></p>}
        </form>

        <div className="mt-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink">Added testimonials ({customTestimonials.length})</h3>
          {customTestimonials.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 p-6 text-center text-sm text-text">
              No testimonials added yet. Use the form above to add the first one.
            </div>
          ) : (
            <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/80">
              {customTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex flex-wrap items-start gap-3 p-3 sm:flex-nowrap">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{testimonial.name}{testimonial.location ? ` · ${testimonial.location}` : ''}</p>
                    <p className="mt-1 text-sm text-text">“{testimonial.quote}”</p>
                  </div>
                  <button type="button" onClick={() => removeTestimonial(testimonial.id)} className="text-xs font-bold text-danger hover:underline">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
