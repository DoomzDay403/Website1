import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose
}) => {
  const iconMap = {
    info: <Info className="h-5 w-5 text-primary-500" />,
    success: <CheckCircle className="h-5 w-5 text-success-500" />,
    warning: <AlertCircle className="h-5 w-5 text-warning-500" />,
    error: <XCircle className="h-5 w-5 text-error-500" />
  };
  
  const bgColorMap = {
    info: 'bg-primary-50 border-primary-200',
    success: 'bg-success-50 border-success-200',
    warning: 'bg-warning-50 border-warning-200',
    error: 'bg-error-50 border-error-200'
  };
  
  const textColorMap = {
    info: 'text-primary-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
    error: 'text-error-800'
  };
  
  const titleColorMap = {
    info: 'text-primary-900',
    success: 'text-success-900',
    warning: 'text-warning-900',
    error: 'text-error-900'
  };
  
  return (
    <div className={`rounded-md p-4 border ${bgColorMap[type]} animate-fade-in`}>
      <div className="flex">
        <div className="flex-shrink-0">{iconMap[type]}</div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${titleColorMap[type]}`}>{title}</h3>
          )}
          <div className={`text-sm ${textColorMap[type]} mt-1`}>{message}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${textColorMap[type]} hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-500`}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;