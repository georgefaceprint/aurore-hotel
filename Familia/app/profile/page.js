'use client';
import { useState, useRef } from 'react';

export default function ProfilePage() {
    const fileInputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);
    const [profile, setProfile] = useState({
        name: 'Fred',
        birthPlace: '',
        birthYear: '',
        residency: '',
        profession: '',
        clan: ''
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1>My Profile</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Complete your profile to help others find their connection to you.</p>

            <div className="glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'var(--accent-muted, #333)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '3px solid var(--accent, #3b82f6)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            cursor: 'pointer'
                        }}
                        onClick={() => fileInputRef.current.click()}
                    >
                        {profilePic ? (
                            <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: '3rem', color: 'var(--text-secondary, #999)' }}>{profile.name.charAt(0)}</span>
                        )}
                    </div>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        style={{ background: 'transparent', border: '1px solid var(--accent, #3b82f6)', color: 'var(--accent, #3b82f6)', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        {profilePic ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Place of Birth</label>
                        <input
                            type="text"
                            name="birthPlace"
                            value={profile.birthPlace}
                            onChange={handleChange}
                            placeholder="City, Country"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Year of Birth</label>
                        <input
                            type="number"
                            name="birthYear"
                            value={profile.birthYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Current Residence</label>
                    <input
                        type="text"
                        name="residency"
                        value={profile.residency}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Profession</label>
                    <input
                        type="text"
                        name="profession"
                        value={profile.profession}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <button style={{ width: '100%', background: 'var(--accent)', color: 'white', border: 'none', padding: '1rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem' }}>
                    Save Heritage Information
                </button>
            </div>

            <div className="glass" style={{ marginTop: '2rem', border: '1px solid var(--accent-muted)' }}>
                <h3 style={{ color: 'var(--accent)' }}>Heritage Protection</h3>
                <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Your family connections are precious. Link this profile to a <strong>MyHazina Funeral Plan</strong> to ensure your legacy is protected.</p>
                <a href="https://myhazina.org/funeral-plans" target="_blank" style={{ display: 'inline-block', marginTop: '0.5rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                    Link to MyHazina &rarr;
                </a>
            </div>
        </div>
    );
}
