import React, { useState } from 'react';

const Email = () => {
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');

  const handleSave = () => {
    if (!email.trim()) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Email settings saved!\nEmail: ${email}\nNotifications: ${notificationsEnabled ? 'Enabled' : 'Disabled'}\nFrequency: ${frequency}`);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Email Settings</h1>

      {/* Email Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Email Address:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address..."
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Notification Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Enable Notifications:
        </label>
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={(e) => setNotificationsEnabled(e.target.checked)}
          style={{ marginRight: '10px' }}
        />
        {notificationsEnabled ? 'Enabled' : 'Disabled'}
      </div>

      {/* Notification Frequency */}
      {notificationsEnabled && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Notification Frequency:
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <option value="instant">Instant</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          fontSize: '14px',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Save Settings
      </button>
    </div>
  );
};

export default Email;
