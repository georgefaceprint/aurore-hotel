
'use client';

export default function ShareButton({ title, url }) {
    const handleShare = () => {
        const text = `Check out this update from Zambia Forward: ${title} - ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button
            onClick={handleShare}
            className="btn"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#25D366', // WhatsApp Green
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginTop: '16px'
            }}
        >
            <span>Share</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 13.522a6.59 6.59 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
            </svg>
        </button>
    );
}
