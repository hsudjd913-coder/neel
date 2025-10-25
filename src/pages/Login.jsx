import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, UserCheck } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await login('google');
      navigate('/');
    } catch (error) {
      setError('فشل في تسجيل الدخول بـ Google. يرجى المحاولة مرة أخرى.');
      console.error('خطأ في تسجيل الدخول:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await login('guest');
      navigate('/');
    } catch (error) {
      setError('فشل في الدخول كضيف. يرجى المحاولة مرة أخرى.');
      console.error('خطأ في الدخول كضيف:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-gray-900 to-netflix-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-netflix-red mb-2">نيل</h1>
          <p className="text-netflix-lightGray text-lg">منصة الأفلام والمسلسلات</p>
        </div>

        {/* Login Card */}
        <div className="bg-netflix-black/80 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            مرحباً بك في نيل
          </h2>
          
          <p className="text-netflix-lightGray text-center mb-8">
            اختر طريقة الدخول المفضلة لديك
          </p>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-md mb-6 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-3 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>تسجيل الدخول بـ Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-netflix-black text-netflix-lightGray">أو</span>
              </div>
            </div>

            {/* Guest Login */}
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="w-full bg-netflix-gray hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-3 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserCheck size={20} />
                  <span>الدخول كضيف</span>
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-white font-semibold mb-4 text-center">ما يمكنك فعله:</h3>
            <ul className="space-y-2 text-netflix-lightGray text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                مشاهدة آلاف الأفلام والمسلسلات مجاناً
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                إضافة المحتوى للمفضلة وقائمة المشاهدة
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                البحث في مكتبة ضخمة من المحتوى
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                تخصيص إعدادات المشغل والجودة
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-netflix-lightGray">
            <p>بالمتابعة، أنت توافق على</p>
            <div className="space-x-4 space-x-reverse mt-1">
              <a href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</a>
              <span>•</span>
              <a href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-netflix-lightGray text-sm">
          <p>نيل - منصة تعليمية لمشاهدة الأفلام والمسلسلات</p>
          <p className="mt-1">جميع المحتوى مقدم من مصادر خارجية</p>
        </div>
      </div>
    </div>
  );
};

export default Login;