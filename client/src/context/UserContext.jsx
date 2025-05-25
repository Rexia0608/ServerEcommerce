import { createContext, useState } from 'react';

// Create and export the context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Export both UserContext and UserProvider as default
export { UserContext, UserProvider };
