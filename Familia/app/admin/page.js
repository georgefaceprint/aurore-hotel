'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [stats, setStats] = useState({ users: 0, connections: 0, tribes: 0 });
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from an admin API
        setTimeout(() => {
            setStats({ users: 1240, connections: 850, tribes: 11 });
            setRecentUsers([
                { id: 'FA-XJ92-K5P1', name: 'James', surname: 'Sifuna', tribe: 'Luhya', joined: '2 mins ago' },
                { id: 'FA-KM88-L0Q2', name: 'Mary', surname: 'Wambui', tribe: 'Kikuyu', joined: '15 mins ago' },
                { id: 'FA-TR44-P9I1', name: 'David', surname: 'Ochieng', tribe: 'Luo', joined: '1 hour ago' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>Administration Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>System overview and member management for Kenyan citizens.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="glass" style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: 0, color: 'var(--text-secondary)' }}>Total Members</h4>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.users}</h2>
                </div>
                <div className="glass" style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: 0, color: 'var(--text-secondary)' }}>Relationships</h4>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.connections}</h2>
                </div>
                <div className="glass" style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: 0, color: 'var(--text-secondary)' }}>Tribes Represented</h4>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.tribes}</h2>
                </div>
            </div>

            <h3 style={{ marginTop: '3rem' }}>Recent Onboarded Members</h3>
            <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'var(--accent-muted)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Watu.Network ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Tribe</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentUsers.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}><code style={{ color: 'var(--accent)' }}>{user.id}</code></td>
                                <td style={{ padding: '1rem' }}>{user.name} {user.surname}</td>
                                <td style={{ padding: '1rem' }}>{user.tribe}</td>
                                <td style={{ padding: '1rem' }}><span style={{ background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem' }}>VERIFIED</span></td>
                                <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>{user.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                <button className="admin-btn">Generate System Report</button>
                <button className="admin-btn">Manage Tribe Metadata</button>
                <button className="admin-btn" style={{ background: '#ef4444' }}>Review Flagged Profiles</button>
            </div>

            <style jsx>{`
                .admin-btn {
                    background: var(--accent-muted);
                    color: white;
                    border: 1px solid var(--border);
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
