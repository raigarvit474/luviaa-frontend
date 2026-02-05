import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import MenuSections from './components/MenuSections';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import MenuPage from './components/MenuPage';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import './App.css';

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const { state, hash } = useLocation();

  useEffect(() => {
    // Scroll to specific section if requested via state or hash
    const scrollToTarget = () => {
      const container = document.querySelector('.snap-container');
      if (!container) return;

      let targetId = null;
      if (state?.scrollTo) {
        targetId = state.scrollTo;
      } else if (hash) {
        targetId = hash.replace('#', '');
      }

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          // Temporarily disable scroll snap to allow smooth scrolling without fighting
          container.style.scrollSnapType = 'none';

          const topPos = element.offsetTop;
          container.scrollTo({
            top: topPos,
            behavior: 'auto' // Instant jump to avoid scroll conflicts
          });

          // Re-enable scroll snap after animation completes (approx 500-800ms)
          setTimeout(() => {
            container.style.scrollSnapType = 'y mandatory';
          }, 1000);
        }
      }
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(scrollToTarget, 100);
    return () => clearTimeout(timer);
  }, [state, hash]);

  useEffect(() => {
    const container = document.querySelector('.snap-container');

    const handleScroll = () => {
      if (!container) return;

      const sections = document.querySelectorAll('.section');
      const scrollPos = container.scrollTop + window.innerHeight / 2;
      const root = document.documentElement;

      sections.forEach((section) => {
        // Since sections are inside the container, their offsetTop is relative to the container
        // if the container is positioned.
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          sectionTop <= scrollPos &&
          sectionTop + sectionHeight > scrollPos
        ) {
          if (section.classList.contains('hero-section')) root.style.setProperty('--bg-color', 'var(--hero-bg)');
          if (section.classList.contains('about-section')) root.style.setProperty('--bg-color', 'var(--about-bg)');
          if (section.classList.contains('menu-sections')) root.style.setProperty('--bg-color', 'var(--menu-bg)');
          if (section.classList.contains('reviews-section')) root.style.setProperty('--bg-color', 'var(--review-bg)');
          if (section.classList.contains('contact-section')) root.style.setProperty('--bg-color', 'var(--contact-bg)');
        }
      });
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Trigger once on load
      handleScroll();
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="snap-container">
      <Navbar />
      <Hero id="hero" />
      <About id="about" />
      <MenuSections id="menu-sections" />
      <Reviews id="reviews" />
      <Contact id="contact" />
      {loading && <Loader onComplete={() => setLoading(false)} />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:category" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
