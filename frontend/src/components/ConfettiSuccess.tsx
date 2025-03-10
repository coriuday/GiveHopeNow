import { useEffect, useState } from 'react';

interface ConfettiSuccessProps {
  isActive?: boolean;
  message?: string;
  onComplete?: () => void;
}

const ConfettiSuccess = ({ isActive = true, message = "Thank you for your donation!", onComplete }: ConfettiSuccessProps) => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Generate confetti immediately
    generateConfetti();
    
    // Auto hide after 5 seconds
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);
  
  const generateConfetti = () => {
    const colors = ['#e63946', '#457b9d', '#f4a261', '#2a9d8f', '#e9c46a'];
    const particleCount = 150;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const left = Math.random() * 100;
      const animationDuration = 3 + Math.random() * 4;
      const size = 7 + Math.random() * 7;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push(
        <div
          key={i}
          className="confetti-particle"
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: '-20px',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            animation: `confetti-fall ${animationDuration}s linear forwards`,
          }}
        />
      );
    }
    
    setParticles(newParticles);
  };
  
  if (!isActive) return null;
  
  return (
    <div 
      className="confetti-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {particles}
      
      <div
        className="success-message has-text-centered"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 10000,
          maxWidth: '90%',
          width: '500px',
          animation: 'fade-in 0.5s ease-out'
        }}
      >
        <div className="icon-container" style={{ marginBottom: '1.5rem' }}>
          <span 
            className="icon has-text-success is-large"
            style={{ 
              fontSize: '5rem',
              animation: 'pulse 1s infinite alternate',
            }}
          >
            <i className="fas fa-heart"></i>
          </span>
        </div>
        
        <h2 className="title is-4 mb-4">Thank You!</h2>
        <p className="subtitle is-5 mb-5">{message}</p>
        
        <div className="is-flex is-justify-content-center">
          <button 
            className="button is-primary is-outlined is-rounded"
            onClick={onComplete}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfettiSuccess; 