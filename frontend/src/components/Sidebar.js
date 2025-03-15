import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import './Sidebar.css';
import { FaCog, FaTachometerAlt, FaKey, FaEnvelope, FaBook, FaArrowRight } from 'react-icons/fa';
import logo from '../assets/sphere.jpg';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const menuItems = [
    { name: 'Settings', icon: <FaCog />, path: '/settings' },
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Keys', icon: <FaKey />, path: '/keys' },
    { name: 'Email', icon: <FaEnvelope />, path: '/email' },
    { name: 'Documentation', icon: <FaBook />, path: '/documentation' },
  ];

  // Filter menu items based on the search query
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src={logo} alt="Sphere Logo" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">SPHERE</h2>
      </div>
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search Settings..."
          className="sidebar-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <button className="sidebar-search-button">🔍</button>
      </div>
      <div className="sidebar-menu">
        {filteredMenuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="sidebar-menu-item"
            activeClassName="active"
          >
            {item.icon}
            <span>{item.name}</span>
            <FaArrowRight className="sidebar-arrow-icon" />
          </NavLink>
        ))}
        {filteredMenuItems.length === 0 && (
          <p style={{ padding: '10px', color: '#999', textAlign: 'center' }}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
