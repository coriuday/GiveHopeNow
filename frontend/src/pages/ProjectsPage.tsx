import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectsSection from '../components/ProjectsSection';

const ProjectsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [pageTitle, setPageTitle] = useState("Browse All Projects");
  const [pageSubtitle, setPageSubtitle] = useState("Discover and support meaningful causes around the world");
  
  // Update title and subtitle when category changes
  useEffect(() => {
    if (categoryParam) {
      setPageTitle(`${categoryParam} Projects`);
      
      // Set subtitle based on category
      switch(categoryParam.toLowerCase()) {
        case 'health':
          setPageSubtitle("Support initiatives that improve healthcare access and medical services");
          break;
        case 'education':
          setPageSubtitle("Help provide educational opportunities and resources to communities in need");
          break;
        case 'environment':
          setPageSubtitle("Join efforts to protect our planet and promote sustainable practices");
          break;
        case 'disaster relief':
          setPageSubtitle("Provide emergency support to communities affected by natural disasters");
          break;
        default:
          setPageSubtitle(`Explore and support ${categoryParam} projects making a difference`);
      }
    } else {
      setPageTitle("Browse All Projects");
      setPageSubtitle("Discover and support meaningful causes around the world");
    }
  }, [categoryParam]);
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects-page">
      {/* Page header */}
      <section className="hero is-medium is-primary">
        <div className="hero-body" style={{ 
          backgroundImage: 'linear-gradient(rgba(29, 53, 87, 0.8), rgba(29, 53, 87, 0.8)), url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-weight-bold mb-5">{pageTitle}</h1>
            <p className="subtitle is-4 has-text-white-bis max-w-2xl mx-auto">{pageSubtitle}</p>
          </div>
        </div>
      </section>
      
      {/* Projects section with filters */}
      <ProjectsSection 
        title=""
        subtitle=""
        maxDisplay={12} 
        category={categoryParam || ''}
        showFilters={true}
        showViewAll={false}
      />
    </div>
  );
};

export default ProjectsPage; 