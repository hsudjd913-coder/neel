# Neel - نيل

نسخة طبق الأصل من نتفليكس لأغراض تعليمية مع دعم كامل للغة العربية

## المميزات

- 🎬 مشاهدة الأفلام والمسلسلات
- 🔍 بحث متقدم في المحتوى
- ❤️ قائمة المفضلة
- 🌐 دعم كامل للغة العربية
- 📱 تصميم متجاوب لجميع الأجهزة
- 🔐 تسجيل الدخول بـ Google أو كضيف
- 🎭 معلومات الممثلين والنجوم

## التقنيات المستخدمة

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Movie Data**: TMDB API
- **Video Streaming**: SuperEmbed API
- **Icons**: Lucide React
- **Routing**: React Router DOM

## الصفحات المتاحة

1. **الصفحة الرئيسية** - عرض الأفلام والمسلسلات الشائعة
2. **تسجيل الدخول** - تسجيل الدخول بـ Google أو كضيف
3. **الأفلام** - تصفح الأفلام
4. **المسلسلات** - تصفح المسلسلات
5. **البحث** - البحث في المحتوى
6. **تفاصيل الفيلم/المسلسل** - عرض التفاصيل والمشاهدة
7. **المفضلة** - قائمة المحتوى المفضل
8. **الإعدادات** - إعدادات التطبيق
9. **الملف الشخصي** - معلومات المستخدم
10. **الممثلون** - معلومات النجوم (قيد التطوير)
11. **حول التطبيق** - معلومات التطبيق
12. **سياسة الخصوصية** - سياسة الخصوصية
13. **شروط الاستخدام** - شروط وأحكام الاستخدام

## التثبيت والتشغيل

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd neel
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
إنشاء ملف `.env` في جذر المشروع:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key
```

4. **تشغيل التطبيق**
```bash
npm run dev
```

## إعداد Firebase

1. إنشاء مشروع جديد في [Firebase Console](https://console.firebase.google.com/)
2. تفعيل Authentication مع Google Provider
3. إنشاء قاعدة بيانات Firestore
4. إضافة تكوين Firebase إلى ملف `.env`

## إعداد TMDB API

1. إنشاء حساب في [TMDB](https://www.themoviedb.org/)
2. الحصول على API Key
3. إضافة المفتاح إلى ملف `.env`

## مزودات الفيديو

التطبيق يستخدم SuperEmbed API لجلب روابط الأفلام والمسلسلات من مزودات متعددة:
- VidSrc
- EmbedSu
- MultiEmbed
- SmashyStream
- وغيرها من المزودات المتاحة

## الهيكل العام للمشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
├── pages/              # صفحات التطبيق
├── contexts/           # React Contexts
├── services/           # خدمات API
├── App.jsx            # المكون الرئيسي
└── main.jsx           # نقطة الدخول
```

## المساهمة

هذا المشروع لأغراض تعليمية فقط. يمكنك المساهمة بـ:
- إضافة مميزات جديدة
- تحسين التصميم
- إصلاح الأخطاء
- تحسين الأداء

## الترخيص

هذا المشروع لأغراض تعليمية فقط ولا يهدف للاستخدام التجاري.

## ملاحظات مهمة

- تأكد من احترام حقوق الطبع والنشر
- استخدم المشروع لأغراض تعليمية فقط
- لا تستخدم المشروع لأغراض تجارية

---

تم تطوير هذا المشروع بواسطة OpenHands لأغراض تعليمية 🎓