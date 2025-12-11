'use client'

import { FormEvent, useState } from 'react'

export default function page() {

    const [email, setEmail] = useState<string>("hire-me@anshumat.org");
    const [password, setPassword] = useState<string>("HireMe@2025!");
    const [error, setError] = useState<string>("");

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        setError("")

    }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground p-6 rounded-xl w-80 shadow border border-border mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  )
}
