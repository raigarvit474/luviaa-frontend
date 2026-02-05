import React, { forwardRef, useEffect, useRef, useState } from 'react';

const Section = forwardRef(({ children, className = "", ...props }, externalRef) => {
    const internalRef = useRef(null);
    const ref = externalRef || internalRef;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Add visible class when element enters viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.2, // Trigger when 20% visible
                rootMargin: '0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return (
        <section
            ref={ref}
            className={`section ${className} ${isVisible ? 'visible' : ''}`}
            {...props}
        >
            {children}
        </section>
    );
});

export default Section;
