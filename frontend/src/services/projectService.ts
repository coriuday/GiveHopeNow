import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface ProjectCreator {
  _id: string;
  name: string;
  email?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  backers: number;
  endDate: string;
  createdBy: ProjectCreator;
  createdAt: string;
  location?: string;
}

export interface DonationData {
  projectId: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  paymentMethod: string;
}

export interface CategoryCount {
  [category: string]: number;
}

// Fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Fetch projects by category
export const getProjectsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/projects?category=${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} projects:`, error);
    throw error;
  }
};

// Fetch a single project by ID
export const getProjectById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

// Process a donation
export const processDonation = async (donationData: DonationData) => {
  try {
    const response = await axios.post(`${API_URL}/donations`, donationData);
    return response.data;
  } catch (error) {
    console.error('Error processing donation:', error);
    throw error;
  }
};

// Handle payment processing with redirect
export const initiatePayment = async (donationData: DonationData) => {
  try {
    const response = await axios.post(`${API_URL}/payments/initiate`, donationData);
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Verify payment completion
export const verifyPayment = async (paymentId: string, projectId: string) => {
  try {
    const response = await axios.get(`${API_URL}/payments/verify/${paymentId}?projectId=${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Get count of projects by category
export const getCategoryCounts = async (): Promise<CategoryCount> => {
  try {
    const projects = await getAllProjects();
    const counts: CategoryCount = {};
    
    projects.forEach((project: Project) => {
      const category = project.category;
      counts[category] = (counts[category] || 0) + 1;
    });
    
    return counts;
  } catch (error) {
    console.error('Error getting category counts:', error);
    return {};
  }
};

// Alias for getAllProjects to maintain compatibility with existing code
export const getProjects = getAllProjects;

// Sample projects data for development (when API is not available)
export const sampleProjects: Project[] = [
  {
    _id: 'p1',
    title: 'Clean Water Initiative in Rural Communities',
    description: 'Help us bring clean drinking water to remote villages where access to safe water is limited. This project will install water filtration systems and wells to serve over 5,000 people.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1581577083543-72d1f5b1fdf5?ixlib=rb-4.0.3',
    currentAmount: 12500,
    goalAmount: 25000,
    backers: 138,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdBy: {
      _id: 'u1',
      name: 'Global Water Relief'
    },
    createdAt: new Date().toISOString(),
    location: 'Multiple Countries'
  },
  {
    _id: 'p2',
    title: 'Education for Underprivileged Children',
    description: 'Support our mission to provide quality education to children from low-income families. Funds will be used for school supplies, tuition assistance, and building new classrooms.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3',
    currentAmount: 9000,
    goalAmount: 15000,
    backers: 67,
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    createdBy: {
      _id: 'u2',
      name: 'Bright Future Foundation'
    },
    createdAt: new Date().toISOString(),
    location: 'Kenya'
  },
  {
    _id: 'p3',
    title: 'Emergency Relief for Flood Victims',
    description: 'Provide immediate assistance to families affected by recent flooding. Your donation will help with temporary shelter, food, clean water, and medical supplies for those displaced.',
    category: 'Disaster Relief',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-4.0.3',
    currentAmount: 18500,
    goalAmount: 20000,
    backers: 203,
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    createdBy: {
      _id: 'u3',
      name: 'Rapid Response Aid'
    },
    createdAt: new Date().toISOString(),
    location: 'Bangladesh'
  },
  {
    _id: 'p4',
    title: 'Community Garden Initiative',
    description: 'Help us transform vacant lots into thriving community gardens that provide fresh produce and green spaces in urban neighborhoods lacking access to healthy food options.',
    category: 'Environment',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3',
    currentAmount: 4300,
    goalAmount: 10000,
    backers: 56,
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    createdBy: {
      _id: 'u4',
      name: 'Urban Greening Project'
    },
    createdAt: new Date().toISOString(),
    location: 'United States'
  },
  {
    _id: 'p5',
    title: 'Medical Supplies for Rural Clinics',
    description: 'Support rural health clinics with essential medical supplies and equipment. Your contribution will help provide care to thousands of patients in underserved communities.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3',
    currentAmount: 7500,
    goalAmount: 12000,
    backers: 89,
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
    createdBy: {
      _id: 'u5',
      name: 'Healthcare Without Borders'
    },
    createdAt: new Date().toISOString(),
    location: 'Uganda'
  },
  {
    _id: 'p6',
    title: 'Scholarship Fund for First-Generation College Students',
    description: 'Help break the cycle of poverty by providing scholarships to first-generation college students. Your donation gives promising students the chance to earn a degree without crushing debt.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3',
    currentAmount: 22500,
    goalAmount: 50000,
    backers: 175,
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    createdBy: {
      _id: 'u6',
      name: 'Education Empowerment Fund'
    },
    createdAt: new Date().toISOString(),
    location: 'Global'
  }
];

// Function to get sample projects (for development/fallback)
export const getSampleProjects = (category?: string) => {
  if (category) {
    return sampleProjects.filter(project => project.category.toLowerCase() === category.toLowerCase());
  }
  return sampleProjects;
};

export default {
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  processDonation,
  initiatePayment,
  verifyPayment,
  getSampleProjects,
  getCategoryCounts
}; 