import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Server, Volume2, Play, Globe, Monitor } from 'lucide-react';
import { PROVIDER_NAMES, getPlayerSettings, savePlayerSettings, setPreferredProvider } from '../services/superembed';

const Settings = () => {
  const [settings, setSettings] = useState({
    provider: 'vip',
    autoplay: true,
    volume: 0.8,
    quality: 'auto',
    language: 'ar',
    theme: 'dark'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // تحميل الإعدادات المحفوظة
    const savedSettings = getPlayerSettings();
    setSettings(prev => ({ ...prev, ...savedSettings }));
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // حفظ إعدادات المشغل
    savePlayerSettings(settings);
    setPreferredProvider(settings.provider);
    
    // حفظ الإعدادات العامة في localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const qualityOptions = [
    { value: 'auto', label: 'تلقائي' },
    { value: '1080p', label: '1080p - عالية الجودة' },
    { value: '720p', label: '720p - جودة متوسطة' },
    { value: '480p', label: '480p - جودة منخفضة' }
  ];

  const languageOptions = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'الوضع المظلم' },
    { value: 'light', label: 'الوضع المضيء' }
  ];

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <SettingsIcon className="text-netflix-red ml-3" size={32} />
            <h1 className="text-4xl font-bold text-white">الإعدادات</h1>
          </div>
          <p className="text-netflix-lightGray text-lg">
            خصص تجربة المشاهدة حسب تفضيلاتك
          </p>
        </div>

        <div className="space-y-8">
          {/* Video Player Settings */}
          <div className="bg-netflix-gray/50 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Play className="text-netflix-red ml-3" size={24} />
              <h2 className="text-2xl font-bold text-white">إعدادات المشغل</h2>
            </div>

            <div className="space-y-6">
              {/* Video Provider */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  <Server className="inline ml-2" size={18} />
                  مزود الفيديو المفضل
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(PROVIDER_NAMES).map(([provider, name]) => (
                    <button
                      key={provider}
                      onClick={() => handleSettingChange('provider', provider)}
                      className={`p-3 rounded-md text-sm font-medium transition-colors text-right ${
                        settings.provider === provider
                          ? 'bg-netflix-red text-white'
                          : 'bg-netflix-gray text-netflix-lightGray hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <p className="text-netflix-lightGray text-sm mt-2">
                  يُنصح باستخدام VIP للحصول على أفضل جودة وأقل إعلانات
                </p>
              </div>

              {/* Autoplay */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white font-semibold">
                    <Play className="inline ml-2" size={18} />
                    التشغيل التلقائي
                  </span>
                  <button
                    onClick={() => handleSettingChange('autoplay', !settings.autoplay)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoplay ? 'bg-netflix-red' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoplay ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
                <p className="text-netflix-lightGray text-sm mt-1">
                  تشغيل الفيديو تلقائياً عند فتح الصفحة
                </p>
              </div>

              {/* Volume */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  <Volume2 className="inline ml-2" size={18} />
                  مستوى الصوت الافتراضي: {Math.round(settings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => handleSettingChange('volume', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Quality */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  <Monitor className="inline ml-2" size={18} />
                  جودة الفيديو المفضلة
                </label>
                <select
                  value={settings.quality}
                  onChange={(e) => handleSettingChange('quality', e.target.value)}
                  className="w-full bg-netflix-gray text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                >
                  {qualityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-netflix-lightGray text-sm mt-1">
                  الجودة التلقائية تتكيف مع سرعة الإنترنت
                </p>
              </div>
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-netflix-gray/50 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Globe className="text-netflix-red ml-3" size={24} />
              <h2 className="text-2xl font-bold text-white">الإعدادات العامة</h2>
            </div>

            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  لغة التطبيق
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full bg-netflix-gray text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  مظهر التطبيق
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="w-full bg-netflix-gray text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                >
                  {themeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-netflix-lightGray text-sm mt-1">
                  حالياً يدعم التطبيق الوضع المظلم فقط
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className={`flex items-center space-x-2 space-x-reverse px-8 py-3 rounded-md font-semibold transition-colors ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-netflix-red hover:bg-red-700 text-white'
              }`}
            >
              <Save size={20} />
              <span>{saved ? 'تم الحفظ!' : 'حفظ الإعدادات'}</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">معلومات مهمة:</h3>
            <ul className="space-y-2 text-netflix-lightGray text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                <span>يتم حفظ جميع الإعدادات محلياً في متصفحك</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                <span>مزود VIP يوفر أفضل جودة مع أقل عدد من الإعلانات</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                <span>يمكنك تغيير المزود أثناء المشاهدة من داخل المشغل</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                <span>الجودة التلقائية تتكيف مع سرعة الإنترنت لديك</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;