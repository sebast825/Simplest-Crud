// src/hooks/useAuth.ts
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

export const useRegister = () => {
  
  const navigate = useNavigate();

  const register = async (email: string, password: string, userName: string) => {
  try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        name: userName
      });
      console.log('Login successful:', response.data);
      alert("Usuario creado con éxito");
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert("Error al crear el usuario");
    }
   }

  return { register };
};