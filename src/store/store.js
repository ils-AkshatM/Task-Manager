import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import projectSlice from './slices/projectSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectSlice,
    },
});

export default store;