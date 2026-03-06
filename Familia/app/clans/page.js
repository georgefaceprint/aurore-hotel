'use client';
import { useState } from 'react';

export default function ClansPage() {
    const [clans, setClans] = useState([
        { id: 1, name: 'Sifuna Clan', members: 45, protected: false },
        { id: 2, name: 'Hazina Pioneers', members: 120, protected: true },
    ]);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>Explore Clans</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Join your ancestral clan to connect with distant relatives and share history.</p>

            <div style={{ marginTop: '2rem' }}>
                {clans.map(clan => (
                    <div key={clan.id} className="glass" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {clan.name}
                                {clan.protected && <span style={{ fontSize: '0.7rem', background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>HERITAGE PROTECTED</span>}
                            </h3>
                            <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>{clan.members} active members</p>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            {!clan.protected && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0 0 0.2rem 0' }}>✕ No Active Funeral Plan</p>
                                    <a href="https://myhazina.org/funeral-plans" target="_blank" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'underline' }}>
                                        Protect Clan
                                    </a>
                                </div>
                            )}
                            <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '6px' }}>
                                Join Chat
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', padding: '1rem 2rem', borderRadius: '6px', color: 'var(--text-secondary)' }}>
                    Create New Clan
                </button>
            </div>
        </div>
    );
}
