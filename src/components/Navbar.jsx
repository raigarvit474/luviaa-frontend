import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import dinnerLogo from '../assets/dinner-logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = document.querySelector('.snap-container');
            if (container) {
                // Check internal scroll of container
                setIsScrolled(container.scrollTop > 50);
            } else {
                // Fallback for window scroll
                setIsScrolled(window.scrollY > 50);
            }
        };

        const container = document.querySelector('.snap-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        const container = document.querySelector('.snap-container');

        if (element && container) {
            // Temporarily disable scroll snap for smooth custom scroll
            container.style.scrollSnapType = 'none';
            element.scrollIntoView({ behavior: 'smooth' });

            // Re-enable snap after animation
            setTimeout(() => {
                container.style.scrollSnapType = 'y mandatory';
            }, 800);
        } else if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
                <img src={dinnerLogo} alt="Luviaa Logo" className="nav-logo-img" />
            </div>

            <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                <li onClick={() => scrollToSection('hero')}><span className="nav-link">Home</span></li>
                <li onClick={() => scrollToSection('about')}><span className="nav-link">About</span></li>
                <li onClick={() => scrollToSection('menu-sections')}><span className="nav-link">Menu</span></li>
                <li onClick={() => scrollToSection('reviews')}><span className="nav-link">Reviews</span></li>
                <li onClick={() => scrollToSection('contact')}><span className="nav-link">Contact</span></li>
            </ul>
        </nav>
    );
};

export default Navbar;
