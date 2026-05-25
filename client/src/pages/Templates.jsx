import React from 'react';
import { LayoutTemplate } from 'lucide-react';

const Templates = () => {
  const templates = [
    { id: 1, name: 'Classic Professional', category: 'Classic', color: 'bg-blue-100' },
    { id: 2, name: 'Modern Minimal', category: 'Minimalist', color: 'bg-gray-100' },
    { id: 3, name: 'Creative Tech', category: 'Creative', color: 'bg-green-100' },
    { id: 4, name: 'Executive Suite', category: 'Modern', color: 'bg-purple-100' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Templates</h1>
        <p className="text-gray-500 mt-2">Choose a professionally designed template to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="group cursor-pointer">
            <div className={`aspect-[1/1.4] ${tpl.color} rounded-2xl border border-gray-200 overflow-hidden relative transition-all group-hover:shadow-xl group-hover:border-green-500/50`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                  Use Template
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-gray-900">{tpl.name}</h3>
              <p className="text-sm text-gray-500">{tpl.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
