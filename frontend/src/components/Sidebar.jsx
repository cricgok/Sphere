import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaCog, FaTachometerAlt, FaKey, FaEnvelope, FaBook, FaArrowRight, FaTimes } from 'react-icons/fa';
import logo from '../assets/sphere.jpg';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('sidebarSearch') || ''; // ✅ Persist search state
  });

  useEffect(() => {
    localStorage.setItem('sidebarSearch', searchQuery);
  }, [searchQuery]);

  const menuItems = [
    { name: 'Settings', icon: <FaCog />, path: '/settings' },
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Keys', icon: <FaKey />, path: '/keys' },
    { name: 'Email', icon: <FaEnvelope />, path: '/email' },
    { name: 'Documentation', icon: <FaBook />, path: '/documentation' },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src={logo} alt="Sphere Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">GINGER</h2>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search Settings..."
          className="sidebar-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search-button" onClick={() => setSearchQuery('')}>
            <FaTimes />
          </button>
        )}
      </div>

      <div className="sidebar-menu">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}
            >
              {item.icon}
              <span>{item.name}</span>
              <FaArrowRight className="sidebar-arrow-icon" />
            </NavLink>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
