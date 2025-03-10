import { useState } from 'react';
import { shouldUseMockApi, setUseMockApi } from '../services/mockApiService';
import { useAuth } from '../contexts/AuthContext';

interface MockApiToggleProps {
  compact?: boolean;
}

/**
 * A component that allows toggling between mock API and real backend
 * Useful during development or when backend is unavailable
 */
const MockApiToggle: React.FC<MockApiToggleProps> = ({ compact = false }) => {
  const [useMock, setUseMock] = useState(shouldUseMockApi());
  const { user } = useAuth();
  
  // For production, only show to authenticated users or in development
  if (!user && !import.meta.env.DEV) return null;

  const handleToggle = () => {
    const newValue = !useMock;
    
    if (newValue) {
      // If enabling mock mode, show a confirmation dialog
      if (window.confirm('WARNING: This will switch to simulated backend responses. Login, registration, and payments will use mock data. This should only be used for development and testing. Continue?')) {
        setUseMock(newValue);
        setUseMockApi(newValue);
        window.location.reload();
      }
    } else {
      // If disabling mock mode, just do it
      setUseMock(newValue);
      setUseMockApi(newValue);
      window.location.reload();
    }
  };

  if (compact) {
    return (
      <div className="navbar-item">
        <label className="checkbox is-small">
          <input 
            type="checkbox"
            checked={useMock}
            onChange={handleToggle}
            className="mr-2"
          />
          <span className={`has-text-weight-normal is-size-7 ${useMock ? 'has-text-danger' : ''}`}>
            {useMock ? 'MOCK MODE' : 'Real API'}
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="navbar-item">
      <div className="field">
        <label className="checkbox">
          <input 
            type="checkbox"
            checked={useMock}
            onChange={handleToggle}
            className="mr-2"
          />
          <span>Use Mock API</span>
          {useMock && (
            <span className="tag is-danger is-light ml-2">
              Development Only
            </span>
          )}
        </label>
        <p className="help">
          {useMock 
            ? 'WARNING: Using simulated data (no backend)' 
            : 'Using real backend connection'}
        </p>
      </div>
    </div>
  );
};

export default MockApiToggle; 