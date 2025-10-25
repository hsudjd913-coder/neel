import React from 'react';
import { User, Mail, Calendar, Heart, Bookmark, Settings, LogOut, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <Lock size={64} className="text-netflix-lightGray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">غير مسجل الدخول</h2>
          <p className="text-netflix-lightGray">يرجى تسجيل الدخول لعرض الملف الشخصي</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Heart,
      label: 'المفضلة',
      value: userData?.favorites?.length || 0,
      color: 'text-red-400'
    },
    {
      icon: Bookmark,
      label: 'قائمة المشاهدة',
      value: userData?.watchlist?.length || 0,
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">الملف الشخصي</h1>
          <p className="text-netflix-lightGray text-lg">
            معلوماتك الشخصية وإحصائيات المشاهدة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-netflix-gray/50 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center ml-6">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                  {user.isGuest ? (
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                      مستخدم ضيف
                    </span>
                  ) : (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      مستخدم مسجل
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {user.email && (
                  <div className="flex items-center">
                    <Mail className="text-netflix-lightGray ml-3" size={20} />
                    <span className="text-white">{user.email}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="text-netflix-lightGray ml-3" size={20} />
                  <span className="text-white">
                    عضو منذ: {new Date().toLocaleDateString('ar-SA')}
                  </span>
                </div>

                {user.isGuest && (
                  <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mt-4">
                    <h3 className="text-yellow-400 font-semibold mb-2">مستخدم ضيف</h3>
                    <p className="text-netflix-lightGray text-sm mb-3">
                      أنت تستخدم التطبيق كضيف. بياناتك محفوظة محلياً فقط وقد تفقد عند مسح بيانات المتصفح.
                    </p>
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      إنشاء حساب دائم
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-netflix-gray/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">النشاط الأخير</h3>
              <div className="text-center py-8">
                <Calendar size={48} className="text-netflix-lightGray mx-auto mb-4" />
                <p className="text-netflix-lightGray">
                  ميزة تتبع النشاط ستكون متاحة قريباً
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-netflix-gray/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">الإحصائيات</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <stat.icon className={`${stat.color} ml-3`} size={20} />
                      <span className="text-white">{stat.label}</span>
                    </div>
                    <span className="text-netflix-red font-bold text-lg">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-netflix-gray/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/favorites')}
                  className="w-full flex items-center justify-between bg-netflix-gray hover:bg-gray-600 text-white p-3 rounded-md transition-colors"
                >
                  <div className="flex items-center">
                    <Heart className="ml-3" size={18} />
                    <span>المفضلة</span>
                  </div>
                  <span className="text-netflix-lightGray">
                    {userData?.favorites?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center bg-netflix-gray hover:bg-gray-600 text-white p-3 rounded-md transition-colors"
                >
                  <Settings className="ml-3" size={18} />
                  <span>الإعدادات</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-md transition-colors"
                >
                  <LogOut className="ml-3" size={18} />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>

            {/* Account Type Info */}
            <div className="bg-netflix-gray/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">نوع الحساب</h3>
              {user.isGuest ? (
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full ml-2"></div>
                    <span className="text-white font-semibold">ضيف</span>
                  </div>
                  <ul className="text-netflix-lightGray text-sm space-y-1">
                    <li>• مشاهدة مجانية</li>
                    <li>• حفظ محلي للمفضلة</li>
                    <li>• بيانات مؤقتة</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full ml-2"></div>
                    <span className="text-white font-semibold">مسجل</span>
                  </div>
                  <ul className="text-netflix-lightGray text-sm space-y-1">
                    <li>• مشاهدة مجانية</li>
                    <li>• حفظ سحابي للبيانات</li>
                    <li>• مزامنة عبر الأجهزة</li>
                    <li>• نسخ احتياطي آمن</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;