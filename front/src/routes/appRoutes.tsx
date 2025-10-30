import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Register from '../pages/register';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />

  </Routes>
);