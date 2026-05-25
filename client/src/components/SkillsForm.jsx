import { Plus, Trash, Sparkles, Loader2 } from "lucide-react"
import React, { useState } from "react"
import axios from 'axios'
import { API_BASE_URL } from '../configs/config'
import { useAuth } from '../context/AuthContext'

const SkillsForm = ({ data = [], onChange, fullData }) => {
  const { token } = useAuth()
  const [skillInput, setSkillInput] = useState("")
  const [loadingAi, setLoadingAi] = useState(false)

  const addSkill = () => {
    if (!skillInput.trim()) return
    onChange([...data, skillInput.trim()])
    setSkillInput("")
  }

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleRecommendSkills = async () => {
    setLoadingAi(true)
    try {
      const role = fullData?.personal_info?.profession || "Professional"
      const res = await axios.post(`${API_BASE_URL}/api/ai/skills`, { 
        role, 
        currentSkills: data.length > 0 ? data : ["None"]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const recommended = res.data.skills || []
      // filter out skills already present (case-insensitive)
      const currentLower = data.map(s => s.toLowerCase())
      const newSkills = recommended.filter(s => !currentLower.includes(s.toLowerCase()))
      
      if (newSkills.length > 0) {
        onChange([...data, ...newSkills])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingAi(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Skills</h3>
          <p className="text-sm text-gray-500">
            Add your technical and soft skills
          </p>
        </div>
        <button
          onClick={handleRecommendSkills}
          disabled={loadingAi}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50 transition-colors"
        >
          {loadingAi ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Suggest Skills
        </button>
      </div>

      <div className="flex gap-3">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter a skill (e.g., JavaScript)"
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Sparkles className="size-10 mx-auto mb-3" />
          <p>No skills added yet.</p>
        </div>
      ) : (
        data.map((skill, i) => (
          <div
            key={i}
            className="flex justify-between items-center border px-4 py-2 rounded-lg"
          >
            <span>{skill}</span>
            <button onClick={() => removeSkill(i)}>
              <Trash className="size-4 text-red-500" />
            </button>
          </div>
        ))
      )}

      <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
        <strong>Tip:</strong> Add 8–12 relevant skills
      </div>
    </div>
  )
}

export default SkillsForm
