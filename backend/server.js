const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for server states (for simplicity)
const servers = [];

// Endpoint to generate keys for a server
app.post('/generate-keys', (req, res) => {
  const { serverName } = req.body;

  if (!serverName) {
    return res.status(400).json({ error: 'Server name is required' });
  }

  // Simulate key generation
  const serverKey = `SK-${Math.random().toString(36).substr(2, 16)}`;
  const privateKey = `PK-${Math.random().toString(36).substr(2, 16)}`;

  // Add the server to the in-memory list
  const newServer = {
    id: servers.length + 1,
    name: serverName,
    status: 'Active',
    serverKey,
    privateKey,
  };
  servers.push(newServer);

  console.log('Generated keys for server:', serverName);
  res.json(newServer);
});

// Endpoint to handle server actions (start/stop)
app.post('/api/server-actions', (req, res) => {
  const { serverId, action } = req.body;

  if (!serverId || !action) {
    return res.status(400).json({ error: 'Server ID and action are required' });
  }

  // Find the server
  const server = servers.find((s) => s.id === serverId);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }

  // Update server status based on action
  if (action === 'start') {
    server.status = 'Active';
  } else if (action === 'stop') {
    server.status = 'Inactive';
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }

  console.log(`Server ${server.name} is now ${server.status}`);
  res.json({ message: `Server ${server.name} is now ${server.status}` });
});

// Endpoint to fetch all servers (optional for debugging)
app.get('/api/servers', (req, res) => {
  res.json(servers);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
