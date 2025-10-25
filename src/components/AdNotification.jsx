import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const AdNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // التحقق من localStorage لمعرفة إذا كان الإشعار قد تم عرضه من قبل
    const notificationShown = localStorage.getItem('adNotificationShown');
    
    if (!notificationShown) {
      // عرض الإشعار بعد 5 ثوانٍ من تحميل الصفحة
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // حفظ في localStorage أن الإشعار تم عرضه
    localStorage.setItem('adNotificationShown', 'true');
  };

  const handleDontShowAgain = () => {
    setIsVisible(false);
    // حفظ في localStorage أن المستخدم لا يريد رؤية الإشعار مرة أخرى
    localStorage.setItem('adNotificationShown', 'permanent');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-netflix-gray rounded-lg max-w-md w-full p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-netflix-lightGray hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-yellow-500/20 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-4">
          إشعار مهم حول الإعلانات
        </h3>

        {/* Content */}
        <div className="text-netflix-lightGray text-center space-y-3 mb-6">
          <p>
            نود إعلامكم أن جميع الإعلانات التي قد تظهر أثناء مشاهدة المحتوى هي من مزودي الخدمة الخارجيين وليس من تطبيق Neel.
          </p>
          <p className="text-sm">
            نحن لا نتحكم في هذه الإعلانات ولا نتحمل مسؤوليتها. يرجى توخي الحذر عند التفاعل معها.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleClose}
            className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            فهمت
          </button>
          <button
            onClick={handleDontShowAgain}
            className="text-netflix-lightGray hover:text-white text-sm transition-colors"
          >
            لا تظهر هذا الإشعار مرة أخرى
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdNotification;