import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPopularMovies, getPopularTVShows, getTopRatedMovies, getNowPlayingMovies, getImageUrl, getBackdropUrl } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // جلب البيانات بشكل متوازي
        const [
          popularMoviesData,
          popularTVData,
          topRatedData,
          nowPlayingData
        ] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
          getTopRatedMovies(),
          getNowPlayingMovies()
        ]);

        setPopularMovies(popularMoviesData.results || []);
        setPopularTVShows(popularTVData.results || []);
        setTopRatedMovies(topRatedData.results || []);
        setNowPlayingMovies(nowPlayingData.results || []);

        // اختيار فيلم عشوائي للعرض الرئيسي
        const allMovies = [...(popularMoviesData.results || []), ...(topRatedData.results || [])];
        if (allMovies.length > 0) {
          const randomMovie = allMovies[Math.floor(Math.random() * Math.min(10, allMovies.length))];
          setHeroMovie(randomMovie);
        }
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const MovieRow = ({ title, movies, type = 'movie' }) => {
    const scrollContainer = (direction) => {
      const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
      if (container) {
        const scrollAmount = 300;
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 px-4">{title}</h2>
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scrollContainer('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Movies Container */}
          <div
            id={`scroll-${title.replace(/\s+/g, '-')}`}
            className="flex space-x-4 space-x-reverse overflow-x-auto scrollbar-hide px-4 pb-2"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MovieCard item={movie} type={type} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollContainer('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل المحتوى...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-screen">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={getBackdropUrl(heroMovie.backdrop_path)}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {heroMovie.title}
              </h1>
              
              {heroMovie.overview && (
                <p className="text-lg md:text-xl text-netflix-lightGray mb-6 line-clamp-3">
                  {heroMovie.overview}
                </p>
              )}

              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                {heroMovie.vote_average > 0 && (
                  <div className="flex items-center text-yellow-400">
                    <span className="text-lg font-semibold">
                      {heroMovie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-sm text-netflix-lightGray mr-1">/10</span>
                  </div>
                )}
                
                {heroMovie.release_date && (
                  <span className="text-netflix-lightGray">
                    {new Date(heroMovie.release_date).getFullYear()}
                  </span>
                )}
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-md flex items-center space-x-2 space-x-reverse transition-colors"
                >
                  <Play size={20} fill="currentColor" />
                  <span>تشغيل</span>
                </Link>
                
                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="bg-gray-600/80 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-md flex items-center space-x-2 space-x-reverse transition-colors"
                >
                  <Info size={20} />
                  <span>معلومات أكثر</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="relative z-20 -mt-32 pb-16">
        <MovieRow title="الأفلام الشائعة" movies={popularMovies} type="movie" />
        <MovieRow title="المسلسلات الشائعة" movies={popularTVShows} type="tv" />
        <MovieRow title="الأفلام الأعلى تقييماً" movies={topRatedMovies} type="movie" />
        <MovieRow title="الأفلام الجديدة" movies={nowPlayingMovies} type="movie" />
      </div>

      {/* Welcome Message for New Users */}
      <div className="bg-netflix-gray/50 mx-4 md:mx-8 lg:mx-16 rounded-lg p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">مرحباً بك في نيل</h2>
          <p className="text-netflix-lightGray text-lg mb-6">
            اكتشف آلاف الأفلام والمسلسلات المجانية. أضف المحتوى المفضل لديك وابدأ المشاهدة الآن!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/movies"
              className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              تصفح الأفلام
            </Link>
            <Link
              to="/tv-shows"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              تصفح المسلسلات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;