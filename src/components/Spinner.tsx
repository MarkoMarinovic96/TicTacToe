import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-12 h-12"></div>
    </div>
  );
};
