import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // يجب إضافة تكوين Firebase هنا
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // حفظ بيانات المستخدم في Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
      favorites: [],
      watchlist: [],
      settings: {
        language: 'ar',
        videoProvider: 'vip',
        autoplay: true
      }
    }, { merge: true });
    
    return user;
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    throw error;
  }
};

export const signInAsGuest = async () => {
  // إنشاء مستخدم ضيف مؤقت
  const guestUser = {
    uid: 'guest_' + Date.now(),
    name: 'ضيف',
    email: null,
    photoURL: null,
    isGuest: true,
    favorites: [],
    watchlist: [],
    settings: {
      language: 'ar',
      videoProvider: 'vip',
      autoplay: true
    }
  };
  
  // حفظ بيانات الضيف في localStorage
  localStorage.setItem('guestUser', JSON.stringify(guestUser));
  return guestUser;
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('guestUser');
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        // التحقق من وجود مستخدم ضيف
        const guestUser = localStorage.getItem('guestUser');
        resolve(guestUser ? JSON.parse(guestUser) : null);
      }
    });
  });
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('خطأ في جلب بيانات المستخدم:', error);
    return null;
  }
};