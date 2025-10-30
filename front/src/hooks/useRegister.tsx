// src/hooks/useAuth.ts
import apiClient from '../api/client';

export const useRegister = () => {
  

  const register = async (email: string, password: string, userName: string) => {
  try {
      const response = await apiClient.post('/register', {
        email,
        password,
        name: userName
      });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
   }

  return { register };
};