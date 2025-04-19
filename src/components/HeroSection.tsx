
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import ReactPlayer from 'react-player/lazy';
import EmojiFloating from './EmojiFloating';

const HeroSection = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  
  const handleStartJourney = () => {
    setShowAudioPlayer(true);
    setShowEmojis(true);
  };
  
  const closeAudioPlayer = () => {
    setShowAudioPlayer(false);
    setShowEmojis(false);
    if (playerRef.current) {
      // Seek to beginning and pause
      playerRef.current.seekTo(0);
    }
  };
  
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center text-white">
      {/* Background gradient matching the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8BA989]/50 to-[#F2C94C]/30"></div>
      
      <div className="container-custom text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
          FIND YOUR <span className="text-[#5D8469]">INNER PEACE</span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90">
          Begin your journey to mindfulness and discover a calmer, more focused you. 
          Our guided practices help you develop awareness and live in the <span className="text-[#5D8469]">present moment</span>.
        </p>
        
        <Button 
          className="bg-[#5D8469] text-white px-8 py-6 rounded-full text-lg transform transition-transform hover:scale-105 hover:bg-[#4A6B53]"
          onClick={handleStartJourney}
        >
          START YOUR JOURNEY
        </Button>
      </div>
      
      {showEmojis && <EmojiFloating />}
      
      {showAudioPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl max-w-md w-full animate-float-up border border-[#5D8469]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                <span className="text-[#5D8469]">MINDFULNESS</span> MEDITATION
              </h3>
              <button 
                onClick={closeAudioPlayer}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-inner">
              <div className="aspect-w-16 aspect-h-9 mb-3">
                <ReactPlayer
                  ref={playerRef}
                  url="https://cdn.pixabay.com/download/audio/2022/03/09/audio_1b0390e27c.mp3?filename=calm-down-114856.mp3"
                  playing={true}
                  controls={true}
                  width="100%"
                  height="50px"
                  config={{
                    file: {
                      forceAudio: true,
                    },
                  }}
                />
              </div>
              
              <p className="text-center mt-4 text-gray-300">
                A calming meditation to help you center your thoughts and find <span className="text-[#5D8469]">peace</span>.
              </p>
            </div>
            
            <p className="text-sm text-gray-400 text-center">
              Let the music guide your meditation practice. Close your eyes and focus on your breath.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

