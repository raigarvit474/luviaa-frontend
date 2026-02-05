import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import './Hero.css';
const Hero = (props) => {
    return (
        <Section className="hero-section" {...props}>
            <div className="hero-content">
                <h1 className="brand-title">Luviaa</h1>
                <p className="brand-tagline">Engineered with love.</p>
            </div>

            <div className="scroll-indicator">
                <ChevronDown className="bounce" size={24} />
            </div>
        </Section>
    );
};

export default Hero;
