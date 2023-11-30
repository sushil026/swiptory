import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/auth/profile');
        setId(response.data.userId);
        setUsername(response.data.username);
      } catch (error) {
        // Handle error, e.g., log it or set default values
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, selectedCategory, setSelectedCategory }}>
      {children}
    </UserContext.Provider>
  );
}
