import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, isPassword, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`input ${leftIcon ? 'pl-10' : ''} ${
              rightIcon || isPassword ? 'pr-10' : ''
            } ${error ? 'border-error-500 focus:ring-error-500' : ''} ${className}`}
            type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
            {...props}
          />
          
          {isPassword ? (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-500 hover:text-secondary-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-500">
                {rightIcon}
              </div>
            )
          )}
        </div>
        
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;