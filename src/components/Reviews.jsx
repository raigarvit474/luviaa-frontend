import React, { useState } from 'react';
import Section from './Section';
import { Star } from 'lucide-react';
import './Reviews.css';



const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    // Fetch reviews from backend
    React.useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/reviews`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setReviews(data);
                }
            })
            .catch(err => console.error("Error fetching reviews:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newReview.name && newReview.comment) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${apiUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReview)
                });

                if (response.ok) {
                    const savedReview = await response.json();
                    setReviews([savedReview, ...reviews]);
                    setNewReview({ name: '', rating: 5, comment: '' });
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                // Fallback to local state if offline (optional)
                setReviews([{ id: Date.now(), ...newReview }, ...reviews]);
                setNewReview({ name: '', rating: 5, comment: '' });
            }
        }
    };

    return (
        <Section className="reviews-section" {...props}>
            <h2 className="section-title">Customer Love</h2>

            <div className="reviews-container">
                <div className="reviews-list">
                    {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "#ffd700" : "none"} color={i < review.rating ? "#ffd700" : "#ddd"} />
                                ))}
                            </div>
                            <p className="review-comment">"{review.comment}"</p>
                            <h4 className="review-author">- {review.name}</h4>
                        </div>
                    ))}
                </div>

                <div className="review-form-container">
                    <h3>Add Your Review</h3>
                    <form onSubmit={handleSubmit} className="review-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            required
                        />
                        <div className="rating-input">
                            <span>Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    fill={star <= newReview.rating ? "#ffd700" : "none"}
                                    color={star <= newReview.rating ? "#ffd700" : "#ddd"}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                        <textarea
                            placeholder="Your Comments"
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
        </Section>
    );
};

export default Reviews;
