import { Check, Palette } from "lucide-react"
import React, { useState } from "react"

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#CB2EE0" },
    { name: "Green", value: "#36C531" },
    { name: "Red", value: "#E22828" },
    { name: "Orange", value: "#DF623C" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#CA52C8" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 hover:ring ring-purple-300 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-20 grid grid-cols-4 gap-2 p-3 w-60 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer flex flex-col items-center"
              onClick={() => {
                onChange(color.value)
                setIsOpen(false)
              }}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color.value }}
              />

              {selectedColor === color.value && (
                <div className="absolute top-1.5">
                  <Check className="w-5 h-5 text-white drop-shadow" />
                </div>
              )}

              <p className="text-xs mt-1 text-gray-600">{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
