import React from 'react';

function LandingPage() {
  const goToApp = () => {
    window.location.href = '/login';
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to CargoFlow</h1>
        <p>CargoFlow is a comprehensive logistics management system designed to streamline your supply chain operations.</p>
        <div className="features">
          <div className="feature">
            <h2>Real-time Tracking</h2>
            <p>Track your shipments in real-time with our advanced tracking system.</p>
          </div>
          <div className="feature">
            <h2>Efficient Management</h2>
            <p>Manage carriers, warehouses, and inventory with ease.</p>
          </div>
          <div className="feature">
            <h2>Comprehensive Reporting</h2>
            <p>Generate detailed reports to make data-driven decisions.</p>
          </div>
        </div>
        <button className="cta-button" onClick={goToApp}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;