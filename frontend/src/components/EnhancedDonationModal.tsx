import { useState, useEffect, useRef } from 'react';
import EnhancedDonationForm, { DonationData } from './EnhancedDonationForm';
import ConfettiSuccess from './ConfettiSuccess';
import DonationError from './DonationError';
import { initiatePayment } from '../services/projectService';
import { shouldUseMockApi, processMockDonation } from '../services/mockApiService';

export interface DonationProject {
  id: string;
  title: string;
  image: string;
  description: string;
  raised: number;
  goal: number;
}

interface EnhancedDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DonationProject;
  onDonationSuccess?: () => void;
  onDonationFailure?: (message: string) => void;
}

const EnhancedDonationModal = ({ 
  isOpen, 
  onClose, 
  project,
  onDonationSuccess,
  onDonationFailure
}: EnhancedDonationModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const paypalButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize PayPal SDK if payment method is PayPal
    if (paymentMethod === 'paypal' && isOpen && paypalButtonRef.current) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
      script.async = true;
      script.onload = () => {
        if (window.paypal && paypalButtonRef.current) {
          window.paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  description: `Donation to ${project.title}`,
                  amount: {
                    value: document.getElementById('donation-amount')?.getAttribute('data-amount') || '10.00'
                  }
                }]
              });
            },
            onApprove: async (data: any, actions: any) => {
              setIsProcessing(true);
              try {
                // When using real PayPal, you would use the following:
                // const details = await actions.order.capture();
                
                // For demo, use our mock service
                const donationAmount = parseFloat(document.getElementById('donation-amount')?.getAttribute('data-amount') || '10.00');
                
                if (shouldUseMockApi()) {
                  const result = await processMockDonation(project.id, donationAmount);
                  handleDonationSuccess();
                } else {
                  // In a real app, you would process the PayPal result
                  handleDonationSuccess();
                }
              } catch (error) {
                console.error("PayPal error:", error);
                handleDonationFailure("PayPal payment processing failed. Please try again.");
              } finally {
                setIsProcessing(false);
              }
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              handleDonationFailure("PayPal encountered an error. Please try another payment method.");
            }
          }).render(paypalButtonRef.current);
        }
      };
      document.body.appendChild(script);
      
      return () => {
        // Clean up the script when component unmounts
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [paymentMethod, isOpen, project.id, project.title]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, isProcessing]);

  // Handle overlay click
  const handleOverlayClick = () => {
    if (!isProcessing) {
      onClose();
    }
  };
  
  const handleDonate = async (donationData: DonationData) => {
    setIsProcessing(true);
    
    try {
      if (donationData.paymentMethod === 'paypal') {
        // PayPal is handled by the PayPal buttons and SDK
        // Just store the amount for the PayPal buttons to use
        const amountElement = document.getElementById('donation-amount');
        if (amountElement) {
          amountElement.setAttribute('data-amount', donationData.amount.toString());
        }
        setPaymentMethod('paypal');
        setIsProcessing(false);
        return;
      }
      
      // For other payment methods, use our API
      if (shouldUseMockApi()) {
        // Use mock payment processing for development
        await processMockDonation(donationData.projectId, donationData.amount, {
          name: donationData.donorName,
          email: donationData.donorEmail
        });
        handleDonationSuccess();
      } else {
        // Call the payment API
        const response = await initiatePayment({
          projectId: donationData.projectId,
          amount: donationData.amount,
          donorName: donationData.donorName,
          donorEmail: donationData.donorEmail,
          message: donationData.message,
          paymentMethod: donationData.paymentMethod
        });
        
        // If payment is successful, show success message
        if (response) {
          handleDonationSuccess();
        } else {
          handleDonationFailure("Payment processing failed. Please try again.");
        }
      }
    } catch (error) {
      handleDonationFailure("An error occurred while processing your payment.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDonationSuccess = () => {
    setIsSuccessVisible(true);
    if (onDonationSuccess) {
      onDonationSuccess();
    }
  };
  
  const handleDonationFailure = (message: string) => {
    setErrorMessage(message);
    setIsErrorVisible(true);
    if (onDonationFailure) {
      onDonationFailure(message);
    }
  };
  
  const handleSuccessComplete = () => {
    setIsSuccessVisible(false);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleOverlayClick}></div>
      <div className="modal-card" style={{ maxWidth: '600px', width: '100%' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Donate to {project.title}</p>
          <button 
            className="delete" 
            aria-label="close" 
            onClick={onClose}
            disabled={isProcessing}
          ></button>
        </header>
        <section className="modal-card-body">
          {/* Hidden element to store donation amount for PayPal */}
          <div id="donation-amount" data-amount="10.00" style={{ display: 'none' }}></div>
          
          {paymentMethod === 'paypal' ? (
            <div className="has-text-centered p-4">
              <h3 className="title is-5 mb-4">Complete Your Donation with PayPal</h3>
              <div ref={paypalButtonRef} className="paypal-button-container"></div>
              <button 
                className="button is-light mt-4"
                onClick={() => setPaymentMethod('credit_card')}
              >
                Back to Payment Options
              </button>
            </div>
          ) : (
            <EnhancedDonationForm 
              project={project}
              onSubmit={handleDonate}
              isProcessing={isProcessing}
              onPaypalSelected={() => setPaymentMethod('paypal')}
            />
          )}
        </section>
      </div>
      
      {isSuccessVisible && (
        <ConfettiSuccess 
          isActive={isSuccessVisible}
          message={`Thank you for your donation to ${project.title}! Your contribution will help make a difference.`}
          onComplete={handleSuccessComplete}
        />
      )}

      {isErrorVisible && (
        <DonationError 
          isVisible={isErrorVisible}
          message={errorMessage}
          onClose={() => setIsErrorVisible(false)}
        />
      )}
    </div>
  );
};

export default EnhancedDonationModal; 