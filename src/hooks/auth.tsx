import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import api from '../services/api';
import jwtDecode from 'jwt-decode';
  
  interface AuthState {
    access_token: string;
    user: User;
  }
  
  interface SignInCredentials {
    email: string;
    password: string;
  }
  
  interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): Promise<void>;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  
  export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      async function loadStorageData(): Promise<void> {
        const [access_token, user] = await AsyncStorage.multiGet([
          '@AllRecords:access_token',
          '@AllRecords:user',
        ]);
  
        if (access_token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${access_token[1]}`;
  
          setData({ access_token: access_token[1], user:JSON.parse(user[1]) });
        }
  
        setLoading(false);
      }
  
      loadStorageData();
    }, []);
  
    const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post('/login', {
        email,
        password,
      });
  
      const { access_token } = response.data;
      const decode = jwtDecode(access_token)
      const  user  = decode._doc

      
      
      await AsyncStorage.multiSet([
        ['@AllRecords:access_token', access_token],
        ['@AllRecords:user', JSON.stringify(user)],
      ]);
  
      api.defaults.headers.authorization = `Bearer ${access_token}`;
  
      setData({ access_token, user });
    }, []);
  
    const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@AllRecords:access_token', '@AllRecords:user']);
  
      setData({} as AuthState);
    }, []);
  
    const updateUser = useCallback(
      async (user: User) => {
        await AsyncStorage.setItem('@AllRecords:user', JSON.stringify(user));
        setData({
          access_token: data.access_token,
          user,
        });
      },
      [setData, data.access_token],
    );
  
    return (
      <AuthContext.Provider
        value={{ user: data.user, loading, signIn, signOut, updateUser }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }