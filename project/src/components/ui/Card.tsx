import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  border = true,
  shadow = 'sm',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white',
    glass: 'glass-panel'
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };
  
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const borderClass = border ? (variant === 'default' ? 'border border-secondary-200' : '') : 'border-0';
  
  return (
    <div
      className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${borderClass} ${shadowClasses[shadow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;