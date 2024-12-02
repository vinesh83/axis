import React from 'react';

interface AxisLogoProps {
  className?: string;
  textClassName?: string;
}

const AxisLogo = ({ className = "h-8 w-8", textClassName = "text-xl" }: AxisLogoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        viewBox="0 0 32 32"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          className="fill-indigo-500"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2))' }}
        />
        
        {/* Stylized "A" */}
        <path
          d="M11 22L16 8L21 22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 18H19"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-bold tracking-tight ${textClassName}`}>
        Axis
      </span>
    </div>
  );
};

export default AxisLogo;