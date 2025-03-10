import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjects } from '../store/slices/projectsSlice';
import { Project as ApiProject } from '../services/projectService';
import { Project, normalizeProject } from '../App';

interface ProjectListProps {
  customProjects?: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ customProjects }) => {
  const dispatch = useAppDispatch();
  const { projects: storeProjects, loading, error } = useAppSelector((state) => state.projects);
  
  // Use customProjects if provided, otherwise normalize the API projects
  const projects = customProjects || 
    (storeProjects as ApiProject[]).map(project => normalizeProject(project));

  useEffect(() => {
    if (!customProjects) {
      dispatch(fetchProjects());
    }
  }, [dispatch, customProjects]);

  if (loading && projects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg shadow-sm animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-8 bg-muted rounded w-28 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !customProjects) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
        <h3 className="font-bold">Error Loading Projects</h3>
        <p>{error}</p>
        <button 
          className="mt-2 bg-muted px-3 py-1 rounded hover:bg-muted/80 text-sm"
          onClick={() => dispatch(fetchProjects())}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <h3 className="text-xl font-bold mb-2">No projects found</h3>
        <p className="text-muted-foreground">Check back later or adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCardWrapper key={project._id || project.id || String(Math.random())} project={project} />
        ))}
      </div>
    </div>
  );
};

// Wrapper component to handle any type mismatches
const ProjectCardWrapper: React.FC<{ project: Project }> = ({ project }) => {
  return <ProjectCard project={project} />;
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { 
    _id, 
    id, 
    title, 
    shortDescription, 
    imageUrl, 
    currentAmount = 0, 
    goalAmount = 0 
  } = project;
  
  const progressPercent = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  const projectId = _id || id || '';
  const description = shortDescription || (project.description ? project.description.substring(0, 100) + '...' : '');
  
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <Link to={`/projects/${projectId}`} className="block h-48 overflow-hidden">
        <img 
          src={imageUrl || '/placeholder-project.jpg'} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">
          <Link to={`/projects/${projectId}`} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-full rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-medium">${currentAmount.toLocaleString()}</span>
            <span className="text-muted-foreground">{progressPercent}% of ${goalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList; 