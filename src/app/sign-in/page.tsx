"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaEnvelope, FaLock } from "react-icons/fa"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("Email ou mot de passe incorrect")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-lg">
        <div className="card-body">
          <h1 className="card-title text-center text-4xl font-extrabold mb-6 text-primary">
            Connexion
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input input-bordered w-full pl-10"
              />
            </label>

            <label className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pl-10"
              />
            </label>

            {error && <p className="text-error text-sm mt-1">{error}</p>}

            <button type="submit" className="btn btn-primary w-full text-lg font-semibold">
              Se connecter
            </button>
          </form>

          <div className="divider my-8">OU</div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => signIn("google")}
              className="btn btn-outline btn-error flex items-center justify-center gap-3 text-lg font-medium"
              type="button"
            >
              <FcGoogle size={24} />
              Se connecter avec Google
            </button>

            <button
              onClick={() => signIn("github")}
              className="btn btn-outline btn-neutral flex items-center justify-center gap-3 text-lg font-medium"
              type="button"
            >
              <FaGithub size={24} />
              Se connecter avec GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
