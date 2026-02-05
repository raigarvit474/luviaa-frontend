import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { Link } from 'react-router-dom';

const sectionsData = [
    { id: 1, title: "Passionate Red", color: "#FF4500", content: "Feel the energy and passion." },
    { id: 2, title: "Tranquil Blue", color: "#1E90FF", content: "Experience the calm and depth." },
    { id: 3, title: "Vibrant Green", color: "#32CD32", content: "Connect with nature and growth." },
    { id: 4, title: "Royal Purple", color: "#8A2BE2", content: "Embrace creativity and luxury." },
];

function LandingPage() {
    const [backgroundColor, setBackgroundColor] = useState(sectionsData[0].color);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.indexOf(entry.target);
                    if (index !== -1) {
                        setBackgroundColor(sectionsData[index].color);
                    }
                }
            });
        }, observerOptions);

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            if (sectionRefs.current) {
                sectionRefs.current.forEach((ref) => {
                    if (ref) observer.unobserve(ref);
                });
            }
        };
    }, []);

    return (
        <div className="app-container" style={{ backgroundColor: backgroundColor }}>
            <nav className="fixed-nav">
                <ul>
                    <li><Link to="/menu" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Go to Menu</Link></li>
                    {sectionsData.map((section, index) => (
                        <li key={section.id}>
                            <button
                                onClick={() => {
                                    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <main>
                {sectionsData.map((section, index) => (
                    <Section
                        key={section.id}
                        ref={el => sectionRefs.current[index] = el}
                    >
                        <div className="content-wrapper">
                            <h1>{section.title}</h1>
                            <p>{section.content}</p>
                        </div>
                    </Section>
                ))}
            </main>
        </div>
    );
}

export default LandingPage;
