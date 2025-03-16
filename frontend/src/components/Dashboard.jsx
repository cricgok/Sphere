import React, { useState, useEffect } from "react";
import { useServerContext } from "./ServerContext"; // Import context
import "./Dashboard.css";

const Dashboard = () => {
  const { serverDetails, setServerDetails } = useServerContext(); // Access context
  const [loading, setLoading] = useState(false);

  // Fetch server details on mount
  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await fetch("http://localhost:8084/dashboard");
      if (!response.ok) throw new Error("Failed to fetch servers.");
      
      let data = await response.json();

      // ✅ Convert status from 1 → "Active", 0 (or missing) → "Inactive"
      let formattedServers = Object.values(data).map(server => ({
        ...server,
        status: server.status === 1 ? "Active" : "Inactive"
      }));

      setServerDetails(formattedServers);
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  const handleStartStop = async (serverName, action) => {
    try {
      setLoading(true);

      // Convert "start" → "profile", "stop" → "login"
      const endpoint = action === "start" ? "profile" : "login";

      const response = await fetch("http://localhost:8084/ginger/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: serverName, endpoint }),
      });

      const textResponse = await response.text();
      if (!textResponse) throw new Error(`Empty response from server.`);
      
      const responseData = JSON.parse(textResponse);
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to ${action} the server`);
      }

    
      setServerDetails((prevServers) =>
        prevServers.map((server) =>
          server.name === serverName
            ? { ...server, status: action === "start" ? "Active" : "Inactive" }
            : server
        )
      );
    } catch (error) {
      console.error("Error starting/stopping server:", error);
      alert(`Error: ${error.message}`); // Show error message to user
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
          <strong>
            {serverDetails.filter((server) => server.status === "Active").length}
          </strong>{" "}
          Active Servers
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
            </tr>
          </thead>
          <tbody>
            {serverDetails.map((server, index) => (
              <tr key={server.name || index}> {/* ✅ Fix for React warning */}
                <td>{server.name}</td>
                <td className={server.status === "Active" ? "status-active" : "status-inactive"}>
                  {server.status}
                </td>
                <td>
                  {server.status === "Inactive" ? (
                    <button className="action-button start-button" onClick={() => handleStartStop(server.name, "start")}>
                      Start
                    </button>
                  ) : (
                    <button className="action-button stop-button" onClick={() => handleStartStop(server.name, "stop")}>
                      Stop
                    </button>
                  )}
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
