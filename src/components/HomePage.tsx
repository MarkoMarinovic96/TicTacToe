import React from 'react';

export const HomePage: React.FC = () => {
  const trophyBackground = require('../assets/Logo.webp');

  return (
    <div className="flex justify-center items-center">
      <img className="h-[90vh] mt-6" src={trophyBackground} />
    </div>
  );
};
