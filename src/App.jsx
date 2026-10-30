import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Drawer from './components/Drawer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import HomePage from './pages/HomePage'
import Collection from './pages/Collection'
import Product from './pages/Product'
const Contact = lazy(() => import('./pages/Contact'))
const Delivery = lazy(() => import('./pages/Delivery'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Admin = lazy(() => import('./pages/Admin'))

export default function App() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
          <Header />
          <Suspense fallback={<div className="mx-auto max-w-[1420px] px-4 py-16 text-center text-text">Loading…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections/:slug" element={<Collection />} />
              <Route path="/products/:slug" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Collection />} />
            </Routes>
          </Suspense>
          <Footer />
          <FloatingWhatsApp />
          <Drawer />
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  )
}
