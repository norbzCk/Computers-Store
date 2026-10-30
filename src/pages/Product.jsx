import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { store } from '../data'
import { useCart } from '../context/CartContext'
import Art from '../components/Art'
import Card from '../components/Card'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Seo from '../components/Seo'
import { catName, conditionLabel, isInStock, isSold, money, productWhatsAppUrl, specEntries, specNotes, stockLabel } from '../utils'
import { useProducts } from '../context/ProductsContext'

export default function Product() {
  const { products } = useProducts()
  const { slug } = useParams()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [tone, setTone] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const p = products.find((x) => x.slug === slug)
  if (!p) return <div className="max-w-[1420px] mx-auto px-4 sm:px-5"><Seo title="Product not found" description="This product could not be found. Browse all products at Billionaire's Computers." robots="noindex,follow" /><div className="panel-gradient my-6 rounded-2xl border border-line p-6 shadow-sm sm:my-[30px] sm:p-[30px]">Product not found. <Link to="/collections/all" className="font-semibold text-primary hover:text-violet hover:underline">Browse all products</Link></div></div>
  const sold = isSold(p)
  const images = p.images || []
  const currentImage = images[Math.min(activeImage, Math.max(images.length - 1, 0))]
  const condition = conditionLabel(p.condition)
  const stockText = p.stockQty != null ? `${stockLabel(p.stock)} · ${p.stockQty} unit${p.stockQty === 1 ? '' : 's'}` : stockLabel(p.stock)
  const details = [
    ...specEntries(p),
    ...(condition ? [['Condition', condition]] : []),
    ...(p.warranty ? [['Warranty', p.warranty]] : []),
    ...(isInStock(p) && p.stockQty != null ? [['Stock', stockText]] : []),
  ]
  const notes = specNotes(p)
  const rel = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4)
  const seoImage = p.images?.[0] && !p.images[0].startsWith('data:') ? p.images[0] : undefined
  const seoDescription = p.description || `${p.name} at ${store.name} in ${store.address}. Price ${money(p.price)}. Contact us on WhatsApp to confirm availability.`
  const availability = isSold(p) ? 'SoldOut' : isInStock(p) ? (p.stock === 'low' ? 'LimitedAvailability' : 'InStock') : 'OutOfStock'
  const conditionSchema = { new: 'NewCondition', used: 'UsedCondition', refurbished: 'RefurbishedCondition' }[p.condition]
  const seoJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: p.name,
        sku: p.id,
        brand: { '@type': 'Brand', name: p.brand },
        category: catName(p.category),
        url: `${store.url}/products/${p.slug}`,
        description: seoDescription,
        ...(seoImage ? { image: seoImage.startsWith('http') ? seoImage : `${store.url}${seoImage.startsWith('/') ? '' : '/'}${seoImage}` } : {}),
        ...(conditionSchema ? { itemCondition: `https://schema.org/${conditionSchema}` } : {}),
        additionalProperty: specEntries(p).map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
        offers: {
          '@type': 'Offer',
          url: `${store.url}/products/${p.slug}`,
          priceCurrency: 'TZS',
          price: p.price,
          availability: `https://schema.org/${availability}`,
          seller: { '@type': 'Organization', name: store.name },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: store.url },
          { '@type': 'ListItem', position: 2, name: catName(p.category), item: `${store.url}/collections/${p.category}` },
          { '@type': 'ListItem', position: 3, name: p.name, item: `${store.url}/products/${p.slug}` },
        ],
      },
    ],
  }
  return (
    <div className="max-w-[1420px] mx-auto px-4 sm:px-5">
      <Seo title={p.name} description={seoDescription} path={`/products/${p.slug}`} image={seoImage} type="product" jsonLd={seoJsonLd} />
      <div className="py-4 sm:py-[22px] sm:pb-[20px]">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:text-sm">
          <Link to="/" className="font-medium text-primary transition hover:text-violet">Home</Link>
          <span className="text-text/50">›</span>
          <Link to={`/collections/${p.category}`} className="font-medium text-primary transition hover:text-violet">{catName(p.category)}</Link>
          <span className="text-text/50">›</span>
          <span className="font-semibold text-ink">{p.name.length > 40 ? `${p.name.slice(0, 40)}…` : p.name}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-[30px] items-start">
        <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line shadow-sm">
          <div className="p-5 sm:p-[30px]">
            <div className="art-stage relative aspect-[4/3] grid place-items-center rounded-2xl p-4 sm:p-8">
              {sold && <span className="absolute top-3 right-3 rounded-full bg-slate-500 px-3 py-1 text-xs font-bold text-white dark:bg-slate-600">Sold</span>}
              {currentImage ? <img src={currentImage} alt={`${p.name}${images.length > 1 ? ` image ${activeImage + 1}` : ''}`} decoding="async" className="h-full w-full rounded-xl object-contain" /> : <Art kind={p.category} tone={tone} />}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5" aria-label="Product image gallery">
                {images.map((src, index) => (
                  <button key={`${src.slice(0, 40)}-${index}`} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}`} aria-pressed={activeImage === index} className={`grid h-12 w-16 place-items-center overflow-hidden rounded-lg border bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow ${activeImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-line'}`}>
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            {images.length === 0 && (
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                {[0, 1, 2].map((t) => <button key={t} onClick={() => setTone(t)} aria-label={`Image ${t + 1}`} className={`grid h-10 w-14 place-items-center overflow-hidden rounded-lg border bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow sm:h-12 sm:w-16 ${tone === t ? 'border-primary ring-2 ring-primary/20' : 'border-line'}`}><Art kind={p.category} tone={t} /></button>)}
              </div>
            )}
            {p.videoUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-line bg-black">
                <video controls playsInline preload="metadata" poster={currentImage || undefined} className="aspect-video w-full">
                  <source src={p.videoUrl} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
        <div className="panel-gradient relative overflow-hidden rounded-2xl border border-line p-5 shadow-lg sm:p-[30px]">
          <h1 className="text-xl sm:text-2xl md:text-[28px] text-gradient mb-3 leading-tight">{p.name}</h1>
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            {p.oldPrice && <span className="badge-sale inline-block rounded-full px-3 py-1 text-xs font-bold sm:text-sm">Save {money(p.oldPrice - p.price)}</span>}
            {condition && <span className="rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-bold text-ink">{condition}</span>}
            {isInStock(p) && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-1 dark:ring-emerald-800/60">{stockText}</span>}
            {sold && <span className="rounded-full bg-slate-500 px-3 py-1 text-xs font-bold text-white dark:bg-slate-600">Sold</span>}
          </div>
          <div className="text-xs uppercase border-b border-line pb-4 mb-4">{store.name}</div>
          <div className="text-2xl font-bold sm:text-[28px]"><span className="price-gradient">{money(p.price)}</span>{p.oldPrice && <s className="ml-2.5 text-lg text-slate-400 dark:text-white/45">{money(p.oldPrice)}</s>}</div>
          {!sold && <div className="flex gap-4 items-center my-5"><b>Quantity:</b><select value={qty} onChange={(e) => setQty(+e.target.value)} className="rounded-xl border border-line bg-surface px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select></div>}
          <div className={`flex flex-wrap gap-3 ${sold ? 'mt-5' : ''}`}>
            <button className="btn-gradient inline-block rounded-full px-8 py-3.5 font-bold" disabled={sold} onClick={() => add(p, qty)}>{sold ? 'Sold out' : 'Add to cart'}</button>
            <a href={productWhatsAppUrl(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md">
              <WhatsAppIcon /> {sold ? 'Ask for similar' : 'Chat on WhatsApp'}
            </a>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-wide sm:text-[11px]">
            <div className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-primary">Warranty</div>
            <Link to="/delivery" className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-violet transition hover:border-violet/30 hover:bg-violet/5">Delivery info</Link>
            <div className="rounded-xl border border-line bg-surface/80 px-2 py-2 text-sky">Secure payment</div>
          </div>
        </div>
      </div>
      <div className="panel-gradient relative my-6 overflow-hidden rounded-2xl border border-line shadow-sm sm:my-[30px]">
        <div className="p-5 sm:p-[30px]">
          <h2 className="text-xl sm:text-2xl text-gradient mb-3">Description and specifications</h2>
          {p.description && <p className="mb-4 text-text">{p.description}</p>}
          {details.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-line">
                  {details.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row" className="w-2/5 bg-surface/70 px-4 py-3 font-semibold text-ink sm:w-1/3">{label}</th>
                      <td className="px-4 py-3 text-text">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-text">Specifications will be confirmed on request.</p>
          )}
          {notes.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 marker:text-primary dark:marker:text-sky-300">{notes.map((note) => <li key={note}>{note}</li>)}</ul>}
        </div>
      </div>
      {rel.length > 0 && <>
        <div className="mb-3 flex items-end gap-4">
          <h2 className="text-xl sm:text-2xl text-gradient">You may also like</h2>
        </div>
        <div className="panel-gradient mb-10 overflow-hidden rounded-2xl border border-line p-2 shadow-lg sm:mb-[50px] sm:p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {rel.map((x) => <Card key={x.slug} p={x} />)}
          </div>
        </div>
      </>}
    </div>
  )
}
