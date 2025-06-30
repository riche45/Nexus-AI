import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  totalSaved: number;
  subscriptions: any[];
  onboardingComplete: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(current => current ? { ...current, ...updates } : null);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        updateUser, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}