'use client';
import { useState } from 'react';

export default function ChatPage() {
    const [view, setView] = useState('chats'); // 'chats' or 'groups'
    const [groups, setGroups] = useState([
        { id: 1, name: 'Sifuna Clan General', type: 'CLAN', members: 45 },
        { id: 2, name: 'Cousins Circle (Nairobi)', type: 'CLOSED', members: 12 },
    ]);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setView('chats')}
                    style={{ background: view === 'chats' ? 'var(--accent)' : 'transparent', border: '1px solid var(--accent)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', cursor: 'pointer' }}
                >
                    Recent Chats
                </button>
                <button
                    onClick={() => setView('groups')}
                    style={{ background: view === 'groups' ? 'var(--accent)' : 'transparent', border: '1px solid var(--accent)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', cursor: 'pointer' }}
                >
                    Family Groups
                </button>
            </div>

            {view === 'chats' && (
                <div className="glass" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    Select a conversation to start chatting.
                </div>
            )}

            {view === 'groups' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2>Closed Family Groups</h2>
                        <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                            + Create Group
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {groups.map(group => (
                            <div key={group.id} className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{group.name}</h3>
                                    <span style={{ fontSize: '0.7rem', background: group.type === 'CLOSED' ? '#a855f7' : '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
                                        {group.type} GROUP
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{group.members} members</p>
                                    <button style={{ background: 'var(--accent-muted)', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', color: 'white' }}>Open</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--accent-muted)', borderRadius: '8px', border: '1px dashed var(--accent)' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                            <strong>Note:</strong> Closed groups are restricted to verified family members within your tree. Admin manages group invitations.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
