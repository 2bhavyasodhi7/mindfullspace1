
import React from 'react';

const WhatIsMindfulness = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-mindful-lighter via-white to-amber-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 nike-headline">
              WHAT IS <span className="bg-gradient-to-r from-mindful to-amber-500 bg-clip-text text-transparent nike-highlight">MINDFULNESS?</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 nike-body-text">
              Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
            </p>
            
            <div className="mindful-card p-8 rounded-lg shadow-lg border-l-4 border-gradient-to-r from-mindful to-amber-400 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2 nike-quote">
                "THE PRESENT MOMENT IS THE ONLY TIME OVER WHICH WE HAVE <span className="bg-gradient-to-r from-mindful to-amber-500 bg-clip-text text-transparent">DOMINION</span>."
              </p>
              <p className="text-right text-gray-600 dark:text-gray-400 nike-quote-author">
                - THÍCH NHẤT HẠNH
              </p>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="absolute -inset-4 bg-gradient-to-r from-mindful/10 to-amber-400/10 blur-lg rounded-xl"></div>
            <img 
              src="https://images.pexels.com/photos/4498216/pexels-photo-4498216.jpeg" 
              alt="Person meditating" 
              className="relative rounded-xl shadow-xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMindfulness;
