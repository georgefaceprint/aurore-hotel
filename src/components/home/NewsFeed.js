
import ShareButton from '@/components/common/ShareButton';
import styles from './NewsFeed.module.css';

const MOCK_NEWS = [
    {
        id: 1,
        category: 'Campaign',
        date: 'Oct 12, 2025',
        title: 'Nationwide Rally: "Unity for Progress" Kicks Off in Lusaka',
        image: 'https://images.unsplash.com/photo-1540910419868-4749459ae6c8?auto=format&fit=crop&q=80',
        summary: 'Thousands gathered at the National Heroes Stadium as the party leadership unveiled the new economic roadmap.'
    },
    {
        id: 2,
        category: 'Policy',
        date: 'Oct 10, 2025',
        title: 'New Agriculture Subsidies Proposed for Small Scale Farmers',
        image: 'https://images.unsplash.com/photo-1625246333195-5519a4950a43?auto=format&fit=crop&q=80',
        summary: 'A bold step towards food security: The party proposes a 40% increase in fertilizer support for rural districts.'
    },
    {
        id: 3,
        category: 'Youth',
        date: 'Oct 08, 2025',
        title: 'Tech Innovation Hubs to be Established in Every Province',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
        summary: 'Empowering the next generation: A commitment to digital literacy and job creation for Zambian youth.'
    }
];

export default function NewsFeed() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>Latest <span className={styles.highlight}>Updates</span></h2>
                    <button className="btn btn-secondary">View All News</button>
                </div>

                <div className={styles.grid}>
                    {MOCK_NEWS.map((news) => (
                        <article key={news.id} className={`${styles.card} card`}>
                            <div className={styles.imageWrapper}>
                                {/* In a real app, use Next.js Image */}
                                <img src={news.image} alt={news.title} className={styles.image} />
                                <span className={styles.category}>{news.category}</span>
                            </div>
                            <div className={styles.content}>
                                <span className={styles.date}>{news.date}</span>
                                <h3 className={styles.title}>{news.title}</h3>
                                <p className={styles.summary}>{news.summary}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <a href={`/news/${news.id}`} className={styles.readMore}>Read Full Story →</a>
                                    <ShareButton title={news.title} url={`https://zambiaforward.com/news/${news.id}`} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
