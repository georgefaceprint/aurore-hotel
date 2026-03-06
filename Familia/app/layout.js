import './globals.css';
import PWAInstaller from '../components/PWAInstaller';

export const viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata = {
    title: 'Watu.Network - Trace Your Heritage',
    description: 'A global collaborative family tree tracing connections and heritage.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body>
                <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Watu.Network</h2>
                    <div>
                        <a href="/" style={{ marginRight: '1.5rem' }}>Tree</a>
                        <a href="/connect" style={{ marginRight: '1.5rem' }}>Connect</a>
                        <a href="/events" style={{ marginRight: '1.5rem' }}>Events</a>
                        <a href="/profile" style={{ marginRight: '1.5rem' }}>My Profile</a>
                        <a href="https://myhazina.org" target="_blank" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>MyHazina</a>
                    </div>
                </nav>
                <main className="container">
                    {children}
                </main>
                <PWAInstaller />
            </body>
        </html>
    );
}
