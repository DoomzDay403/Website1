import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center px-4 py-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-warning-100 text-warning-600 rounded-full">
              <AlertTriangle size={64} />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-secondary-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-800 mb-4">Page Not Found</h2>
          
          <p className="text-lg text-secondary-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<ArrowLeft size={18} />}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;