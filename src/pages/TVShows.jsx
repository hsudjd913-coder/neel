import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, Tv, Loader } from 'lucide-react';
import { getPopularTVShows, getTVGenres, getTVShowsByGenre } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import HeroSection from '../components/HeroSection';

const TVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [heroShow, setHeroShow] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [hasMore, setHasMore] = useState(true);

  // إعداد التصفح اللانهائي
  const fetchMoreTVShows = async () => {
    if (currentPage < totalPages) {
      await fetchTVShows(false);
    }
  };

  const [isFetching] = useInfiniteScroll(fetchMoreTVShows, currentPage < totalPages);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchTVShows(true);
  }, [selectedGenre]);

  const fetchGenres = async () => {
    try {
      const genresData = await getTVGenres();
      setGenres(genresData || []);
    } catch (error) {
      console.error('خطأ في جلب الأنواع:', error);
    }
  };

  const fetchTVShows = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
      }

      const page = reset ? 1 : currentPage + 1;
      let data;

      if (selectedGenre) {
        data = await getTVShowsByGenre(selectedGenre, page);
      } else {
        data = await getPopularTVShows(page);
      }

      if (reset) {
        setTVShows(data.results || []);
        // تعيين أول مسلسل كمسلسل مميز
        if (data.results && data.results.length > 0 && !selectedGenre) {
          setHeroShow(data.results[0]);
        }
      } else {
        setTVShows(prev => [...prev, ...(data.results || [])]);
      }

      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
      setHasMore(page < (data.total_pages || 1));
    } catch (error) {
      console.error('خطأ في جلب المسلسلات:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل المسلسلات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      {heroShow && !selectedGenre && (
        <HeroSection item={heroShow} type="tv" />
      )}

      <div className={`${heroShow && !selectedGenre ? 'relative z-20 -mt-32' : ''} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">المسلسلات</h1>
            <p className="text-netflix-lightGray text-lg">
              اكتشف أفضل المسلسلات من جميع أنحاء العالم
            </p>
          </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white font-semibold py-2 px-4">الأنواع:</span>
            <button
              onClick={() => handleGenreChange('')}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                !selectedGenre
                  ? 'bg-netflix-red text-white'
                  : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
              }`}
            >
              الكل
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre.id
                    ? 'bg-netflix-red text-white'
                    : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                }`}
              >
                {genre.name}
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
              {tvShows.length} مسلسل
            </div>
          </div>
        </div>

        {/* TV Shows Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {tvShows.map((show) => (
            <MovieCard key={show.id} item={show} type="tv" />
          ))}
        </div>

        {/* Infinite Scroll Loading Indicator */}
        {isFetching && hasMore && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Loader className="animate-spin h-6 w-6 text-netflix-red" />
              <span className="text-white text-lg">جاري تحميل المزيد من المسلسلات...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {tvShows.length === 0 && !loading && (
          <div className="text-center py-16">
            <Tv size={64} className="text-netflix-lightGray mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد مسلسلات</h3>
            <p className="text-netflix-lightGray">
              لم يتم العثور على مسلسلات تطابق المعايير المحددة
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default TVShows;