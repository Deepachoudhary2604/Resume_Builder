import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../configs/config'

const ProfessionalSummaryForm = ({data = "", onChange, setResumeData}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAiEnhance = async () => {
    if (!data || data.trim() === "") {
      alert("Please enter some text first for the AI to enhance.");
      return;
    }

    setIsEnhancing(true);
    try {
      const token = localStorage.getItem("token")
      const config = { headers: {} }
      if (token) config.headers.Authorization = `Bearer ${token}`

      const res = await axios.post(`${API_BASE_URL}/api/ai/optimize`, { content: data }, config);
      onChange(res.data.optimizedContent);
    } catch (error) {
      console.error(error);
      alert("Failed to enhance summary.");
    } finally {
      setIsEnhancing(false);
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
            <p className='text-sm text-gray-500'>Add summary for your resume here</p>

        </div>
        <button 
          onClick={handleAiEnhance}
          disabled={isEnhancing}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'
        >
            <Sparkles className='size-4' />
            {isEnhancing ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>
      <div className='mt-6'>
        <textarea value={data || ""} onChange={(e)=>onChange(e.target.value)} rows={7} name="" id="" className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-color resize-none' placeholder='Write a compelling professional summary that highlights your key strength and career objectives...'/>
        <p className='text-xs text-gray-500 max-w-4/5 max-auto text-center'>Tip: Keep it concise(3-4) sentences and focus on your most relevant achievements and skills</p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
