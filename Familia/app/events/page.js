'use client';
import { useState } from 'react';

export default function EventsPage() {
    const [events, setEvents] = useState([
        { id: 1, title: 'Sifuna Clan Annual Gathering', date: '2026-12-15', location: 'Nairobi Heritage Center', attendance: 85 },
        { id: 2, title: 'Ancestral Mapping Workshop', date: '2026-06-10', location: 'Online (Zoom)', attendance: 200 },
    ]);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>Community Events</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Connect with your heritage through physical and virtual gatherings.</p>

            <div style={{ marginTop: '2rem' }}>
                {events.map(event => (
                    <div key={event.id} className="glass" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{event.title}</h3>
                            <p style={{ margin: '0.4rem 0', color: 'var(--accent)', fontWeight: 'bold' }}>{event.date} • {event.location}</p>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{event.attendance} people attending</p>
                        </div>
                        <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}>
                            RSVP
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass" style={{ marginTop: '2rem', background: 'var(--accent-muted)', border: '1px solid var(--accent)' }}>
                <h4 style={{ margin: 0 }}>Host a Clan Event?</h4>
                <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Clan administrators can host events and activities. Premium event management tools require a <strong>MyHazina Clan Subscription</strong>.</p>
                <a href="https://myhazina.org/funeral-plans" target="_blank" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Upgrade Clan &rarr;
                </a>
            </div>
        </div>
    );
}
