import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Calendar, Clock, Users, Settings, AlertTriangle } from 'lucide-react';
import { getMovieDetails, getImageUrl, getBackdropUrl } from '../services/tmdb';
import { getMovieStreamUrl, getAllStreamUrls, PROVIDER_NAMES, getPreferredProvider } from '../services/superembed';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const { userData, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(getPreferredProvider());
  const [showProviders, setShowProviders] = useState(false);

  const isFavorite = userData?.favorites?.some(fav => fav.id === parseInt(id)) || false;
  const isInWatchlist = userData?.watchlist?.some(watch => watch.id === parseInt(id)) || false;

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (error) {
      console.error('خطأ في جلب تفاصيل الفيلم:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id));
    } else {
      addToFavorites({
        id: parseInt(id),
        title: movie.title,
        poster_path: movie.poster_path,
        type: 'movie',
        vote_average: movie.vote_average,
        release_date: movie.release_date
      });
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(parseInt(id));
    } else {
      addToWatchlist({
        id: parseInt(id),
        title: movie.title,
        poster_path: movie.poster_path,
        type: 'movie',
        vote_average: movie.vote_average,
        release_date: movie.release_date
      });
    }
  };

  const handlePlay = () => {
    setShowPlayer(true);
  };

  const getStreamUrl = () => {
    return getMovieStreamUrl(id, selectedProvider);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}س ${mins}د`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل تفاصيل الفيلم...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={64} className="text-netflix-lightGray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">الفيلم غير موجود</h2>
          <p className="text-netflix-lightGray">لم يتم العثور على الفيلم المطلوب</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Video Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-full h-full relative">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            >
              ✕
            </button>
            
            {/* Provider Selector */}
            <div className="absolute top-4 left-4 z-10">
              <div className="relative">
                <button
                  onClick={() => setShowProviders(!showProviders)}
                  className="bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded-md flex items-center space-x-2 space-x-reverse"
                >
                  <Settings size={16} />
                  <span>{PROVIDER_NAMES[selectedProvider]}</span>
                </button>
                
                {showProviders && (
                  <div className="absolute top-full left-0 mt-2 bg-netflix-black border border-gray-700 rounded-md shadow-lg min-w-48">
                    {Object.entries(PROVIDER_NAMES).map(([provider, name]) => (
                      <button
                        key={provider}
                        onClick={() => {
                          setSelectedProvider(provider);
                          setShowProviders(false);
                        }}
                        className={`block w-full text-right px-4 py-2 text-sm hover:bg-netflix-gray ${
                          selectedProvider === provider ? 'bg-netflix-red text-white' : 'text-netflix-lightGray'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <iframe
              src={getStreamUrl()}
              className="w-full h-full"
              allowFullScreen
              title={movie.title}
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-xl text-netflix-lightGray mb-4 italic">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex items-center space-x-6 space-x-reverse mb-6">
              {movie.vote_average > 0 && (
                <div className="flex items-center text-yellow-400">
                  <Star size={20} fill="currentColor" className="ml-1" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}

              {movie.release_date && (
                <div className="flex items-center text-netflix-lightGray">
                  <Calendar size={16} className="ml-1" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center text-netflix-lightGray">
                  <Clock size={16} className="ml-1" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-netflix-gray text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.overview && (
              <p className="text-lg text-netflix-lightGray mb-8 max-w-3xl line-clamp-4">
                {movie.overview}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handlePlay}
                className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-md flex items-center space-x-2 space-x-reverse transition-colors"
              >
                <Play size={20} fill="currentColor" />
                <span>تشغيل</span>
              </button>

              <button
                onClick={handleFavoriteToggle}
                className={`font-bold py-3 px-8 rounded-md flex items-center space-x-2 space-x-reverse transition-colors ${
                  isFavorite
                    ? 'bg-netflix-red hover:bg-red-700 text-white'
                    : 'bg-gray-600/80 hover:bg-gray-600 text-white'
                }`}
              >
                {isFavorite ? <Check size={20} /> : <Plus size={20} />}
                <span>{isFavorite ? 'في المفضلة' : 'إضافة للمفضلة'}</span>
              </button>

              <button
                onClick={handleWatchlistToggle}
                className={`font-bold py-3 px-8 rounded-md flex items-center space-x-2 space-x-reverse transition-colors ${
                  isInWatchlist
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600/80 hover:bg-gray-600 text-white'
                }`}
              >
                {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                <span>{isInWatchlist ? 'في قائمة المشاهدة' : 'إضافة لقائمة المشاهدة'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-20 -mt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="bg-netflix-gray/50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">نبذة عن الفيلم</h2>
                {movie.overview ? (
                  <p className="text-netflix-lightGray leading-relaxed">
                    {movie.overview}
                  </p>
                ) : (
                  <p className="text-netflix-lightGray">لا توجد نبذة متاحة لهذا الفيلم.</p>
                )}
              </div>

              {/* Cast */}
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">طاقم التمثيل</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.credits.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <div className="aspect-square bg-netflix-gray rounded-lg overflow-hidden mb-2">
                          {actor.profile_path ? (
                            <img
                              src={getImageUrl(actor.profile_path)}
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Users size={32} />
                            </div>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1">
                          {actor.name}
                        </h3>
                        <p className="text-netflix-lightGray text-xs">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-netflix-gray/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">معلومات إضافية</h3>
                <div className="space-y-3">
                  {movie.release_date && (
                    <div>
                      <span className="text-netflix-lightGray">تاريخ الإصدار:</span>
                      <span className="text-white mr-2">
                        {new Date(movie.release_date).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  )}

                  {movie.runtime && (
                    <div>
                      <span className="text-netflix-lightGray">المدة:</span>
                      <span className="text-white mr-2">{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}

                  {movie.budget > 0 && (
                    <div>
                      <span className="text-netflix-lightGray">الميزانية:</span>
                      <span className="text-white mr-2">{formatCurrency(movie.budget)}</span>
                    </div>
                  )}

                  {movie.revenue > 0 && (
                    <div>
                      <span className="text-netflix-lightGray">الإيرادات:</span>
                      <span className="text-white mr-2">{formatCurrency(movie.revenue)}</span>
                    </div>
                  )}

                  {movie.production_countries && movie.production_countries.length > 0 && (
                    <div>
                      <span className="text-netflix-lightGray">بلد الإنتاج:</span>
                      <span className="text-white mr-2">
                        {movie.production_countries.map(country => country.name).join(', ')}
                      </span>
                    </div>
                  )}

                  {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                    <div>
                      <span className="text-netflix-lightGray">اللغات:</span>
                      <span className="text-white mr-2">
                        {movie.spoken_languages.map(lang => lang.name).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="bg-netflix-gray/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">شركات الإنتاج</h3>
                  <div className="space-y-2">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="text-netflix-lightGray">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Movies */}
          {movie.similar?.results && movie.similar.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">أفلام مشابهة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movie.similar.results.slice(0, 12).map((similarMovie) => (
                  <MovieCard key={similarMovie.id} item={similarMovie} type="movie" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;