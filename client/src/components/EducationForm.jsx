import { GraduationCap, Plus, Trash } from "lucide-react"
import React from "react"

const EducationForm = ({ data = [], onChange }) => {

  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: "",
      },
    ])
  }

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your education details
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Education List */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <GraduationCap className="size-10 mx-auto mb-2" />
          <p>No education added yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-xl p-5 space-y-4"
            >

              {/* Delete */}
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash className="size-4" />
              </button>

              <h4 className="font-medium text-gray-800">
                Education #{index + 1}
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  type="text"
                  placeholder="Institution Name"
                  className="p-3 border rounded-lg text-sm"
                />

                <input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="p-3 border rounded-lg text-sm"
                />

                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="p-3 border rounded-lg text-sm"
                />

                <input
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  type="month"
                  className="p-3 border rounded-lg text-sm"
                />

                <input
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  type="text"
                  placeholder="GPA (optional)"
                  className="p-3 border rounded-lg text-sm md:col-span-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default EducationForm
