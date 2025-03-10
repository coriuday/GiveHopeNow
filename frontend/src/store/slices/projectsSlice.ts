import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getProjects, 
  getProjectById, 
  getCategoryCounts,
  Project, 
  CategoryCount
} from '../../services/projectService';

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  categoryCounts: CategoryCount;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
  categoryCounts: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (filter?: string) => {
    return await getProjects(filter);
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string) => {
    return await getProjectById(id);
  }
);

export const fetchCategoryCounts = createAsyncThunk(
  'projects/fetchCategoryCounts',
  async () => {
    return await getCategoryCounts();
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      // Handle fetchProjectById
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project';
      })
      // Handle fetchCategoryCounts
      .addCase(fetchCategoryCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryCounts = action.payload;
      })
      .addCase(fetchCategoryCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch category counts';
      });
  },
});

export const { clearSelectedProject, setLoading, clearError } = projectsSlice.actions;
export default projectsSlice.reducer; 