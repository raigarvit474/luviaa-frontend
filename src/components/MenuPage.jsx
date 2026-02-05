import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import './MenuPage.css';

// Import Assets
import chickenBurger from '../assets/Chicken Burger.PNG';
import eggChickenBurger from '../assets/Egg Chicken Burger.PNG';
import vegBurger from '../assets/veg-burger.jpg';
import chocoSundae from '../assets/Choco Sundae cake.png';
import biscoffMuse from '../assets/biscoff muse cake.png';
import mangoSundae from '../assets/mango-sundae-cake.png';
import chickenRoll from '../assets/chicken-roll.jpeg';
import paneerRoll from '../assets/paneer-roll.jpg';
import eggMaggie from '../assets/egg-maggie.jpeg';
import vegMaggie from '../assets/veg-maggie.png';
import kitkatShake from '../assets/kitkat-crunch-milkshake.jpeg';
import mangoShake from '../assets/mango-bliss-milkshake.png';
import biscoffMuseBg from '../assets/biscoff-moose-bg.png';
import cheeseMaggie from '../assets/cheese-maggie.png';
import cheeseMaggieBg from '../assets/cheese-maggie-bg.png';
import chickenRollBg from '../assets/chicken-roll-bg.png';
import paneerRollBg from '../assets/paneer-roll-bg.png';
import eggMaggieBg from '../assets/egg-maggie-bg.png';
import vegMaggieBg from '../assets/veg-maggie bg.png';
import chickenBurgerBg from '../assets/chicken-burger-bg.png';
import eggChickenBurgerBg from '../assets/egg-chicken-burger-bg.png';
import vegBurgerBg from '../assets/veg-burger-bg.png';
import kitkatShakeBg from '../assets/kitkat-crunch-shake-bg.jpeg';
import oreoShakeBg from '../assets/oreo-shake-bg.jpeg';
import mangoBg from '../assets/mango-bg.png';
import coldCoffee from '../assets/cold-coffee.jpeg';
import coldCoffeeBg from '../assets/cold-coffee-bg.jpeg';
import oreoShakeImg from '../assets/oreo-shake.jpeg';
import chocoSundaeBg from '../assets/choco-sundae-cakejar-bg.jpeg';

const menuData = {
    'burgers': [
        { id: 1, title: "Chicken Burger", color: "#ef4444", image: chickenBurger, desc: "Classic juicy chicken patty burger.", bgImage: chickenBurgerBg },
        { id: 2, title: "Egg Chicken Burger", color: "#f97316", image: eggChickenBurger, desc: "Chicken burger topped with a fried egg.", bgImage: eggChickenBurgerBg },
        { id: 3, title: "Veg Burger", color: "#4ade80", image: vegBurger, desc: "Delicious vegetarian patty with fresh veggies.", bgImage: vegBurgerBg },
    ],
    'cake-jars': [
        { id: 1, title: "Choco Sundae", color: "#3e2723", image: chocoSundae, desc: "Rich chocolate cake with sundae vibes.", bgImage: chocoSundaeBg },
        { id: 2, title: "Biscoff Mousse", color: "#d7ccc8", image: biscoffMuse, desc: "Creamy biscoff flavored mousse.", bgImage: biscoffMuseBg },
        { id: 3, title: "Mango Sundae", color: "#fbc02d", image: mangoSundae, desc: "Tropical mango delight in a jar.", bgImage: mangoBg },
    ],
    'milk-shakes': [
        { id: 1, title: "Kitkat Crunch", color: "#3e2723", image: kitkatShake, desc: "Crunchy Kitkat blended with milk.", bgImage: kitkatShakeBg },
        { id: 2, title: "Oreo Shake", color: "#212121", image: oreoShakeImg, desc: "Classic Oreo goodness blended to perfection.", bgImage: oreoShakeBg },
        { id: 3, title: "Mango Bliss", color: "#fbc02d", image: mangoShake, desc: "Sweet and refreshing mango shake.", bgImage: mangoBg },
        { id: 4, title: "Cold Coffee", color: "#4e342e", image: coldCoffee, desc: "Chilled brewed coffee with a creamy texture.", bgImage: coldCoffeeBg },
    ],
    'rolls': [
        { id: 1, title: "Chicken Roll", color: "#f97316", image: chickenRoll, desc: "Spiced chicken wrapped in soft flatbread.", bgImage: chickenRollBg },
        { id: 2, title: "Paneer Roll", color: "#fb8c00", image: paneerRoll, desc: "Grilled paneer with veggies in a roll.", bgImage: paneerRollBg },
    ],
    'maggie': [
        { id: 1, title: "Egg Maggie", color: "#fbc02d", image: eggMaggie, desc: "Classic Maggie with egg.", bgImage: eggMaggieBg },
        { id: 2, title: "Veg Maggie", color: "#4ade80", image: vegMaggie, desc: "Loaded with fresh vegetables.", bgImage: vegMaggieBg },
        { id: 3, title: "Cheese Maggie", color: "#fbc02d", image: cheeseMaggie, desc: "Cheesy delight for maggie lovers.", bgImage: cheeseMaggieBg },
    ]
};

// Default items (fall back to burgers or specials)
const defaultItems = menuData.burgers;

const MenuPage = () => {
    const { category } = useParams();
    const [activeIndex, setActiveIndex] = useState(0); // Start at 0 for smaller arrays
    const [items, setItems] = useState(defaultItems);

    useEffect(() => {
        if (category && menuData[category]) {
            setItems(menuData[category]);
            setActiveIndex(0); // Reset to 0
        }
    }, [category]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    };

    const lastScrollTime = React.useRef(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, items]); // Re-bind when activeIndex changes to ensure closure has latest state

    // Mouse Wheel / Trackpad Scroll Navigation
    const handleWheel = (e) => {
        const now = Date.now();
        if (now - lastScrollTime.current < 500) return; // 500ms Throttle

        // Detect substantial scroll
        if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
            if (e.deltaY > 0 || e.deltaX > 0) {
                // Scroll Down/Right -> Next
                handleNext();
            } else {
                // Scroll Up/Left -> Prev
                handlePrev();
            }
            lastScrollTime.current = now;
        }
    };

    // Touch / Swipe Navigation
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrev();
        }
    };

    const baseRotation = (2 - activeIndex) * 45;
    const currentItem = items[activeIndex];

    return (
        <div
            className="menu-container"
            style={{
                backgroundColor: currentItem.color,
                backgroundImage: currentItem.bgImage ? `url(${currentItem.bgImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            onWheel={handleWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Link to="/" state={{ scrollTo: 'menu-sections' }} className="home-link">
                <ArrowLeft size={32} color="white" />
            </Link>

            <div className="content-area">
                <h2 className="category-header">{category ? category.toUpperCase() : 'MENU'}</h2>
            </div>

            <div className="wheel-container" style={{ transform: `translateX(-50%) rotate(${baseRotation}deg)` }}>
                <div className="wheel-border"></div>
                {items.map((item, index) => {
                    const angle = (index - 2) * 45;
                    // Counter rotate image to keep it upright
                    const counterRotation = -1 * (baseRotation + angle);

                    return (
                        <div
                            key={item.id}
                            className={`wheel-item ${index === activeIndex ? 'active' : ''}`}
                            style={{ transform: `rotate(${angle}deg) translateY(-450px)` }} // Adjusted for new radius (500px - padding)
                        >
                            <div className="wheel-image-container" style={{ transform: `translateX(-50%) rotate(${counterRotation}deg)` }}>
                                <img src={item.image} alt={item.title} className="wheel-image" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="center-display">
                <h1 className="center-title">{currentItem.title}</h1>
                <p className="center-desc">{currentItem.desc}</p>
            </div>

            <div className="controls">
                <button onClick={handlePrev}><ChevronLeft size={40} /></button>
                <div className="indicator-dots">
                    {items.map((_, idx) => (
                        <div key={idx} className={`ind-dot ${idx === activeIndex ? 'active' : ''}`} />
                    ))}
                </div>
                <button onClick={handleNext}><ChevronRight size={40} /></button>
            </div>
        </div>
    );
};

export default MenuPage;

