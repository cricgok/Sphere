import React from 'react';

const Documentation = () => {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Application Documentation
      </h1>

      {/* Introduction */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          Introduction
        </h2>
        <p>
          This application simplifies server management by allowing users to generate secure
          server keys, manage servers, and monitor their activity. Follow this documentation to
          get started and maximize the potential of the application.
        </p>
      </section>

      {/* Steps to Use the Application */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          Steps to Use
        </h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li>
            <strong>Navigate to the Keys Page:</strong> Enter the server name and click "Generate
            Keys" to create unique Server and Private Keys for your server.
          </li>
          <li>
            <strong>View Generated Keys:</strong> All generated keys are displayed in the keys
            table. You can copy the keys or delete them if they are no longer required.
          </li>
          <li>
            <strong>Manage Servers:</strong> Go to the Dashboard to view active and inactive
            servers. Use the "Start" or "Stop" buttons to manage server statuses.
          </li>
          <li>
            <strong>Customize Email Notifications:</strong> Navigate to the Email Settings page to
            enable notifications and set their frequency (e.g., instant, daily, weekly).
          </li>
          <li>
            <strong>Adjust Application Settings:</strong> In the Settings page, customize the
            application theme and notification preferences for a personalized experience.
          </li>
        </ol>
      </section>

      {/* FAQs */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>FAQs</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>Q: Can I generate keys for the same server multiple times?</strong>
            <p>A: No, each server can have only one set of keys to ensure security.</p>
          </li>
          <li>
            <strong>Q: How can I delete a server's keys?</strong>
            <p>
              A: Go to the Keys page, find the server in the table, and click the delete button
              (🗑️) next to it.
            </p>
          </li>
          <li>
            <strong>Q: Can I customize notification settings?</strong>
            <p>
              A: Yes, you can enable or disable notifications and set their frequency in the Email
              Settings page.
            </p>
          </li>
        </ul>
      </section>

      {/* Support Section */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          Need Help?
        </h2>
        <p>
          If you have any questions or encounter issues, please contact our support team at{' '}
          <a href="mailto:support@example.com" style={{ color: '#007bff' }}>
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Documentation;
