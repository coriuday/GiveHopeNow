import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectFormComponent from '../components/ProjectFormComponent';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '../components/ui/navigation-menu';

export default function Dashboard() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => setShowProjectForm(!showProjectForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {showProjectForm ? 'Cancel' : 'Create New Project'}
          </button>
        </div>

        {showProjectForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <ProjectFormComponent onProjectCreated={handleProjectCreated} />
          </div>
        )}

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project._id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="space-y-2">
                  <p>Goal: ₹{project.goalAmount}</p>
                  <p>Ends: {new Date(project.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Crowdfunding Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
