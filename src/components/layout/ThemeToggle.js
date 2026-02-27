
'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            setTheme('dark');
            // We don't necessarily need to set attribute if using media query, but for consistency:
            // document.documentElement.setAttribute('data-theme', 'dark'); 
            // Actually, my CSS logic :root:not([data-theme='light']) handles system dark preference automatically 
            // if no attribute is present.
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
