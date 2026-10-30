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
import Contact from './pages/Contact'
import Delivery from './pages/Delivery'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

export default function App() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
          <Header />
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
          <Footer />
          <FloatingWhatsApp />
          <Drawer />
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  )
}
