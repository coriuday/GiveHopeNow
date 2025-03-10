import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DonationModal, { DonationProject } from '../components/DonationModal';
import ConfettiSuccess from '../components/ConfettiSuccess';
import DonationError from '../components/DonationError';

// Placeholder project data (in a real app, this would come from an API)
const featuredProjects: DonationProject[] = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    description: 'Providing clean drinking water to communities in need through sustainable solutions.',
    image: 'https://images.unsplash.com/photo-1578496479531-42cc0772c430?q=80&w=2070',
    raised: 15000,
    goal: 25000
  },
  {
    id: '2',
    title: 'Education for All',
    description: 'Supporting education for underprivileged children with books, supplies, and infrastructure.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2070',
    raised: 8500,
    goal: 20000
  },
  {
    id: '3',
    title: 'Emergency Medical Relief',
    description: 'Delivering essential medical supplies and healthcare to disaster-affected regions.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2070',
    raised: 32000,
    goal: 40000
  }
];

const DonatePage = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  
  const [selectedProject, setSelectedProject] = useState<DonationProject | null>(
    projectId ? featuredProjects.find(p => p.id === projectId) || featuredProjects[0] : null
  );
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // If a projectId is provided, open the donation modal automatically
  useEffect(() => {
    if (projectId && selectedProject) {
      setIsDonationModalOpen(true);
    }
  }, [projectId, selectedProject]);
  
  const handleProjectSelect = (project: DonationProject) => {
    setSelectedProject(project);
    setIsDonationModalOpen(true);
  };
  
  const handleDonationSuccess = () => {
    setIsDonationModalOpen(false);
    setIsSuccessVisible(true);
  };
  
  const handleDonationFailure = (message: string) => {
    setIsDonationModalOpen(false);
    setErrorMessage(message);
    setIsErrorVisible(true);
  };
  
  const handleRetry = () => {
    setIsErrorVisible(false);
    setIsDonationModalOpen(true);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero is-medium is-danger">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 mb-4">Make a Difference Today</h1>
            <p className="subtitle is-4 mb-6">
              Your donation can change lives and bring hope to communities around the world.
            </p>
            <button 
              className="button is-white is-rounded is-large"
              onClick={() => window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' })}
            >
              Explore Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">Featured Projects</h2>
          <p className="subtitle is-5 has-text-centered mb-6">
            Choose a project to support or make a general donation to our organization
          </p>
          
          <div className="columns is-multiline mt-6">
            {featuredProjects.map(project => (
              <div key={project.id} className="column is-4">
                <div className="card h-100">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={project.image} alt={project.title} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-4">{project.title}</h3>
                    <p className="subtitle is-6 mb-4">{project.description}</p>
                    
                    <div className="is-flex is-justify-content-space-between mb-2">
                      <span className="has-text-danger has-text-weight-bold">
                        ${project.raised.toLocaleString()}
                      </span>
                      <span className="has-text-grey">
                        Goal: ${project.goal.toLocaleString()}
                      </span>
                    </div>
                    
                    <progress 
                      className="progress is-danger mb-4" 
                      value={Math.min(Math.round((project.raised / project.goal) * 100), 100)}
                      max="100"
                    ></progress>
                    
                    <button 
                      className="button is-danger is-fullwidth"
                      onClick={() => handleProjectSelect(project)}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Donation Modal */}
      {selectedProject && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          project={selectedProject}
          onDonationSuccess={handleDonationSuccess}
          onDonationFailure={handleDonationFailure}
        />
      )}
      
      {/* Success Animation */}
      <ConfettiSuccess
        isActive={isSuccessVisible}
        message={`Thank you for your donation${selectedProject ? ` to ${selectedProject.title}` : ''}! Your contribution will help make a difference.`}
        onComplete={() => setIsSuccessVisible(false)}
      />
      
      {/* Error Modal */}
      <DonationError
        isVisible={isErrorVisible}
        message={errorMessage}
        onClose={() => setIsErrorVisible(false)}
        onRetry={handleRetry}
      />
    </>
  );
};

export default DonatePage; 