import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectFormComponent from './ProjectFormComponent';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from './ui/navigation-menu';

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
      {/* Header with Navigation */}
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

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Crowdfunding Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ProjectFormComponent({ onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newProject = await createProject(formData);
      onProjectCreated(newProject);
      setFormData({ title: '', description: '', goalAmount: '', endDate: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Amount (₹)</label>
        <input
          type="number"
          value={formData.goalAmount}
          onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          min="1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}