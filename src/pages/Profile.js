import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div>
      <header className="app-header">
        <h1>USER_PROFILE</h1>
      </header>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="form-group">
            <label className="form-label">LOGIN_ID</label>
            <div className="form-input" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
              {user.loginId}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">NAME</label>
            <div className="form-input" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
              {user.name}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">NICKNAME</label>
            <div className="form-input" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
              {user.nickname}
            </div>
          </div>

          <button className="btn btn-secondary mt-4" onClick={handleLogout} style={{ color: '#da3633', borderColor: '#da3633' }}>
            TERMINATE_SESSION (LOGOUT)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
