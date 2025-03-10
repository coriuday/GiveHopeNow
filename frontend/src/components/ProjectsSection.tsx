import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Project, sampleProjects } from '../services/projectService';

interface ProjectsData {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  maxDisplay?: number;
  category?: string;
  showFilters?: boolean;
  showViewAll?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  title = "Featured Projects",
  subtitle = "Support these worthy causes and make a real difference",
  maxDisplay = 3,
  category,
  showFilters = false,
  showViewAll = true,
}) => {
  const [projectsData, setProjectsData] = useState<ProjectsData>({
    projects: [],
    loading: true,
    error: null
  });
  
  const [filters, setFilters] = useState({
    category: category || '',
    sortBy: 'newest',
    search: ''
  });
  
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try to fetch from API
        const url = `${import.meta.env.VITE_API_URL}/projects${filters.category ? `?category=${filters.category}` : ''}`;
        
        const response = await axios.get(url);
        
        if (response.data.success) {
          setProjectsData({
            projects: response.data.data,
            loading: false,
            error: null
          });
        } else {
          // If API call fails, use sample data as fallback
          setProjectsData({
            projects: sampleProjects,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Use sample data as fallback
        setProjectsData({
          projects: sampleProjects,
          loading: false,
          error: null
        });
      }
    };

    fetchProjects();
  }, [filters.category]);
  
  // Apply filters to projects
  useEffect(() => {
    let result = [...projectsData.projects];
    
    // Apply category filter if not already applied in API call
    if (filters.category && !category) {
      result = result.filter(project => 
        project.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    switch(filters.sortBy) {
      case 'mostFunded':
        result.sort((a, b) => (b.currentAmount / b.goalAmount) - (a.currentAmount / a.goalAmount));
        break;
      case 'endingSoon':
        result.sort((a, b) => {
          const aDate = new Date(a.endDate).getTime();
          const bDate = new Date(b.endDate).getTime();
          return aDate - bDate;
        });
        break;
      case 'goalAmount':
        result.sort((a, b) => b.goalAmount - a.goalAmount);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    setFilteredProjects(result);
  }, [projectsData.projects, filters, category]);
  
  // Handler for filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'reset') {
      setFilters({
        category: category || '',
        sortBy: 'newest',
        search: ''
      });
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [filterType]: value
      }));
    }
  };
  
  // Get projects to display
  const displayProjects = filteredProjects.slice(0, maxDisplay);
  
  // All possible project categories
  const allCategories = ["Health", "Education", "Environment", "Disaster Relief", "Poverty", "Animals"];

  if (projectsData.loading) {
    return (
      <div className="section py-6">
        <div className="container">
          <div className="has-text-centered">
            <div className="loader is-loading my-6" style={{ height: '80px', width: '80px', margin: '0 auto' }}></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (projectsData.error) {
    return (
      <div className="section py-6">
        <div className="container">
          <div className="notification is-warning">
            <p>{projectsData.error}</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  if (displayProjects.length === 0) {
    return (
      <div className="section py-6">
        <div className="container">
          <div className="has-text-centered">
            <h2 className="title is-3 mb-4">{title}</h2>
            <p className="mb-6">No projects found matching your criteria.</p>
            <Link to="/projects" className="button is-primary">Browse All Projects</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section py-12" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container">
        <div className="has-text-centered mb-8">
          <h2 className="title is-2" style={{ color: '#1d3557', marginBottom: '1rem' }}>{title}</h2>
          <p className="subtitle is-5" style={{ color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>{subtitle}</p>
        </div>
        
        {showFilters && (
          <ProjectFilters 
            onFilterChange={handleFilterChange} 
            categories={allCategories}
          />
        )}
        
        <div className="columns is-multiline is-variable is-4">
          {displayProjects.map(project => (
            <div key={project._id} className="column is-12-tablet is-4-desktop">
              <div className="has-animation" style={{ 
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
        
        {showViewAll && (
          <div className="has-text-centered mt-10">
            <Button
              asChild
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 shadow-lg btn-donate"
            >
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 