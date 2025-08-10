'use client'
import { log } from 'console'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res=await fetch("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",

                },
                body:JSON.stringify({
                    email,password
                })
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "Registration failed")
            }
            console.log(data)
            router.push("/login")


        } catch (error) {
            console.log(error)
            
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage