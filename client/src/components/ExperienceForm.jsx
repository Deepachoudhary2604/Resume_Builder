import { Briefcase, Plus, Sparkles, Trash, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../configs/config'
import { useAuth } from '../context/AuthContext'

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useAuth()
  const [loadingAi, setLoadingAi] = useState(null)

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ])
  }

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleEnhanceWithAI = async (index) => {
    const experience = data[index]
    if (!experience.description) return
    
    setLoadingAi(index)
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/optimize`, { content: experience.description }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateExperience(index, "description", res.data.optimizedContent)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingAi(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience here</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          <Plus className="size-4" />
          Add experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Briefcase className="size-10 mx-auto mb-4" />
          <p>No experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">

              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company"
                  className="p-2 border rounded-lg"
                />

                <input
                  value={experience.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Position"
                  className="p-2 border rounded-lg"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  className="p-2 border rounded-lg"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  disabled={experience.is_current}
                  className="p-2 border rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                />
                Current Position
              </label>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium">Job Description</label>
                  <button 
                    onClick={() => handleEnhanceWithAI(index)}
                    disabled={loadingAi === index || !experience.description}
                    className="flex items-center gap-1 text-xs text-purple-700 hover:text-purple-800 disabled:opacity-50"
                  >
                    {loadingAi === index ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} 
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg resize-none"
                  placeholder="Describe your role and achievements"
                />
              </div>

            </div>
          ))}
        </div> 
      )}
    </div>
  )
}

export default ExperienceForm
 