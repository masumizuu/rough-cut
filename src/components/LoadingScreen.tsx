import React from 'react';
import { LoadingScreenProps } from '../types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ percentage = 0, fadeOut = false }) => {
  return (
    <div 
    className={`fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center bg-black transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
        <div className="absolute text-white text-center text-sm font-mono uppercase tracking-widest">
          <div>Loading...</div>
          <div>{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;