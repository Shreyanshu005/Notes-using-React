import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import './css/Loader.css'

const Signup = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); 

    try {
      const response = await axios.post("https://notes-backend-ts.onrender.com/api/auth/register", {
        username: name,
        email,
        password
      });
      
      if (response.data.success) {
        console.log(response.data);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false); 

      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" disabled={loading}>Signup</button> 
        {loading && <div className="loading-indicator">Signing up...</div>}
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
