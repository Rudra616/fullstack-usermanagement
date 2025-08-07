// AuthProvider.jsx
import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userRole, setUserRole] = useState(null); // Initially null

  // Sync from localStorage on first load
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
      console.log("✅ Restored userRole from localStorage:", savedRole); // ADD THIS

    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
