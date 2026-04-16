import React, { useState, useEffect } from 'react';
import './PaperBagPrincessApp.css';

import { fakeProducts } from './fakeProducts';


function PaperBagPrincess() {
  const [timeOnSite, setTimeOnSite] = useState(0);

  // Timer to track time on site
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const discountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="PaperBagApp">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Paper Couture</h1>
        <div className="tagline">By Your Former Princess</div>
      </header>

      {/* Products Grid */}
      <main className="products-container">
        {fakeProducts.map((product) => {
          const isComingSoon = product.image.length <= 2;
          return (
            <div key={product.id} className="product-card">
              {!isComingSoon && (
                <div className="product-badge">
                  -{discountPercentage(product.originalPrice, product.discountedPrice)}%
                </div>
              )}

              <div className="product-image-container">
                {isComingSoon ? (
                  <div className="product-coming-soon">Coming Soon</div>
                ) : (
                  <img src={product.image} alt={product.name} className="product-image" />
                )}
              </div>

              <h3 className="product-name">{product.name}</h3>

              {!isComingSoon && (
                <div className="price-container">
                  <div className="original-price">
                    £{product.originalPrice.toLocaleString()}
                  </div>
                  <div className="discounted-price">
                    £{product.discountedPrice}
                  </div>
                  <div className="urgency-text">
                    {timeOnSite > 30 ? "High Demand" : "Availability: Low"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© Paper Couture 2026</p>
        <p className="small-print">
          *All prices are subject to existential interpretation. Savings may vary based on perspective. Limited availability strictly enforced by market whim.
        </p>
      </footer>
    </div>
  );
}

export { PaperBagPrincess };
