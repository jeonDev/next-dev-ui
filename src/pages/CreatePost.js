import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/community';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPublic: true
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await createPost(formData);
      navigate('/my-posts');
    } catch (err) {
      setError('Failed to post question.');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div>
      <header className="app-header">
        <h1>NEW_QUESTION</h1>
      </header>
      <div className="container mt-4">
        <form onSubmit={handleSubmit} className="card shadow">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">TITLE</label>
            <input 
              className="form-input"
              type="text" 
              name="title"
              placeholder="Question summary" 
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CONTENT</label>
            <textarea 
              className="form-input"
              rows={8} 
              name="content"
              placeholder="Write detailed answer or context..." 
              value={formData.content}
              onChange={handleChange}
              style={{ resize: 'none' }}
              required
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              name="isPublic"
              id="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', marginRight: '10px' }}
            />
            <label htmlFor="isPublic" className="form-label" style={{ marginBottom: 0 }}>
              PUBLIC_VISIBILITY
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            PUSH_POST
          </button>
          
          <button className="btn btn-secondary mt-2" type="button" onClick={() => navigate('/')}>
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
