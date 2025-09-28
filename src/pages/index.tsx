import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { AuthPage } from './AuthPage';
import { Dashboard } from './Dashboard';

const Index = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <AuthPage />;
  }

  return <Dashboard />;
};

export default Index;