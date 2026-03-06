import FamilyTree from '@/components/FamilyTree';

export default function HomePage() {
    const sampleData = {
        name: "Nelson Ndlela (Patriarch)",
        children: [
            {
                name: "Thabo Ndlela (Eldest Son)",
                children: [
                    { name: "Sipho Ndlela (Grandson)" },
                    { name: "Nandi Ndlela (Granddaughter)" }
                ]
            },
            {
                name: "Zanele Moyo (Daughter)",
                children: [
                    { name: "Lerato Moyo (Granddaughter)" },
                    {
                        name: "Bheki Moyo (Grandson)",
                        children: [
                            { name: "Thandi Moyo (Great-Granddaughter)" }
                        ]
                    }
                ]
            },
            {
                name: "Kabelo Ndlela (Youngest Son)"
            }
        ]
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1>Welcome to the Global Family Tree</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
                Trace your ancestry, connect with clans, and explore your heritage in our collaborative community.
            </p>

            <div className="glass" style={{ marginTop: '2rem', display: 'inline-block', minWidth: '400px' }}>
                <h3>Get Started</h3>
                <p>Onboard as a citizen or search for relatives to begin your journey.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="/onboard">
                            <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                                Onboard Now
                            </button>
                        </a>
                        <a href="/connect">
                            <button style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.8rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                                Find Relative
                            </button>
                        </a>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <a href="/admin" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>Administration Portal</a>
                        <a href="/chat" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>Family Groups</a>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--accent-muted)', border: '1px dashed var(--accent)', borderRadius: '12px', marginTop: '1.5rem' }}>
                        <h4 style={{ margin: 0 }}>Protect Your Legacy</h4>
                        <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Ensure your family is covered. Join thousands of clans with <strong>MyHazina Funeral Plans</strong>.</p>
                        <a href="https://myhazina.org/funeral-plans" target="_blank" style={{ display: 'inline-block', marginTop: '0.5rem', background: 'var(--accent)', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 'bold' }}>
                            Explore Funeral Plans
                        </a>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
                <FamilyTree data={sampleData} />
            </div>
        </div>
    );
}
