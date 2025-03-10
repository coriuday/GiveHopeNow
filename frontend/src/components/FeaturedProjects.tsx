import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { getAllProjects, getSampleProjects, Project } from '../services/projectService';

// Available categories
const CATEGORIES = ['All', 'Health', 'Education', 'Environment', 'Disaster Relief'];

interface FeaturedProjectsProps {
  title?: string;
  subtitle?: string;
  maxDisplay?: number;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  title = "Featured Projects",
  subtitle = "Support these worthy causes and make a real difference",
  maxDisplay = 6
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        if (response && response.success) {
          setProjects(response.data);
          setFilteredProjects(response.data);
        } else {
          // Fallback to sample data if API fails
          console.log('Using sample projects as fallback');
          const sampleData = getSampleProjects();
          setProjects(sampleData);
          setFilteredProjects(sampleData);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Fallback to sample data
        const sampleData = getSampleProjects();
        setProjects(sampleData);
        setFilteredProjects(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        project => project.category === activeCategory
      );
      setFilteredProjects(filtered);
    }
  }, [activeCategory, projects]);

  // Category selection handler
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="has-text-centered">
            <div className="loader is-loading my-6" style={{ height: '80px', width: '80px', margin: '0 auto' }}></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-warning">
            <p>{error}</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-6">
          <h2 className="title is-2">{title}</h2>
          <p className="subtitle is-5 mb-5">
            {subtitle}
          </p>

          {/* Category Filters */}
          <div className="buttons is-centered mb-5">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`button ${
                  activeCategory === category
                    ? 'is-primary'
                    : 'is-light'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="has-text-centered my-6">
            <p className="is-size-5">No projects found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="button is-primary is-outlined mt-4"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="columns is-multiline">
            {filteredProjects.slice(0, maxDisplay).map(project => (
              <div key={project._id} className="column is-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        <div className="has-text-centered mt-6">
          <Link to="/projects" className="button is-primary is-medium">
            <span>Explore All Projects</span>
            <span className="icon">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 