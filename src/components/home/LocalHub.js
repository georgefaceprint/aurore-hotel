
'use client';

import { useUser } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import styles from './LocalHub.module.css';

const LOCAL_UPDATES = {
    'Lusaka': [
        { id: 1, title: 'Road Expansion in Kabwata: Phase 2 Begins', date: '2 hours ago', type: 'Infrastructure' },
        { id: 2, title: 'Town Hall: Water Sanitation Improvement', date: 'Sat, 14:00', type: 'Event' },
        { id: 3, title: 'Youth Entrepreneurship Fund Launch', date: 'Yesterday', type: 'Economy' }
    ],
    'Copperbelt': [
        { id: 4, title: 'New Mining Policy: 5000 Jobs Secured', date: '1 hour ago', type: 'Economy' },
        { id: 5, title: 'Ndola Teaching Hospital Renovation Complete', date: '3 days ago', type: 'Health' },
        { id: 6, title: 'Road Safety Campaign: Kitwe-Chingola', date: 'Ongoing', type: 'Safety' }
    ],
    'Southern': [
        { id: 7, title: 'Tourism Boost: Livingstone Expo 2026', date: 'Today', type: 'Economy' },
        { id: 8, title: 'Drought Relief Distribution in Monze', date: 'Yesterday', type: 'Social Support' },
        { id: 9, title: 'Cattle Vaccination Drive', date: 'Next Week', type: 'Agriculture' }
    ],
    'Western': [
        { id: 10, title: 'Cashew Nut Processing Plant Opens', date: 'Just now', type: 'Agriculture' },
        { id: 11, title: 'Barotse Flood Plains Restoration Project', date: '2 days ago', type: 'Environment' }
    ],
    'Eastern': [
        { id: 12, title: 'Chipata-Mchinji Railway Trade volume up', date: '4 days ago', type: 'Trade' },
        { id: 13, title: 'New Schools Commissioned in Katete', date: 'Last week', type: 'Education' }
    ],
    'Northern': [
        { id: 14, title: 'Kasama Airport Upgrade', date: 'Ongoing', type: 'Infrastructure' },
        { id: 15, title: 'Coffee Harvest Festival', date: 'Coming Soon', type: 'Event' }
    ],
    'Muchinga': [
        { id: 16, title: 'Great North Road Rehabilitation Update', date: 'Yesterday', type: 'Infrastructure' }
    ],
    'Luapula': [
        { id: 17, title: 'Fish Farming Cooperative Grants', date: 'Today', type: 'Economy' }
    ],
    'North-Western': [
        { id: 18, title: 'Sideny Hydro Power Station Talks', date: 'Tuesday', type: 'Energy' }
    ],
    'Central': [
        { id: 19, title: 'Mkushi Farm Block Electrification', date: '1 hour ago', type: 'Energy' }
    ],
    'Default': [
        { id: 99, title: 'National Voter Registration Drive', date: 'Ongoing', type: 'National' },
        { id: 98, title: 'Presidential Address to the Nation', date: 'Friday, 20:00', type: 'Event' }
    ]
};

// Mock MP Data matching (simple hash map for demo)
const MP_DATA = {
    'Kabwata': { name: 'Hon. Andrew Tayengwa', contact: '0211-255555' },
    'Munali': { name: 'Hon. Mike Mposha', contact: '0211-255556' },
    'Matero': { name: 'Hon. Miles Sampa', contact: '0211-255557' },
    'Mandevu': { name: 'Hon. Christopher Shakafuswa', contact: '0211-255558' },
    // ... generic fallback
};

export default function LocalHub() {
    const { user } = useUser();
    const [province, setProvince] = useState('Lusaka'); // Default for guest
    const [updates, setUpdates] = useState([]);
    const [activeMP, setActiveMP] = useState(null);

    useEffect(() => {
        if (user && user.province) {
            setProvince(user.province);
        }
    }, [user]);

    useEffect(() => {
        const data = LOCAL_UPDATES[province] || LOCAL_UPDATES['Default'];
        setUpdates(data);
    }, [province]);

    useEffect(() => {
        if (user && user.constituency) {
            // Simple lookup or generic fallback
            const mp = MP_DATA[user.constituency] || { name: `Hon. MP for ${user.constituency}`, contact: 'Contact Party HQ' };
            setActiveMP(mp);
        } else {
            setActiveMP(null);
        }
    }, [user]);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <span className={styles.label}>Constituency Connect</span>
                        <h2 className={styles.title}>
                            {user ? `Updates for ${user.province}` : `What's happening in ${province}?`}
                        </h2>
                    </div>

                    {!user && (
                        <select
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className={styles.select}
                        >
                            <option>Lusaka</option>
                            <option>Copperbelt</option>
                            <option>Central</option>
                            <option>Southern</option>
                            <option>Eastern</option>
                            <option>Western</option>
                            <option>Northern</option>
                            <option>Luapula</option>
                            <option>North-Western</option>
                            <option>Muchinga</option>
                        </select>
                    )}
                </div>

                <div className={styles.grid}>
                    <div className={styles.mapCard}>
                        <div className={styles.mapVisual}>
                            <span className={styles.pin}>📍</span>
                        </div>
                        <div className={styles.mpInfo}>
                            <h4>{activeMP ? 'Your Representative' : 'Know Your Leader'}</h4>
                            {activeMP ? (
                                <>
                                    <p className={styles.mpName}>{activeMP.name}</p>
                                    <p className={styles.mpContact}>{activeMP.contact}</p>
                                </>
                            ) : (
                                <p>Log in and set your constituency to connect with your MP directly.</p>
                            )}
                            <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                                {activeMP ? 'Message Office' : 'Find My MP'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.updatesList}>
                        {updates.map(update => (
                            <div key={update.id} className={styles.updateItem}>
                                <span className={styles.updateType}>{update.type}</span>
                                <h4 className={styles.updateTitle}>{update.title}</h4>
                                <span className={styles.updateDate}>{update.date}</span>
                            </div>
                        ))}
                        <button className={styles.viewMore}>View All Local News →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
