import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">▤</span>
        <span>FEED</span>
      </NavLink>
      <NavLink to="/create-post" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">✎</span>
        <span>WRITE</span>
      </NavLink>
      <NavLink to="/my-posts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">⌘</span>
        <span>MY_POST</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">👤</span>
        <span>MYPAGE</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
