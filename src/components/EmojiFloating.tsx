
import React, { useState, useEffect } from 'react';

interface Emoji {
  id: number;
  symbol: string;
  style: {
    left: string;
    animationDuration: string;
    animationDelay: string;
  };
}

const EmojiFloating = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  
  const meditationEmojis = ["🧘", "✨", "🌿", "💭", "🌸", "🕊️", "☮️", "🌈", "🌙", "💆", "🔮", "🌺"];
  
  useEffect(() => {
    const newEmojis: Emoji[] = [];
    
    for (let i = 0; i < 15; i++) {
      const randomEmoji = meditationEmojis[Math.floor(Math.random() * meditationEmojis.length)];
      const randomLeft = `${Math.random() * 100}%`;
      const randomDuration = `${5 + Math.random() * 10}s`;
      const randomDelay = `${Math.random() * 5}s`;
      
      newEmojis.push({
        id: i,
        symbol: randomEmoji,
        style: {
          left: randomLeft,
          animationDuration: randomDuration,
          animationDelay: randomDelay
        }
      });
    }
    
    setEmojis(newEmojis);
    
    const timeout = setTimeout(() => {
      setEmojis([]);
    }, 15000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute bottom-0 text-2xl animate-emoji-float"
          style={emoji.style}
        >
          {emoji.symbol}
        </div>
      ))}
    </div>
  );
};

export default EmojiFloating;
