import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import TVShowDetails from './pages/TVShowDetails';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Actors from './pages/Actors';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// مكون لحماية الصفحات التي تتطلب تسجيل دخول
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// مكون للصفحات العامة (مع شريط التنقل)
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
};

function AppContent() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />
          
          {/* الصفحات المحمية */}
          <Route path="/" element={
            <ProtectedRoute>
              <PublicLayout>
                <Home />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/movies" element={
            <ProtectedRoute>
              <PublicLayout>
                <Movies />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/tv-shows" element={
            <ProtectedRoute>
              <PublicLayout>
                <TVShows />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/search" element={
            <ProtectedRoute>
              <PublicLayout>
                <Search />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <PublicLayout>
                <MovieDetails />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/tv/:id" element={
            <ProtectedRoute>
              <PublicLayout>
                <TVShowDetails />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/favorites" element={
            <ProtectedRoute>
              <PublicLayout>
                <Favorites />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <PublicLayout>
                <Settings />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <PublicLayout>
                <Profile />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/actors" element={
            <ProtectedRoute>
              <PublicLayout>
                <Actors />
              </PublicLayout>
            </ProtectedRoute>
          } />
          
          {/* الصفحات العامة */}
          <Route path="/about" element={
            <PublicLayout>
              <About />
            </PublicLayout>
          } />
          
          <Route path="/privacy" element={
            <PublicLayout>
              <Privacy />
            </PublicLayout>
          } />
          
          <Route path="/terms" element={
            <PublicLayout>
              <Terms />
            </PublicLayout>
          } />
          
          {/* إعادة توجيه للصفحات غير الموجودة */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;