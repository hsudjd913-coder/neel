import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMovieVideos, getTVShowVideos } from '../services/tmdb';

const HeroSection = ({ item, type = 'movie' }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetchTrailer();
  }, [item?.id, type]);

  const fetchTrailer = async () => {
    if (!item?.id) return;
    
    try {
      let videos;
      if (type === 'movie') {
        videos = await getMovieVideos(item.id);
      } else {
        videos = await getTVShowVideos(item.id);
      }
      
      // البحث عن التريلر أو أي فيديو متاح
      const trailer = videos.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      ) || videos.find(video => 
        video.site === 'YouTube'
      );
      
      if (trailer) {
        setTrailerKey(trailer.key);
        // تشغيل الفيديو تلقائياً بعد 3 ثوانٍ
        setTimeout(() => {
          setShowVideo(true);
        }, 3000);
      }
    } catch (error) {
      console.error('خطأ في جلب التريلر:', error);
    }
  };

  const title = item?.title || item?.name || '';
  const overview = item?.overview || '';
  const releaseDate = item?.release_date || item?.first_air_date || '';
  const rating = item?.vote_average || 0;
  const backdropUrl = item?.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;

  const logoUrl = item?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {showVideo && trailerKey ? (
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&loop=1&playlist=${trailerKey}`}
              className="w-full h-full object-cover scale-150"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        ) : backdropUrl ? (
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-netflix-black to-netflix-gray" />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              {/* Logo/Title */}
              <div className="space-y-4">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={title}
                    className="h-32 w-auto object-contain"
                  />
                )}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {title}
                </h1>
              </div>

              {/* Rating and Year */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{rating.toFixed(1)}</span>
                </div>
                {releaseDate && (
                  <span className="text-netflix-lightGray">
                    {new Date(releaseDate).getFullYear()}
                  </span>
                )}
                <span className="px-2 py-1 bg-netflix-red text-white text-sm font-semibold rounded">
                  {type === 'movie' ? 'فيلم' : 'مسلسل'}
                </span>
              </div>

              {/* Overview */}
              {overview && (
                <p className="text-lg text-netflix-lightGray leading-relaxed max-w-2xl line-clamp-3">
                  {overview}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  to={`/${type}/${item?.id}`}
                  className="flex items-center space-x-2 space-x-reverse bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>تشغيل</span>
                </Link>
                
                <Link
                  to={`/${type}/${item?.id}`}
                  className="flex items-center space-x-2 space-x-reverse bg-gray-600/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors"
                >
                  <Info className="h-5 w-5" />
                  <span>معلومات أكثر</span>
                </Link>

                {/* Mute/Unmute Button */}
                {showVideo && trailerKey && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-gray-600/70 text-white rounded-full hover:bg-gray-600 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Right Side - Additional Info or Space */}
            <div className="hidden lg:block">
              {/* يمكن إضافة معلومات إضافية هنا */}
            </div>
          </div>
        </div>
      </div>

      {/* Skip Intro Button (if video is playing) */}
      {showVideo && trailerKey && (
        <button
          onClick={() => setShowVideo(false)}
          className="absolute bottom-20 right-8 bg-gray-800/80 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors z-20"
        >
          تخطي المقدمة
        </button>
      )}
    </div>
  );
};

export default HeroSection;