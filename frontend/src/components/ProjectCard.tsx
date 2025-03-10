import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedDonationModal from './EnhancedDonationModal';
import DonationModal, { DonationProject } from './DonationModal';
import ConfettiSuccess from './ConfettiSuccess';
import DonationError from './DonationError';

interface ProjectCreator {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  backers: number;
  endDate: string;
  createdBy: ProjectCreator;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { _id, title, description, category, imageUrl, currentAmount, goalAmount, backers, endDate, createdBy } = project;
  
  const [isEnhancedDonationModalOpen, setIsEnhancedDonationModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const percentFunded = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  const daysLeft = Math.max(0, Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  const isEnded = daysLeft === 0;
  const isUrgent = daysLeft > 0 && daysLeft <= 3;
  const isFullyFunded = percentFunded >= 100;
  
  const navigate = useNavigate();
  
  const handleDonateClick = () => {
    // Use the enhanced donation modal for a better experience
    setIsEnhancedDonationModalOpen(true);
  };
  
  const handleProjectClick = () => {
    navigate(`/projects/${_id}`);
  };
  
  const handleDonationSuccess = () => {
    setIsSuccessVisible(true);
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 5000);
  };
  
  const handleDonationError = (message: string) => {
    setErrorMessage(message);
    setIsErrorVisible(true);
    setTimeout(() => {
      setIsErrorVisible(false);
    }, 5000);
  };
  
  // Convert the project to the format expected by DonationModal
  const donationProject: DonationProject = {
    id: _id,
    title,
    image: imageUrl || "/placeholder.svg?height=200&width=400",
    description,
    raised: currentAmount,
    goal: goalAmount
  };

  // Get the appropriate status label and color
  const getStatusLabel = () => {
    if (isEnded) {
      return { text: 'Completed', color: 'is-info' };
    }
    if (isFullyFunded) {
      return { text: 'Fully Funded!', color: 'is-success' };
    }
    if (isUrgent) {
      return { text: 'Urgent! Ending Soon', color: 'is-danger' };
    }
    return null;
  };
  
  const statusLabel = getStatusLabel();

  // Format the image URL to ensure it works properly
  const formattedImageUrl = imageUrl && imageUrl.startsWith('http') 
    ? imageUrl 
    : imageUrl 
      ? `/src/assets/${imageUrl}` 
      : '/src/assets/placeholder-project.jpg';

  return (
    <>
      <div className="card has-shadow">
        {/* Card Image */}
        <div className="card-image">
          <figure className="image is-4by3" onClick={handleProjectClick} style={{ cursor: 'pointer' }}>
            <img 
              src={formattedImageUrl} 
              alt={title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/src/assets/placeholder-project.jpg';
              }}
            />
          </figure>
          
          {/* Status indicators */}
          {statusLabel && (
            <div className={`tag ${statusLabel.color} is-medium`} 
                 style={{ position: 'absolute', top: '10px', right: '10px' }}>
              {statusLabel.text}
            </div>
          )}
        </div>
        
        {/* Project Content */}
        <div className="card-content">
          <div className="content">
            <h3 className="title is-4">
              {title}
            </h3>
            <p className="mb-4">
              {description.length > 100 ? `${description.substring(0, 100)}...` : description}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="level mb-1">
              <div className="level-left">
                <span className="has-text-danger has-text-weight-bold">${currentAmount.toLocaleString()}</span>
              </div>
              <div className="level-right">
                <span className="has-text-grey-dark">
                  of ${goalAmount.toLocaleString()} ({percentFunded}%)
                </span>
              </div>
            </div>
            <progress 
              className={`progress ${isFullyFunded ? 'is-success' : 'is-danger'}`} 
              value={percentFunded} 
              max="100">
              {percentFunded}%
            </progress>
          </div>
          
          {/* Project Details */}
          <div className="level mb-4">
            <div className="level-left">
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-users"></i>
                  </span>
                  <span>{backers} Supporters</span>
                </span>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-clock"></i>
                  </span>
                  <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Donation Button */}
          <button 
            onClick={handleDonateClick}
            className="button is-primary is-fullwidth"
            disabled={isEnded}
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Modals */}
      {isEnhancedDonationModalOpen && (
        <EnhancedDonationModal
          isOpen={isEnhancedDonationModalOpen}
          onClose={() => setIsEnhancedDonationModalOpen(false)}
          project={donationProject}
          onDonationSuccess={handleDonationSuccess}
          onDonationFailure={handleDonationError}
        />
      )}

      {isDonationModalOpen && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          project={donationProject}
          onDonationSuccess={handleDonationSuccess}
          onDonationFailure={handleDonationError}
        />
      )}

      {isSuccessVisible && (
        <ConfettiSuccess isActive={isSuccessVisible} />
      )}

      {isErrorVisible && (
        <DonationError 
          message={errorMessage || "There was an error processing your donation. Please try again."}
          isVisible={isErrorVisible}
          onClose={() => setIsErrorVisible(false)}
          onRetry={handleDonateClick}
        />
      )}
    </>
  );
};

export default ProjectCard; 