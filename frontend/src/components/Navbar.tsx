import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

// Simple icon component for theme toggle
const ThemeIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <span className="icon">
    {isDarkMode ? (
      <i className="fas fa-sun"></i>
    ) : (
      <i className="fas fa-moon"></i>
    )}
  </span>
);

const Navbar = ({ onCreateProject }: { onCreateProject?: () => void }) => {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
  }
  
  return (
    <nav className={`navbar ${scrolled ? 'is-fixed-top has-shadow' : ''}`} role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="has-text-danger has-text-weight-bold is-size-4">Give</span>
            <span className="has-text-dark has-text-weight-bold is-size-4">Hope</span>
            <span className="has-text-danger has-text-weight-bold is-size-4">Now</span>
          </Link>
          
          <a 
            role="button" 
            className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`} 
            aria-label="menu" 
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/" className={`navbar-item ${location.pathname === '/' ? 'has-text-danger' : ''}`}>
              Home
            </Link>
            <Link to="/projects" className={`navbar-item ${location.pathname === '/projects' ? 'has-text-danger' : ''}`}>
              Projects
            </Link>
            <Link to="/about" className={`navbar-item ${location.pathname === '/about' ? 'has-text-danger' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`navbar-item ${location.pathname === '/contact' ? 'has-text-danger' : ''}`}>
              Contact
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <button 
                onClick={toggleTheme} 
                className="button is-small is-ghost"
                aria-label="Toggle theme"
              >
                <ThemeIcon isDarkMode={isDarkMode} />
              </button>
            </div>

            {user && onCreateProject && (
              <div className="navbar-item">
                <button 
                  className="button is-primary is-outlined" 
                  onClick={onCreateProject} 
                >
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Create Project</span>
                </button>
              </div>
            )}
            
            <div className="navbar-item">
              {user ? (
                <div className="buttons">
                  <button 
                    className="button is-danger is-outlined"
                    onClick={handleLogout} 
                  >
                    <span className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="buttons">
                  <Link to="/register" className="button is-danger is-outlined">Sign Up</Link>
                  <Link to="/login" className="button is-ghost">Log In</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 