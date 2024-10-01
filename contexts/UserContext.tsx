'use client';

import React, { createContext, useContext, useState } from 'react';

// Définissez l'interface pour l'utilisateur
type User = {
  id: string;
  name: string;
  email: string;
};

// Définissez l'interface pour le contexte
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Créez le contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

// Créez un hook personnalisé pour utiliser le contexte
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Créez le provider du contexte
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};