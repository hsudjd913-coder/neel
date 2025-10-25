// خدمة SuperEmbed لجلب روابط الفيديو

const SUPEREMBED_BASE_URL = 'https://multiembed.mov';
const VIP_BASE_URL = 'https://multiembed.mov/directstream.php';

// قائمة المزودات المتاحة
export const VIDEO_PROVIDERS = {
  VIP: 'vip',
  STREAMTAPE: 'streamtape',
  DOODSTREAM: 'doodstream',
  MIXDROP: 'mixdrop',
  STREAMSB: 'streamsb',
  VOE: 'voe',
  UPSTREAM: 'upstream',
  ABYSS: 'abyss',
  STREAMHIDE: 'streamhide'
};

// أسماء المزودات بالعربية
export const PROVIDER_NAMES = {
  [VIDEO_PROVIDERS.VIP]: 'VIP - جودة عالية',
  [VIDEO_PROVIDERS.STREAMTAPE]: 'StreamTape',
  [VIDEO_PROVIDERS.DOODSTREAM]: 'DoodStream',
  [VIDEO_PROVIDERS.MIXDROP]: 'MixDrop',
  [VIDEO_PROVIDERS.STREAMSB]: 'StreamSB',
  [VIDEO_PROVIDERS.VOE]: 'VOE',
  [VIDEO_PROVIDERS.UPSTREAM]: 'UpStream',
  [VIDEO_PROVIDERS.ABYSS]: 'Abyss',
  [VIDEO_PROVIDERS.STREAMHIDE]: 'StreamHide'
};

// دالة للحصول على رابط الفيلم
export const getMovieStreamUrl = (tmdbId, provider = VIDEO_PROVIDERS.VIP) => {
  if (provider === VIDEO_PROVIDERS.VIP) {
    return `${VIP_BASE_URL}?video_id=${tmdbId}&tmdb=1`;
  }
  return `${SUPEREMBED_BASE_URL}/?video_id=${tmdbId}&tmdb=1`;
};

// دالة للحصول على رابط حلقة مسلسل
export const getTVEpisodeStreamUrl = (tmdbId, season, episode, provider = VIDEO_PROVIDERS.VIP) => {
  if (provider === VIDEO_PROVIDERS.VIP) {
    return `${VIP_BASE_URL}?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`;
  }
  return `${SUPEREMBED_BASE_URL}/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`;
};

// دالة للتحقق من توفر VIP player
export const checkVIPAvailability = async (tmdbId, season = null, episode = null) => {
  try {
    let url = `${VIP_BASE_URL}?video_id=${tmdbId}&tmdb=1&check=1`;
    if (season && episode) {
      url += `&s=${season}&e=${episode}`;
    }
    
    const response = await fetch(url);
    const result = await response.text();
    return result.trim() === '1';
  } catch (error) {
    console.error('خطأ في التحقق من توفر VIP:', error);
    return false;
  }
};

// دالة للحصول على جميع الروابط المتاحة
export const getAllStreamUrls = (tmdbId, season = null, episode = null) => {
  const urls = [];
  
  Object.values(VIDEO_PROVIDERS).forEach(provider => {
    const url = season && episode 
      ? getTVEpisodeStreamUrl(tmdbId, season, episode, provider)
      : getMovieStreamUrl(tmdbId, provider);
    
    urls.push({
      provider,
      name: PROVIDER_NAMES[provider],
      url,
      isVIP: provider === VIDEO_PROVIDERS.VIP
    });
  });
  
  return urls;
};

// دالة لإضافة ترجمات مخصصة
export const getStreamUrlWithSubtitles = (tmdbId, season = null, episode = null, subtitleUrl = null, subtitleLabel = 'العربية') => {
  let url = season && episode 
    ? getTVEpisodeStreamUrl(tmdbId, season, episode, VIDEO_PROVIDERS.VIP)
    : getMovieStreamUrl(tmdbId, VIDEO_PROVIDERS.VIP);
  
  if (subtitleUrl) {
    const encodedSubUrl = encodeURIComponent(subtitleUrl);
    const encodedSubLabel = encodeURIComponent(subtitleLabel);
    url += `&sub_url=${encodedSubUrl}&sub_label=${encodedSubLabel}`;
  }
  
  return url;
};

// دالة للحصول على إعدادات المشغل
export const getPlayerSettings = () => {
  const settings = localStorage.getItem('playerSettings');
  return settings ? JSON.parse(settings) : {
    provider: VIDEO_PROVIDERS.VIP,
    autoplay: true,
    volume: 0.8,
    quality: 'auto'
  };
};

// دالة لحفظ إعدادات المشغل
export const savePlayerSettings = (settings) => {
  localStorage.setItem('playerSettings', JSON.stringify(settings));
};

// دالة للحصول على المزود المفضل
export const getPreferredProvider = () => {
  const settings = getPlayerSettings();
  return settings.provider || VIDEO_PROVIDERS.VIP;
};

// دالة لتعيين المزود المفضل
export const setPreferredProvider = (provider) => {
  const settings = getPlayerSettings();
  settings.provider = provider;
  savePlayerSettings(settings);
};