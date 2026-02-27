
import styles from './LeaderProfile.module.css';

export default function LeaderProfile({ name, role, image, bio, quote }) {
    return (
        <article className={`${styles.profile} card`}>
            <div className={styles.imageGrid}>
                <img src={image} alt={name} className={styles.image} />
                <div className={styles.overlay}>
                    <span className={styles.roleLabel}>{role}</span>
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.name}>{name}</h2>
                <h3 className={styles.role}>{role}</h3>

                {quote && (
                    <blockquote className={styles.quote}>
                        "{quote}"
                    </blockquote>
                )}

                <p className={styles.bio}>{bio}</p>

                <div className={styles.actions}>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-secondary">Read Full Bio</button>
                </div>
            </div>
        </article>
    );
}
