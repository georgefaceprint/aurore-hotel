import { useTranslations } from 'next-intl';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    const t = useTranslations('Hero');

    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={`container ${styles.content}`}>
                <span className={`${styles.badge} animate-fade-in`}>{t('badge')}</span>
                <h1 className={`${styles.title} animate-fade-in`}>
                    {t('title_start')} <span className={styles.highlight}>{t('title_highlight')}</span> {t('title_end')}
                </h1>
                <p className={`${styles.subtitle} animate-fade-in`}>
                    {t('subtitle')}
                </p>
                <div className={`${styles.ctaGroup} animate-fade-in`}>
                    <button className="btn btn-primary">{t('volunteer')}</button>
                    <button className="btn btn-secondary">{t('manifesto')}</button>
                </div>
            </div>

            {/* Abstract Background Element - Zambian Flag Colors */}
            <div className={styles.abstractShape}></div>
        </section>
    );
}
