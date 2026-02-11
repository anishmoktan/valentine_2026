import React, { useState, useRef } from 'react';
import { ValentineGame } from './components/ValentineGame';
import { SuccessView } from './components/SuccessView';
import { HeartBackground } from './components/HeartBackground';
import { GameAssets, GameState } from './types';
import { INITIAL_ASSETS } from './constants';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [hasInteracted, setHasInteracted] = useState(false);
  const assets = INITIAL_ASSETS;
  
  const mainMusicRef = useRef<HTMLAudioElement | null>(null);
  const successMusicRef = useRef<HTMLAudioElement | null>(null);

  const playAudioSafe = (filename: string | null, ref: React.MutableRefObject<HTMLAudioElement | null>, loop: boolean = false) => {
    if (!filename || filename.trim() === '') return;
    try {
      if (ref.current) {
        ref.current.pause();
        ref.current = null;
      }
      const audio = new Audio(filename);
      audio.loop = loop;
      audio.onerror = () => console.warn("Missing local audio file:", filename);
      ref.current = audio;
      audio.play().catch(e => console.warn("Playback blocked by browser:", e));
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  const startAudio = () => {
    setHasInteracted(true);
    
    // Play the entry sound effect once when site is "opened"
    if (assets.entrySound) {
      const entryAudio = new Audio(assets.entrySound);
      entryAudio.volume = 0.8;
      entryAudio.play().catch(() => {});
    }

    // Start background music loop
    playAudioSafe(assets.backgroundMusic, mainMusicRef, true);
  };

  const winGame = () => {
    if (mainMusicRef.current) mainMusicRef.current.pause();
    setGameState('success');
    
    // We no longer play yesSound here because user wants it on hover only
    // Start the specific victory/success music
    playAudioSafe(assets.successMusic, successMusicRef, true);
  };

  const resetGame = () => {
    if (successMusicRef.current) successMusicRef.current.pause();
    setGameState('playing');
    playAudioSafe(assets.backgroundMusic, mainMusicRef, true);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#fff5f7]">
      <HeartBackground />
      
      {/* Entry Screen to bypass browser autoplay restrictions */}
      {!hasInteracted && (
        <div className="fixed inset-0 z-[100] bg-rose-500 flex flex-col items-center justify-center p-6 text-white text-center">
          <Heart size={80} fill="white" className="animate-pulse mb-8" />
          <h1 className="dancing-script text-5xl md:text-7xl mb-12 drop-shadow-lg">
            Shukriti Lama Vajhu Gurung Tamang <br /> <br />
            You have a special message...
          </h1>
          <button 
            onClick={startAudio}
            className="px-12 py-5 bg-white text-rose-500 rounded-full font-black text-3xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform active:scale-95 border-b-8 border-rose-200"
          >
            OPEN INVITATION
          </button>
        </div>
      )}

      <div className="relative z-10 h-full w-full">
        {gameState === 'playing' && (
          <ValentineGame assets={assets} onYes={winGame} />
        )}

        {gameState === 'success' && (
          <SuccessView assets={assets} onRestart={resetGame} />
        )}
      </div>
    </div>
  );
};

export default App;