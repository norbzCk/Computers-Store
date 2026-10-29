import { useState } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="max-w-[600px] mx-auto bg-white border border-line p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl text-brand mb-2">Create Account</h1>
        <p className="text-text mb-6">Sign up to get started</p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-ink">First Name</label>
              <input required value={form.firstName} onChange={update('firstName')} className="w-full p-3 border border-line" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-ink">Last Name</label>
              <input required value={form.lastName} onChange={update('lastName')} className="w-full p-3 border border-line" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-ink">Email</label>
            <input required type="email" value={form.email} onChange={update('email')} className="w-full p-3 border border-line" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-ink">Password</label>
            <input required type="password" value={form.password} onChange={update('password')} className="w-full p-3 border border-line" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-ink">Confirm Password</label>
            <input required type="password" value={form.confirmPassword} onChange={update('confirmPassword')} className="w-full p-3 border border-line" />
          </div>
          <button type="submit" className="inline-block bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark">Sign Up</button>
        </form>
        <p className="mt-6 text-sm">Already have an account? <Link to="/login" className="text-brand hover:underline">Login</Link></p>
      </div>
    </div>
  )
}
