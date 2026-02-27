
import Header from '@/components/layout/Header';
import LeaderProfile from '@/components/leadership/LeaderProfile';

const LEADERS = [
    {
        name: 'Dr. Joseph Mutale',
        role: 'Party President',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
        quote: 'Our mission is simple: to build a Zambia where every citizen, regardless of background, has the opportunity to thrive.',
        bio: 'Dr. Mutale is a visionary economist and seasoned public servant with over 20 years of experience in driving sustainable development. His leadership is defined by integrity, inclusivity, and a relentless drive for progress.'
    },
    {
        name: 'Sarah Chilufya',
        role: 'Vice President',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
        quote: 'Empowering women and youth is not just policy; it is the foundation of our nation’s future.',
        bio: 'A champion for social justice and education reform, Sarah Chilufya brings dynamic energy to the party leadership. She has spearheaded numerous initiatives that have positively impacted rural communities across Zambia.'
    }
];

export default function LeadershipPage() {
    return (
        <main>
            <Header />
            <div style={{ paddingTop: '100px', paddingBottom: '80px', background: 'var(--bg-secondary)', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-black-text)' }}>Meet Our <span style={{ color: 'var(--color-green-primary)' }}>Leadership</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                            Dedicated servants of the people, committed to steering Zambia towards a prosperous future.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {LEADERS.map((leader, i) => (
                            <LeaderProfile key={i} {...leader} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
