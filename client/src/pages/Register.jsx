import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Eye, EyeOff, Lock, Mail, Sparkles, User } from 'lucide-react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await register(name, email, password)
            navigate('/app')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Left Side - Brand/Illustration */}
            <div className="hidden lg:flex w-1/2 bg-purple-600 relative overflow-hidden flex-col justify-between p-12">
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
                        Start building your career today.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-purple-100 text-lg"
                    >
                        Join thousands of professionals who have successfully landed their dream jobs using our intelligent ATS-optimized builder.
                    </motion.p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-4 opacity-90 text-white">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <p className="text-3xl font-bold mb-1">320+</p>
                        <p className="text-sm text-purple-200">Custom Components</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <p className="text-3xl font-bold mb-1">99%</p>
                        <p className="text-sm text-purple-200">ATS Success Rate</p>
                    </div>
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
                        <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-8">
                            <Sparkles className="w-6 h-6" />
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ResumeAI</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create an account</h2>
                        <p className="text-slate-500 dark:text-slate-400">Enter your details to get started for free.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {error}
                            </motion.div>
                        )}
                        
                        <div className="relative">
                            <Input 
                                label="Full Name"
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="John Doe"
                                className="pl-11"
                                required
                            />
                            <User className="absolute left-4 top-9 w-5 h-5 text-slate-400" />
                        </div>

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

                        <Button type="submit" variant="secondary" className="w-full mt-2" isLoading={loading}>
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link to="/app?state=login" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline transition-all">
                            Log in instead
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Register
