import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../App';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

const categories = [
  "Education",
  "Healthcare",
  "Environment",
  "Disaster Relief",
  "Animal Welfare",
  "Community Development",
  "Arts & Culture",
  "Children & Youth",
  "Poverty Alleviation",
  "Humanitarian Aid"
];

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [duration, setDuration] = useState('30');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: '' });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!goalAmount) {
      newErrors.goalAmount = 'Goal amount is required';
    } else if (isNaN(Number(goalAmount)) || Number(goalAmount) <= 0) {
      newErrors.goalAmount = 'Goal amount must be a positive number';
    }
    if (!image) newErrors.image = 'Project image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, we'd use FormData to upload the image
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('goalAmount', goalAmount);
      formData.append('duration', duration);
      if (image) formData.append('image', image);
      formData.append('createdBy', user?.email || 'anonymous');
      
      // Simulate API call
      setTimeout(() => {
        // Mock response
        const newProject: Project = {
          id: `project-${Date.now()}`,
          title,
          description,
          shortDescription: description.substring(0, 120) + '...',
          category,
          goalAmount: Number(goalAmount),
          duration: Number(duration),
          imageUrl: imagePreview,
          createdBy: user?.email || 'anonymous',
          createdAt: new Date().toISOString(),
          currentAmount: 0,
          backers: 0,
          status: 'active'
        };
        
        onSuccess(newProject);
        resetForm();
        onClose();
        setIsLoading(false);
      }, 1500);
      
      // In a real app, we'd make an API call:
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // onSuccess(data);
    } catch (error) {
      console.error('Error creating project:', error);
      setErrors({ ...errors, submit: 'Failed to create project. Please try again.' });
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setGoalAmount('');
    setDuration('30');
    setImage(null);
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Project</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Project Title</label>
              <div className="control">
                <input 
                  className={`input ${errors.title ? 'is-danger' : ''}`}
                  type="text" 
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {errors.title && <p className="help is-danger">{errors.title}</p>}
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea 
                  className={`textarea ${errors.description ? 'is-danger' : ''}`}
                  placeholder="Describe your project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              {errors.description && <p className="help is-danger">{errors.description}</p>}
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className={`select is-fullwidth ${errors.category ? 'is-danger' : ''}`}>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.category && <p className="help is-danger">{errors.category}</p>}
            </div>

            <div className="field">
              <label className="label">Funding Goal ($)</label>
              <div className="control">
                <input 
                  className={`input ${errors.goalAmount ? 'is-danger' : ''}`}
                  type="number" 
                  placeholder="0.00"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>
              {errors.goalAmount && <p className="help is-danger">{errors.goalAmount}</p>}
            </div>

            <div className="field">
              <label className="label">Campaign Duration (days)</label>
              <div className="control">
                <input 
                  className="input"
                  type="number" 
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  max="90"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Project Image</label>
              <div className="control">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="is-hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <button 
                  type="button" 
                  className={`button is-outlined ${errors.image ? 'is-danger' : 'is-info'}`}
                  onClick={triggerFileInput}
                >
                  <span className="icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span>Choose Image</span>
                </button>
                {image && <span className="ml-2">{image.name}</span>}
              </div>
              {errors.image && <p className="help is-danger">{errors.image}</p>}
              
              {imagePreview && (
                <figure className="image mt-3" style={{ maxWidth: '300px' }}>
                  <img src={imagePreview} alt="Preview" />
                </figure>
              )}
            </div>

            {errors.submit && (
              <div className="notification is-danger">
                {errors.submit}
              </div>
            )}
          </form>
        </section>
        <footer className="modal-card-foot">
          <button 
            className={`button is-primary is-outlined ${isLoading ? 'is-loading' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Create Project
          </button>
          <button 
            className="button is-ghost" 
            onClick={onClose}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateProjectModal; 