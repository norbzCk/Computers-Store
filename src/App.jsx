import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Drawer from './components/Drawer'
import HomePage from './pages/HomePage'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/:slug" element={<Collection />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Collection />} />
      </Routes>
      <Footer />
      <Drawer />
    </CartProvider>
  )
}
