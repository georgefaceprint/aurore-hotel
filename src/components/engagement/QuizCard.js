
'use client';

import { useState } from 'react';

const QUIZ_DATA = {
    question: "When did Zambia gain independence?",
    options: [
        "1960",
        "1964",
        "1972",
        "1980"
    ],
    correct: 1 // Index of correct answer
};

export default function QuizCard() {
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (index) => {
        setSelected(index);
        setShowResult(true);
    };

    return (
        <div className="card" style={{ padding: '32px', background: 'linear-gradient(135deg, #FFF5E6 0%, white 100%)', border: '1px solid var(--color-orange-highlight)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-gray-900)' }}>Know Your History</h3>
                <span style={{ fontSize: '1.5rem' }}>🇿🇲</span>
            </div>

            <p style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: '500' }}>{QUIZ_DATA.question}</p>

            <div style={{ display: 'grid', gap: '12px' }}>
                {QUIZ_DATA.options.map((option, index) => {
                    let style = {
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: 'white',
                        fontWeight: '500',
                        textAlign: 'left'
                    };

                    if (showResult) {
                        if (index === QUIZ_DATA.correct) {
                            style.background = 'var(--color-green-primary)';
                            style.color = 'white';
                            style.borderColor = 'var(--color-green-primary)';
                        } else if (index === selected && index !== QUIZ_DATA.correct) {
                            style.background = 'var(--color-red-accent)';
                            style.color = 'white';
                            style.borderColor = 'var(--color-red-accent)';
                        } else {
                            style.opacity = 0.5;
                        }
                    } else {
                        style[':hover'] = { borderColor: 'var(--color-orange-highlight)' }; // Note: inline styles don't support pseudo-classes like this, this is just logic representation
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !showResult && handleSelect(index)}
                            style={style}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {showResult && (
                <div style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600', animation: 'fadeIn 0.5s' }}>
                    {selected === QUIZ_DATA.correct ? (
                        <span style={{ color: 'var(--color-green-dark)' }}>Correct! 🎉 1964 is the year.</span>
                    ) : (
                        <span style={{ color: 'var(--color-red-accent)' }}>Not quite. The answer is 1964.</span>
                    )}
                </div>
            )}
        </div>
    );
}
