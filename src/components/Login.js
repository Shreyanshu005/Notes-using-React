import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/Login.css';
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("https://notes-backend-ts.onrender.com/api/auth/login",{
        
          email,
          password
        },{withCredentials:true})
        console.log(response);
        if(response.data.success){
           
            localStorage.setItem('sessionid', response.data.data.sessionId);

          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }

   
    setEmail('');
    setPassword('');


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
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;