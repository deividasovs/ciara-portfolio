import React, { useState, useEffect } from 'react';
import './PaperBagPrincessApp.css';

import { fakeProducts } from './fakeProducts';


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

  // Escalating harassment based on time (Slowed down to 45s intervals)
  useEffect(() => {
    // Level 1: Initial banner at 10s
    if (timeOnSite === 10) {
      setBannerMessage("Limited Time Offer — Up to 70% Off Select Styles");
    }

    // Level 2: Aggressive banner at 20s
    if (timeOnSite === 20) {
      setBannerMessage("Final Hours — Archive Sale Ends Soon");
    }

    // Level 3: Exclusive banner at 35s
    if (timeOnSite === 35) {
      setBannerMessage("Exclusive Pricing — One Time Only");
    }

    // Recurring popups every 45 seconds
    if (timeOnSite > 0 && timeOnSite % 45 === 0) {
      const messages = [
        "Join the Haute Mess Club—news, drops, and chaos straight to your inbox.",
        "These prices won't last. Consider adding to cart.",
        "Market adjustments are frequent. Act accordingly.",
      ];
      showMessage(messages[Math.floor((timeOnSite / 45) - 1) % messages.length]);
    }

    // Level 4: Cursor follower activates at 60s (was 30s)
    if (timeOnSite === 60) {
      setCursorFollower({ x: 0, y: 0, show: true });
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
    <div className="PaperBagApp">
      {/* Decorative Minimalist Fragments */}
      <div className="paper-fragment fragment-1" />
      <div className="paper-fragment fragment-2" />

      {/* Floating Banner */}
      {bannerMessage && (
        <div className="floating-banner">
          {bannerMessage}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <h1 className="logo">Paper Couture</h1>
        <div className="tagline">By Your Former Princess</div>
        <button className="cart-badge" onClick={() => showMessage("Your cart is currently under review.")}>
          Cart ({cartCount})
        </button>
      </header>

      {/* Sub-banner (Refined) */}
      <div className="sub-banner">
        <span>Curated Selection</span>
        <span>Archive Value</span>
        <span>Limited Edition</span>
      </div>

      {/* Products Grid */}
      <main className="products-container">
        {fakeProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card ${shakingElement === product.id ? 'shake' : ''}`}
          >
            <div className="product-badge">
              -{discountPercentage(product.originalPrice, product.discountedPrice)}%
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
              <div className="urgency-text">
                {timeOnSite > 30 ? "High Demand" : "Availability: Low"}
              </div>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
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
              Continue
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

      {/* Minimal Status Label instead of Sales Lady */}
      <div className="sales-lady">
        Personal Shopper: Online
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© Paper Couture 2024</p>
        <p className="small-print">
          *All prices are subject to existential interpretation. Savings may vary based on perspective. Limited availability strictly enforced by market whim.
        </p>
        <p className="manifesto">
          Refined Consumption / Satirical Archive
        </p>
      </footer>
    </div>
  );
}

export { PaperBagPrincess };
