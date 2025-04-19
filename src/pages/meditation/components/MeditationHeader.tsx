
import React from 'react';
import { Button } from "@/components/ui/button";

const MeditationHeader = () => {
  return (
    <header className="container mx-auto px-4 pt-20 pb-32 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-6xl font-bold text-mindful mb-6 font-ff-yoga">Meditation</h1>
        <p className="text-gray-600 text-lg mb-6 font-raleway">
          Meditation is a journey inward, a practice that allows you to find peace and clarity in the present moment. 
          Through regular meditation, you can reduce stress, improve focus, and cultivate a deeper understanding of yourself.
        </p>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-mindful-light"></div>
          <p className="text-mindful text-lg font-stay-calm">Find your inner peace</p>
          <div className="h-[1px] flex-1 bg-mindful-light"></div>
        </div>
        <Button className="mt-4">Begin Your Practice</Button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img 
          src="src/pages/images/MEDITATION_PAGE_FIRST.jpg"
          alt="Meditation"
          className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </header>
  );
};

export default MeditationHeader;
