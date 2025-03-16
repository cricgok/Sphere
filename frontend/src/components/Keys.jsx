import React, { useState, useEffect } from 'react';
import { useServerContext } from './ServerContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Keys.css';
import InfoIcon from '../assets/info.png';

const Keys = () => {
  const { setServerDetails, serverDetails } = useServerContext();
  const [serverName, setServerName] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all generated servers on mount
  useEffect(() => {
    fetchGeneratedServers();
  }, []);

  const fetchGeneratedServers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8084/dashboard'); // ✅ Correct API
      if (!response.ok) throw new Error('Failed to fetch servers.');
      const data = await response.json();
      setServerDetails(Object.values(data)); // ✅ Properly updates the state
    } catch (error) {
      console.error('Error fetching servers:', error);
      toast.error('Failed to fetch servers.', { position: 'top-right' });
    }
  };

  const handleGenerateKeys = async () => {
    if (!serverName.trim()) {
      toast.error('Please enter a valid server name.', { position: 'top-right' });
      return;
    }

    // Prevent duplicate server keys
    if (serverDetails.some((server) => server.name.toLowerCase() === serverName.toLowerCase())) {
      toast.error('Keys have already been generated for this server.', { position: 'top-right' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8084/generatekey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainname: serverName, name: serverName }), // ✅ Fixed payload
      });

      if (!response.ok) {
        throw new Error('Failed to generate keys.');
      }

      const data = await response.json();
      setServerDetails((prevDetails) => [...prevDetails, { name: serverName, ...data }]);
      toast.success('Keys generated successfully!', { position: 'top-right' });
    } catch (error) {
      console.error('Error generating keys:', error);
      toast.error('Failed to generate keys. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
      setServerName('');
    }
  };

  const handleCopy = (key, keyType) => {
    if (!key) {
      toast.error(`No ${keyType} found to copy!`, { position: 'top-right' });
      return;
    }
    navigator.clipboard.writeText(key);
    toast.success(`${keyType} copied to clipboard!`, { position: 'top-right' });
  };

  return (
    <div className="keys-page">
      <ToastContainer />
      <div className="keys-section">
        <h3>Generate Server Keys</h3>
        <label>
          Name{' '}
          <img
            src={InfoIcon}
            alt="Info"
            className="info-icon"
            onClick={() => toast.info('Enter a server name to generate keys.', { position: 'top-right' })}
          />
          <input
            type="text"
            placeholder="Enter server name..."
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="input-field"
            disabled={loading}
          />
        </label>
        <button className="update-button" onClick={handleGenerateKeys} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Keys'}
        </button>
      </div>

      {/* Display All Generated Keys */}
      {serverDetails.length > 0 && (
        <div className="keys-section">
          <h3>All Generated Keys</h3>
          <table className="keys-table">
            <thead>
              <tr>
                <th>Server Name</th>
                <th>Server Key</th>
                <th>Private Key</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serverDetails.map((server, index) => (
                <tr key={index}>
                  <td>{server.name}</td>
                  <td>
                    <div className="key-cell">
                      {server.publickey || 'N/A'}
                      <button className="copy-button" onClick={() => handleCopy(server.publickey, 'Server Key')}>
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="key-cell">
                      {server.privateKey || 'N/A'}
                      <button className="copy-button" onClick={() => handleCopy(server.privateKey, 'Private Key')}>
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() =>
                        setServerDetails((prevDetails) => prevDetails.filter((_, i) => i !== index))
                      }
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Keys;
