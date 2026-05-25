import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, Sparkles, User, Settings, LogOut, 
  Plus, UploadCloud, MoreVertical, Edit2, Trash2, 
  BarChart, ExternalLink, Menu, Moon, Sun
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'
import { API_BASE_URL } from '../configs/config'

const Dashboard = () => {
  const { user, token, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [title, setTitle] = useState('')

  const getResumes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/resumes`, { headers: { Authorization: `Bearer ${token}` } })
      setResumes(res.data.resumes || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getResumes()
  }, [])

  const handleCreateResume = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_BASE_URL}/api/resumes`, { title }, { headers: { Authorization: `Bearer ${token}` } })
      setShowCreateModal(false)
      navigate(`/app/builder/${res.data.resume._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUploadResume = async (e) => {
    e.preventDefault()
    if (!resumeFile) return
    const formData = new FormData()
    formData.append('resumePdf', resumeFile)
    
    try {
      // 1. Parse PDF
      const parseRes = await axios.post(`${API_BASE_URL}/api/ai/parse`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      
      const parsedData = parseRes.data.data

      // 2. Create Resume with parsed data
      const createRes = await axios.post(`${API_BASE_URL}/api/resumes`, {
        title,
        personal_info: parsedData.personal_info,
        professional_summary: parsedData.professional_summary,
        skills: parsedData.skills,
        experience: parsedData.experience,
        education: parsedData.education
      }, { headers: { Authorization: `Bearer ${token}` } })

      setShowUploadModal(false)
      navigate(`/app/builder/${createRes.data.resume._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/resumes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      getResumes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      
      {/* SIDEBAR */}
      <div className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-10">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ResumeAI</span>
          </Link>

          <div className="space-y-2">
            <Link to="/app" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 font-medium">
              <FileText className="w-5 h-5" />
              My Resumes
            </Link>
            <Link to="/app/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-colors">
              <User className="w-5 h-5" />
              Profile
            </Link>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={() => { logout(); navigate('/') }}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 lg:px-10">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">Workspace</h1>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 flex items-center gap-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none">
                <div className="p-3 bg-white/20 rounded-xl"><FileText className="w-6 h-6" /></div>
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Total Resumes</p>
                  <p className="text-3xl font-bold">{resumes.length}</p>
                </div>
              </Card>
              <Card className="p-6 flex items-center gap-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl"><BarChart className="w-6 h-6" /></div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg ATS Score</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">--</p>
                </div>
              </Card>
            </div>

            {/* Resume Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recent Documents</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* Create New Card */}
                <Card 
                  hoverEffect 
                  onClick={() => {setTitle(''); setShowCreateModal(true)}}
                  className="h-64 flex flex-col items-center justify-center cursor-pointer border-dashed border-2 bg-slate-50 hover:bg-indigo-50/50 dark:bg-slate-900/20 dark:hover:bg-indigo-900/10 border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Create New</p>
                  <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
                </Card>

                {/* Upload Card */}
                <Card 
                  hoverEffect 
                  onClick={() => {setTitle(''); setShowUploadModal(true)}}
                  className="h-64 flex flex-col items-center justify-center cursor-pointer border-dashed border-2 bg-slate-50 hover:bg-purple-50/50 dark:bg-slate-900/20 dark:hover:bg-purple-900/10 border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Upload PDF</p>
                  <p className="text-sm text-slate-500 mt-1">Parse with AI</p>
                </Card>

                {/* Existing Resumes */}
                {resumes.map(resume => (
                  <Card key={resume._id} hoverEffect className="h-64 flex flex-col overflow-hidden relative group">
                    <div 
                      className="flex-1 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative cursor-pointer"
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                    >
                      <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Button variant="primary" size="sm">Open Editor</Button>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white truncate max-w-[150px]">{resume.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => handleDelete(resume._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Resume">
        <form onSubmit={handleCreateResume} className="space-y-6">
          <Input 
            label="Resume Title" 
            placeholder="e.g. Software Engineer 2026" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            autoFocus 
          />
          <Button type="submit" variant="primary" className="w-full">Create Document</Button>
        </form>
      </Modal>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload PDF">
        <form onSubmit={handleUploadResume} className="space-y-6">
          <Input 
            label="Resume Title" 
            placeholder="e.g. Uploaded Resume" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">PDF File</label>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={(e) => setResumeFile(e.target.files[0])} 
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
              required 
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">Upload & Parse</Button>
        </form>
      </Modal>

    </div>
  )
}

export default Dashboard
