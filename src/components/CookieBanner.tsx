import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        // If no consent has been given yet, show the banner
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        window.dispatchEvent(new Event('cookieConsentChange'));
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        window.dispatchEvent(new Event('cookieConsentChange'));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner">
            <p className="cookie-banner-text">
                We use cookies to improve your experience on our site.
            </p>
            <div className="cookie-banner-actions">
                <button className="cookie-banner-btn cookie-banner-decline" onClick={handleDecline}>
                    Decline
                </button>
                <button className="cookie-banner-btn cookie-banner-accept" onClick={handleAccept}>
                    Accept
                </button>
            </div>
        </div>
    );
};
