import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signInWithGoogle, signInAsGuest, signOutUser, getUserData } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser && !currentUser.isGuest) {
          const data = await getUserData(currentUser.uid);
          setUserData(data);
        } else if (currentUser && currentUser.isGuest) {
          setUserData(currentUser);
        }
      } catch (error) {
        console.error('خطأ في تهيئة المصادقة:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (method = 'google') => {
    try {
      setLoading(true);
      let user;
      
      if (method === 'google') {
        user = await signInWithGoogle();
        const data = await getUserData(user.uid);
        setUserData(data);
      } else if (method === 'guest') {
        user = await signInAsGuest();
        setUserData(user);
      }
      
      setUser(user);
      return user;
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const addToFavorites = (item) => {
    if (!userData) return;
    
    const favorites = userData.favorites || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === item.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, item];
      updateUserData({ favorites: updatedFavorites });
      
      // حفظ في localStorage للضيوف
      if (user?.isGuest) {
        const guestUser = { ...userData, favorites: updatedFavorites };
        localStorage.setItem('guestUser', JSON.stringify(guestUser));
      }
    }
  };

  const removeFromFavorites = (itemId) => {
    if (!userData) return;
    
    const favorites = userData.favorites || [];
    const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
    updateUserData({ favorites: updatedFavorites });
    
    // حفظ في localStorage للضيوف
    if (user?.isGuest) {
      const guestUser = { ...userData, favorites: updatedFavorites };
      localStorage.setItem('guestUser', JSON.stringify(guestUser));
    }
  };

  const addToWatchlist = (item) => {
    if (!userData) return;
    
    const watchlist = userData.watchlist || [];
    const isAlreadyInWatchlist = watchlist.some(watch => watch.id === item.id);
    
    if (!isAlreadyInWatchlist) {
      const updatedWatchlist = [...watchlist, item];
      updateUserData({ watchlist: updatedWatchlist });
      
      // حفظ في localStorage للضيوف
      if (user?.isGuest) {
        const guestUser = { ...userData, watchlist: updatedWatchlist };
        localStorage.setItem('guestUser', JSON.stringify(guestUser));
      }
    }
  };

  const removeFromWatchlist = (itemId) => {
    if (!userData) return;
    
    const watchlist = userData.watchlist || [];
    const updatedWatchlist = watchlist.filter(watch => watch.id !== itemId);
    updateUserData({ watchlist: updatedWatchlist });
    
    // حفظ في localStorage للضيوف
    if (user?.isGuest) {
      const guestUser = { ...userData, watchlist: updatedWatchlist };
      localStorage.setItem('guestUser', JSON.stringify(guestUser));
    }
  };

  const value = {
    user,
    userData,
    loading,
    login,
    logout,
    updateUserData,
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    isAuthenticated: !!user,
    isGuest: user?.isGuest || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};