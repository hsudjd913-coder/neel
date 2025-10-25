import axios from 'axios';

const TMDB_API_KEY =
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// دالة للحصول على الأفلام الشائعة
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/popular?language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب الأفلام الشائعة:', error);
    // في حالة عدم توفر الترجمة العربية، جلب النسخة الإنجليزية
    const fallbackResponse = await tmdbApi.get(`/movie/popular?language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على المسلسلات الشائعة
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await tmdbApi.get(`/tv/popular?language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب المسلسلات الشائعة:', error);
    const fallbackResponse = await tmdbApi.get(`/tv/popular?language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على الأفلام الأعلى تقييماً
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/top_rated?language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/movie/top_rated?language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على الأفلام الجديدة
export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/now_playing?language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/movie/now_playing?language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على تفاصيل فيلم
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}?language=ar&append_to_response=credits,videos,similar`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/movie/${movieId}?language=en-US&append_to_response=credits,videos,similar`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على تفاصيل مسلسل
export const getTVShowDetails = async (tvId) => {
  try {
    const response = await tmdbApi.get(`/tv/${tvId}?language=ar&append_to_response=credits,videos,similar`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/tv/${tvId}?language=en-US&append_to_response=credits,videos,similar`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على حلقات موسم معين
export const getSeasonDetails = async (tvId, seasonNumber) => {
  try {
    const response = await tmdbApi.get(`/tv/${tvId}/season/${seasonNumber}?language=ar`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/tv/${tvId}/season/${seasonNumber}?language=en-US`);
    return fallbackResponse.data;
  }
};

// دالة البحث
export const searchMulti = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get(`/search/multi?query=${encodeURIComponent(query)}&language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على الأنواع
export const getMovieGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list?language=ar');
    return response.data.genres;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get('/genre/movie/list?language=en-US');
    return fallbackResponse.data.genres;
  }
};

export const getTVGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/tv/list?language=ar');
    return response.data.genres;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get('/genre/tv/list?language=en-US');
    return fallbackResponse.data.genres;
  }
};

// دالة للحصول على الأفلام حسب النوع
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdbApi.get(`/discover/movie?with_genres=${genreId}&language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على المسلسلات حسب النوع
export const getTVShowsByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdbApi.get(`/discover/tv?with_genres=${genreId}&language=ar&page=${page}`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/discover/tv?with_genres=${genreId}&language=en-US&page=${page}`);
    return fallbackResponse.data;
  }
};

// دالة للحصول على تفاصيل الممثل
export const getPersonDetails = async (personId) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}?language=ar&append_to_response=movie_credits,tv_credits`);
    return response.data;
  } catch (error) {
    const fallbackResponse = await tmdbApi.get(`/person/${personId}?language=en-US&append_to_response=movie_credits,tv_credits`);
    return fallbackResponse.data;
  }
};

// دوال مساعدة للصور
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-image.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${BACKDROP_BASE_URL}${path}`;
};

export { IMAGE_BASE_URL, BACKDROP_BASE_URL };
