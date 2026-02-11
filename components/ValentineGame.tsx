import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameAssets } from '../types';

interface Props {
  assets: GameAssets;
  onYes: () => void;
}

export const ValentineGame: React.FC<Props> = ({ assets, onYes }) => {
  const [noPosition, setNoPosition] = useState({ top: '70%', left: '70%' });
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const jumpNoButton = useCallback(() => {
    if (assets.noJumpSound) {
      const audio = new Audio(assets.noJumpSound);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }

    const randomTop = Math.floor(Math.random() * 60) + 20; 
    const randomLeft = Math.floor(Math.random() * 60) + 20;
    setNoPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  }, [assets.noJumpSound]);

  const playYesHoverSound = useCallback(() => {
    if (assets.yesSound) {
      const sound = new Audio(assets.yesSound);
      sound.volume = 0.7;
      sound.play().catch(() => {});
    }
  }, [assets.yesSound]);

  const checkNoDistance = useCallback((x: number, y: number) => {
    if (noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      // If cursor gets too close to the "No" button, make it jump!
      if (distance < 100) { 
        jumpNoButton();
      }
    }
  }, [jumpNoButton]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      checkNoDistance(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        setCursorPos({ x, y });
        if (!isVisible) setIsVisible(true);
        checkNoDistance(x, y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isVisible, checkNoDistance]);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center p-4 select-none custom-cursor-area overflow-hidden">
      <h1 className="dancing-script text-4xl md:text-7xl text-rose-600 text-center drop-shadow-2xl mb-12 animate-bounce">
        Will you be my valentine?
      </h1>

      <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
        {/* YES BUTTON - LARGE & PRIMARY */}
        <button
          ref={yesButtonRef}
          onClick={onYes}
          onMouseEnter={playYesHoverSound}
          onTouchStart={playYesHoverSound}
          className="group relative flex flex-col items-center justify-center gap-4 bg-white p-4 md:p-6 rounded-[32px] shadow-2xl border-8 border-green-400 hover:scale-110 transition-transform active:scale-95 z-10"
        >
          {assets.couplePhoto && (
            <img 
              src={assets.couplePhoto} 
              alt="Yes" 
              className="w-32 h-32 md:w-56 md:h-56 object-cover rounded-2xl shadow-inner"
            />
          )}
          <span className="text-4xl md:text-6xl font-black text-green-600 uppercase tracking-tighter">YES!</span>
        </button>

        {/* NO BUTTON - SMALL & ELUSIVE */}
        <button
          ref={noButtonRef}
          style={{ 
            position: 'absolute', 
            top: noPosition.top, 
            left: noPosition.left,
            transition: 'all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="group flex flex-col items-center justify-center gap-1 bg-white p-2 rounded-xl shadow-lg border-2 border-rose-300 z-20 pointer-events-none md:pointer-events-auto"
        >
          {assets.sadMeme && (
            <img 
              src={assets.sadMeme} 
              alt="No" 
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
            />
          )}
          <span className="text-sm md:text-lg font-bold text-gray-400">No way</span>
        </button>
      </div>

      {/* Custom Cursor (Girlfriend's Head) */}
      {assets.girlfriendHead && isVisible && (
        <img 
          src={assets.girlfriendHead} 
          alt="Cursor" 
          className="fixed pointer-events-none z-[9999] w-16 h-16 md:w-24 md:h-24 object-cover rounded-full border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          style={{ 
            left: 0,
            top: 0,
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
            willChange: 'transform'
          }}
        />
      )}
    </div>
  );
};