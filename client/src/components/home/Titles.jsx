import React from 'react'

const Titles = ({title,description}) => {
  return (
    <div className='text-center mt-6 text-slate-700'>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-lg text-slate-600">{description}</p>
    </div>
  )
}

export default Titles
