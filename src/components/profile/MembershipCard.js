
'use client';

import styles from './MembershipCard.module.css';

export default function MembershipCard({ user }) {
    if (!user) return null;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.eagle}>🦅</span>
                    <span className={styles.partyName}>ZAMBIA FORWARD</span>
                </div>

                <div className={styles.content}>
                    <div className={styles.photoPlaceholder}>
                        {user.name.charAt(0)}
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.name}>{user.name}</h3>
                        <p className={styles.rank}>{user.rank}</p>
                        <div className={styles.meta}>
                            <span>ID: {user.id}</span>
                            <span>•</span>
                            <span>{user.province}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.qrPlaceholder}>
                        {/* Abstract QR Code look */}
                        <div className={styles.qrPattern}></div>
                    </div>
                    <div className={styles.points}>
                        <span className={styles.pointsLabel}>IMPACT POINTS</span>
                        <span className={styles.pointsValue}>{user.points}</span>
                    </div>
                </div>

                {/* Holographic overlay effect */}
                <div className={styles.hologram}></div>
            </div>
        </div>
    );
}
