import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import './css/Loader.css'
const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionid');
    if (sessionId) {
      navigate('/home');
    }
  }, [navigate]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post("https://notes-backend-ts.onrender.com/api/auth/login", {
        email,
        password
      }, { withCredentials: true });

      if (response.data.success) {
        localStorage.setItem('sessionid', response.data.data.sessionId);
        navigate("/home");
      } 
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false); 
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Login</button> 
        {loading && <div className="loading-indicator">Logging in...</div>} 
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
