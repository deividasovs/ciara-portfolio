import React, { useState, useEffect } from 'react';
import './PaperBagPrincessApp.css';

import { Product, fakeProducts } from './fakeProducts';


function PaperBagPrincess() {
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [bannerMessage, setBannerMessage] = useState('');
  const [cursorFollower, setCursorFollower] = useState<{ x: number, y: number, show: boolean }>({ x: 0, y: 0, show: false });
  const [shakingElement, setShakingElement] = useState<number | null>(null);

  // Timer to track time on site
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Escalating harassment based on time
  useEffect(() => {
    // Level 1: After 5 seconds - first popup
    if (timeOnSite === 5) {
      showMessage("Exclusive Collection. Available Now.");
    }

    // Level 2: After 10 seconds - banner appears
    if (timeOnSite === 10) {
      setBannerMessage("Limited Time Offer — Up to 99% Off Select Styles");
    }

    // Level 3: After 15 seconds - desperate popup
    if (timeOnSite === 15) {
      showMessage("These prices won't last. Consider adding to cart.");
    }

    // Level 4: After 20 seconds - aggressive banner
    if (timeOnSite === 20) {
      setBannerMessage("Final Hours — Archive Sale Ends Soon");
    }

    // Level 5: After 25 seconds - very desperate
    if (timeOnSite === 25) {
      showMessage("Perhaps you'd like to reconsider? Unprecedented values.");
    }

    // Level 6: After 30 seconds - cursor follower activates
    if (timeOnSite === 30) {
      setCursorFollower({ x: 0, y: 0, show: true });
      showMessage("We notice you're still browsing. May we assist?");
    }

    // Level 7: After 35 seconds
    if (timeOnSite === 35) {
      setBannerMessage("Exclusive Pricing — One Time Only");
    }

    // Level 8: After 40 seconds - complete chaos
    if (timeOnSite === 40) {
      showMessage("This is rather unusual. These prices are historically low.");
    }

    // Random popups after 45 seconds
    if (timeOnSite > 45 && timeOnSite % 7 === 0) {
      const messages = [
        "Your cart awaits completion.",
        "Consider the value proposition.",
        "Others are viewing these items.",
        "Complimentary shipping on all orders.",
        "Limited availability. Act accordingly.",
        "These reductions are significant.",
        "Rare opportunity. Time sensitive.",
      ];
      showMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [timeOnSite]);

  // Cursor follower after 30 seconds
  useEffect(() => {
    if (cursorFollower.show) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorFollower({ x: e.clientX, y: e.clientY, show: true });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [cursorFollower.show]);

  const showMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const addToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
    setShakingElement(productId);
    setTimeout(() => setShakingElement(null), 500);

    const messages = [
      "Excellent selection. Consider completing the look.",
      "Added to cart. Perhaps explore complementary pieces?",
      "Wise choice. Our collection offers more.",
      "One piece selected. Build your wardrobe.",
      "Added. Continue shopping for optimal value.",
    ];
    showMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const discountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="pbp-app-wrapper">
      {/* Floating Banner */}
      {bannerMessage && (
        <div className="floating-banner">
          {bannerMessage}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <h1 className="logo">Consume Now</h1>
        <div className="tagline">Curated Collection</div>
        <div className="cart-badge">
          Cart: {cartCount}
          {cartCount === 0 && " — Empty"}
        </div>
      </header>

      {/* Aggressive Sub-banner */}
      <div className="sub-banner">
        <span className="blink">Archive Sale</span>
        <span className="pulse">Exceptional Values</span>
        <span className="blink">Limited Time</span>
      </div>

      {/* Time pressure indicator */}
      {timeOnSite > 20 && (
        <div className="pressure-timer">
          Browsing for {timeOnSite} seconds — Prices subject to change
        </div>
      )}

      {/* Products Grid */}
      <main className="products-container">
        {fakeProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card ${shakingElement === product.id ? 'shake' : ''} ${timeOnSite > 35 ? 'desperate' : ''}`}
          >
            <div className="product-badge">
              {discountPercentage(product.originalPrice, product.discountedPrice)}% OFF!
            </div>

            <div className="product-image-container">
              {product.image.length <= 2 ? (
                <div className="product-emoji">{product.image}</div>
              ) : (
                <img src={product.image} alt={product.name} className="product-image" />
              )}
            </div>

            <h3 className="product-name">{product.name}</h3>

            <div className="price-container">
              <div className="original-price">
                ${product.originalPrice.toLocaleString()}
              </div>
              <div className="discounted-price">
                ${product.discountedPrice}
              </div>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>

            {timeOnSite > 30 && (
              <div className="urgency-text">
                {Math.floor(Math.random() * 3) + 1} viewing now
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            <div className="popup-message">{popupMessage}</div>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Cursor Follower */}
      {cursorFollower.show && (
        <div
          className="cursor-follower"
          style={{
            left: `${cursorFollower.x}px`,
            top: `${cursorFollower.y}px`
          }}
        />
      )}

      {/* Animated Sales Lady */}
      <div className="sales-lady">
        <div className="speech-bubble">
          <div className="speech-bubble-text">
            Don't miss out!
            <span className="speech-bubble-emphasis">99% OFF!</span>
          </div>
        </div>
        <div className="lady-character">💃</div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Authentic Value</p>
        <p className="small-print">
          * Original prices may be aspirational. Savings are a matter of perspective.
        </p>
        <p className="manifesto">
          Satire — Consume Mindfully
        </p>
      </footer>
    </div>
  );
}

export { PaperBagPrincess };
