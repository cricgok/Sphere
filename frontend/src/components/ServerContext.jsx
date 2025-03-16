import React, { createContext, useContext, useState } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [serverDetails, setServerDetails] = useState([]); // Initialize as an empty array

  return (
    <ServerContext.Provider value={{ serverDetails, setServerDetails }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);
