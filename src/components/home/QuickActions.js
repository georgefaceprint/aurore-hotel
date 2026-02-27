import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './QuickActions.module.css';

export default function QuickActions() {
    const t = useTranslations('QuickActions');

    const actions = [
        {
            title: t('donate_title'),
            description: t('donate_desc'),
            icon: '💝',
            link: '/join',
            variant: 'primary'
        },
        {
            title: t('vote_title'),
            description: t('vote_desc'),
            icon: '🗳️',
            link: '/join',
            variant: 'secondary'
        },
        {
            title: t('engage_title'),
            description: t('engage_desc'),
            icon: '📅',
            link: '/engage',
            variant: 'secondary'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={`container ${styles.grid}`}>
                {actions.map((action, i) => (
                    <Link key={i} href={action.link} className={`${styles.card} card`}>
                        <div className={styles.icon}>{action.icon}</div>
                        <h3 className={styles.title}>{action.title}</h3>
                        <p className={styles.description}>{action.description}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
