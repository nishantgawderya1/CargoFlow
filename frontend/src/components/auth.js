import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Auth({ setIsAuthenticated, setUserId, setRole }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isLogin 
        ? `${process.env.REACT_APP_API_URL}/auth/login` 
        : `${process.env.REACT_APP_API_URL}/auth/register`;
      
      const body = isLogin 
        ? { email, password } 
        : { username, email, password };
      
      const response = await axios.post(url, body);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const decoded = jwtDecode(response.data.token);
        setIsAuthenticated(true);
        setUserId(decoded.userId);
        setRole(decoded.role);
      }
      
      if (isLogin) {
        setMessage('Login successful!');
      } else {
        setMessage('Registration successful! You can now login.');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setMessage(err.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p>{message}</p>
      <button onClick={toggleForm} className="btn">
        {isLogin 
          ? "Don't have an account? Register" 
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Auth;