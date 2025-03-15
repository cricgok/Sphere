import React, { useState } from 'react';
import { useServerContext } from './ServerContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Keys.css'; // Import CSS file for styling
import InfoIcon from '../assets/info.png'; // Replace with the actual path to your icon

const Keys = () => {
  const { setServerDetails, serverDetails } = useServerContext(); // Access context
  const [serverName, setServerName] = useState('');
  const [serverKey, setServerKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateKeys = async () => {
    if (!serverName.trim()) {
      toast.error('Please enter a valid server name.', { position: 'top-right' });
      return;
    }

    // Check if the server already has keys
    if (serverDetails.some((server) => server.name.toLowerCase() === serverName.toLowerCase())) {
      toast.error('Keys have already been generated for this server.', { position: 'top-right' });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/generate-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serverName }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate keys.');
      }

      const data = await response.json();
      setServerKey(data.serverKey);
      setPrivateKey(data.privateKey);
      setServerDetails((prevDetails) => [...prevDetails, data]); // Add new server details to context

      toast.success('Keys generated successfully!', { position: 'top-right' });
    } catch (error) {
      console.error('Error generating keys:', error);
      toast.error('Failed to generate keys. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
      setServerName(''); // Clear input
    }
  };

  const handleCopy = (key, keyType) => {
    navigator.clipboard.writeText(key);
    toast.success(`${keyType} copied to clipboard!`, { position: 'top-right' });
  };

  return (
    <div className="keys-page">
      <ToastContainer />
      <div className="keys-section">
        <h3>Server Name</h3>
        <label>
          Name{' '}
          <img
            src={InfoIcon}
            alt="Info"
            className="info-icon"
            onClick={() =>
              toast.info('Enter the name of the server to generate keys.', {
                position: 'top-right',
              })
            }
          />
          <input
            type="text"
            placeholder="Enter your server name..."
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="input-field"
            disabled={loading}
          />
        </label>
        <button
          className="update-button"
          onClick={handleGenerateKeys}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Keys'}
        </button>
      </div>

      {serverKey && privateKey && (
        <div className="keys-section">
          <h3>Generated Keys</h3>
          <div className="key-item">
            <label>
              Server Key{' '}
              <img
                src={InfoIcon}
                alt="Info"
                className="info-icon"
                onClick={() =>
                  toast.info('This is the generated Server Key.', {
                    position: 'top-right',
                  })
                }
              />
              <div className="key-container">
                <input
                  type="text"
                  value={serverKey}
                  readOnly
                  className="input-field read-only"
                />
                <button
                  className="copy-button"
                  onClick={() => handleCopy(serverKey, 'Server Key')}
                >
                  📋 Copy
                </button>
              </div>
            </label>
          </div>
          <div className="key-item">
            <label>
              Private Key{' '}
              <img
                src={InfoIcon}
                alt="Info"
                className="info-icon"
                onClick={() =>
                  toast.info('This is the generated Private Key.', {
                    position: 'top-right',
                  })
                }
              />
              <div className="key-container">
                <input
                  type="text"
                  value={privateKey}
                  readOnly
                  className="input-field read-only"
                />
                <button
                  className="copy-button"
                  onClick={() => handleCopy(privateKey, 'Private Key')}
                >
                  📋 Copy
                </button>
              </div>
            </label>
          </div>
        </div>
      )}

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
                      {server.serverKey}
                      <button
                        className="copy-button"
                        onClick={() => handleCopy(server.serverKey, 'Server Key')}
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="key-cell">
                      {server.privateKey}
                      <button
                        className="copy-button"
                        onClick={() => handleCopy(server.privateKey, 'Private Key')}
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() =>
                        setServerDetails((prevDetails) =>
                          prevDetails.filter((_, i) => i !== index)
                        )
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
