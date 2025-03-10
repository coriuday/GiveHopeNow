import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProjectFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  categories: string[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ 
  onFilterChange, 
  categories = ["Health", "Education", "Environment", "Disaster Relief", "Poverty", "Animals"]
}) => {
  return (
    <div className="filters-container p-5 bg-white rounded-lg shadow-sm mb-6">
      <div className="columns is-multiline is-variable is-2">
        <div className="column is-12-tablet is-3-desktop">
          <div className="field">
            <label className="label" style={{ color: '#1d3557' }}>Category</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  style={{ 
                    borderColor: '#457b9d', 
                    borderRadius: '0.375rem',
                    color: '#1d3557'
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="column is-12-tablet is-3-desktop">
          <div className="field">
            <label className="label" style={{ color: '#1d3557' }}>Sort By</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  onChange={(e) => onFilterChange('sortBy', e.target.value)}
                  style={{ 
                    borderColor: '#457b9d', 
                    borderRadius: '0.375rem',
                    color: '#1d3557'
                  }}
                >
                  <option value="newest">Newest</option>
                  <option value="mostFunded">Most Funded</option>
                  <option value="endingSoon">Ending Soon</option>
                  <option value="goalAmount">Largest Goals</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="column is-12-tablet is-6-desktop">
          <div className="field">
            <label className="label" style={{ color: '#1d3557' }}>Search</label>
            <div className="control has-icons-left">
              <input 
                className="input" 
                type="text" 
                placeholder="Search projects..." 
                onChange={(e) => onFilterChange('search', e.target.value)}
                style={{ 
                  borderColor: '#457b9d', 
                  borderRadius: '0.375rem',
                  color: '#1d3557'
                }}
              />
              <span className="icon is-left">
                <Search size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="is-flex is-align-items-center is-justify-content-flex-end mt-3">
        <button 
          className="button is-small is-light"
          onClick={() => {
            // Reset all filters
            const selects = document.querySelectorAll('select');
            const inputs = document.querySelectorAll('input');
            selects.forEach(select => select.value = select.options[0].value);
            inputs.forEach(input => input.value = '');
            onFilterChange('reset', '');
          }}
          style={{ borderRadius: '4px' }}
        >
          <span className="icon is-small mr-1">
            <SlidersHorizontal size={14} />
          </span>
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters; 