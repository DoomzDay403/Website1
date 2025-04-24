import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-secondary-950';
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="flex items-center">
        <ShieldAlert className="text-accent-600 w-8 h-8" />
        <Shield className="text-primary-600 w-8 h-8 -ml-4" />
      </div>
      <span className={`font-bold text-xl ${textColor}`}>
        DoomzDay<span className="text-primary-600">403</span>
      </span>
    </Link>
  );
};

export default Logo;