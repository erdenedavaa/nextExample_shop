import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // no custom props
}

const Input: React.FC<InputProps> = ({ type, required, value, onChange }) => {
  return (
    <input
      type={type}
      required={required} 
      value={value}
      onChange={onChange}
      className='border rounded px-3 py-1 w-80'
    />
  )
}

// const Input: React.FC<InputProps> = (props) => {
//   return <input {...props} className='border rounded px-3 py-1 w-80' />
// }

export default Input
