import api from '../services/api';

interface ApiError {
  code?: string;
  response?: {
    status: number;
    statusText: string;
    data?: any;
  };
  message?: string;
  isAxiosError?: boolean;
}

/**
 * Tests the connection to the backend API and provides detailed information
 * @returns Promise that resolves to connection status
 */
export const testApiConnection = async (): Promise<{
  success: boolean;
  message: string;
  apiUrl?: string;
  timestamp?: string;
  details?: any;
}> => {
  try {
    // Try to fetch a resource from the API
    const response = await api.get('/projects', { timeout: 8000 });
    
    return {
      success: true,
      message: 'Successfully connected to the backend API',
      apiUrl: api.defaults.baseURL,
      timestamp: new Date().toISOString(),
      details: {
        status: response.status,
        dataReceived: !!response.data,
        itemCount: Array.isArray(response.data) ? response.data.length : 'N/A',
      }
    };
  } catch (error: unknown) {
    console.error('API connection test failed:', error);
    
    // Cast the unknown error to our interface
    const apiError = error as ApiError;
    
    // Handle network-related errors
    if (!apiError.response) {
      if (apiError.code === 'ECONNREFUSED' || apiError.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Could not connect to the API server. Make sure the backend is running.',
          apiUrl: api.defaults.baseURL,
          details: {
            errorCode: apiError.code,
            possibleCauses: [
              'Backend server is not running',
              'Backend is running on a different port',
              'Network connectivity issues'
            ],
            suggestedActions: [
              'Start the backend server with "npm run start" in the backend directory',
              'Check if the VITE_API_URL in .env matches the backend URL',
              'Verify your network connection'
            ]
          }
        };
      }
      
      // Other network errors
      return {
        success: false,
        message: apiError.message || 'Network error while connecting to the API',
        apiUrl: api.defaults.baseURL,
        details: {
          isNetworkError: true,
          errorMessage: apiError.message
        }
      };
    }
    
    if (apiError.response) {
      // Handle specific HTTP error codes
      if (apiError.response.status === 401) {
        return {
          success: false,
          message: 'Authentication error: You need to be logged in to access this resource',
          apiUrl: api.defaults.baseURL,
          details: {
            status: apiError.response.status,
            data: apiError.response.data
          }
        };
      }
      
      if (apiError.response.status === 404) {
        return {
          success: false,
          message: 'API endpoint not found. The backend may be running but with a different API structure.',
          apiUrl: api.defaults.baseURL,
          details: {
            status: apiError.response.status,
            endpoint: '/projects'
          }
        };
      }
      
      // For other status codes
      return {
        success: false,
        message: `API responded with status ${apiError.response.status}: ${apiError.response.statusText}`,
        apiUrl: api.defaults.baseURL,
        details: {
          status: apiError.response.status,
          statusText: apiError.response.statusText,
          data: apiError.response.data
        }
      };
    }
    
    return {
      success: false,
      message: apiError.message || 'An unknown error occurred while connecting to the API',
      apiUrl: api.defaults.baseURL,
      details: {
        isUnknownError: true
      }
    };
  }
};

/**
 * Gets basic information about the API configuration
 */
export const getApiInfo = (): {
  baseUrl: string;
  hasToken: boolean;
} => {
  const token = localStorage.getItem('token');
  
  return {
    baseUrl: api.defaults.baseURL || 'Not configured',
    hasToken: !!token,
  };
}; 