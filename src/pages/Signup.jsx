import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    alert('Signup functionality is not wired up yet.')
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <Seo title="Create account" description="Create a Billionaire's Computers account." path="/signup" robots="noindex,nofollow" />
      <div className="relative mx-auto max-w-[600px]">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-violet/20 to-sun/20 blur-2xl" />
        <div className="panel-gradient relative overflow-hidden rounded-3xl border border-line p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl text-gradient mb-2">Create Account</h1>
          <p className="mb-6 text-text">Sign up to get started</p>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm text-ink">First Name</label>
                <input required value={form.firstName} onChange={update('firstName')} className="w-full rounded-xl border border-line bg-surface p-3 focus:border-primary" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink">Last Name</label>
                <input required value={form.lastName} onChange={update('lastName')} className="w-full rounded-xl border border-line bg-surface p-3 focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink">Email</label>
              <input required type="email" value={form.email} onChange={update('email')} className="w-full rounded-xl border border-line bg-surface p-3 focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink">Password</label>
              <input required type="password" value={form.password} onChange={update('password')} className="w-full rounded-xl border border-line bg-surface p-3 focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink">Confirm Password</label>
              <input required type="password" value={form.confirmPassword} onChange={update('confirmPassword')} className="w-full rounded-xl border border-line bg-surface p-3 focus:border-primary" />
            </div>
            <button type="submit" className="btn-gradient w-full rounded-full px-6 py-3.5 font-bold">Sign Up</button>
          </form>
          <p className="mt-6 text-sm">Already have an account? <Link to="/login" className="font-semibold text-primary transition hover:text-violet hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  )
}
