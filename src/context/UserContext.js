
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for existing user
        const savedUser = localStorage.getItem('zf_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        // Add default gamification stats
        const newUser = {
            ...userData,
            id: 'ZF-' + Math.floor(100000 + Math.random() * 900000),
            points: 50, // Signing up bonus
            rank: 'Bronze Supporter',
            joinedDate: new Date().toLocaleDateString(),
            badges: ['Member']
        };
        setUser(newUser);
        localStorage.setItem('zf_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zf_user');
    };

    const addPoints = (amount) => {
        if (!user) return;
        const updatedUser = { ...user, points: user.points + amount };
        setUser(updatedUser);
        localStorage.setItem('zf_user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, addPoints }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
