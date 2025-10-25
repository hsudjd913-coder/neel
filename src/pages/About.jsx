import React from 'react';
import { Info, Play, Heart, Shield, Globe, Code, Users, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Play,
      title: 'مشاهدة مجانية',
      description: 'استمتع بآلاف الأفلام والمسلسلات مجاناً بدون اشتراك'
    },
    {
      icon: Heart,
      title: 'قوائم شخصية',
      description: 'أضف المحتوى المفضل لديك وأنشئ قوائم مشاهدة مخصصة'
    },
    {
      icon: Shield,
      title: 'آمن وموثوق',
      description: 'منصة آمنة مع حماية خصوصيتك وبياناتك الشخصية'
    },
    {
      icon: Globe,
      title: 'محتوى عالمي',
      description: 'أفلام ومسلسلات من جميع أنحاء العالم بلغات متعددة'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'فيلم ومسلسل' },
    { number: '16', label: 'مزود فيديو' },
    { number: '100%', label: 'مجاني' },
    { number: '24/7', label: 'متاح دائماً' }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Info className="text-netflix-red ml-3" size={48} />
            <h1 className="text-5xl font-bold text-white">نيل</h1>
          </div>
          <p className="text-xl text-netflix-lightGray mb-8 max-w-2xl mx-auto">
            منصة تعليمية مجانية لمشاهدة الأفلام والمسلسلات من جميع أنحاء العالم
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              ابدأ المشاهدة
            </a>
            <a
              href="/movies"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              تصفح الأفلام
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-netflix-gray/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-netflix-red mb-2">
                  {stat.number}
                </div>
                <div className="text-netflix-lightGray">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">لماذا نيل؟</h2>
            <p className="text-netflix-lightGray text-lg max-w-2xl mx-auto">
              نوفر لك تجربة مشاهدة استثنائية مع مجموعة واسعة من المميزات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-netflix-gray/50 rounded-lg p-6 text-center hover:bg-netflix-gray/70 transition-colors">
                <feature.icon className="text-netflix-red mx-auto mb-4" size={48} />
                <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-netflix-lightGray text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-netflix-gray/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Code className="text-netflix-red mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-white mb-4">التقنيات المستخدمة</h2>
            <p className="text-netflix-lightGray text-lg max-w-2xl mx-auto">
              بُني نيل باستخدام أحدث التقنيات لضمان أفضل تجربة مستخدم
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'React.js',
              'Firebase',
              'Tailwind CSS',
              'TMDB API',
              'SuperEmbed',
              'Vite',
              'Lucide Icons',
              'React Router'
            ].map((tech, index) => (
              <div key={index} className="bg-netflix-black/50 rounded-lg p-4 text-center">
                <div className="text-white font-semibold">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="text-netflix-red mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-6">مهمتنا</h2>
          <p className="text-netflix-lightGray text-lg leading-relaxed mb-8">
            نهدف إلى توفير منصة تعليمية مجانية وآمنة لمشاهدة الأفلام والمسلسلات، 
            مع التركيز على تجربة المستخدم وسهولة الاستخدام. نيل هو مشروع تعليمي 
            يهدف إلى إظهار كيفية بناء منصة بث حديثة باستخدام أحدث التقنيات.
          </p>
          
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">ملاحظة مهمة</h3>
            <p className="text-netflix-lightGray text-sm">
              نيل هو مشروع تعليمي مفتوح المصدر. جميع المحتوى المعروض يأتي من مصادر خارجية 
              ولا نستضيف أي محتوى على خوادمنا. نحن نحترم حقوق الطبع والنشر ونشجع على دعم 
              المنصات الرسمية للمحتوى.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-netflix-gray/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="text-netflix-red mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-6">تواصل معنا</h2>
          <p className="text-netflix-lightGray text-lg mb-8">
            لديك اقتراحات أو تواجه مشاكل؟ نحن هنا لمساعدتك
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-netflix-black/50 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">الدعم التقني</h3>
              <p className="text-netflix-lightGray text-sm">
                للمساعدة في المشاكل التقنية والأخطاء
              </p>
            </div>
            
            <div className="bg-netflix-black/50 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">الاقتراحات</h3>
              <p className="text-netflix-lightGray text-sm">
                شاركنا أفكارك لتحسين المنصة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;