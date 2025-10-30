// src/hooks/useAuth.ts
import {  useState } from 'react';
import apiClient from '../api/client';

export const useAuth = () => {
  
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
  try {
      const response = await apiClient.post('/login', {
        email,
        password
      });
      setUser(response.data.user);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
   }

  return { user, login };
};