import { createSlice } from '@reduxjs/toolkit';

const mockUsers = [
    {
        id: 1,
        email: 'admin@example.com',
        password: 'password123',
        name: 'John Doe',
    },
    {
        id: 2,
        email: 'user@example.com',
        password: 'user123',
        name: 'Jane Smith',
    },
];

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user = mockUsers.find(
            u => u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
            const { password, ...userWithoutPassword } = user;
            dispatch(loginSuccess(userWithoutPassword));
        } else {
            dispatch(loginFailure('Invalid email or password'));
        }
    } catch (error) {
        dispatch(loginFailure('Login failed. Please try again.'));
    }
};
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerStart());

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            dispatch(registerFailure('User already exists'));
            return;
        }
        const newUser = {
            id: Date.now(),
            email: userData.email,
            name: userData.name,
        };
        mockUsers.push({ ...newUser, password: userData.password });
        dispatch(registerSuccess(newUser));
    } catch (error) {
        dispatch(registerFailure('Registration failed. Please try again.'));
    }
};
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    clearError
} = authSlice.actions;
export default authSlice.reducer;