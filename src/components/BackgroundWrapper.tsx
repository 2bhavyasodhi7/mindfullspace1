
import React, { useEffect } from 'react';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  useEffect(() => {
    // The bokeh animation is handled entirely with CSS
    // This effect hook is kept for potential future animations
  }, []);

  return (
    <div className="relative min-h-screen bg-mindful-lighter/40">
      {/* Bokeh background layer with circular gradients */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        {/* Base color */}
        <div className="absolute inset-0 bg-gradient-to-br from-mindful-lighter to-mindful-light/50 opacity-60"></div>
        
        {/* Large bokeh circles */}
        <div className="bokeh-circle large-circle-1"></div>
        <div className="bokeh-circle large-circle-2"></div>
        <div className="bokeh-circle large-circle-3"></div>
        <div className="bokeh-circle large-circle-4"></div>
        <div className="bokeh-circle large-circle-5"></div>
        
        {/* Medium bokeh circles */}
        <div className="bokeh-circle medium-circle-1"></div>
        <div className="bokeh-circle medium-circle-2"></div>
        <div className="bokeh-circle medium-circle-3"></div>
        <div className="bokeh-circle medium-circle-4"></div>
        <div className="bokeh-circle medium-circle-5"></div>
        <div className="bokeh-circle medium-circle-6"></div>
        
        {/* Small bokeh circles */}
        <div className="bokeh-circle small-circle-1"></div>
        <div className="bokeh-circle small-circle-2"></div>
        <div className="bokeh-circle small-circle-3"></div>
        <div className="bokeh-circle small-circle-4"></div>
        <div className="bokeh-circle small-circle-5"></div>
        <div className="bokeh-circle small-circle-6"></div>
        <div className="bokeh-circle small-circle-7"></div>
        <div className="bokeh-circle small-circle-8"></div>
      </div>
      
      {/* Content layer above the bokeh background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
