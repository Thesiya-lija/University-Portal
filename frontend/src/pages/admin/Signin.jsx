import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let collectionEndpoint;
  
     if (formData.email.includes('@admin.com')) {
        collectionEndpoint = `${import.meta.env.VITE_BACKEND_URL}/admin/admin-signin`;
      } else if (formData.email.includes('@committee.com')) {
        collectionEndpoint = `${import.meta.env.VITE_BACKEND_URL}/committee/cmt-signin`;
      } else {
        collectionEndpoint = `${import.meta.env.VITE_BACKEND_URL}/student/student-signin`;
      }
      

      const response = await axios.post(collectionEndpoint, {
        email: formData.email,
        password: formData.password,
      });

      const { role, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      window.dispatchEvent(new Event("userUpdate"));

      toast.success('Login successful!', { position: 'top-center', autoClose: 3000 });

      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'committee':
          navigate('/committee-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        default:
          toast.error('Unknown role, unable to redirect.', { position: 'top-center', autoClose: 3000 });
      }
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred during login';
      toast.error(errorMessage, { position: 'top-center', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
