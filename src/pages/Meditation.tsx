
import React from 'react';
import MeditationHeader from './meditation/components/MeditationHeader';
import MeditationOptions from './meditation/components/MeditationOptions';
import MeditationStats from './meditation/components/MeditationStats';

function Meditation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8BA989]/30 to-[#F2C94C]/20">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-mindful-dark flex items-center">
              Meditation Journey
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg">
              Explore mindfulness, reduce stress, and cultivate inner peace with our guided meditation sessions.
            </p>
          </div>
        </div>
        <MeditationOptions />
      </div>
    </div>
  );
}

export default Meditation;
