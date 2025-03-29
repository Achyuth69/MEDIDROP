
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define user types
export type UserRole = 'patient' | 'doctor' | 'pharmacy' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

// Define context value type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Context provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for saved user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('medidrop-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('medidrop-user');
      }
    }
    setLoading(false);
  }, []);

  // Mock user data (replace with actual API calls in production)
  const mockUsers = [
    { id: 'p1', name: 'John Patient', email: 'patient@example.com', password: 'password', role: 'patient' },
    { id: 'd1', name: 'Dr. Jane', email: 'doctor@example.com', password: 'password', role: 'doctor' },
    { id: 'ph1', name: 'MediPharm', email: 'pharmacy@example.com', password: 'password', role: 'pharmacy' },
  ];

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as UserRole,
        token: `mock-jwt-token-${foundUser.id}`,
      };
      
      setUser(userData);
      localStorage.setItem('medidrop-user', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      });
    } else {
      // For demo purposes, we'll just pretend to create a new user
      const newUserId = `${role[0]}${mockUsers.length + 1}`;
      const userData: User = {
        id: newUserId,
        name,
        email,
        role,
        token: `mock-jwt-token-${newUserId}`,
      };
      
      setUser(userData);
      localStorage.setItem('medidrop-user', JSON.stringify(userData));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medidrop-user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
