import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../api/auth';

function SignUp() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    name: '',
    nickname: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(formData);
      navigate('/login');
    } catch (err) {
      setError('ID or nickname is already in use.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className="app-header">
        <h1>SIGN_UP</h1>
      </header>
      <div className="container mt-4">
        <form onSubmit={handleSignUp} className="card shadow">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">LOGIN_ID</label>
            <input 
              className="form-input"
              type="text" 
              name="loginId"
              placeholder="Create unique ID" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input 
              className="form-input"
              type="password" 
              name="password"
              placeholder="Min 8 chars" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">NAME</label>
            <input 
              className="form-input"
              type="text" 
              name="name"
              placeholder="Full name" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">NICKNAME</label>
            <input 
              className="form-input"
              type="text" 
              name="nickname"
              placeholder="Public alias" 
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            REGISTER
          </button>
          
          <div className="mt-4 text-center">
            <p style={{ color: '#8b949e', fontSize: '0.85rem' }}>Have an account?</p>
            <Link to="/login" className="btn btn-secondary">
              GO_TO_LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
