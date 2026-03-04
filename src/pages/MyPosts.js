import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { fetchMyPosts } from '../api/community';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchMyPosts();
        setPosts(response.data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load your collection.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <header className="app-header">
          <h1>MY_COLLECTION</h1>
        </header>
        <div className="container text-center mt-4">
          <p style={{ color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}>LOADING_DATA...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="app-header">
        <h1>MY_COLLECTION</h1>
      </header>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>// No questions found in your repository.</p>
            <button className="btn btn-secondary mt-4" onClick={() => navigate('/create-post')}>
              INIT_POST
            </button>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.communityPostId} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyPosts;
