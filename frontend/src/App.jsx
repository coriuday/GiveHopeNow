import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import { AuthProvider } from './AuthContext'; // Importing AuthProvider
import ProtectedRoute from './components/ProtectedRoute';

export const AuthContext = createContext();
export const ThemeContext = createContext();

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './Routes/Login';
import Donations from './Routes/Donations';
import SignUp from './Routes/SignUp';
import AboutUs from './components/AboutUs';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Router>
          <AuthProvider> {/* Using AuthProvider instead of AuthContext.Provider */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<AboutUs />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donate"
                element={
                  <ProtectedRoute>
                    <Donations />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
