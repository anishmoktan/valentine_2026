
import React, { useMemo } from 'react';

const COLORS = ['#ff0055', '#ffcc00', '#00ffcc', '#ff00ff', '#ffffff', '#ff88aa'];

export const Confetti: React.FC = () => {
  const pieces = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = Math.random() * 10 + 5;
      const rotation = Math.random() * 360;

      return (
        <div
          key={i}
          className="absolute top-[-20px]"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `fall ${duration}s linear ${delay}s infinite`,
            transform: `rotate(${rotation}deg)`,
            zIndex: 60
          }}
        />
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
      {pieces}
    </div>
  );
};
