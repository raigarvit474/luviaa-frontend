import React, { useState } from 'react';
import Section from './Section';
import { Star, Loader2 } from 'lucide-react';
import './Reviews.css';



const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    // Fetch reviews from backend
    // Fetch reviews from backend
    React.useEffect(() => {
        let apiUrl = import.meta.env.VITE_API_URL || 'https://luviaa-backend.onrender.com';
        if (apiUrl.endsWith('/')) {
            apiUrl = apiUrl.slice(0, -1);
        }
        console.log("Fetching reviews from:", apiUrl); // DEBUG LOG

        fetch(`${apiUrl}/api/reviews`)
            .then(res => {
                console.log("Response status:", res.status); // DEBUG LOG
                return res.json();
            })
            .then(data => {
                console.log("Reviews data received:", data); // DEBUG LOG
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("Data is not an array:", data); // DEBUG LOG
                }
            })
            .catch(err => console.error("Error fetching reviews:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting review:", newReview); // DEBUG LOG

        if (newReview.name && newReview.comment) {
            try {
                let apiUrl = import.meta.env.VITE_API_URL || 'https://luviaa-backend.onrender.com';
                if (apiUrl.endsWith('/')) {
                    apiUrl = apiUrl.slice(0, -1);
                }
                console.log("Submitting to:", apiUrl); // DEBUG LOG

                const response = await fetch(`${apiUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReview)
                });

                console.log("Submit response status:", response.status); // DEBUG LOG

                if (response.ok) {
                    const savedReview = await response.json();
                    console.log("Review saved:", savedReview); // DEBUG LOG
                    setReviews([savedReview, ...reviews]);
                    setNewReview({ name: '', rating: 5, comment: '' });
                } else {
                    const errorData = await response.json();
                    console.error("Submit failed:", errorData); // DEBUG LOG
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                // Fallback to local state if offline (optional)
                setReviews([{ id: Date.now(), ...newReview }, ...reviews]);
                setNewReview({ name: '', rating: 5, comment: '' });
            }
        } else {
            console.warn("Name or comment missing"); // DEBUG LOG
        }
    };

    return (
        <Section className="reviews-section" {...props}>
            <h2 className="section-title">Customer Love</h2>

            <div className="reviews-container">
                <div className="reviews-list">
                    {loading ? (
                        <div className="reviews-loading">
                            <Loader2 className="loading-spinner" size={48} />
                            <p>Loading reviews...</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "#ffd700" : "none"} color={i < review.rating ? "#ffd700" : "#ddd"} />
                                    ))}
                                </div>
                                <p className="review-comment">"{review.comment}"</p>
                                <h4 className="review-author">- {review.name}</h4>
                            </div>
                        ))
                    )}
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
