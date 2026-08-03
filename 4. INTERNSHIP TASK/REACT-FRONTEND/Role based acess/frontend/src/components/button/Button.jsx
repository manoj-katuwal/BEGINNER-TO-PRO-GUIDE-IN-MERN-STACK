import React from 'react';

const Button = ({ text, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-full transition-all duration-300 font-bold text-sm md:text-lg px-6 py-3 md:px-8 md:py-4 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    outline: 'btn btn-outline'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`.trim()}
    >
      {text}
    </button>
  );
};

export default Button;
