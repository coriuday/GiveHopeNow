import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { shouldUseMockApi } from '../services/mockApiService';
import { processMockDonation } from '../services/mockApiService';

export interface DonationProject {
  id: string;
  title: string;
  image: string;
  description: string;
  raised: number;
  goal: number;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DonationProject;
  onDonationSuccess: () => void;
  onDonationFailure: (error: string) => void;
}

const DonationModal = ({ 
  isOpen, 
  onClose, 
  project, 
  onDonationSuccess,
  onDonationFailure 
}: DonationModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState<string>('10');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>(user?.name || '');
  const [donorEmail, setDonorEmail] = useState<string>(user?.email || '');
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount('10');
      setIsAnonymous(false);
      setStep(1);
      setIsProcessing(false);
      setDonorName(user?.name || '');
      setDonorEmail(user?.email || '');
    }
  }, [isOpen, user]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleCustomAmountSelect = (customAmount: string) => {
    setAmount(customAmount);
  };

  const handleNext = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep(2);
    }
  };

  const handleDonorTypeChange = (anonymous: boolean) => {
    setIsAnonymous(anonymous);
    
    // If switching to non-anonymous and user is logged in, 
    // pre-fill the form with their info
    if (!anonymous && user) {
      setDonorName(user.name || '');
      setDonorEmail(user.email || '');
    }
  };

  const redirectToPaypal = () => {
    setIsProcessing(true);
    
    // Use real payment processing by default
    try {
      // In a real app, we would integrate with the real PayPal API here
      // For demo purposes, we're simulating a PayPal payment with a timeout
      setTimeout(() => {
        // For demo purposes, we'll use a high success rate (90%)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
          // In a real implementation, we would call the backend API to process the payment
          // For example:
          // api.post('/payments/process', {
          //   projectId: project.id,
          //   amount: parseFloat(amount),
          //   isAnonymous,
          //   donorName: isAnonymous ? null : donorName,
          //   donorEmail: isAnonymous ? null : donorEmail
          // });
          
          onDonationSuccess();
        } else {
          onDonationFailure("Your payment couldn't be processed. Please try again.");
        }
        
        setIsProcessing(false);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      // Log the error for debugging
      console.error("Error during payment processing:", err);
      
      // If real payment processing fails and mock is enabled, fall back to mock
      if (shouldUseMockApi()) {
        processMockDonation(project.id, parseFloat(amount), {
          name: donorName,
          email: donorEmail,
          isAnonymous
        })
          .then(() => {
            onDonationSuccess();
          })
          .catch((error) => {
            onDonationFailure(error.message || "Your payment couldn't be processed. Please try again.");
          })
          .finally(() => {
            setIsProcessing(false);
            onClose();
          });
      } else {
        // If real payment fails and mock is not enabled, show error
        setIsProcessing(false);
        onDonationFailure("Payment processing failed. Please try again later.");
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anonymous donors only need to provide an amount
    if (isAnonymous) {
      redirectToPaypal();
      return;
    }
    
    // For registered donors, check if name and email are provided
    if (!donorName || !donorEmail) {
      // In a real app, show validation errors
      alert("Please provide your name and email");
      return;
    }
    
    // All validation passed, redirect to PayPal
    redirectToPaypal();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Donate to {project.title}</p>
          <button 
            className="delete" 
            aria-label="close" 
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          {step === 1 && (
            <div className="content">
              <div className="columns is-vcentered">
                <div className="column is-4">
                  <figure className="image">
                    <img src={project.image} alt={project.title} className="is-rounded" />
                  </figure>
                </div>
                <div className="column">
                  <h2 className="title is-5">{project.title}</h2>
                  <div className="block">
                    <progress 
                      className="progress is-danger" 
                      value={project.raised} 
                      max={project.goal}
                    ></progress>
                    <div className="is-flex is-justify-content-space-between">
                      <span className="has-text-weight-bold">
                        ${project.raised.toLocaleString()} raised
                      </span>
                      <span className="has-text-grey">
                        Goal: ${project.goal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="title is-5 mt-5">Select Donation Amount</h3>
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">
                    $
                  </a>
                </p>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </p>
              </div>
              
              <div className="buttons mt-3">
                {["10", "25", "50", "100", "200"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`button ${amount === value ? 'is-danger is-outlined' : 'is-ghost'}`}
                    onClick={() => handleCustomAmountSelect(value)}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              
              <div className="field mt-5">
                <div className="control">
                  <button 
                    className="button is-danger is-outlined is-fullwidth"
                    onClick={handleNext}
                    disabled={!amount || parseFloat(amount) <= 0}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="content">
              <div className="notification is-info is-light mb-5">
                <p className="has-text-weight-semibold">You're donating: <span className="has-text-danger">${parseFloat(amount).toFixed(2)}</span></p>
              </div>
              
              <div className="tabs is-fullwidth">
                <ul>
                  <li className={isAnonymous ? '' : 'is-active'}>
                    <a onClick={() => handleDonorTypeChange(false)}>
                      <span className="icon is-small"><i className="fas fa-user"></i></span>
                      <span>Donate with Info</span>
                    </a>
                  </li>
                  <li className={isAnonymous ? 'is-active' : ''}>
                    <a onClick={() => handleDonorTypeChange(true)}>
                      <span className="icon is-small"><i className="fas fa-user-secret"></i></span>
                      <span>Donate Anonymously</span>
                    </a>
                  </li>
                </ul>
              </div>
              
              {!isAnonymous && (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Your name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        placeholder="Your email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {!user && (
                    <div className="notification is-warning is-light my-4">
                      <p>Donating with your info? <a onClick={() => navigate('/login')}>Login</a> or <a onClick={() => navigate('/register')}>Register</a> to track your donations.</p>
                    </div>
                  )}
                  
                  <div className="field is-grouped mt-5">
                    <div className="control is-expanded">
                      <button 
                        type="button" 
                        className="button is-ghost is-fullwidth" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                    </div>
                    <div className="control is-expanded">
                      <button 
                        type="submit" 
                        className={`button is-danger is-outlined is-fullwidth ${isProcessing ? 'is-loading' : ''}`}
                        disabled={isProcessing}
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </form>
              )}
              
              {isAnonymous && (
                <div>
                  <div className="notification is-success is-light my-4">
                    <p>You're donating anonymously. No personal information will be stored.</p>
                  </div>
                  
                  <div className="field is-grouped mt-5">
                    <div className="control is-expanded">
                      <button 
                        type="button" 
                        className="button is-ghost is-fullwidth" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                    </div>
                    <div className="control is-expanded">
                      <button 
                        type="button" 
                        className={`button is-danger is-outlined is-fullwidth ${isProcessing ? 'is-loading' : ''}`}
                        onClick={handleSubmit}
                        disabled={isProcessing}
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DonationModal; 