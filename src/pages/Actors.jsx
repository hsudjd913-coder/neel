import React from 'react';
import { Users, Star, Film, Tv } from 'lucide-react';

const Actors = () => {
  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="text-netflix-red ml-3" size={32} />
            <h1 className="text-4xl font-bold text-white">الممثلون والنجوم</h1>
          </div>
          <p className="text-netflix-lightGray text-lg">
            اكتشف معلومات عن نجوم السينما والتلفزيون المفضلين لديك
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="bg-netflix-gray/50 rounded-lg p-12 max-w-2xl mx-auto">
            <Star size={64} className="text-netflix-red mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">قريباً</h2>
            <p className="text-netflix-lightGray text-lg mb-6">
              صفحة الممثلين والنجوم قيد التطوير وستكون متاحة قريباً
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-netflix-black/50 rounded-lg p-6">
                <Film className="text-netflix-red mx-auto mb-3" size={32} />
                <h3 className="text-white font-semibold mb-2">معلومات الممثلين</h3>
                <p className="text-netflix-lightGray text-sm">
                  السيرة الذاتية والأعمال السابقة
                </p>
              </div>
              
              <div className="bg-netflix-black/50 rounded-lg p-6">
                <Tv className="text-netflix-red mx-auto mb-3" size={32} />
                <h3 className="text-white font-semibold mb-2">الأعمال المشاركة</h3>
                <p className="text-netflix-lightGray text-sm">
                  قائمة بجميع الأفلام والمسلسلات
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-netflix-lightGray text-sm">
                يمكنك حالياً البحث عن الممثلين من خلال صفحة البحث الرئيسية
              </p>
              <a
                href="/search"
                className="inline-block mt-4 bg-netflix-red hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                انتقل للبحث
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actors;