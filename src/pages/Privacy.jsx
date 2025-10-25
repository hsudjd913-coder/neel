import React from 'react';
import { Shield, Eye, Lock, Database, Cookie, UserCheck } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: 'جمع البيانات',
      content: [
        'نجمع الحد الأدنى من البيانات الضرورية لتشغيل الخدمة',
        'معلومات الحساب الأساسية (الاسم، البريد الإلكتروني) عند التسجيل بـ Google',
        'تفضيلات المشاهدة والمحتوى المفضل',
        'بيانات الاستخدام لتحسين الخدمة'
      ]
    },
    {
      icon: Lock,
      title: 'حماية البيانات',
      content: [
        'جميع البيانات محمية بتشفير SSL/TLS',
        'لا نشارك بياناتك الشخصية مع أطراف ثالثة',
        'البيانات محفوظة بشكل آمن في Firebase',
        'يمكنك حذف حسابك وبياناتك في أي وقت'
      ]
    },
    {
      icon: Cookie,
      title: 'ملفات تعريف الارتباط',
      content: [
        'نستخدم ملفات تعريف الارتباط لحفظ تفضيلاتك',
        'ملفات تعريف الارتباط ضرورية لعمل المصادقة',
        'يمكنك إدارة ملفات تعريف الارتباط من إعدادات المتصفح',
        'لا نستخدم ملفات تعريف الارتباط للتتبع الإعلاني'
      ]
    },
    {
      icon: UserCheck,
      title: 'حقوقك',
      content: [
        'الحق في الوصول إلى بياناتك الشخصية',
        'الحق في تصحيح أو تحديث بياناتك',
        'الحق في حذف حسابك وبياناتك',
        'الحق في تصدير بياناتك'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-netflix-red ml-3" size={48} />
            <h1 className="text-4xl font-bold text-white">سياسة الخصوصية</h1>
          </div>
          <p className="text-netflix-lightGray text-lg max-w-2xl mx-auto">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك.
          </p>
          <div className="mt-4 text-sm text-netflix-lightGray">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Eye className="text-netflix-red ml-3" size={24} />
            <h2 className="text-2xl font-bold text-white">مقدمة</h2>
          </div>
          <p className="text-netflix-lightGray leading-relaxed">
            نيل هو مشروع تعليمي مفتوح المصدر يهدف إلى توفير منصة مجانية لمشاهدة الأفلام والمسلسلات. 
            نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً لأفضل الممارسات في مجال الأمان والخصوصية.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-netflix-gray/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <section.icon className="text-netflix-red ml-3" size={24} />
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-netflix-lightGray">
                    <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 ml-3 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Third Party Services */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">الخدمات الخارجية</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Google Firebase</h3>
              <p className="text-netflix-lightGray text-sm">
                نستخدم Firebase للمصادقة وتخزين البيانات. يرجى مراجعة 
                <a href="https://policies.google.com/privacy" className="text-netflix-red hover:underline mr-1 ml-1" target="_blank" rel="noopener noreferrer">
                  سياسة خصوصية Google
                </a>
                لمزيد من المعلومات.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-2">TMDB API</h3>
              <p className="text-netflix-lightGray text-sm">
                نستخدم TMDB API لجلب معلومات الأفلام والمسلسلات. يرجى مراجعة 
                <a href="https://www.themoviedb.org/privacy-policy" className="text-netflix-red hover:underline mr-1 ml-1" target="_blank" rel="noopener noreferrer">
                  سياسة خصوصية TMDB
                </a>
                لمزيد من المعلومات.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">SuperEmbed</h3>
              <p className="text-netflix-lightGray text-sm">
                نستخدم SuperEmbed لتوفير روابط المشاهدة. المحتوى يأتي من مصادر خارجية ولا نتحكم في سياسات الخصوصية الخاصة بها.
              </p>
            </div>
          </div>
        </div>

        {/* Guest Users */}
        <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-6 mt-8">
          <h2 className="text-yellow-400 font-bold text-xl mb-4">المستخدمون الضيوف</h2>
          <p className="text-netflix-lightGray mb-4">
            إذا كنت تستخدم التطبيق كضيف، فإن بياناتك (المفضلة، قائمة المشاهدة) محفوظة محلياً في متصفحك فقط 
            ولا يتم إرسالها إلى خوادمنا.
          </p>
          <ul className="space-y-1 text-netflix-lightGray text-sm">
            <li>• البيانات محفوظة في localStorage</li>
            <li>• لا يتم مشاركة البيانات مع أي خدمة خارجية</li>
            <li>• قد تفقد البيانات عند مسح بيانات المتصفح</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">تواصل معنا</h2>
          <p className="text-netflix-lightGray mb-4">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، يرجى التواصل معنا.
          </p>
          <p className="text-netflix-lightGray text-sm">
            هذا مشروع تعليمي مفتوح المصدر. يمكنك مراجعة الكود المصدري للتأكد من كيفية التعامل مع البيانات.
          </p>
        </div>

        {/* Updates */}
        <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mt-8">
          <h2 className="text-blue-400 font-bold text-xl mb-4">تحديثات السياسة</h2>
          <p className="text-netflix-lightGray text-sm">
            قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة عبر التطبيق. 
            استمرار استخدامك للتطبيق بعد التحديثات يعني موافقتك على السياسة المحدثة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;