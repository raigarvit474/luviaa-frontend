import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import './MenuSections.css';

// Importing assets for covers
// Importing assets for covers
import cakeJar from '../assets/Choco Sundae cake.png';
import milkShake from '../assets/kitkat-crunch-milkshake.jpeg';
import burger from '../assets/Chicken Burger.PNG';
import roll from '../assets/chicken-roll.jpeg';
import maggie from '../assets/egg-maggie.jpeg';

const categories = [
    { id: 'cake-jars', title: 'Cake Jars', image: cakeJar, desc: 'Layered happiness in a jar.' },
    { id: 'milk-shakes', title: 'Milk Shakes', image: milkShake, desc: 'Creamy, dreamy, and delicious.' },
    { id: 'burgers', title: 'Burgers', image: burger, desc: 'Juicy bites of perfection.' },
    { id: 'rolls', title: 'Rolls', image: roll, desc: 'Flavors wrapped in soft flatbread.' },
    { id: 'maggie', title: 'Maggie', image: maggie, desc: 'Comfort food with a twist.' }
];

const MenuSections = (props) => {
    const navigate = useNavigate();

    const handleCategoryClick = (id) => {
        navigate(`/menu/${id}`);
    };

    return (
        <Section className="menu-sections" id="menu-sections">
            <h2 className="section-title">Explore Our Menu</h2>
            <div className="categories-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.id)}>
                        <div className="card-image">
                            <img src={cat.image} alt={cat.title} />
                            <div className="overlay">
                                <span>View Menu</span>
                            </div>
                        </div>
                        <div className="card-info">
                            <h3>{cat.title}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default MenuSections;
