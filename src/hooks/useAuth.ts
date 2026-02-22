import { useState } from 'react';

interface AuthUser {
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('healthsync-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    const u = { email, name: email.split('@')[0] };
    localStorage.setItem('healthsync-user', JSON.stringify(u));
    setUser(u);
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    const u = { email, name };
    localStorage.setItem('healthsync-user', JSON.stringify(u));
    setUser(u);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('healthsync-user');
    setUser(null);
  };

  return { user, login, register, logout, isAuthenticated: !!user };
}
