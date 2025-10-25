import React, { useState } from 'react';
import { Heart, Filter, Grid, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { userData } = useAuth();
  const [filter, setFilter] = useState('all'); // all, movie, tv
  const [viewMode, setViewMode] = useState('grid');

  const favorites = userData?.favorites || [];

  const filteredFavorites = favorites.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const filterOptions = [
    { id: 'all', name: 'الكل', count: favorites.length },
    { id: 'movie', name: 'الأفلام', count: favorites.filter(item => item.type === 'movie').length },
    { id: 'tv', name: 'المسلسلات', count: favorites.filter(item => item.type === 'tv').length }
  ];

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Heart className="text-netflix-red ml-3" size={32} fill="currentColor" />
            <h1 className="text-4xl font-bold text-white">المفضلة</h1>
          </div>
          <p className="text-netflix-lightGray text-lg">
            جميع الأفلام والمسلسلات المفضلة لديك في مكان واحد
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="text-netflix-lightGray mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد مفضلة بعد</h3>
            <p className="text-netflix-lightGray mb-6">
              ابدأ بإضافة الأفلام والمسلسلات المفضلة لديك لتظهر هنا
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/movies"
                className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                تصفح الأفلام
              </a>
              <a
                href="/tv-shows"
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                تصفح المسلسلات
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-4">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-semibold py-2 px-4">تصفية:</span>
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                      filter === option.id
                        ? 'bg-netflix-red text-white'
                        : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {option.name} ({option.count})
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-white font-semibold">عرض:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-netflix-red text-white'
                        : 'bg-netflix-gray text-netflix-lightGray hover:text-white'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-netflix-red text-white'
                        : 'bg-netflix-gray text-netflix-lightGray hover:text-white'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>

                <div className="text-netflix-lightGray">
                  {filteredFavorites.length} عنصر
                </div>
              </div>
            </div>

            {/* Favorites Grid */}
            {filteredFavorites.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredFavorites.map((item) => (
                  <MovieCard key={`${item.type}-${item.id}`} item={item} type={item.type} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Filter size={64} className="text-netflix-lightGray mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">لا توجد نتائج</h3>
                <p className="text-netflix-lightGray">
                  لا توجد عناصر تطابق الفلتر المحدد
                </p>
              </div>
            )}
          </>
        )}

        {/* Tips */}
        {favorites.length > 0 && (
          <div className="mt-16 bg-netflix-gray/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">نصائح:</h3>
            <ul className="space-y-2 text-netflix-lightGray">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                يمكنك إزالة العناصر من المفضلة بالنقر على أيقونة القلب في بطاقة العنصر
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                استخدم الفلاتر لتنظيم مفضلتك حسب النوع
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-netflix-red rounded-full ml-3"></div>
                يتم حفظ مفضلتك تلقائياً ومتاحة على جميع الأجهزة
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;