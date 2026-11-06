import React, { useState, useRef } from 'react';
import { AuthContext } from './auth-context';
import { ASSETS } from '../types';

export function AuthProvider({ children }) {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');

  // Separate auth state — the admin console is a fully gated site.
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const [role, setRole] = useState(() =>
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') ? 'admin' : 'member'
  ); // 'member' | 'admin'
  const [userName, setUserName] = useState('Hein Htet Kyaw');
  const [userAvatar, setUserAvatar] = useState(ASSETS.avatar);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState('Hein Htet Kyaw');
  const fileInputRef = useRef(null);

  const isAdmin = role === 'admin';
  const toggleRole = () => setRole((prev) => (prev === 'admin' ? 'member' : 'admin'));

  return (
    <AuthContext.Provider
      value={{
        authEmail,
        setAuthEmail,
        authPassword,
        setAuthPassword,
        authConfirmPassword,
        setAuthConfirmPassword,
        adminLoggedIn,
        setAdminLoggedIn,
        role,
        setRole,
        isAdmin,
        toggleRole,
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        isEditingProfile,
        setIsEditingProfile,
        tempName,
        setTempName,
        fileInputRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
