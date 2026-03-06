'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        tribe: '',
        birthPlace: '',
        birthDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const router = useRouter();

    const tribes = [
        "Kikuyu", "Luhya", "Kalenjin", "Luo", "Kamba", "Kisii", "Meru", "Mijikenda", "Maasai", "Turkana", "Taita"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
            setStep(4);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }} className="glass">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Onboard to Watu.Network</h2>


            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
                {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: step >= s ? 'var(--accent)' : 'var(--border)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem'
                    }}>
                        {s}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h3>Basic Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input name="name" placeholder="First Name" onChange={handleChange} className="input-field" />
                        <input name="surname" placeholder="Surname" onChange={handleChange} className="input-field" />
                        <button onClick={() => setStep(2)} className="btn-primary">Next</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>Heritage & Citizenship</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Currently limited to Kenyan citizens.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <select name="tribe" onChange={handleChange} className="input-field">
                            <option value="">Select Tribe</option>
                            {tribes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input name="clan" placeholder="Clan (e.g. Kaplelach, Anjiru)" onChange={handleChange} className="input-field" />
                        <input name="birthPlace" placeholder="Place of Birth" onChange={handleChange} className="input-field" />
                        <input type="date" name="birthDate" onChange={handleChange} className="input-field" />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                            <button onClick={() => setStep(3)} className="btn-primary">Next</button>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Review Details</h3>
                    <p><strong>Name:</strong> {formData.name} {formData.surname}</p>
                    <p><strong>Tribe:</strong> {formData.tribe}</p>
                    <p><strong>Clan:</strong> {formData.clan}</p>
                    <p><strong>Birthplace:</strong> {formData.birthPlace}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                        <button onClick={() => setStep(2)} className="btn-secondary">Edit</button>
                        <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
                            {loading ? 'Processing...' : 'Complete Onboarding'}
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && result && (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', color: '#22c55e', marginBottom: '1rem' }}>✓</div>
                    <h3>Welcome to Watu.Network!</h3>
                    <p>Your unique Watu.Network ID is:</p>
                    <div style={{
                        background: 'var(--accent-muted)',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        margin: '1.5rem 0'
                    }}>
                        {result.id}
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>Save this code to connect with family members.</p>
                    <button onClick={() => router.push('/connect')} className="btn-primary">Find Family Members</button>
                </div>
            )}

            <style jsx>{`
                .input-field {
                    width: 100%;
                    padding: 0.8rem;
                    border-radius: 8px;
                    border: 1px solid var(--border);
                    background: rgba(255,255,255,0.05);
                    color: white;
                }
                .btn-primary {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    borderRadius: 8px;
                    cursor: pointer;
                    width: 100%;
                }
                .btn-secondary {
                    background: transparent;
                    border: 1px solid var(--border);
                    color: var(--text-secondary);
                    padding: 0.8rem 1.5rem;
                    borderRadius: 8px;
                    cursor: pointer;
                    flex: 1;
                }
            `}</style>
        </div>
    );
}
