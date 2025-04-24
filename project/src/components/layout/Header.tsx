import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import useAuthStore from '../../store/authStore';
import useMessageStore from '../../store/messageStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { notifications, unreadCount, unreadNotificationCount, markNotificationAsRead } = useMessageStore();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleNotificationClick = (id: string, link?: string) => {
    markNotificationAsRead(id);
    if (link) {
      navigate(link);
    }
    setIsNotificationsOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            
            {isAuthenticated && (
              <nav className="ml-8 hidden md:flex space-x-1">
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/staff" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/staff') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  Staff
                </Link>
                <Link 
                  to="/messages" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/messages') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  Messages
                </Link>
              </nav>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 text-secondary-600 hover:text-secondary-900 rounded-full hover:bg-secondary-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate('/messages')}
                className="relative p-2 text-secondary-600 hover:text-secondary-900 rounded-full hover:bg-secondary-100 transition-colors"
                aria-label="Messages"
              >
                <MessageSquare size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 border border-primary-200">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-1 text-primary-700" />
                    )}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-secondary-200 animate-fade-in">
                    <div className="px-4 py-2 border-b border-secondary-200">
                      <p className="text-sm font-medium text-secondary-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-secondary-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none"
                aria-label="Main menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-secondary-600 hover:text-secondary-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign in
              </Link>
              
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none"
                aria-label="Main menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-secondary-200">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/staff"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.startsWith('/staff')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Staff
                </Link>
                <Link
                  to="/messages"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.startsWith('/messages')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/profile'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-secondary-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-secondary-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Notifications panel */}
      {isNotificationsOpen && (
        <div className="absolute right-0 mt-2 mr-4 sm:mr-6 lg:mr-8 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-secondary-200 animate-fade-in">
          <div className="px-4 py-2 border-b border-secondary-200 flex justify-between items-center">
            <h3 className="text-sm font-medium text-secondary-900">Notifications</h3>
            {unreadNotificationCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-primary-800 bg-primary-100 rounded-full">
                {unreadNotificationCount} new
              </span>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                  className={`block w-full text-left px-4 py-3 border-b border-secondary-100 hover:bg-secondary-50 transition-colors ${
                    !notification.isRead ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-secondary-900">{notification.title}</p>
                    <span className={`inline-flex items-center justify-center w-2 h-2 rounded-full ${
                      !notification.isRead ? 'bg-primary-500' : 'bg-transparent'
                    }`} />
                  </div>
                  <p className="text-xs text-secondary-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-secondary-400 mt-1">
                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-secondary-500">No notifications</p>
              </div>
            )}
          </div>
          <div className="px-4 py-2 border-t border-secondary-200">
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="text-xs text-primary-600 hover:text-primary-800 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;