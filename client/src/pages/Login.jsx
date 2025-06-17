import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success("Logged in successfully!");
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form className="bg-white shadow-lg p-6 rounded w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input className="mb-3 p-2 w-full border" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-3 p-2 w-full border" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}