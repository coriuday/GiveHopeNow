import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Gift } from 'lucide-react';

interface DonationProject {
  id: string;
  title: string;
  image: string;
  description?: string;
  raised: number;
  goal: number;
}

interface EnhancedDonationFormProps {
  project: DonationProject;
  onSubmit: (donationData: DonationData) => void;
  initialAmount?: string;
  isProcessing?: boolean;
  onPaypalSelected?: () => void;
}

export interface DonationData {
  projectId: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  isRecurring: boolean;
  recurringFrequency?: string;
  dedicationType?: string;
  dedicationName?: string;
  message?: string;
  paymentMethod: string;
}

const EnhancedDonationForm: React.FC<EnhancedDonationFormProps> = ({
  project,
  onSubmit,
  initialAmount = '25',
  isProcessing = false,
  onPaypalSelected
}) => {
  // Basic donation fields
  const [amount, setAmount] = useState(initialAmount);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  // Enhanced features
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');
  const [dedicationType, setDedicationType] = useState('none');
  const [dedicationName, setDedicationName] = useState('');
  
  // Predefined amounts
  const predefinedAmounts = ['10', '25', '50', '100', '250'];
  
  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  // Handle predefined amount selection
  const handleAmountSelect = (value: string) => {
    setAmount(value);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === 'paypal' && onPaypalSelected) {
      onPaypalSelected();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    const donationData: DonationData = {
      projectId: project.id,
      amount: parseFloat(amount),
      donorName: isAnonymous ? 'Anonymous' : donorName,
      donorEmail: donorEmail,
      isAnonymous,
      isRecurring,
      paymentMethod,
      message: message.trim() || undefined
    };
    
    // Add recurring information if applicable
    if (isRecurring) {
      donationData.recurringFrequency = recurringFrequency;
    }
    
    // Add dedication information if applicable
    if (dedicationType !== 'none') {
      donationData.dedicationType = dedicationType;
      donationData.dedicationName = dedicationName;
    }
    
    onSubmit(donationData);
  };
  
  // Calculate remaining amount to goal
  const remainingToGoal = Math.max(0, project.goal - project.raised);
  
  return (
    <div className="enhanced-donation-form">
      <form onSubmit={handleSubmit}>
        {/* Project summary */}
        <div className="project-summary mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{project.title}</h3>
              <div className="text-sm text-gray-500">
                <span className="text-primary font-medium">${project.raised.toLocaleString()}</span> raised of ${project.goal.toLocaleString()} goal
              </div>
              {remainingToGoal > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  ${remainingToGoal.toLocaleString()} still needed
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Donation amount selection */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-2">Donation Amount</label>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            {predefinedAmounts.map(value => (
              <button
                key={value}
                type="button"
                className={`button ${
                  amount === value 
                    ? 'is-primary' 
                    : 'is-light'
                }`}
                onClick={() => handleAmountSelect(value)}
              >
                ${value}
              </button>
            ))}
          </div>
          
          <div className="field">
            <div className="control has-icons-left">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="input is-medium"
                placeholder="Other amount"
              />
              <span className="icon is-left">
                <i className="fas fa-dollar-sign"></i>
              </span>
            </div>
          </div>
        </div>
        
        {/* Recurring donation option */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-2">Donation Frequency</label>
          
          <div className="field">
            <div className="control">
              <label className="radio">
                <input 
                  type="radio" 
                  name="frequency"
                  checked={!isRecurring}
                  onChange={() => setIsRecurring(false)}
                />
                <span className="ml-2">One-time donation</span>
              </label>
              
              <label className="radio ml-4">
                <input 
                  type="radio" 
                  name="frequency"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(true)}
                />
                <span className="ml-2">Recurring donation</span>
              </label>
            </div>
          </div>
          
          {isRecurring && (
            <div className="field mt-3">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={recurringFrequency}
                    onChange={(e) => setRecurringFrequency(e.target.value)}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
              <p className="help">
                You can cancel your recurring donation at any time.
              </p>
            </div>
          )}
        </div>
        
        {/* Dedication option */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center mb-3">
            <Gift className="text-primary mr-2" size={20} />
            <h3 className="font-medium text-gray-800">Dedicate This Donation</h3>
          </div>
          
          <select
            value={dedicationType}
            onChange={(e) => setDedicationType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3"
          >
            <option value="none">No dedication</option>
            <option value="memory">In memory of</option>
            <option value="honor">In honor of</option>
            <option value="celebration">In celebration of</option>
          </select>
          
          {dedicationType !== 'none' && (
            <input
              type="text"
              value={dedicationName}
              onChange={(e) => setDedicationName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter name"
            />
          )}
        </div>
        
        {/* Donor information */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-2">Your Information</label>
          
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input 
                  type="checkbox" 
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                />
                <span className="ml-2">Make my donation anonymous</span>
              </label>
            </div>
          </div>
          
          {!isAnonymous && (
            <>
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="input"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              
              <div className="field">
                <div className="control">
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="input"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Message (optional) */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-2">Message (Optional)</label>
          <div className="field">
            <div className="control">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea"
                placeholder="Add a personal message..."
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-2">Payment Method</label>
          
          <div className="field">
            <div className="control">
              <div className="buttons payment-methods">
                <button
                  type="button"
                  className={`button ${paymentMethod === 'credit_card' ? 'is-primary' : ''}`}
                  onClick={() => handlePaymentMethodChange('credit_card')}
                >
                  <span className="icon">
                    <i className="fas fa-credit-card"></i>
                  </span>
                  <span>Credit Card</span>
                </button>
                
                <button
                  type="button"
                  className={`button ${paymentMethod === 'paypal' ? 'is-primary' : ''}`}
                  onClick={() => handlePaymentMethodChange('paypal')}
                >
                  <span className="icon">
                    <i className="fab fa-paypal"></i>
                  </span>
                  <span>PayPal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary is-fullwidth ${isProcessing ? 'is-loading' : ''}`}
              disabled={isProcessing}
            >
              <span className="icon">
                <i className="fas fa-heart"></i>
              </span>
              <span>Complete Donation</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnhancedDonationForm; 