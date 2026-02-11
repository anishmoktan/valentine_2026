
import React, { useEffect, useState } from 'react';
import { GameAssets } from '../types';
import { RefreshCw, Heart } from 'lucide-react';
import { Confetti } from './Confetti';

interface Props {
  assets: GameAssets;
  onRestart: () => void;
}

export const SuccessView: React.FC<Props> = ({ assets, onRestart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <Confetti />
      
      <div 
        className={`
          relative bg-white max-w-sm w-full rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] 
          transition-all duration-700 ease-out p-5 flex flex-col items-center text-center
          ${showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
        `}
      >
        <div className="absolute -top-3 -left-3 bg-rose-500 text-white p-2 rounded-full shadow-md animate-bounce">
          <Heart fill="currentColor" size={20} />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-rose-500 text-white p-2 rounded-full shadow-md animate-bounce" style={{ animationDelay: '0.2s' }}>
          <Heart fill="currentColor" size={20} />
        </div>

        <div className="w-full mb-4 relative group">
          <div className="absolute inset-0 bg-rose-100 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
          {assets.congratsImage && (
            <img 
              src={assets.congratsImage} 
              alt="Success" 
              className="relative w-full max-h-[160px] md:max-h-[200px] object-cover rounded-xl border-2 border-white shadow-sm transform group-hover:rotate-1 transition-transform"
            />
          )}
        </div>

        <div className="space-y-2 mb-6">
          <h2 className="dancing-script text-3xl md:text-4xl text-rose-600 leading-tight">
            You have made the right choice!
          </h2>
          <div className="h-0.5 w-12 bg-rose-100 mx-auto rounded-full"></div>
          <p className="text-gray-500 text-sm md:text-base font-medium px-2">
            Everything is better when we're together.
            <br />
            <span className="text-rose-400 font-bold block mt-1 text-lg animate-pulse">
              Happy Valentine's Day! ❤️
            </span>
          </p>
        </div>

        <button 
          onClick={onRestart}
          className="group flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg font-black text-base hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-100 active:scale-95 hover:scale-105"
        >
          <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};
