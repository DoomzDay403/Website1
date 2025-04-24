import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import useAuthStore from '../../store/authStore';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    
    try {
      await login({ username, password });
      if (!error) {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage('An error occurred during login');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-secondary-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Or{' '}
              <Link to="/contact" className="font-medium text-primary-600 hover:text-primary-500">
                contact us for a demo
              </Link>
            </p>
          </div>
          
          <Card className="px-8 py-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {(error || errorMessage) && (
                <Alert 
                  type="error" 
                  message={error || errorMessage} 
                  onClose={() => setErrorMessage('')}
                />
              )}
              
              <div>
                <Input
                  label="Username"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  leftIcon={<AtSign size={18} />}
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  leftIcon={<Lock size={18} />}
                  isPassword
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-secondary-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">Demo credentials</span>
                </div>
              </div>
              
              <div className="mt-6 text-center text-xs text-secondary-500">
                <p>Username: <span className="font-mono bg-secondary-100 px-1 py-0.5 rounded">DD403</span></p>
                <p className="mt-1">Password: <span className="font-mono bg-secondary-100 px-1 py-0.5 rounded">Password12434@12</span></p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;