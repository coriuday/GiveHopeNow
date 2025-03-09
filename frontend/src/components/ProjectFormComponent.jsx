import { useState } from 'react';
import PropTypes from 'prop-types';
import { createProject } from '../services/projectService';

export default function ProjectFormComponent({ onProjectCreated }) {
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

ProjectFormComponent.propTypes = {
  onProjectCreated: PropTypes.func.isRequired
};
