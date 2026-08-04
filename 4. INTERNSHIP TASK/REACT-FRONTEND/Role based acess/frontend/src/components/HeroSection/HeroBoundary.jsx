import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import HeroSection from './HeroSection';

const HeroBoundary = () => {
  return (
    <ErrorBoundary >
      <HeroSection />
    </ErrorBoundary>
  );
};

export default HeroBoundary;
