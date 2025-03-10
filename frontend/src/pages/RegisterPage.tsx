import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Loader2, UserPlus } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import TestimonialSection from "../components/TestimonialSection";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const { register } = useAuth();
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

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register({ name, email, password });
      if (success) {
        navigate("/");
      }
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
                <UserPlus style={{ color: '#e63946' }} size={32} />
              </div>
            </div>
            <h2 className="title is-size-4 has-text-weight-bold mb-2" style={{ color: '#1d3557' }}>Create an Account</h2>
            <p className="subtitle is-size-6 has-text-grey">Join us and start making a difference</p>
          </div>
          
          <div className="card-content p-5">
            <form onSubmit={handleSubmit} className="has-space-y-5">
              <div className="field">
                <label htmlFor="name" className="label" style={{ color: '#1d3557' }}>
                  Full Name
                </label>
                <div className="control has-icons-left">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                  <span className="icon is-small is-left">
                    <User size={18} style={{ color: '#457b9d' }} />
                  </span>
                </div>
              </div>

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
                <label htmlFor="password" className="label" style={{ color: '#1d3557' }}>
                  Password
                </label>
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
                <p className="help" style={{ color: '#457b9d' }}>Password must be at least 6 characters</p>
              </div>

              <div className="field">
                <label htmlFor="confirmPassword" className="label" style={{ color: '#1d3557' }}>
                  Confirm Password
                </label>
                <div className="control has-icons-left">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    placeholder="••••••••"
                    required
                  />
                  <span className="icon is-small is-left">
                    <Lock size={18} style={{ color: '#457b9d' }} />
                  </span>
                </div>
                {passwordError && <p className="help is-danger">{passwordError}</p>}
              </div>

              <div className="field mt-4">
                <div className="control">
                  <label className="checkbox" style={{ color: '#1d3557' }}>
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mr-2"
                    />
                    I agree to the{" "}
                    <Link to="/terms" style={{ color: '#e63946' }}>
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" style={{ color: '#e63946' }}>
                      Privacy Policy
                    </Link>
                  </label>
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
                    "Create Account"
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
              <span className="has-text-grey">Already have an account?</span>{" "}
              <Link to="/login" style={{ 
                color: '#e63946', 
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                Sign in
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
          showTitle={true}
          compact={isCompact}
        />
      </div>
    </div>
  );
};

export default RegisterPage; 