import React from "react"
import { useParams } from "react-router-dom"
import { dummyResumeData } from "../assets/assets"
import ResumePreview from "../components/ResumePreview"
import { ArrowLeftIcon } from "lucide-react"

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = React.useState(true)
  const [resumedata, setResumedata] = React.useState(null)

  const loadResume = () => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    )
    setResumedata(resume || null)
    setIsLoading(false)
  }

  React.useEffect(() => {
    loadResume()
  }, [resumeId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return resumedata ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumedata}
          template={resumedata.template}
          accentColor={resumedata.accent_color} // ✅ FIX
          className="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-center mt-10">Resume not found.</p>
      <a
        href="/app"
        className="mt-4 text-blue-600 hover:underline flex items-center"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Go Back
      </a>
    </div>
  )
}

export default Preview
