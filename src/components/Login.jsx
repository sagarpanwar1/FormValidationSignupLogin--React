import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const storedUser = JSON.parse(localStorage.getItem('user'));
  
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        navigate('/products');
      } else {
        setError('Invalid email or password');
      }
    };
  
    return (
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
          
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
          
          {error && <span>{error}</span>}

          <p>Reset password</p>
          
          <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default Login