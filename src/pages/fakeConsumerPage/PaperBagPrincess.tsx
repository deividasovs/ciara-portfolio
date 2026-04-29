import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PaperBagPrincessApp.css';

import { fakeProducts } from './fakeProducts';


function PaperBagPrincess() {
  const [timeOnSite, setTimeOnSite] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const discountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const renderProductCard = (product: typeof fakeProducts[number]) => {
    const isComingSoon = !product.image;
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

        {!isComingSoon && (
          <>
            <h3 className="product-name">{product.name}</h3>
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
          </>
        )}
      </div>
    );
  };

  return (
    <div className="PaperBagApp">
      <header className="header">
        <h1 className="logo">Paper Couture</h1>
        <div className="tagline">By Your Former Princess</div>
      </header>

      <main className="products-container">
        <div className="sale-badge" aria-label="Flash sale">
          <span>SALE</span>
        </div>

        <div className="character-slot character-slot--princess">
          <img
            src="/assets/images/projects/paperbag-princess/princess-back.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="grid-spacer" aria-hidden="true" />

        {fakeProducts.map(renderProductCard)}
      </main>

      <div className="hero-prince">
        <img
          src="/assets/images/projects/paperbag-princess/prince.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="visit-portfolio-wrap">
        <Link to="/" className="visit-portfolio">
          Enter ciaraburnscostume.com
        </Link>
      </div>

      <footer className="footer">
        <p className="small-print">
          *All prices are subject to existential interpretation. Savings may vary based on perspective. Limited availability strictly enforced by market whim.
        </p>
        <p className="not-a-real-shop">
          P.S.This isn’t a real shop — it’s a concept piece for the Paper Couture project. Nothing here actually for sale.
        </p>
      </footer>
    </div>
  );
}

export { PaperBagPrincess };
