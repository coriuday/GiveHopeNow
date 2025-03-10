import { 
  RouterProvider, 
  createBrowserRouter,
  Outlet,
  Link,
  useOutletContext,
  useParams,
  useNavigate
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { Project as ApiProject } from './services/projectService'
import { getProjectById, getSampleProjects } from './services/projectService'

// Pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DonatePage from './pages/DonatePage'
import ContactPage from './pages/ContactPage'
import ApiTestPage from './pages/ApiTestPage'
// ProjectsPage is handled directly in this file now
// import ProjectsPage from './pages/ProjectsPage'
// ProjectDetailsPage is defined inline below
// import ProjectDetailsPage from './pages/ProjectDetailsPage'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectList from './components/ProjectList'
import CreateProjectModal from './components/CreateProjectModal'

// Import styles
import './App.css'

// Define Project interface that is compatible with both API projects and locally created projects
export interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  goalAmount: number;
  duration?: number;
  imageUrl: string | null;
  currentAmount: number;
  backers: number;
  endDate?: string;
  createdBy: string | { _id: string; name: string };
  createdAt: string;
  status?: string;
}

// Convert API project to our local format if needed
export const normalizeProject = (project: ApiProject | Project): Project => {
  if ('_id' in project) {
    // It's an API project, normalize it
    return {
      ...project,
      id: project._id,
      imageUrl: project.imageUrl || null,
      // Make sure we format createdBy correctly depending on its structure
      createdBy: typeof project.createdBy === 'object' ? project.createdBy : project.createdBy as string
    };
  }
  // It's already a local project
  return project;
};

// Type for our Outlet context
type ContextType = { projects: Project[] };

// Root layout component that includes shared UI elements
const RootLayout = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
    // In a real app, you would likely trigger a refetch of projects instead
  };

  return (
    <div className="is-flex is-flex-direction-column min-vh-100">
      <Navbar onCreateProject={handleCreateProject} />
      <main className="is-flex-grow-1">
        <Outlet context={{ projects }} />
      </main>
      <Footer />
      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleProjectCreated}
      />
    </div>
  )
}

// Helper hook to use the context in child routes
export function useProjects() {
  return useOutletContext<ContextType>();
}

// Projects page component
const ProjectsPageContent = () => {
  const { projects } = useProjects();
  
  return (
    <div className="container py-6">
      <div className="has-text-centered mb-6">
        <h1 className="title is-3 mb-4">Our Projects</h1>
        <p className="subtitle is-5 has-text-grey">
          Discover and support impactful initiatives that are changing lives and building stronger communities around the world.
        </p>
      </div>

      <div className="columns is-variable is-8">
        {/* Filters Sidebar */}
        <div className="column is-3">
          <div className="sticky-top pr-5 is-hidden-mobile">
            <div className="mb-5">
              <h3 className="is-size-4 has-text-weight-bold mb-4">Categories</h3>
              <ul className="menu-list">
                {['Health', 'Education', 'Emergency Relief', 'Sustainability', 'Community'].map((category) => (
                  <li key={category}>
                    <a className="has-text-grey py-1 has-text-weight-normal">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="is-size-4 has-text-weight-bold mb-4">Filter By</h3>
              <ul className="menu-list">
                {['Most Funded', 'Recently Added', 'Ending Soon', 'Trending Now'].map((filter) => (
                  <li key={filter}>
                    <a className="has-text-grey py-1 has-text-weight-normal">
                      {filter}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="column is-9">
          <ProjectList customProjects={projects} />
        </div>
      </div>
    </div>
  )
}

const AboutPage = () => {
  return (
    <div className="container py-6">
      <div className="has-text-centered mb-6">
        <h1 className="title is-3 mb-4">About GiveHopeNow</h1>
        <p className="subtitle is-5 has-text-grey mb-5">
          We're on a mission to connect donors with causes that matter.
        </p>
      </div>

      <div className="columns is-variable is-8">
        <div className="column is-6">
          <div className="content">
            <h2 className="title is-4">Our Mission</h2>
            <p>
              GiveHopeNow is dedicated to breaking down barriers between donors and those in need. 
              We believe that transparency, efficiency, and personal connection are key to making 
              meaningful change in the world.
            </p>
            <p>
              Our platform enables individuals and organizations to create and support projects 
              that address pressing social, environmental, and humanitarian challenges across the globe.
            </p>
            
            <h2 className="title is-4 mt-5">Our Values</h2>
            <ul>
              <li><strong>Transparency:</strong> 100% clarity on how funds are used</li>
              <li><strong>Efficiency:</strong> Minimizing overhead to maximize impact</li>
              <li><strong>Empowerment:</strong> Enabling communities to create sustainable solutions</li>
              <li><strong>Innovation:</strong> Using technology to solve critical challenges</li>
              <li><strong>Inclusivity:</strong> Creating opportunities for everyone to contribute</li>
            </ul>
          </div>
        </div>
        
        <div className="column is-6">
          <figure className="image is-16by9 mb-5">
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"
              alt="People volunteering"
              className="has-shadow is-rounded"
            />
          </figure>
          
          <div className="notification is-primary is-light">
            <p className="has-text-weight-bold">Join Our Community</p>
            <p>Whether you're a donor, organization, or volunteer, there's a place for you in our mission.</p>
            <Link to="/register" className="button is-primary mt-4">Sign Up Today</Link>
          </div>
        </div>
      </div>
      
      <div className="has-text-centered my-6 py-6">
        <h2 className="title is-4">Our Impact</h2>
        <div className="columns is-mobile">
          <div className="column has-text-centered">
            <p className="is-size-1 has-text-primary has-text-weight-bold">500+</p>
            <p className="has-text-grey-dark">Projects Funded</p>
          </div>
          <div className="column has-text-centered">
            <p className="is-size-1 has-text-primary has-text-weight-bold">$2M+</p>
            <p className="has-text-grey-dark">Donations Collected</p>
          </div>
          <div className="column has-text-centered">
            <p className="is-size-1 has-text-primary has-text-weight-bold">50+</p>
            <p className="has-text-grey-dark">Countries Reached</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Project details page component - renamed to avoid conflicts
const ProjectDetailsPageContent = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await getProjectById(id);
        if (response && response.success) {
          setProject(normalizeProject(response.data));
        } else {
          // Try to get from sample projects as fallback
          const sampleProject = sampleProjects.find(p => p._id === id);
          if (sampleProject) {
            setProject(normalizeProject(sampleProject));
          } else {
            setError("Project not found");
          }
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        // Try to get from sample projects as fallback
        const sampleProject = sampleProjects.find(p => p._id === id);
        if (sampleProject) {
          setProject(normalizeProject(sampleProject));
        } else {
          setError("Error loading project");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDonate = () => {
    // Open donation modal for this project
    if (project) {
      const donationProject = {
        id: project.id || project._id || "",
        title: project.title,
        image: project.imageUrl || "/placeholder.jpg",
        description: project.description,
        raised: project.currentAmount,
        goal: project.goalAmount
      };
      
      // Here you would typically open the donation modal
      // For now, let's navigate to the donate page with the project ID
      navigate(`/donate?projectId=${project.id || project._id}`);
    }
  };

  if (loading) {
    return (
      <div className="container py-6">
        <div className="has-text-centered">
          <div className="loader is-loading my-6" style={{ height: '80px', width: '80px', margin: '0 auto' }}></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container py-6">
        <div className="notification is-warning">
          <p>{error || "Project not found"}</p>
          <Link to="/projects" className="button is-primary mt-4">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const percentFunded = Math.min(Math.round((project.currentAmount / project.goalAmount) * 100), 100);
  const daysLeft = project.endDate ? 
    Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 
    0;

  return (
    <div className="container py-6">
      <div className="columns is-variable is-8">
        {/* Project Image and Details */}
        <div className="column is-8">
          <div className="card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img 
                  src={project.imageUrl || "https://placehold.co/600x400?text=Project+Image"} 
                  alt={project.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400?text=Project+Image";
                  }}
                />
              </figure>
            </div>
            <div className="card-content">
              <h1 className="title is-3">{project.title}</h1>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="level mb-1">
                  <div className="level-left">
                    <span className="has-text-danger has-text-weight-bold">
                      ${project.currentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="level-right">
                    <span className="has-text-grey-dark">
                      of ${project.goalAmount.toLocaleString()} ({percentFunded}%)
                    </span>
                  </div>
                </div>
                <progress 
                  className={`progress ${percentFunded >= 100 ? 'is-success' : 'is-danger'}`} 
                  value={percentFunded} 
                  max="100"
                >
                  {percentFunded}%
                </progress>
              </div>

              {/* Project Stats */}
              <div className="columns mb-5">
                <div className="column has-text-centered">
                  <p className="heading">Backers</p>
                  <p className="title is-4">{project.backers}</p>
                </div>
                <div className="column has-text-centered">
                  <p className="heading">Days Left</p>
                  <p className="title is-4">{daysLeft}</p>
                </div>
                <div className="column has-text-centered">
                  <p className="heading">Category</p>
                  <p className="title is-5">{project.category}</p>
                </div>
              </div>

              {/* Donate Button */}
              <button 
                className="button is-danger is-fullwidth is-medium mb-5"
                onClick={handleDonate}
              >
                Donate Now
              </button>

              {/* Project Description */}
              <div className="content">
                <h4 className="title is-4 mb-3">About This Project</h4>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="column is-4">
          {/* Project Creator */}
          <div className="card mb-5">
            <div className="card-content">
              <h3 className="title is-5">Created By</h3>
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img 
                      src="https://placehold.co/48x48?text=Avatar" 
                      alt="Creator" 
                      className="is-rounded"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-5">
                    {typeof project.createdBy === 'object' ? project.createdBy.name : 'Organization'}
                  </p>
                  <p className="subtitle is-6">Project Creator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Project */}
          <div className="card">
            <div className="card-content">
              <h3 className="title is-5">Share This Project</h3>
              <div className="buttons">
                <button className="button is-light">
                  <span className="icon">
                    <i className="fab fa-facebook"></i>
                  </span>
                </button>
                <button className="button is-light">
                  <span className="icon">
                    <i className="fab fa-twitter"></i>
                  </span>
                </button>
                <button className="button is-light">
                  <span className="icon">
                    <i className="fab fa-linkedin"></i>
                  </span>
                </button>
                <button className="button is-light">
                  <span className="icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use the getSampleProjects function to get sample projects
const sampleProjects = getSampleProjects();

// Create router
const router = createBrowserRouter([
  {
    path: "/", 
    element: <RootLayout />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      { 
        path: "projects", 
        element: <ProjectsPageContent /> 
      },
      { 
        path: "projects/:id", 
        element: <ProjectDetailsPageContent /> 
      },
      { 
        path: "about", 
        element: <AboutPage /> 
      },
      { 
        path: "login", 
        element: <LoginPage /> 
      },
      { 
        path: "register", 
        element: <RegisterPage /> 
      },
      { 
        path: "donate", 
        element: <DonatePage /> 
      },
      { 
        path: "contact", 
        element: <ContactPage /> 
      },
      { 
        path: "api-test", 
        element: <ApiTestPage /> 
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
