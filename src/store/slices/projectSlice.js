import { createSlice } from '@reduxjs/toolkit';

const initialProjects = [
    {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete redesign of the company website with modern UI/UX',
        userId: 1,
        tasks: [
            {
                id: 1,
                title: 'Create wireframes',
                status: 'Done',
                dueDate: '2025-09-20',
                projectId: 1,
            },
            {
                id: 2,
                title: 'Design mockups',
                status: 'In Progress',
                dueDate: '2025-09-30',
                projectId: 1,
            },
            {
                id: 3,
                title: 'Implement frontend',
                status: 'Todo',
                dueDate: '2025-10-15',
                projectId: 1,
            },
            {
                id: 4,
                title: 'Test responsive design',
                status: 'Todo',
                dueDate: '2025-10-20',
                projectId: 1,
            },
        ],
    },
    {
        id: 2,
        name: 'Mobile App Development',
        description: 'Build a React Native mobile application for iOS and Android',
        userId: 1,
        tasks: [
            {
                id: 5,
                title: 'Setup development environment',
                status: 'Done',
                dueDate: '2025-09-15',
                projectId: 2,
            },
            {
                id: 6,
                title: 'Create navigation structure',
                status: 'In Progress',
                dueDate: '2025-10-01',
                projectId: 2,
            },
            {
                id: 7,
                title: 'Implement authentication',
                status: 'Todo',
                dueDate: '2025-10-10',
                projectId: 2,
            },
        ],
    },
    {
        id: 3,
        name: 'E-commerce Platform',
        description: 'Develop a full-stack e-commerce solution with payment integration',
        userId: 1,
        tasks: [
            {
                id: 8,
                title: 'Database design',
                status: 'Done',
                dueDate: '2025-09-25',
                projectId: 3,
            },
            {
                id: 9,
                title: 'Product catalog API',
                status: 'In Progress',
                dueDate: '2025-10-05',
                projectId: 3,
            },
            {
                id: 10,
                title: 'Shopping cart functionality',
                status: 'Todo',
                dueDate: '2025-10-12',
                projectId: 3,
            },
            {
                id: 11,
                title: 'Payment gateway integration',
                status: 'Todo',
                dueDate: '2025-10-25',
                projectId: 3,
            },
        ],
    },
    {
        id: 4,
        name: 'Marketing Campaign',
        description: 'Q4 digital marketing campaign for product launch',
        userId: 1,
        tasks: [
            {
                id: 12,
                title: 'Market research',
                status: 'Done',
                dueDate: '2025-09-18',
                projectId: 4,
            },
            {
                id: 13,
                title: 'Content creation',
                status: 'In Progress',
                dueDate: '2025-10-08',
                projectId: 4,
            },
            {
                id: 14,
                title: 'Social media strategy',
                status: 'Todo',
                dueDate: '2025-10-15',
                projectId: 4,
            },
        ],
    },
];

const initialState = {
    projects: JSON.parse(localStorage.getItem('projects')) || initialProjects,
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addProject: (state, action) => {
            const newProject = {
                ...action.payload,
                id: Date.now(),
                tasks: [],
            };
            state.projects.push(newProject);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        updateProject: (state, action) => {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = { ...state.projects[index], ...action.payload };
                localStorage.setItem('projects', JSON.stringify(state.projects));
            }
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        addTask: (state, action) => {
            const { projectId, task } = action.payload;
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                const newTask = {
                    ...task,
                    id: Date.now(),
                    projectId,
                };
                project.tasks.push(newTask);
                localStorage.setItem('projects', JSON.stringify(state.projects));
            }
        },
        updateTask: (state, action) => {
            const { taskId, updates } = action.payload;
            const project = state.projects.find(p =>
                p.tasks.some(t => t.id === taskId)
            );
            if (project) {
                const taskIndex = project.tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...updates };
                    localStorage.setItem('projects', JSON.stringify(state.projects));
                }
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            const project = state.projects.find(p =>
                p.tasks.some(t => t.id === taskId)
            );
            if (project) {
                project.tasks = project.tasks.filter(t => t.id !== taskId);
                localStorage.setItem('projects', JSON.stringify(state.projects));
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setError,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    clearError,
} = projectSlice.actions;

export default projectSlice.reducer;