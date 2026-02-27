
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function JoinPage() {
    const [activeTab, setActiveTab] = useState('membership');

    return (
        <main>
            <Header />
            <div style={{
                paddingTop: '120px',
                paddingBottom: '80px',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, white 100%)',
                minHeight: '100vh'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Join the <span style={{ color: 'var(--color-green-primary)' }}>Movement</span></h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                            Become a card-carrying member or support the cause with a donation.
                            Together, we build a stronger Zambia.
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '40px'
                    }}>
                        <button
                            className={`btn ${activeTab === 'membership' ? 'btn-primary' : ''}`}
                            style={{
                                background: activeTab === 'membership' ? '' : 'white',
                                border: activeTab === 'membership' ? 'none' : '1px solid var(--border-light)'
                            }}
                            onClick={() => setActiveTab('membership')}
                        >
                            Become a Member
                        </button>
                        <button
                            className={`btn ${activeTab === 'donate' ? 'btn-primary' : ''}`}
                            style={{
                                background: activeTab === 'donate' ? '' : 'white',
                                border: activeTab === 'donate' ? 'none' : '1px solid var(--border-light)'
                            }}
                            onClick={() => setActiveTab('donate')}
                        >
                            Make a Donation
                        </button>
                    </div>

                    <div className="card animate-fade-in" style={{ padding: '40px' }}>
                        {activeTab === 'membership' ? (
                            <form style={{ display: 'grid', gap: '24px' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Membership Registration</h2>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontWeight: '500' }}>First Name</label>
                                        <input type="text" className="input-field" placeholder="Jane" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontWeight: '500' }}>Last Name</label>
                                        <input type="text" className="input-field" placeholder="Doe" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontWeight: '500' }}>NRC / Voter ID</label>
                                    <input type="text" className="input-field" placeholder="123456/10/1" />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontWeight: '500' }}>Province</label>
                                    <select className="input-field">
                                        <option>Lusaka</option>
                                        <option>Copperbelt</option>
                                        <option>Southern</option>
                                        <option>Eastern</option>
                                        {/* Add others */}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontWeight: '500' }}>Phone Number</label>
                                    <input type="tel" className="input-field" placeholder="+260 97..." />
                                </div>

                                <button className="btn btn-primary" type="button" style={{ marginTop: '16px' }}>
                                    Complete Registration
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Support Our Mission</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                                    {['K50', 'K200', 'K500'].map(amount => (
                                        <button key={amount} className="btn" style={{ border: '2px solid var(--color-green-primary)', fontSize: '1.2rem' }}>
                                            {amount}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <input type="number" placeholder="Other Amount (K)" className="input-field" style={{ maxWidth: '200px', textAlign: 'center', marginBottom: '24px' }} />
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Proceed to Payment</button>
                                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Secure payments via Mobile Money & Card
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <style jsx>{`
        .input-field {
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--border-light);
            font-size: 1rem;
            width: 100%;
            transition: border-color 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: var(--color-green-primary);
        }
      `}</style>
        </main>
    );
}
