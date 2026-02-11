import React, { useMemo } from 'react';

const HEARTS = ['❤️', '💖', '💝', '💕', '💗', '💓', '✨', '🌸', '💘', '💌', '🌹', '💎'];

export const HeartBackground: React.FC = () => {
  const heartElements = useMemo(() => {
    // Increased to 350 to fully saturate the page
    return Array.from({ length: 350 }).map((_, i) => {
      const size = Math.random() * 1.6 + 0.3; // Varied sizes (0.3rem to 1.9rem)
      const left = Math.random() * 100; // Starting point across the width
      const floatDuration = Math.random() * 15 + 10; // Varied vertical speeds (10s to 25s)
      const swayDuration = Math.random() * 6 + 4; // Horizontal roaming speed
      const swayWidth = Math.random() * 120 + 40; // Increased horizontal drift range
      const delay = Math.random() * 25; // Large negative delay to scatter them initially
      const emoji = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const maxOpacity = Math.random() * 0.4 + 0.1; // Varying transparency
      
      // Randomly decide direction: up or down
      const direction = Math.random() > 0.5 ? 'float-up' : 'float-down';
      
      // Use blur for depth-of-field effect on smaller hearts
      const blur = size < 0.7 ? 'blur(1px)' : 'none';
      
      return (
        <div
          key={i}
          className="animate-heart"
          style={{
            left: `${left}%`,
            top: direction === 'float-up' ? 'auto' : '-100px',
            bottom: direction === 'float-up' ? '-100px' : 'auto',
            fontSize: `${size}rem`,
            animationName: direction,
            animationDuration: `${floatDuration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `-${delay}s`,
            '--max-opacity': maxOpacity,
          } as React.CSSProperties}
        >
          <div 
            className="sway-wrapper"
            style={{
              animationDuration: `${swayDuration}s`,
              animationDelay: `-${delay * 0.5}s`,
              '--sway-width': `${swayWidth}px`,
              filter: blur,
            } as React.CSSProperties}
          >
            {emoji}
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-gradient-to-br from-[#fff5f7] via-[#ffe4e9] to-[#fff5f7]">
      {heartElements}
    </div>
  );
};