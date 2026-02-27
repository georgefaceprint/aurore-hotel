
'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import styles from './AuthModal.module.css';

export default function AuthModal({ isOpen, onClose }) {
    const { login } = useUser();
    const [formData, setFormData] = useState({ name: '', phone: '', province: 'Lusaka' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.close}>&times;</button>
                <h2 className={styles.title}>Join the Movement 🇿🇲</h2>
                <p className={styles.subtitle}>Create your profile to earn points and track your impact.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Mulenga Banda"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            required
                            placeholder="09..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Province</label>
                        <select
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        >
                            <option>Lusaka</option>
                            <option>Copperbelt</option>
                            <option>Central</option>
                            <option>Eastern</option>
                            <option>Western</option>
                            <option>Southern</option>
                            <option>Northern</option>
                            <option>Luapula</option>
                            <option>North-Western</option>
                            <option>Muchinga</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Constituency (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. Kabwata"
                            value={formData.constituency || ''}
                            onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Create Digital ID
                    </button>
                </form>
            </div>
        </div>
    );
}
