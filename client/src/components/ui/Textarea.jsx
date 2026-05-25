import React from 'react';

export const Textarea = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  id, 
  ...props 
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 
          border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'}
          text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600
          transition-all duration-300 outline-none focus:ring-4 resize-none min-h-[120px]
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
