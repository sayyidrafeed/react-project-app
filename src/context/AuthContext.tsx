import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'mentor' | 'mentee';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    nim?: string;
    major?: string;
    faculty?: string;
    avatar?: string;
}

export interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    login: (email: string, role: UserRole) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for session
        const storedUser = localStorage.getItem('siera_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('siera_user');
            }
        }
        setIsLoading(false);
        
        // Cleanup function for StrictMode compliance
        return () => {
            // Any cleanup if needed
        };
    }, []);

    const login = async (email: string, role: UserRole) => {
        setIsLoading(true);
        // Simulation delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser: UserProfile = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role,
            nim: role === 'mentee' ? '2010123456' : undefined,
            major: role === 'mentee' ? 'Informatika' : undefined,
            faculty: role === 'mentee' ? 'Teknik' : undefined,
        };

        setUser(mockUser);
        localStorage.setItem('siera_user', JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('siera_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
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
