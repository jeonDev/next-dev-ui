import React, { useState } from 'react';
import { likePost } from '../api/community'; // Importing likePost from api

function PostCard({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [liked, setLiked] = useState(post.liked || false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevents card toggle when liking
    try {
      await likePost(post.communityPostId);
      if (liked) {
        setLikes(prev => prev - 1);
        setLiked(false);
      } else {
        setLikes(prev => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error('Failed to update like status');
    }
  };

  return (
    <div 
      className={`post-card ${isExpanded ? 'expanded' : ''}`} 
      onClick={toggleExpand}
      style={{ cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '16px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="post-title" style={{ fontWeight: 'bold' }}>
          {post.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={handleLike} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: liked ? '#f85149' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.9rem'
            }}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>{likes}</span>
          </button>
          <span style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-secondary)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}>
            ▼
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="post-content" style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: '1px solid var(--border-color)',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <p style={{ 
            color: 'var(--text-primary)', 
            fontSize: '0.95rem', 
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6'
          }}>
            {post.content}
          </p>
          <div style={{ 
            marginTop: '16px', 
            fontSize: '0.75rem', 
            color: 'var(--accent-color)', 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: '10px'
          }}>
            {!post.isPublic && <span style={{ color: 'var(--error-color)' }}>[PRIVATE_REPOSITORY]</span>}
            <span>ID: {post.communityPostId}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
