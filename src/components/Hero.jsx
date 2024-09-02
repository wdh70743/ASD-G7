import React from 'react';
import './Hero.css'; 

const Hero = ({ title = "You've got 5 tasks today", subtitle = "Hey John!" }) => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <p className="hero-subtitle">
          {subtitle}
        </p>
        <h1 className="hero-title hero-title-sm-size hero-title-md-size">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
