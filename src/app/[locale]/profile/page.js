
'use client';

import { useUser } from '@/context/UserContext';
import MembershipCard from '@/components/profile/MembershipCard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function ProfilePage() {
    const { user, logout } = useUser();
    const router = useRouter();

    useEffect(() => {
        // If not logged in, redirect home
        if (!user && typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('zf_user');
            if (!savedUser) router.push('/');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className={styles.main}>
            <div className="container">
                <h1 className={styles.title}>My Supporter Profile</h1>

                <MembershipCard user={user} />

                <div className={styles.grid}>
                    <div className={styles.section}>
                        <h2>My Impact</h2>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>{user.points}</span>
                                <span className={styles.statLabel}>Points</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>0</span>
                                <span className={styles.statLabel}>Referrals</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>1</span>
                                <span className={styles.statLabel}>Badges</span>
                            </div>
                        </div>

                        <div className={styles.referral}>
                            <h3>Your Referral Link</h3>
                            <div className={styles.referralBox}>
                                <code>zambiaforward.com/join?ref={user.name.split(' ')[0].toLowerCase()}{user.id.slice(-4)}</code>
                                <button className={styles.copyBtn} onClick={() => alert('Link copied!')}>Copy</button>
                            </div>
                        </div>

                        <div className={styles.history}>
                            <h3>Recent Activity</h3>
                            <ul className={styles.historyList}>
                                <li>
                                    <span className={styles.historyIcon}>🎉</span>
                                    <div className={styles.historyInfo}>
                                        <span className={styles.historyTitle}>Joined the Movement</span>
                                        <span className={styles.historyDate}>{user.joinedDate || 'Today'}</span>
                                    </div>
                                    <span className={styles.historyPoints}>+50 pts</span>
                                </li>
                                {user.constituency && (
                                    <li>
                                        <span className={styles.historyIcon}>📍</span>
                                        <div className={styles.historyInfo}>
                                            <span className={styles.historyTitle}>Registered in {user.constituency}</span>
                                            <span className={styles.historyDate}>Today</span>
                                        </div>
                                        <span className={styles.historyPoints}>+20 pts</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className={styles.actions}>
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
                                Invite Friends (+50 pts)
                            </button>
                            <button className="btn btn-secondary" style={{ width: '100%' }}>
                                Donate Again (+100 pts)
                            </button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>My Badges</h2>
                        <div className={styles.badges}>
                            <div className={styles.badge}>
                                <span className={styles.badgeIcon}>🎖️</span>
                                <span>Founding Member</span>
                            </div>
                        </div>

                        <div className={styles.skills}>
                            <h3>Volunteer Skills</h3>
                            <p className={styles.skillsDesc}>Select how you can help (Earn +10 pts each)</p>
                            <div className={styles.skillTags}>
                                {['Social Media', 'Event Organizing', 'Door-to-Door', 'Design', 'Transport'].map(skill => (
                                    <button key={skill} className={styles.skillTag}>
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => { logout(); router.push('/'); }} className={styles.logout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
