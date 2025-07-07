"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TouchFriendlyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'large' | 'compact';
}

export function TouchFriendlyInput({
  label,
  helperText,
  error,
  icon,
  variant = 'default',
  className,
  ...props
}: TouchFriendlyInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    default: "h-12 px-4 text-base",
    large: "h-16 px-6 text-lg",
    compact: "h-10 px-3 text-sm"
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          className={cn(
            "w-full border border-gray-300 rounded-lg transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500",
            "placeholder:text-gray-400",
            // 터치 최적화
            "touch-manipulation",
            // 아이콘이 있을 때 패딩 조정
            icon ? "pl-10" : "",
            variants[variant],
            // 포커스 상태
            isFocused && "ring-2 ring-blue-500 border-transparent",
            // 에러 상태
            error && "border-red-300 focus:ring-red-500",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // 모바일 최적화
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...props}
        />
      </div>
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// 터치 친화적 셀렉트 컴포넌트
interface TouchFriendlySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
  variant?: 'default' | 'large' | 'compact';
}

export function TouchFriendlySelect({
  label,
  helperText,
  error,
  options,
  variant = 'default',
  className,
  ...props
}: TouchFriendlySelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    default: "h-12 px-4 text-base",
    large: "h-16 px-6 text-lg",
    compact: "h-10 px-3 text-sm"
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <select
        className={cn(
          "w-full border border-gray-300 rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:bg-gray-50 disabled:text-gray-500",
          "appearance-none bg-white",
          // 터치 최적화
          "touch-manipulation",
          variants[variant],
          // 포커스 상태
          isFocused && "ring-2 ring-blue-500 border-transparent",
          // 에러 상태
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 