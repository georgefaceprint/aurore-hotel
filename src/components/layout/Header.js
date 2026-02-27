'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';
import styles from './Header.module.css';

import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import AuthModal from '../auth/AuthModal';

export default function Header() {
    const t = useTranslations('Header');
    const { user } = useUser();
    const [showAuth, setShowAuth] = useState(false);

    return (
        <header className={styles.header}>
            <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.eagle}>🦅</span>
                    <div className={styles.logoText}>
                        <span>ZAMBIA</span>
                        <span className={styles.highlight}>{t('slogan')}</span>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>{t('home')}</Link>
                    <Link href="/leadership" className={styles.link}>{t('leadership')}</Link>
                    <Link href="/news" className={styles.link}>{t('news')}</Link>
                    <Link href="/engage" className={styles.link}>{t('engage')}</Link>
                </nav>

                <div className={styles.actions}>
                    <LanguageSwitcher />
                    <ThemeToggle />
                    {user ? (
                        <Link href="/profile" className={styles.profileLink}>
                            <div className={styles.avatar}>{user.name.charAt(0)}</div>
                            <span>{user.name.split(' ')[0]}</span>
                        </Link>
                    ) : (
                        <button onClick={() => setShowAuth(true)} className="btn btn-primary">{t('join')}</button>
                    )}
                </div>
            </div>
        </header>
    );
}
