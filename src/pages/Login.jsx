import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Login functionality is not wired up yet.')
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <Seo title="Login" description="Access your Billionaire's Computers account." path="/login" robots="noindex,nofollow" />
      <div className="relative mx-auto max-w-[500px]">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-violet/20 to-sun/20 blur-2xl" />
        <div className="panel-gradient relative overflow-hidden rounded-3xl border border-line p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl text-gradient mb-2">Login</h1>
          <p className="mb-6 text-text">Access your account</p>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm text-ink">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-line bg-surface p-3 placeholder:text-text/60 focus:border-primary"
              />
            </div>
            <button type="submit" className="btn-gradient w-full rounded-full px-6 py-3.5 font-bold">Login</button>
          </form>
          <p className="mt-6 text-sm">Don't have an account? <Link to="/signup" className="font-semibold text-primary transition hover:text-violet hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}
