import { FolderIcon, Plus, Trash } from "lucide-react"
import React from "react"

const ProjectsForm = ({ data = [], onChange }) => {

  const addProject = () => {
    onChange([
      ...data,
      { name: "", type: "", description: "" },
    ])
  }

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateProject = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Body */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <FolderIcon className="size-10 mx-auto mb-2" />
          <p>No projects added yet</p>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          {data.map((project, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-xl p-5 space-y-4"
            >
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash className="size-4" />
              </button>

              <h4 className="font-medium text-gray-800">
                Project #{index + 1}
              </h4>

              <div className="grid gap-3">
                <input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="p-3 border rounded-lg text-sm"
                />

                <input
                  value={project.type}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  placeholder="Project Type (Web, App, ML, etc.)"
                  className="p-3 border rounded-lg text-sm"
                />

                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe your project..."
                  className="p-3 border rounded-lg text-sm resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsForm
