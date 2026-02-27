
import Header from '@/components/layout/Header';
import PollWidget from '@/components/engagement/PollWidget';
import QuizCard from '@/components/engagement/QuizCard';

export default function EngagePage() {
    const sampleOptions = [
        { label: 'Agriculture & Food Security', percentage: 45 },
        { label: 'Education & Skills', percentage: 30 },
        { label: 'Healthcare Access', percentage: 15 },
        { label: 'Infrastructure', percentage: 10 },
    ];

    return (
        <main>
            <Header />
            <div style={{ paddingTop: '100px', paddingBottom: '80px', background: 'var(--bg-secondary)', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Your Voice <span style={{ color: 'var(--color-orange-highlight)' }}>Matters</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                            Participate in shaping our platform. Join the discussion and help us prioritize what matters most to you.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                        {/* Poll Section */}
                        <div>
                            <h2 style={{ marginBottom: '24px', fontSize: '1.75rem' }}>Weekly Poll</h2>
                            <PollWidget
                                question="Which sector should be the top priority for the next budget?"
                                options={sampleOptions}
                            />

                            <div style={{ marginTop: '40px' }}>
                                <QuizCard />
                            </div>
                        </div>

                        {/* Volunteer Section (Placeholder for now) */}
                        <div className="card" style={{ padding: '32px' }}>
                            <h2 style={{ marginBottom: '24px', fontSize: '1.75rem' }}>Volunteer With Us</h2>
                            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Join thousands of Zambians who are dedicating their time to build a better future.
                                Whether you can knock on doors, make calls, or help online, we need you.
                            </p>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-light)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-light)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-light)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <button className="btn btn-primary">Sign Up to Volunteer</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
