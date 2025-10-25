import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, User, Play, Loader } from 'lucide-react';
import { searchMulti } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filter, setFilter] = useState('all'); // all, movie, tv, person
  const [hasMore, setHasMore] = useState(true);

  // إعداد التصفح اللانهائي
  const fetchMoreResults = async () => {
    if (currentPage < totalPages && query.trim()) {
      await performSearch(query, false);
    }
  };

  const [isFetching] = useInfiniteScroll(fetchMoreResults, currentPage < totalPages && query.trim());

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery, true);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery, reset = false) => {
    if (!searchQuery.trim()) return;

    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
      }

      const page = reset ? 1 : currentPage + 1;
      const data = await searchMulti(searchQuery, page);

      let filteredResults = data.results || [];
      
      // تطبيق الفلتر
      if (filter !== 'all') {
        filteredResults = filteredResults.filter(item => item.media_type === filter);
      }

      if (reset) {
        setResults(filteredResults);
      } else {
        setResults(prev => [...prev, ...filteredResults]);
      }

      setTotalPages(data.total_pages || 1);
      setTotalResults(data.total_results || 0);
      setCurrentPage(page);
      setHasMore(page < (data.total_pages || 1));
    } catch (error) {
      console.error('خطأ في البحث:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim(), true);
    }
  };



  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (query.trim()) {
      performSearch(query, true);
    }
  };

  const getMediaTypeInArabic = (mediaType) => {
    switch (mediaType) {
      case 'movie': return 'فيلم';
      case 'tv': return 'مسلسل';
      case 'person': return 'شخص';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">البحث</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن الأفلام، المسلسلات، أو الممثلين..."
              className="w-full bg-netflix-gray text-white placeholder-netflix-lightGray rounded-lg py-4 px-6 pr-14 text-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-netflix-lightGray hover:text-white transition-colors"
            >
              <SearchIcon size={24} />
            </button>
          </form>
        </div>

        {/* Filters */}
        {query && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white font-semibold py-2 px-4">تصفية النتائج:</span>
              {[
                { id: 'all', name: 'الكل' },
                { id: 'movie', name: 'الأفلام' },
                { id: 'tv', name: 'المسلسلات' },
                { id: 'person', name: 'الأشخاص' }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => handleFilterChange(filterOption.id)}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    filter === filterOption.id
                      ? 'bg-netflix-red text-white'
                      : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {filterOption.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
              <p className="text-white text-lg">جاري البحث...</p>
            </div>
          </div>
        ) : query && results.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-netflix-lightGray">
                تم العثور على {totalResults} نتيجة للبحث عن "{query}"
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
              {results.map((item) => {
                if (item.media_type === 'person') {
                  return (
                    <div key={item.id} className="bg-netflix-gray rounded-lg overflow-hidden hover:scale-105 transition-transform">
                      <div className="aspect-[2/3] bg-gray-800">
                        {item.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700">
                            <div className="text-center text-gray-400">
                              <User size={48} className="mx-auto mb-2" />
                              <div className="text-sm">لا توجد صورة</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-netflix-lightGray text-xs">
                          {item.known_for_department === 'Acting' ? 'ممثل/ة' : 'شخصية'}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <MovieCard 
                    key={item.id} 
                    item={item} 
                    type={item.media_type} 
                  />
                );
              })}
            </div>

            {/* Infinite Scroll Loading Indicator */}
            {isFetching && hasMore && (
              <div className="text-center py-8">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Loader className="animate-spin h-6 w-6 text-netflix-red" />
                  <span className="text-white text-lg">جاري تحميل المزيد من النتائج...</span>
                </div>
              </div>
            )}
          </>
        ) : query && !loading ? (
          <div className="text-center py-16">
            <SearchIcon size={64} className="text-netflix-lightGray mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد نتائج</h3>
            <p className="text-netflix-lightGray mb-4">
              لم يتم العثور على نتائج للبحث عن "{query}"
            </p>
            <p className="text-netflix-lightGray text-sm">
              جرب استخدام كلمات مختلفة أو تحقق من الإملاء
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <Play size={64} className="text-netflix-lightGray mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">ابحث عن المحتوى المفضل لديك</h3>
            <p className="text-netflix-lightGray">
              استخدم شريط البحث أعلاه للعثور على الأفلام والمسلسلات والممثلين
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;