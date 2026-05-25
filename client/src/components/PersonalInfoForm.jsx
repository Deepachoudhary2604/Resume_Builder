import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data = {}, onChange, removeBackground, setRemoveBackground }) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields=[
    {key:"full_name", label:"Full Name", icon:User,type:"text", placeholder:"Enter your full name",required:true},
    {key:"email", label:"Email", icon:Mail,type:"email", placeholder:"Enter your email",required:true},
    {key:"phone", label:"Phone", icon:Phone,type:"tel", placeholder:"Enter your phone number"},
    {key:"location", label:"Location", icon:MapPin,type:"text", placeholder:"Enter your location"},
    {key:"profession", label:"Profession", icon:BriefcaseBusiness,type:"text", placeholder:"Enter your profession"},
    {key:"linkedin", label:"LinkedIn", icon:Linkedin,type:"url", placeholder:"Enter your LinkedIn profile URL"},
    {key:"website", label:"Website", icon:Globe,type:"url", placeholder:"Enter your personal website URL"}
  ]

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Info</h3>
      <p className='text-sm text-gray-600'>Get started with personal information</p>

      <div className='flex items-center gap-2'>
        <label htmlFor="profileImage" className='cursor-pointer'>
          {data.image ? (
            <img
              src={typeof data.image === 'string'
                ? data.image
                : URL.createObjectURL(data.image)}
              alt="user"
              className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'
            />
          ) : (
            <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700'>
              <User className='size-10 p-2.5 border rounded-full' />
              Upload User Image
            </div>
          )}

          <input
            id="profileImage"
            type="file"
            accept='image/jpeg, image/png'
            className='hidden'
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === 'object' && (
          <div className='flex flex-col gap-1 pl-4 text-sm'>
            <p>Remove background</p>

            <label className='relative inline-flex items-center cursor-pointer gap-3'>
              <input
                type="checkbox"
                className='sr-only peer'
                checked={removeBackground}
                onChange={() => setRemoveBackground(prev => !prev)}
              />

              <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200'></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4'></span>
            </label>
          </div>
        )}
      </div>
      {fields.map((field) => {
        const Icon = field.icon;
        return (
            <div key={field.key} className='space-y-1 mt-5'>
                <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                    <Icon className='size-4' />
                    {field.label}
                    {field.required && <span className='text-red-500'>*</span>}
                </label>
                <input type={field.type} name={field.key} id={field.key} value={data[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)} placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'/>
            </div>
        )
      })}
    </div>
  )
}

export default PersonalInfoForm
