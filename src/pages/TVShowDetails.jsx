import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, Check, Star, Calendar, Users, Settings, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { getTVShowDetails, getSeasonDetails, getImageUrl, getBackdropUrl } from '../services/tmdb';
import { getTVEpisodeStreamUrl, PROVIDER_NAMES, getPreferredProvider } from '../services/superembed';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

const TVShowDetails = () => {
  const { id } = useParams();
  const { userData, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useAuth();
  const [tvShow, setTVShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonLoading, setSeasonLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(getPreferredProvider());
  const [showProviders, setShowProviders] = useState(false);
  const [expandedEpisodes, setExpandedEpisodes] = useState({});

  const isFavorite = userData?.favorites?.some(fav => fav.id === parseInt(id)) || false;
  const isInWatchlist = userData?.watchlist?.some(watch => watch.id === parseInt(id)) || false;

  useEffect(() => {
    fetchTVShowDetails();
  }, [id]);

  useEffect(() => {
    if (tvShow && selectedSeason) {
      fetchSeasonDetails();
    }
  }, [selectedSeason, tvShow]);

  const fetchTVShowDetails = async () => {
    try {
      setLoading(true);
      const data = await getTVShowDetails(id);
      setTVShow(data);
      if (data.seasons && data.seasons.length > 0) {
        // البحث عن أول موسم حقيقي (ليس الموسم 0)
        const firstRealSeason = data.seasons.find(season => season.season_number > 0);
        if (firstRealSeason) {
          setSelectedSeason(firstRealSeason.season_number);
        }
      }
    } catch (error) {
      console.error('خطأ في جلب تفاصيل المسلسل:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeasonDetails = async () => {
    try {
      setSeasonLoading(true);
      const data = await getSeasonDetails(id, selectedSeason);
      setSeasonDetails(data);
    } catch (error) {
      console.error('خطأ في جلب تفاصيل الموسم:', error);
    } finally {
      setSeasonLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id));
    } else {
      addToFavorites({
        id: parseInt(id),
        title: tvShow.name,
        poster_path: tvShow.poster_path,
        type: 'tv',
        vote_average: tvShow.vote_average,
        release_date: tvShow.first_air_date
      });
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(parseInt(id));
    } else {
      addToWatchlist({
        id: parseInt(id),
        title: tvShow.name,
        poster_path: tvShow.poster_path,
        type: 'tv',
        vote_average: tvShow.vote_average,
        release_date: tvShow.first_air_date
      });
    }
  };

  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
    setShowPlayer(true);
  };

  const getStreamUrl = () => {
    if (!selectedEpisode) return '';
    return getTVEpisodeStreamUrl(id, selectedSeason, selectedEpisode.episode_number, selectedProvider);
  };

  const toggleEpisodeExpansion = (episodeId) => {
    setExpandedEpisodes(prev => ({
      ...prev,
      [episodeId]: !prev[episodeId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل تفاصيل المسلسل...</p>
        </div>
      </div>
    );
  }

  if (!tvShow) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={64} className="text-netflix-lightGray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">المسلسل غير موجود</h2>
          <p className="text-netflix-lightGray">لم يتم العثور على المسلسل المطلوب</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Video Player Modal */}
      {showPlayer && selectedEpisode && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-full h-full relative">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            >
              ✕
            </button>
            
            {/* Episode Info */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-md">
              <span className="text-sm">
                الموسم {selectedSeason} - الحلقة {selectedEpisode.episode_number}: {selectedEpisode.name}
              </span>
            </div>

            {/* Provider Selector */}
            <div className="absolute top-16 left-4 z-10">
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
              title={`${tvShow.name} - S${selectedSeason}E${selectedEpisode.episode_number}`}
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={getBackdropUrl(tvShow.backdrop_path)}
            alt={tvShow.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {tvShow.name}
            </h1>

            {tvShow.tagline && (
              <p className="text-xl text-netflix-lightGray mb-4 italic">
                "{tvShow.tagline}"
              </p>
            )}

            <div className="flex items-center space-x-6 space-x-reverse mb-6">
              {tvShow.vote_average > 0 && (
                <div className="flex items-center text-yellow-400">
                  <Star size={20} fill="currentColor" className="ml-1" />
                  <span className="text-lg font-semibold">
                    {tvShow.vote_average.toFixed(1)}
                  </span>
                </div>
              )}

              {tvShow.first_air_date && (
                <div className="flex items-center text-netflix-lightGray">
                  <Calendar size={16} className="ml-1" />
                  <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                </div>
              )}

              {tvShow.number_of_seasons && (
                <span className="text-netflix-lightGray">
                  {tvShow.number_of_seasons} موسم
                </span>
              )}

              {tvShow.number_of_episodes && (
                <span className="text-netflix-lightGray">
                  {tvShow.number_of_episodes} حلقة
                </span>
              )}
            </div>

            {tvShow.genres && tvShow.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tvShow.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-netflix-gray text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {tvShow.overview && (
              <p className="text-lg text-netflix-lightGray mb-8 max-w-3xl line-clamp-4">
                {tvShow.overview}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
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

      {/* Content Section */}
      <div className="relative z-20 -mt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Season Selector */}
          {tvShow.seasons && tvShow.seasons.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">المواسم</h2>
              <div className="flex flex-wrap gap-2">
                {tvShow.seasons
                  .filter(season => season.season_number > 0)
                  .map((season) => (
                    <button
                      key={season.id}
                      onClick={() => setSelectedSeason(season.season_number)}
                      className={`py-2 px-4 rounded-md font-medium transition-colors ${
                        selectedSeason === season.season_number
                          ? 'bg-netflix-red text-white'
                          : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      الموسم {season.season_number}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Episodes */}
          {seasonLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
            </div>
          ) : seasonDetails && seasonDetails.episodes ? (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                حلقات الموسم {selectedSeason}
              </h2>
              <div className="space-y-4">
                {seasonDetails.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="bg-netflix-gray/50 rounded-lg overflow-hidden hover:bg-netflix-gray/70 transition-colors"
                  >
                    <div className="flex items-center p-4">
                      {/* Episode Image */}
                      <div className="flex-shrink-0 w-32 h-18 bg-gray-800 rounded-md overflow-hidden ml-4">
                        {episode.still_path ? (
                          <img
                            src={getImageUrl(episode.still_path, 'w300')}
                            alt={episode.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Play size={24} />
                          </div>
                        )}
                      </div>

                      {/* Episode Info */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">
                            {episode.episode_number}. {episode.name}
                          </h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {episode.vote_average > 0 && (
                              <div className="flex items-center text-yellow-400 text-sm">
                                <Star size={14} fill="currentColor" className="ml-1" />
                                {episode.vote_average.toFixed(1)}
                              </div>
                            )}
                            <button
                              onClick={() => handlePlayEpisode(episode)}
                              className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 space-x-reverse transition-colors"
                            >
                              <Play size={16} fill="currentColor" />
                              <span>تشغيل</span>
                            </button>
                          </div>
                        </div>

                        {episode.air_date && (
                          <p className="text-netflix-lightGray text-sm mb-2">
                            تاريخ العرض: {new Date(episode.air_date).toLocaleDateString('ar-SA')}
                          </p>
                        )}

                        {episode.overview && (
                          <div>
                            <p className={`text-netflix-lightGray text-sm ${
                              expandedEpisodes[episode.id] ? '' : 'line-clamp-2'
                            }`}>
                              {episode.overview}
                            </p>
                            {episode.overview.length > 150 && (
                              <button
                                onClick={() => toggleEpisodeExpansion(episode.id)}
                                className="text-netflix-red text-sm mt-1 flex items-center hover:underline"
                              >
                                {expandedEpisodes[episode.id] ? (
                                  <>
                                    <span>عرض أقل</span>
                                    <ChevronUp size={16} className="mr-1" />
                                  </>
                                ) : (
                                  <>
                                    <span>عرض المزيد</span>
                                    <ChevronDown size={16} className="mr-1" />
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Similar TV Shows */}
          {tvShow.similar?.results && tvShow.similar.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">مسلسلات مشابهة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {tvShow.similar.results.slice(0, 12).map((similarShow) => (
                  <MovieCard key={similarShow.id} item={similarShow} type="tv" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;