import React from 'react';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export function AccessibleButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ariaLabel,
  ariaDescribedBy,
  ...props 
}: AccessibleButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:bg-gray-200",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100 focus:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm min-h-[32px]",
    md: "h-10 px-4 py-2 min-h-[40px]",
    lg: "h-12 px-6 text-lg min-h-[48px]"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </button>
  );
} 