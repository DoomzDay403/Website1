import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtSign, ArrowLeft } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import useAuthStore from '../../store/authStore';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { forgotPassword, isLoading } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage('An error occurred while processing your request');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-secondary-900">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              We'll send you an email with a link to reset your password
            </p>
          </div>
          
          <Card className="px-8 py-10">
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
                  <svg
                    className="h-6 w-6 text-success-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-secondary-900">
                  Check your email
                </h3>
                <p className="mt-2 text-sm text-secondary-600">
                  We've sent a password reset link to {email}
                </p>
                <div className="mt-6">
                  <Link to="/login">
                    <Button
                      variant="secondary"
                      size="md"
                      leftIcon={<ArrowLeft size={16} />}
                    >
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMessage && (
                  <Alert
                    type="error"
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                  />
                )}
                
                <div>
                  <Input
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    leftIcon={<AtSign size={18} />}
                    required
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Send reset link
                  </Button>
                </div>
                
                <div className="text-center">
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:text-primary-500 text-sm"
                  >
                    Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;