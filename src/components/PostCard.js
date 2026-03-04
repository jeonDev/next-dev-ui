import React, { useState } from 'react';

function PostCard({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`post-card ${isExpanded ? 'expanded' : ''}`} 
      onClick={toggleExpand}
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="post-title" style={{ marginBottom: isExpanded ? '12px' : '0' }}>
          {post.title}
        </div>
        <span style={{ 
          fontSize: '0.8rem', 
          color: 'var(--text-secondary)',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }}>
          ▼
        </span>
      </div>

      {isExpanded && (
        <div className="post-content" style={{ 
          marginTop: '12 hurriedpx', 
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
