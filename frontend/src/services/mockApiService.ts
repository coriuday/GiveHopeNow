import { Project } from '../App';

/**
 * Mock user data for authentication simulation
 */
interface MockUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

/**
 * Sample users for mocking authentication
 */
const mockUsers: Record<string, MockUser> = {
  'user1@example.com': {
    _id: 'user1',
    name: 'John Doe',
    email: 'user1@example.com',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  'user2@example.com': {
    _id: 'user2',
    name: 'Jane Smith',
    email: 'user2@example.com',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  'admin@example.com': {
    _id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  }
};

/**
 * Sample projects for mock data
 */
const mockProjects: Project[] = [
  {
    id: 'project1',
    _id: 'project1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water solutions to communities in need',
    shortDescription: 'Providing clean water solutions to communities in need',
    category: 'Health',
    goalAmount: 50000,
    currentAmount: 35000,
    backers: 120,
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3499?q=80&w=2000',
    createdBy: { _id: 'user1', name: 'John Doe' },
    createdAt: '2023-11-01T00:00:00Z',
    endDate: '2024-12-31T00:00:00Z',
    status: 'active'
  },
  {
    id: 'project2',
    _id: 'project2',
    title: 'Education for All',
    description: 'Supporting educational programs for underserved children',
    shortDescription: 'Supporting educational programs for underserved children',
    category: 'Education',
    goalAmount: 75000,
    currentAmount: 25000,
    backers: 85,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022',
    createdBy: { _id: 'user2', name: 'Jane Smith' },
    createdAt: '2023-10-15T00:00:00Z',
    endDate: '2024-11-15T00:00:00Z',
    status: 'active'
  },
  {
    id: 'project3',
    _id: 'project3',
    title: 'Disaster Relief Fund',
    description: 'Emergency support for communities affected by natural disasters',
    shortDescription: 'Emergency support for communities affected by natural disasters',
    category: 'Emergency Relief',
    goalAmount: 100000,
    currentAmount: 78000,
    backers: 210,
    imageUrl: 'https://images.unsplash.com/photo-1603221177545-c3e7962ce6cb?q=80&w=2070',
    createdBy: { _id: 'user1', name: 'John Doe' },
    createdAt: '2024-01-10T00:00:00Z',
    endDate: '2024-07-10T00:00:00Z',
    status: 'active'
  }
];

/**
 * Simulates mock login response
 */
export const mockLogin = (email: string, password: string) => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers[email];
      if (user && password === 'password') {
        resolve({
          token: `mock_token_${user._id}_${Date.now()}`,
          user
        });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 800);
  });
};

/**
 * Simulates mock registration response
 */
export const mockRegister = (name: string, email: string, password: string) => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers[email]) {
        reject({ message: 'User with this email already exists' });
      } else {
        const newUser: MockUser = {
          _id: `user_${Date.now()}`,
          name,
          email,
          role: 'user'
        };
        
        // Add to mock users (in a real app, this would persist to a database)
        mockUsers[email] = newUser;
        
        resolve({
          token: `mock_token_${newUser._id}_${Date.now()}`,
          user: newUser
        });
      }
    }, 1000);
  });
};

/**
 * Gets mock projects list
 */
export const getMockProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 800);
  });
};

/**
 * Creates a mock project
 */
export const createMockProject = (projectData: Partial<Project>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject: Project = {
        id: `project_${Date.now()}`,
        _id: `project_${Date.now()}`,
        title: projectData.title || 'New Project',
        description: projectData.description || 'Project description',
        shortDescription: projectData.shortDescription || projectData.description?.substring(0, 100) || 'Project description',
        category: projectData.category || 'Other',
        goalAmount: projectData.goalAmount || 10000,
        currentAmount: 0,
        backers: 0,
        imageUrl: projectData.imageUrl || 'https://placehold.co/600x400?text=Project+Image',
        createdBy: projectData.createdBy || { _id: 'user1', name: 'John Doe' },
        createdAt: new Date().toISOString(),
        endDate: projectData.endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      };
      
      // Add to mock projects list
      mockProjects.push(newProject);
      
      resolve(newProject);
    }, 1200);
  });
};

/**
 * Simulates a donation payment process
 */
export const processMockDonation = (projectId: string, amount: number, donorInfo?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() < 0.9) {
        // Find the project and update it
        const project = mockProjects.find(p => p.id === projectId || p._id === projectId);
        if (project) {
          project.currentAmount += amount;
          project.backers += 1;
        }
        
        resolve({
          success: true,
          transactionId: `tx_${Date.now()}`,
          amount,
          project: project
        });
      } else {
        reject({
          success: false,
          message: 'Payment processing failed. Please try again.'
        });
      }
    }, 1500);
  });
};

/**
 * Helper to determine if we should use mock API
 * This could check for presence of a query parameter, local storage setting, 
 * or environment variable
 */
export const shouldUseMockApi = (): boolean => {
  // Check if there's a URL parameter for using mock
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('useMock')) {
    return urlParams.get('useMock') === 'true';
  }
  
  // Check local storage setting
  const mockSetting = localStorage.getItem('useMockApi');
  if (mockSetting) {
    return mockSetting === 'true';
  }
  
  // By default, do NOT use mock API to ensure real backend connectivity
  return false;
};

/**
 * Set whether to use mock API
 */
export const setUseMockApi = (useMock: boolean): void => {
  localStorage.setItem('useMockApi', useMock ? 'true' : 'false');
}; 