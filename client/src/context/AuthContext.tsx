'use client';

import React, { createContext, useContext, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials, logout as logoutAction, setUser, setLoading } from '@/redux/features/authSlice';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { DEFAULT_TOKEN_KEY } from '@/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      Cookies.set(DEFAULT_TOKEN_KEY, tokenFromUrl, { expires: 7 });
      localStorage.setItem(DEFAULT_TOKEN_KEY, tokenFromUrl);
      router.replace('/dashboard');
    }

    const fetchUser = async () => {
      const token = Cookies.get(DEFAULT_TOKEN_KEY) || localStorage.getItem(DEFAULT_TOKEN_KEY);
      if (token) {
        dispatch(setLoading(true));
        try {
          const response = await api.get('/auth/profile');
          dispatch(setUser(response.data));
          // Sync token to cookie if it's only in localStorage
          if (!Cookies.get(DEFAULT_TOKEN_KEY)) {
            Cookies.set(DEFAULT_TOKEN_KEY, token, { expires: 7 });
          }
        } catch (error) {
          Cookies.remove(DEFAULT_TOKEN_KEY);
          localStorage.removeItem(DEFAULT_TOKEN_KEY);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch, searchParams, router]);

  const login = (token: string, userData: User) => {
    Cookies.set(DEFAULT_TOKEN_KEY, token, { expires: 7 });
    dispatch(setCredentials({ user: userData, token }));
    router.push('/dashboard');
  };

  const logout = () => {
    Cookies.remove(DEFAULT_TOKEN_KEY);
    dispatch(logoutAction());
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
