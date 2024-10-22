import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/Signup.css';
import { useNavigate,Link } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("https://notes-backend-ts.onrender.com/api/auth/register",{
        username:name,
          email,
          password
        })
        console.log(response);
        if(response.data.success){
           
          console.log(response.data);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }

    setName('');
    setEmail('');
    setPassword('');


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
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;