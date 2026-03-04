import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(loginId, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      setError('Invalid ID or password.');
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1>LOGIN_USER</h1>
      </header>
      <div className="container mt-4">
        <form onSubmit={handleLogin} className="card shadow">
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label className="form-label">LOGIN_ID</label>
            <input 
              className="form-input"
              type="text" 
              placeholder="Your login ID" 
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input 
              className="form-input"
              type="password" 
              placeholder="Your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            CONTINUE
          </button>
          
          <div className="mt-4 text-center">
            <p style={{ color: '#8b949e', fontSize: '0.85rem' }}>No account?</p>
            <Link to="/signup" className="btn btn-secondary">
              SIGN_UP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
