// src/hooks/useAuth.ts
import {   useState } from 'react';
import apiClient from '../api/client';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
  try {
      const response = await apiClient.post('/login', {
        email,
        password
      });
      setUser(response.data.user);
      console.log('Login successful:', response.data);
            navigate("/dashboard");

    } catch (error) {
      setError(true);
      console.error('Login failed:', error);
    }
   }

  return { user, login,error ,setError};
};