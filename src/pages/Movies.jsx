import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, Play, Loader } from 'lucide-react';
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getMovieGenres, getMoviesByGenre } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    { id: 'popular', name: 'الشائعة', fetch: getPopularMovies },
    { id: 'top_rated', name: 'الأعلى تقييماً', fetch: getTopRatedMovies },
    { id: 'now_playing', name: 'الجديدة', fetch: getNowPlayingMovies }
  ];

  // إعداد التصفح اللانهائي
  const fetchMoreMovies = async () => {
    if (currentPage < totalPages) {
      await fetchMovies(false);
    }
  };

  const [isFetching] = useInfiniteScroll(fetchMoreMovies, currentPage < totalPages);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies(true);
  }, [selectedCategory, selectedGenre]);

  const fetchGenres = async () => {
    try {
      const genresData = await getMovieGenres();
      setGenres(genresData || []);
    } catch (error) {
      console.error('خطأ في جلب الأنواع:', error);
    }
  };

  const fetchMovies = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
      }

      const page = reset ? 1 : currentPage + 1;
      let data;

      if (selectedGenre) {
        data = await getMoviesByGenre(selectedGenre, page);
      } else {
        const category = categories.find(cat => cat.id === selectedCategory);
        data = await category.fetch(page);
      }

      if (reset) {
        setMovies(data.results || []);
      } else {
        setMovies(prev => [...prev, ...(data.results || [])]);
      }

      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
      setHasMore(page < (data.total_pages || 1));
    } catch (error) {
      console.error('خطأ في جلب الأفلام:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedGenre('');
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل الأفلام...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">الأفلام</h1>
          <p className="text-netflix-lightGray text-lg">
            اكتشف مجموعة واسعة من الأفلام من جميع الأنواع والفئات
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white font-semibold py-2 px-4">الفئات:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-netflix-red text-white'
                    : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

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
              {movies.length} فيلم
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>

        {/* Infinite Scroll Loading Indicator */}
        {isFetching && hasMore && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Loader className="animate-spin h-6 w-6 text-netflix-red" />
              <span className="text-white text-lg">جاري تحميل المزيد من الأفلام...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {movies.length === 0 && !loading && (
          <div className="text-center py-16">
            <Play size={64} className="text-netflix-lightGray mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد أفلام</h3>
            <p className="text-netflix-lightGray">
              لم يتم العثور على أفلام تطابق المعايير المحددة
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;