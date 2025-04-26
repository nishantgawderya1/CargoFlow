import React, { useState, useEffect } from 'react';
import Auth from '../components/auth';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Login({ history }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/me`,
            { headers: { 'x-auth-token': token } }
          );
          setIsAuthenticated(true);
          setUserId(response.data.id);
          setRole(response.data.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="login-page">
      {!isAuthenticated ? (
        <Auth 
          setIsAuthenticated={setIsAuthenticated} 
          setUserId={setUserId} 
          setRole={setRole} 
        />
      ) : (
        <div>
          <h2>Welcome, {userId}</h2>
          <p>Role: {role}</p>
          <button onClick={() => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            history.push('/login');
          }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;