import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الأفلام', path: '/movies' },
    { name: 'المسلسلات', path: '/tv-shows' },
    { name: 'المفضلة', path: '/favorites' },
  ];

  return (
    <nav className="bg-netflix-black/95 backdrop-blur-sm fixed top-0 w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-netflix-red text-2xl font-bold">
              نيل
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-white bg-netflix-red'
                      : 'text-netflix-lightGray hover:text-white hover:bg-netflix-gray'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن الأفلام والمسلسلات..."
                className="w-full bg-netflix-gray text-white placeholder-netflix-lightGray rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-netflix-red"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-lightGray hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 space-x-reverse text-white hover:text-netflix-lightGray">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="text-sm">{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-48 bg-netflix-black border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-netflix-gray"
                  >
                    <User size={16} className="ml-2" />
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-netflix-gray"
                  >
                    <Settings size={16} className="ml-2" />
                    الإعدادات
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-netflix-gray"
                  >
                    <LogOut size={16} className="ml-2" />
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-netflix-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-netflix-lightGray hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-netflix-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                className="w-full bg-netflix-gray text-white placeholder-netflix-lightGray rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-netflix-red"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-lightGray"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-white bg-netflix-red'
                    : 'text-netflix-lightGray hover:text-white hover:bg-netflix-gray'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {user ? (
              <>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex items-center px-3 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-8 h-8 rounded-full ml-3"
                      />
                    ) : (
                      <User size={20} className="ml-3" />
                    )}
                    <span className="text-white">{user.name}</span>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-netflix-lightGray hover:text-white hover:bg-netflix-gray"
                  >
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-netflix-lightGray hover:text-white hover:bg-netflix-gray"
                  >
                    الإعدادات
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-right px-3 py-2 text-netflix-lightGray hover:text-white hover:bg-netflix-gray"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 bg-netflix-red text-white rounded-md text-center font-medium hover:bg-red-700"
                >
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;