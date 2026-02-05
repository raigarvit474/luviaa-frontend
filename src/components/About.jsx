import React from 'react';
import Section from './Section';
import aboutBg from '../assets/about-luviaa-bg.png';
import './About.css';

const About = (props) => {
    return (
        <Section
            className="about-section"
            style={{
                backgroundImage: `url(${aboutBg})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            {...props}
        >
            <div className="about-container">
                <div className="about-image"></div>
                <div className="about-content">
                    <h2>About Luvia</h2>
                    <p>
                        Welcome to Luvia, where every bite is a story and every sip is a memory.
                        We specialize in bringing you the most comforting and exciting flavors.
                    </p>
                    <p>
                        From our signature Maggies that redefine the classic comfort food, to our thick,
                        creamy shakes that are pure indulgence, we craft everything with love and the finest ingredients.
                    </p>
                    <div className="stats">
                        <div className="stat-item">
                            <h3>10+</h3>
                            <span>Varieties</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
