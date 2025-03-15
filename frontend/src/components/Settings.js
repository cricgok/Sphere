import React from 'react';
import './Setting.css'; // Import CSS for styling

const Settings = () => {
  return (
    <div className="settings-page">
      <h1 className="settings-title">Application Settings</h1>

      {/* About the Application */}
      <div className="settings-section">
        <h2>About the Application</h2>
        <p>
          This application provides a platform for users to manage their server configurations,
          generate secure keys for servers, and monitor server activities in real-time. It is
          designed to simplify server management with an intuitive user interface and robust
          functionality.
        </p>
      </div>

      {/* User Preferences */}
      <div className="settings-section">
        <h2>User Preferences</h2>
        <form>
          <label>
            <strong>Theme:</strong>
            <select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label>
            <strong>Notification Settings:</strong>
            <input type="checkbox" /> Enable Notifications
          </label>

          <label>
            <strong>Email Alerts:</strong>
            <input type="email" placeholder="Enter your email" />
          </label>

          <button type="submit" className="settings-save-button">
            Save Preferences
          </button>
        </form>
      </div>

      {/* Support Section */}
      <div className="settings-section">
        <h2>Support</h2>
        <p>
          For any issues or inquiries, please contact our support team:
        </p>
        <ul>
          <li>Email: <a href="mailto:support@example.com">support@example.com</a></li>
          <li>Phone: +1 234 567 890</li>
          <li>FAQs: <a href="/faqs">Visit our FAQs</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
