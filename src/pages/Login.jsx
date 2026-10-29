import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Login functionality is not wired up yet.')
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-[500px] mx-auto bg-white border border-line p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl text-primary mb-2">Login</h1>
        <p className="text-text mb-6">Access your account</p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm mb-1 text-ink">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-line"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-ink">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-line"
            />
          </div>
          <button type="submit" className="inline-block bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover">Login</button>
        </form>
        <p className="mt-6 text-sm">Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link></p>
      </div>
    </div>
  )
}
