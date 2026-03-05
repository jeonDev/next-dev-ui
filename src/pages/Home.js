import React, { useEffect, useState } from 'react';
import { fetchFeed } from '../api/community';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await fetchFeed();
        console.log('API Response:', response.data); // Helpful for debugging
        
        // Ensure posts is always an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (response.data && Array.isArray(response.data.content)) {
          // In case the response is a Spring Page object
          setPosts(response.data.content);
        } else if (response.data && Array.isArray(response.data.data)) {
          // In case it's wrapped in a data property
          setPosts(response.data.data);
        } else {
          console.error('API response is not an array:', response.data);
          setPosts([]);
        }
      } catch (err) {
        setError('Failed to load feed.');
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  return (
    <div>
      <header className="app-header">
        <h1>NEXT-DEV</h1>
      </header>
      <div className="container">
        {loading ? (
          <div className="empty-state">Loading feed...</div>
        ) : error ? (
          <div className="error-msg">{error}</div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>Main feed is empty.</p>
            <p>Start a discussion!</p>
          </div>
        ) : (
          posts.map(post => <PostCard key={post.communityPostId} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Home;
