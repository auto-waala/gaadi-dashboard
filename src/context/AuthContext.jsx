// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Initialize auth state
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            const authenticated = authService.isAuthenticated();
            
            setUser(currentUser);
            setIsAuthenticated(authenticated);
            setLoading(false);
        };
        
        initAuth();
    }, []);

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
    };

    const googleLogin = async (googleData) => {
        const response = await authService.googleLogin(googleData);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const changePassword = async (data) => {
        await authService.changePassword(data);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        authService.updateUserData(updatedUser);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated,
            login,
            register,
            googleLogin,
            logout,
            changePassword,
            updateUser,
            sendVerificationOtp: authService.sendVerificationOtp,
            verifyOtp: authService.verifyOtp,
            forgotPassword: authService.forgotPassword,
            resetPassword: authService.resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};