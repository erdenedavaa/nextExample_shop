import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // No custom props
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className='bg-green-500 px-4 py-2 text-gray-100 rounded hover:bg-green-800 my-4'
    >
      {children}
    </button>
  )
}

export default Button
