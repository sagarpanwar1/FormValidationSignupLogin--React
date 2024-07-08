import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password logic here
    navigate('/login');
  };

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword