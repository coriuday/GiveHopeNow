import React from 'react';

interface DonationErrorProps {
  isVisible?: boolean;
  message: string;
  onClose: () => void;
  onRetry?: () => void;
}

const DonationError = ({ 
  isVisible = true,
  message, 
  onClose, 
  onRetry 
}: DonationErrorProps) => {
  if (!isVisible) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <div className="has-text-centered mb-4">
            <span 
              className="icon has-text-danger is-large"
              style={{ fontSize: '3rem' }}
            >
              <i className="fas fa-exclamation-circle"></i>
            </span>
          </div>
          
          <h2 className="title is-4 has-text-centered mb-4">Payment Error</h2>
          <p className="has-text-centered mb-5">{message}</p>
          
          <div className="buttons is-centered">
            {onRetry && (
              <button 
                className="button is-danger is-outlined" 
                onClick={onRetry}
              >
                Try Again
              </button>
            )}
            <button 
              className="button is-ghost" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <button 
        className="modal-close is-large" 
        aria-label="close" 
        onClick={onClose}
      ></button>
    </div>
  );
};

export default DonationError; 