import { useEffect } from 'react'
import { store } from '../data'

const defaultDescription = `${store.name} sells laptops, desktops, Macbooks, printers, toners and accessories in ${store.address}.`
const defaultImage = `${store.url}${encodeURI("/Billionaire's computers logo.png")}`

const absoluteUrl = (value) => {
  if (!value) return defaultImage
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith('data:')) return defaultImage
  return `${store.url}${value.startsWith('/') ? '' : '/'}${encodeURI(value)}`
}

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({
  title,
  description = defaultDescription,
  path = '/',
  image,
  type = 'website',
  robots = 'index,follow',
  jsonLd,
}) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} | ${store.name}` : `${store.name} | Computers and accessories in Dar es Salaam`
    const canonicalUrl = `${store.url}${path === '/' ? '' : path}`
    const imageUrl = absoluteUrl(image)

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:site_name', store.name)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', `${store.name} logo`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    const existingScript = document.getElementById('seo-jsonld')
    if (existingScript) existingScript.remove()
    if (jsonLdText) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'seo-jsonld'
      script.textContent = jsonLdText
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById('seo-jsonld')?.remove()
    }
  }, [title, description, path, image, type, robots, jsonLdText])

  return null
}
