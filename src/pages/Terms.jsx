import React from 'react';
import { FileText, AlertTriangle, Scale, Users, Shield, Gavel } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: Users,
      title: 'قبول الشروط',
      content: [
        'باستخدام منصة نيل، فإنك توافق على هذه الشروط والأحكام',
        'إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الخدمة',
        'نحتفظ بالحق في تعديل هذه الشروط في أي وقت',
        'استمرار استخدامك للخدمة يعني موافقتك على الشروط المحدثة'
      ]
    },
    {
      icon: Shield,
      title: 'استخدام الخدمة',
      content: [
        'نيل منصة تعليمية مجانية لمشاهدة الأفلام والمسلسلات',
        'يجب استخدام الخدمة للأغراض الشخصية والتعليمية فقط',
        'يُمنع استخدام الخدمة لأي أغراض تجارية أو غير قانونية',
        'يجب احترام حقوق الطبع والنشر والملكية الفكرية'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'القيود والمحظورات',
      content: [
        'يُمنع محاولة اختراق أو إلحاق الضرر بالنظام',
        'يُمنع استخدام برامج آلية أو روبوتات للوصول للخدمة',
        'يُمنع نشر أو توزيع محتوى مسيء أو غير قانوني',
        'يُمنع انتهاك خصوصية المستخدمين الآخرين'
      ]
    },
    {
      icon: Scale,
      title: 'إخلاء المسؤولية',
      content: [
        'الخدمة مقدمة "كما هي" بدون أي ضمانات',
        'لا نضمن دقة أو اكتمال المحتوى المعروض',
        'لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام الخدمة',
        'المحتوى مقدم من مصادر خارجية ولا نتحكم فيه'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <FileText className="text-netflix-red ml-3" size={48} />
            <h1 className="text-4xl font-bold text-white">شروط الاستخدام</h1>
          </div>
          <p className="text-netflix-lightGray text-lg max-w-2xl mx-auto">
            يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة نيل. استخدامك للمنصة يعني موافقتك على هذه الشروط.
          </p>
          <div className="mt-4 text-sm text-netflix-lightGray">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-400 ml-3" size={24} />
            <h2 className="text-red-400 font-bold text-xl">إشعار مهم</h2>
          </div>
          <p className="text-netflix-lightGray leading-relaxed">
            نيل هو مشروع تعليمي مفتوح المصدر. جميع المحتوى المعروض يأتي من مصادر خارجية ولا نستضيف 
            أي محتوى على خوادمنا. نحن لا نتحمل مسؤولية المحتوى المعروض ونشجع على دعم المنصات الرسمية للمحتوى.
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

        {/* Content Disclaimer */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <div className="flex items-center mb-4">
            <Gavel className="text-netflix-red ml-3" size={24} />
            <h2 className="text-2xl font-bold text-white">إخلاء مسؤولية المحتوى</h2>
          </div>
          <div className="space-y-4 text-netflix-lightGray">
            <p>
              نيل يعمل كوسيط تقني فقط ولا يستضيف أي محتوى على خوادمه. جميع الأفلام والمسلسلات 
              المعروضة تأتي من مصادر خارجية مستقلة.
            </p>
            <p>
              نحن نحترم حقوق الطبع والنشر ونستجيب لطلبات الإزالة المشروعة. إذا كنت تعتقد أن 
              محتوى معين ينتهك حقوق الطبع والنشر، يرجى التواصل معنا.
            </p>
            <p>
              المستخدمون مسؤولون عن التأكد من أن استخدامهم للمحتوى يتوافق مع القوانين المحلية 
              في بلدانهم.
            </p>
          </div>
        </div>

        {/* User Accounts */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">حسابات المستخدمين</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">المستخدمون المسجلون</h3>
              <ul className="space-y-1 text-netflix-lightGray text-sm">
                <li>• يجب تقديم معلومات صحيحة عند التسجيل</li>
                <li>• أنت مسؤول عن الحفاظ على أمان حسابك</li>
                <li>• يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك</li>
                <li>• يمكنك حذف حسابك في أي وقت</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-2">المستخدمون الضيوف</h3>
              <ul className="space-y-1 text-netflix-lightGray text-sm">
                <li>• يمكن استخدام الخدمة بدون تسجيل</li>
                <li>• البيانات محفوظة محلياً في المتصفح فقط</li>
                <li>• قد تفقد البيانات عند مسح بيانات المتصفح</li>
                <li>• نفس الشروط والأحكام تنطبق على الضيوف</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">إنهاء الخدمة</h2>
          <p className="text-netflix-lightGray mb-4">
            نحتفظ بالحق في إنهاء أو تعليق وصولك للخدمة في أي وقت، مع أو بدون إشعار، 
            لأي سبب بما في ذلك انتهاك هذه الشروط.
          </p>
          <p className="text-netflix-lightGray text-sm">
            عند إنهاء حسابك، ستفقد الوصول إلى جميع البيانات المرتبطة بالحساب.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-netflix-gray/50 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">القانون المطبق</h2>
          <p className="text-netflix-lightGray">
            هذه الشروط والأحكام محكومة بالقوانين المعمول بها. أي نزاع ينشأ عن استخدام 
            الخدمة سيتم حله وفقاً للقوانين المحلية.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mt-8">
          <h2 className="text-blue-400 font-bold text-xl mb-4">تواصل معنا</h2>
          <p className="text-netflix-lightGray mb-4">
            إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى التواصل معنا.
          </p>
          <p className="text-netflix-lightGray text-sm">
            نيل هو مشروع تعليمي مفتوح المصدر ونرحب بمساهماتكم واقتراحاتكم لتحسين المنصة.
          </p>
        </div>

        {/* Agreement */}
        <div className="text-center mt-8 p-6 bg-netflix-red/20 border border-netflix-red/50 rounded-lg">
          <p className="text-white font-semibold mb-2">
            باستخدام منصة نيل، فإنك تؤكد أنك قرأت وفهمت ووافقت على هذه الشروط والأحكام
          </p>
          <p className="text-netflix-lightGray text-sm">
            إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام الخدمة
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;