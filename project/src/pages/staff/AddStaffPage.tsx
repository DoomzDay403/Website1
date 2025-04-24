import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AtSign, User, Lock, Briefcase, Building } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import useStaffStore from '../../store/staffStore';
import useAuthStore from '../../store/authStore';
import { UserRole } from '../../types/auth';
import { NewStaffMember } from '../../types/staff';

const AddStaffPage: React.FC = () => {
  const [formData, setFormData] = useState<NewStaffMember>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: UserRole.SUPPORT,
    password: '',
    confirmPassword: '',
    department: '',
    position: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { createStaffMember, isLoading } = useStaffStore();
  const { user, isAuthenticated } = useAuthStore();
  
  // Redirect if not authenticated or not authorized
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== UserRole.OWNER && user?.role !== UserRole.MANAGER) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await createStaffMember(formData);
      setSuccessMessage('Staff member created successfully');
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: UserRole.SUPPORT,
        password: '',
        confirmPassword: '',
        department: '',
        position: ''
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/staff');
      }, 2000);
      
    } catch (error) {
      setErrors({ submit: 'Failed to create staff member' });
    }
  };
  
  const roleOptions = Object.values(UserRole).map(role => ({
    value: role,
    label: role
  }));
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/staff')}
            className="inline-flex items-center text-secondary-600 hover:text-secondary-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Staff List
          </button>
          
          <h1 className="text-2xl font-bold text-secondary-900 mt-4">Add New Staff Member</h1>
          <p className="text-secondary-600 mt-1">
            Create a new account for a team member
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto">
          <div className="p-6">
            {errors.submit && (
              <Alert 
                type="error" 
                message={errors.submit} 
                onClose={() => setErrors(prev => ({ ...prev, submit: '' }))}
                className="mb-6"
              />
            )}
            
            {successMessage && (
              <Alert 
                type="success" 
                message={successMessage} 
                onClose={() => setSuccessMessage('')}
                className="mb-6"
              />
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Username"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  leftIcon={<User size={18} />}
                  required
                />
                
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  leftIcon={<AtSign size={18} />}
                  required
                />
                
                <Input
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                
                <Input
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
                
                <Select
                  label="Role"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={roleOptions}
                  error={errors.role}
                />
                
                <Input
                  label="Department"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  error={errors.department}
                  leftIcon={<Building size={18} />}
                />
                
                <Input
                  label="Position"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={errors.position}
                  leftIcon={<Briefcase size={18} />}
                />
              </div>
              
              <div className="border-t border-secondary-200 pt-6">
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Account Credentials</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    leftIcon={<Lock size={18} />}
                    isPassword
                    required
                  />
                  
                  <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    leftIcon={<Lock size={18} />}
                    isPassword
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/staff')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                >
                  Create Staff Member
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddStaffPage;