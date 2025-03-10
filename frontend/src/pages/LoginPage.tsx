import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import TestimonialSection from "../components/TestimonialSection";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check window size for responsive layout
  useEffect(() => {
    const checkWindowSize = () => {
      setIsCompact(window.innerWidth < 992);
    };
    
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Failed to log in");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/src/assets/GIveHopeNow-logo.svg" 
            alt="GiveHopeNow Logo" 
            className="mx-auto" 
            style={{ 
              maxWidth: '200px', 
              height: 'auto',
              marginBottom: '0.5rem'
            }} 
          />
          <p className="text-gray-600 mt-2">Make a difference today</p>
        </div>
        
        <div className="card is-rounded has-shadow-lg has-animation" style={{ 
          borderTop: '4px solid #e63946',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          transition: 'all 0.3s ease',
          marginBottom: '2rem'
        }}>
          <div className="card-header has-text-centered p-5 is-block" style={{ backgroundColor: '#f1faee' }}>
            <div className="is-flex is-justify-content-center mb-4">
              <div className="is-flex is-align-items-center is-justify-content-center p-4" style={{ 
                backgroundColor: 'rgba(230, 57, 70, 0.1)', 
                borderRadius: '50%',
                width: '64px',
                height: '64px'
              }}>
                <LogIn style={{ color: '#e63946' }} size={32} />
              </div>
            </div>
            <h2 className="title is-size-4 has-text-weight-bold mb-2" style={{ color: '#1d3557' }}>Welcome Back</h2>
            <p className="subtitle is-size-6 has-text-grey">Sign in to continue your journey</p>
          </div>
          
          <div className="card-content p-5">
            <form onSubmit={handleSubmit} className="has-space-y-5">
              {error && (
                <div className="notification is-danger is-light">
                  {error}
                </div>
              )}
              
              <div className="field">
                <label htmlFor="email" className="label" style={{ color: '#1d3557' }}>
                  Email Address
                </label>
                <div className="control has-icons-left">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="your@email.com"
                    required
                  />
                  <span className="icon is-small is-left">
                    <Mail size={18} style={{ color: '#457b9d' }} />
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="is-flex is-justify-content-space-between is-align-items-center flex-wrap">
                  <label htmlFor="password" className="label mb-0" style={{ color: '#1d3557' }}>
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="is-size-7 is-flex is-align-items-center"
                    style={{ color: '#e63946' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="control has-icons-left">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="••••••••"
                    required
                  />
                  <span className="icon is-small is-left">
                    <Lock size={18} style={{ color: '#457b9d' }} />
                  </span>
                </div>
              </div>

              <div className="field mt-5">
                <Button
                  type="submit"
                  className="button is-fullwidth has-text-weight-medium"
                  style={{ 
                    backgroundColor: '#e63946', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.5rem',
                    height: 'auto',
                    boxShadow: '0 4px 6px rgba(230, 57, 70, 0.2)'
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} /> Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>

            <div className="is-divider" data-content="OR" style={{ margin: '1.5rem 0' }}></div>

            <div className="columns is-mobile mt-5 is-variable is-2">
              <div className="column">
                <button className="button is-fullwidth" style={{ 
                  borderColor: '#457b9d', 
                  color: '#457b9d', 
                  borderWidth: '2px',
                  backgroundColor: 'transparent',
                  height: 'auto',
                  padding: '0.5rem'
                }}>
                  <FaFacebook className="mr-2" color="#3b5998" />
                  <span>Facebook</span>
                </button>
              </div>
              <div className="column">
                <button className="button is-fullwidth" style={{ 
                  borderColor: '#457b9d', 
                  color: '#457b9d', 
                  borderWidth: '2px',
                  backgroundColor: 'transparent',
                  height: 'auto', 
                  padding: '0.5rem'
                }}>
                  <FaGoogle className="mr-2" color="#db4437" />
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: '#f1faee', 
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <p className="is-size-7" style={{ width: '100%' }}>
              <span className="has-text-grey">Don't have an account?</span>{" "}
              <Link to="/register" style={{ 
                color: '#e63946', 
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full max-w-6xl mt-6">
        <TestimonialSection 
          maxDisplay={3} 
          backgroundColor="white"
          compact={isCompact}
        />
      </div>
    </div>
  );
};

export default LoginPage; 