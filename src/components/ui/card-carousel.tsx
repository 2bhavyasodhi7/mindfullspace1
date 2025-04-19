import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

type CardProps = {
  image: string;
  title: string;
  description: string;
  index: number;
  activeIndex: number;
  totalCards: number;
};

const Card = ({ image, title, description, index, activeIndex, totalCards }: CardProps) => {
  const isActive = index === activeIndex;
  const position = index - activeIndex;
  
  // Calculate visibility and position
  const isVisible = Math.abs(position) <= 1;
  let transform = '';
  let zIndex = 0;
  let opacity = 0;
  
  if (isVisible) {
    // Remove the spacing by using 100% instead of 105%
    transform = `translateX(${position * 100}%)`;
    zIndex = 10 - Math.abs(position);
    opacity = 1 - Math.abs(position) * 0.4;
  } else {
    transform = `translateX(${position > 0 ? 200 : -200}%)`;
    zIndex = 0;
    opacity = 0;
  }

  return (
    <div 
      className={cn(
        "absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out",
        "flex items-center justify-center"
      )}
      style={{ 
        transform,
        zIndex,
        opacity
      }}
    >
      <div 
        className={cn(
          // Adjusted width to full to take up all available space
          "w-full mx-auto overflow-hidden relative group",
          "rounded-xl border border-[#FFD700] transition-all duration-300",
          "backdrop-blur-sm bg-opacity-80",
          "shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
          isActive ? "scale-105 shadow-[0_12px_36px_rgba(0,0,0,0.15)]" : "",
          "hover:shadow-[0_15px_40px_rgba(0,0,0,0.18)] hover:translate-y-[-5px]"
        )}
        style={{
          background: `linear-gradient(135deg, #5a7e6b 0%, #6fa883 50%, #8bbd9c 100%)`,
          boxShadow: isActive ? '0 12px 36px rgba(0,0,0,0.15), 0 0 15px rgba(111, 168, 131, 0.3)' : '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        {/* Gold accent line at top */}
        <div className="h-1 w-full bg-[#FFD700] bg-opacity-70"></div>
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20 pointer-events-none"></div>
        
        <div className="p-6 flex flex-col items-center">
          {/* Profile image with circular frame */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FFD700] shadow-lg relative z-10">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="absolute -inset-1 bg-[#FFD700] opacity-20 blur-md rounded-full z-0"></div>
          </div>
          
          {/* Quote icon */}
          <div className="mb-2">
            <Quote className="w-5 h-5 text-[#FFD700] opacity-80" />
          </div>
          
          {/* Title with limited lines */}
          <h3 className="font-sans font-medium text-lg text-center text-white mb-1 line-clamp-2">{title}</h3>
          
          {/* Description with limited lines */}
          <p className="font-sans font-light text-sm text-center text-gray-100 mb-4 line-clamp-4">{description}</p>
          
          {/* Learn more button */}
          <Button 
            variant="outline" 
            className="mt-auto text-xs border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700] hover:border-[#FFD700]"
          >
            Learn More
          </Button>
        </div>
        
        {/* Gold accent dot at bottom */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-[#FFD700]"></div>
      </div>
    </div>
  );
};

type CardCarouselProps = {
  cards: {
    image: string;
    title: string;
    description: string;
  }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

const CardCarousel = ({ 
  cards, 
  autoPlay = true, 
  autoPlayInterval = 3000 
}: CardCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle auto-play
  useEffect(() => {
    if (autoPlay) {
      resetAutoPlayTimer();
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval]);
  
  // Reset auto-play timer
  const resetAutoPlayTimer = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);
  };
  
  // Navigation functions
  const goToPrevious = () => {
    setActiveIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setActiveIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1));
  };
  
  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };
  
  // Mouse and touch event handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };
  
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setIsDragging(false);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full flex flex-col relative">
      {/* Cards container */}
      <div 
        ref={containerRef}
        className="w-full h-[360px] md:h-[380px] relative my-10 overflow-hidden shadow-lg rounded-xl"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Gradient background for carousel */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5a7e6b]/40 to-[#8bbd9c]/40 backdrop-blur-sm"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)',
            backgroundSize: '20px 20px' 
          }} 
        />
        
        {/* Render cards */}
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            index={index}
            activeIndex={activeIndex}
            totalCards={cards.length}
          />
        ))}
        
        {/* Navigation buttons */}
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20 text-gray-800 hover:text-[#6fa883] transition-all"
          onClick={goToPrevious}
          aria-label="Previous card"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20 text-gray-800 hover:text-[#6fa883] transition-all"
          onClick={goToNext}
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-2 mb-6">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex 
                ? 'bg-[#FFD700] w-3 h-3' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { CardCarousel };
