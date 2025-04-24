import { create } from 'zustand';
import { AuthState, LoginCredentials, User, UserRole } from '../types/auth';

// Mock admin user for demo purposes
const ADMIN_USER: User = {
  id: '1',
  username: 'DD403',
  email: 'admin@doomzday403.com',
  role: UserRole.OWNER,
  firstName: 'Admin',
  lastName: 'User',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date(),
  avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DD403'
};

// Pre-hashed password for "Password12434@12"
// In a real app, this would be stored in a database and compared securely
const ADMIN_HASHED_PASSWORD = 'Password12434@12';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple authentication check - in a real app this would use secure methods
      if (credentials.username === 'DD403' && credentials.password === ADMIN_HASHED_PASSWORD) {
        set({
          user: { ...ADMIN_USER, lastLogin: new Date() },
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({
          error: 'Invalid username or password',
          isLoading: false
        });
      }
    } catch (error) {
      set({
        error: 'An error occurred during login',
        isLoading: false
      });
    }
  },
  
  logout: () => {
    // Simulate network request
    set({
      user: null,
      isAuthenticated: false
    });
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ isLoading: false });
      // In a real app, this would send a password reset email
    } catch (error) {
      set({
        error: 'Failed to process password reset request',
        isLoading: false
      });
    }
  },
  
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ isLoading: false });
      // In a real app, this would verify the token and update the password
    } catch (error) {
      set({
        error: 'Failed to reset password',
        isLoading: false
      });
    }
  },
  
  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    }));
  }
}));

export default useAuthStore;