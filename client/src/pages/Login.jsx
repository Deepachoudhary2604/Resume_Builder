import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await login(email, password)
            navigate('/app')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Left Side - Brand/Illustration */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
                
                <Link to="/" className="relative z-10 flex items-center gap-2 text-white">
                    <Sparkles className="w-8 h-8" />
                    <span className="text-2xl font-bold tracking-tight">ResumeAI</span>
                </Link>

                <div className="relative z-10 text-white max-w-lg">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold leading-tight mb-6"
                    >
                        Welcome back to your workspace.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-indigo-100 text-lg"
                    >
                        Log in to continue building and optimizing your resumes with the power of artificial intelligence.
                    </motion.p>
                </div>

                <div className="relative z-10 flex -space-x-3 opacity-80">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user" className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover" />
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user" className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover" />
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-800 flex items-center justify-center text-xs font-bold text-white">+1k</div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8">
                            <Sparkles className="w-6 h-6" />
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ResumeAI</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Log in</h2>
                        <p className="text-slate-500 dark:text-slate-400">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {error}
                            </motion.div>
                        )}
                        
                        <div className="relative">
                            <Input 
                                label="Email address"
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="name@example.com"
                                className="pl-11"
                                required
                            />
                            <Mail className="absolute left-4 top-9 w-5 h-5 text-slate-400" />
                        </div>

                        <div className="relative">
                            <Input 
                                label="Password"
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                className="pl-11"
                                required
                            />
                            <Lock className="absolute left-4 top-9 w-5 h-5 text-slate-400" />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
                        </div>

                        <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                            Log in
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/app?state=register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all">
                            Sign up for free
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
