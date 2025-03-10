import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  testimonial: string;
  avatar: string;
  accentColor?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  testimonial, 
  avatar,
  accentColor = '#e63946'
}) => {
  return (
    <div className="card" style={{ 
      borderRadius: '0.75rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e5e7eb',
      margin: '0.5rem'
    }}>
      {/* Person section at the top with accent background */}
      <div style={{ 
        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f1faee'
      }}>
        <img 
          src={avatar} 
          alt={`${name}'s avatar`} 
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: `3px solid ${accentColor}`,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
          }} 
        />
        <div className="ml-3">
          <p style={{ 
            fontWeight: 700, 
            color: '#1d3557', 
            margin: 0, 
            fontSize: '1.1rem'
          }}>{name}</p>
          <p style={{ 
            fontSize: '0.85rem', 
            color: '#457b9d', 
            margin: 0,
            fontWeight: 500
          }}>{role}</p>
        </div>
      </div>
      
      <div className="card-content p-4" style={{ flex: 1 }}>
        <div className="mb-3" style={{ textAlign: 'left' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill={`${accentColor}20`} stroke={accentColor} strokeWidth="1">
            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
          </svg>
        </div>
        
        <p style={{ 
          color: '#1d3557', 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          fontStyle: 'italic' 
        }}>
          "{testimonial}"
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard; 