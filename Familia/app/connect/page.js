'use client';
import { useState } from 'react';

export default function ConnectPage() {
    const [search, setSearch] = useState({ name: '', surname: '', tribe: '', uniqueId: '' });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myId, setMyId] = useState(''); // In a real app, this would be the logged-in user's ID

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = new URLSearchParams(search).toString();
        try {
            const res = await fetch(`/api/connect?${params}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (relativeId, relationship) => {
        if (!myId) {
            alert("Please enter your Watu.Network ID first (top right)");
            return;
        }
        try {
            const res = await fetch('/api/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ personId: myId, relativeId, relationship })
            });
            const data = await res.json();
            if (data.success) {
                alert(`Connected! Trees are automatically updated.`);
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Connection failed");
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <div style={{ float: 'right', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem' }}>Acting as ID:</span>
                <input
                    placeholder="Your ID"
                    value={myId}
                    onChange={e => setMyId(e.target.value)}
                    style={{ background: 'var(--accent-muted)', border: 'none', padding: '0.4rem', borderRadius: '4px', color: 'white', width: '120px' }}
                />
            </div>

            <h1>Find Family Members</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Search by name, tribe, or unique alpha-numeric code to connect.</p>

            <form onSubmit={handleSearch} className="glass" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>First Name</label>
                    <input className="search-input" value={search.name} onChange={e => setSearch({ ...search, name: e.target.value })} />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Surname</label>
                    <input className="search-input" value={search.surname} onChange={e => setSearch({ ...search, surname: e.target.value })} />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Tribe</label>
                    <input className="search-input" value={search.tribe} onChange={e => setSearch({ ...search, tribe: e.target.value })} />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Clan</label>
                    <input className="search-input" value={search.clan} onChange={e => setSearch({ ...search, clan: e.target.value })} />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Unique ID</label>
                    <input className="search-input" value={search.uniqueId} onChange={e => setSearch({ ...search, uniqueId: e.target.value })} />
                </div>
                <button type="submit" className="search-btn" disabled={loading}>
                    {loading ? '...' : 'Search'}
                </button>
            </form>

            <div style={{ marginTop: '3rem' }}>
                {results.length > 0 ? (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {results.map(person => (
                            <div key={person.id} className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{person.name} {person.surname}</h3>
                                    <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {person.tribe} • {person.clan || 'No Clan'} • {person.birthPlace}
                                    </p>
                                    <code style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>{person.id}</code>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        className="rel-select"
                                        id={`rel-${person.id}`}
                                    >
                                        <option value="PARENT_OF">is my Child</option>
                                        <option value="CHILD_OF">is my Parent</option>
                                        <option value="SIBLING_OF">is my Sibling</option>
                                        <option value="SPOUSE_OF">is my Spouse</option>
                                    </select>
                                    <button
                                        className="connect-btn"
                                        onClick={() => {
                                            const rel = document.getElementById(`rel-${person.id}`).value;
                                            handleConnect(person.id, rel);
                                        }}
                                    >
                                        Connect
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        No family members found. Try broadening your search.
                    </div>
                )}
            </div>

            <style jsx>{`
                .search-input {
                    width: 100%;
                    padding: 0.6rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--border);
                    border-radius: 4px;
                    color: white;
                }
                .search-btn {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 0.6rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .rel-select {
                    background: var(--accent-muted);
                    color: white;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 4px;
                }
                .connect-btn {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
