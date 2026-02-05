import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        // Wait for a bit before starting the exit animation
        const timer = setTimeout(() => {
            setAnimating(true);
        }, 2000); // Show usage for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleAnimationEnd = () => {
        if (animating && onComplete) {
            onComplete();
        }
    };

    return (
        <div
            className={`loader-container ${animating ? 'slide-up' : ''}`}
            onTransitionEnd={handleAnimationEnd}
        >
            <div className="loader-text">Luviaa</div>
        </div>
    );
};

export default Loader;
