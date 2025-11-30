import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

export const useAuth = () => {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error('useAuth must be used within a LoginProvider');
    }

    return context;
};
