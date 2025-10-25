import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Calendar } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { useAuth } from '../contexts/AuthContext';

const MovieCard = ({ item, type = 'movie' }) => {
  const { userData, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorite = userData?.favorites?.some(fav => fav.id === item.id) || false;
  const isInWatchlist = userData?.watchlist?.some(watch => watch.id === item.id) || false;

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        type: type,
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date
      });
    }
  };

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        type: type,
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date
      });
    }
  };

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="group relative bg-netflix-gray rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:z-10">
      <Link to={`/${type}/${item.id}`}>
        {/* Poster Image */}
        <div className="relative aspect-[2/3] bg-gray-800">
          {!imageError ? (
            <img
              src={getImageUrl(item.poster_path)}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center text-gray-400">
                <Play size={48} className="mx-auto mb-2" />
                <div className="text-sm">لا توجد صورة</div>
              </div>
            </div>
          )}
          
          {/* Loading Placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">جاري التحميل...</div>
            </div>
          )}

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="text-white" size={48} />
          </div>

          {/* Rating Badge */}
          {item.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 px-2 py-1 rounded-full text-xs flex items-center">
              <Star size={12} className="ml-1" fill="currentColor" />
              {rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-netflix-red transition-colors">
            {title}
          </h3>
          
          {year && (
            <div className="flex items-center text-netflix-lightGray text-xs mb-2">
              <Calendar size={12} className="ml-1" />
              {year}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2 space-x-reverse">
              {/* Add to Favorites */}
              <button
                onClick={handleFavoriteToggle}
                className={`p-1.5 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-netflix-red text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              >
                {isFavorite ? <Check size={14} /> : <Plus size={14} />}
              </button>

              {/* Add to Watchlist */}
              <button
                onClick={handleWatchlistToggle}
                className={`p-1.5 rounded-full transition-colors ${
                  isInWatchlist 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={isInWatchlist ? 'إزالة من قائمة المشاهدة' : 'إضافة لقائمة المشاهدة'}
              >
                {isInWatchlist ? <Check size={14} /> : <Plus size={14} />}
              </button>
            </div>

            {/* Type Badge */}
            <span className="text-xs bg-netflix-red text-white px-2 py-1 rounded-full">
              {type === 'movie' ? 'فيلم' : 'مسلسل'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;