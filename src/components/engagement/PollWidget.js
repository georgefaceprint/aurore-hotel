
'use client';

import { useState } from 'react';
import styles from './PollWidget.module.css';

export default function PollWidget({ question, options }) {
    const [selected, setSelected] = useState(null);
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
        if (selected !== null) {
            setVoted(true);
            // Here you would typically send the vote to the backend
        }
    };

    return (
        <div className={`${styles.widget} card`}>
            <h3 className={styles.question}>{question}</h3>

            {!voted ? (
                <div className={styles.options}>
                    {options.map((option, i) => (
                        <label key={i} className={`${styles.option} ${selected === i ? styles.selected : ''}`}>
                            <input
                                type="radio"
                                name="poll"
                                value={i}
                                onChange={() => setSelected(i)}
                                className={styles.radio}
                            />
                            <span className={styles.text}>{option.label}</span>
                        </label>
                    ))}
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '16px' }}
                        disabled={selected === null}
                        onClick={handleVote}
                    >
                        Vote Now
                    </button>
                </div>
            ) : (
                <div className={styles.results}>
                    {options.map((option, i) => (
                        <div key={i} className={styles.resultItem}>
                            <div className={styles.resultHeader}>
                                <span>{option.label}</span>
                                <span>{option.percentage}%</span>
                            </div>
                            <div className={styles.barBg}>
                                <div
                                    className={styles.barFill}
                                    style={{ width: `${option.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    <p className={styles.thankYou}>Thank you for your voice!</p>
                </div>
            )}
        </div>
    );
}
