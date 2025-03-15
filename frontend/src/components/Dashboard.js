import React, { useState} from 'react';
import { useServerContext } from './ServerContext'; // Import context
import './Dashboard.css';

const Dashboard = () => {
  const { serverDetails } = useServerContext(); // Access context
  const [loading, setLoading] = useState(false);

  const handleStartStop = async (serverId, action) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/server-actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serverId, action }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} the server`);
      }

      // Update server status locally (assuming serverId exists)
      serverDetails.map((server) => {
        if (server.id === serverId) {
          server.status = action === 'start' ? 'Active' : 'Inactive';
        }
        return server;
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Server Dashboard</h1>

      {/* Total Active Servers */}
      <div className="dashboard-section">
        <h2>Total Active Servers</h2>
        <p>
          <strong>{serverDetails.filter((server) => server.status === 'Active').length}</strong> Active Servers
        </p>
      </div>

      {/* Server Information Table */}
      <div className="dashboard-section">
        <h2>Server Information</h2>
        {loading && <p>Loading...</p>}
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Server Name</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Keys</th>
            </tr>
          </thead>
          <tbody>
            {serverDetails.map((server) => (
              <tr key={server.id}>
                <td>{server.name}</td>
                <td
                  className={
                    server.status === 'Active'
                      ? 'status-active'
                      : 'status-inactive'
                  }
                >
                  {server.status}
                </td>
                <td>
                  {server.status === 'Inactive' ? (
                    <button
                      className="action-button start-button"
                      onClick={() => handleStartStop(server.id, 'start')}
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      className="action-button stop-button"
                      onClick={() => handleStartStop(server.id, 'stop')}
                    >
                      Stop
                    </button>
                  )}
                </td>
                <td>
                  <p>
                    <strong>Server Key:</strong> {server.serverKey || 'Not generated'}
                  </p>
                  <p>
                    <strong>Private Key:</strong> {server.privateKey || 'Not generated'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
