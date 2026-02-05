import React from 'react';
import Section from './Section';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = (props) => {
    return (
        <Section className="contact-section" {...props}>
            <h2 className="section-title">Get In Touch</h2>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="info-item">
                        <MapPin size={24} color="#10b981" />
                        <p>Canis Lupus, Wolfenden Hall, IIEST Shibpur</p>
                    </div>
                    <div className="info-item">
                        <Phone size={24} color="#10b981" />
                        <p>+91 6294909398</p>
                    </div>
                    <div className="info-item">
                        <Mail size={24} color="#10b981" />
                        <p>luviaa@gmail.com</p>
                    </div>

                    <div className="social-links">
                        <a href="https://www.instagram.com/luviaa_cafe?igsh=MXhhcnc0N3Q0bW1lYQ==" className="social-icon"><Instagram /></a>
                    </div>
                </div>


            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Luvia. All rights reserved.</p>
            </footer>
        </Section>
    );
};

export default Contact;
