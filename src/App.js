import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import { validateToken } from './api/auth';
import './App.css';

// Component to handle token validation on initial load and navigation
function AuthInitializer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const isAuthPath = ['/login', '/signup'].includes(location.pathname);

      if (!storedUser) {
        if (!isAuthPath) {
          navigate('/login');
        }
        return;
      }

      // If logged in and on login/signup page, redirect to home
      if (isAuthPath) {
        navigate('/');
        return;
      }

      try {
        await validateToken();
      } catch (err) {
        // Interceptor handles logout, but we can log here
        console.error('Session expired');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return children;
}

function AppContent() {
  const location = useLocation();
  const isAuthPath = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isAuthPath && <Navigation />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthInitializer>
        <AppContent />
      </AuthInitializer>
    </Router>
  );
}

export default App;
