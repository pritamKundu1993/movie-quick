import { createContext, useState, useEffect } from 'react';
import { USERS } from '../data/Users';

// Create Context
export const LoginContext = createContext();

// LoginProvider Component
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('authToken');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (email, password) => {
        const foundUser = USERS.find((u) => u.email === email && u.password === password);

        if (foundUser) {
            const token = btoa(
                JSON.stringify({
                    id: foundUser.id,
                    email: foundUser.email,
                    role: foundUser.role,
                    timestamp: Date.now(),
                })
            );

            const userObj = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                role: foundUser.role,
                avatar: foundUser.avatar,
                phone: foundUser.phone,
                joinedDate: foundUser.joinedDate,
            };

            setUser(userObj);
            setIsAuthenticated(true);

            localStorage.setItem('currentUser', JSON.stringify(userObj));
            localStorage.setItem('authToken', token);

            return {
                success: true,
                user: userObj,
                message: 'Login successful',
            };
        }

        return {
            success: false,
            message: 'Invalid email or password',
        };
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    };

    // Check if user is admin
    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    // Get token
    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    // Update user profile
    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
        getToken,
        updateProfile,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
