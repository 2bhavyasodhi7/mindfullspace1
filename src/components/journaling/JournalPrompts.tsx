
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define categories and prompts
const PROMPT_CATEGORIES = {
  gratitude: {
    name: "Gratitude",
    prompts: [
      "List three things you're grateful for today and why.",
      "What's something small that brightened your day recently?",
      "Who has helped you in the past week and how did they make a difference?",
      "What aspect of nature are you most thankful for today?",
      "What's a simple pleasure in your daily routine that you appreciate?",
      "What's a challenge you're facing that's actually helping you grow?",
      "What's something you take for granted that many people don't have?",
      "Who is someone that inspires you and what qualities do you admire in them?",
      "What's a skill or ability you have that you're grateful for?",
      "What's something you're looking forward to, and why does it bring you joy?"
    ]
  },
  reflection: {
    name: "Self-Reflection",
    prompts: [
      "What emotion has been most present for you today and why?",
      "What's one thing you'd like to improve about yourself and what steps can you take?",
      "Describe a moment when you felt truly at peace. What elements created that feeling?",
      "What's a belief you held strongly that has changed over time?",
      "What would your younger self think of the person you've become?",
      "What's a habit you've developed that has improved your life?",
      "What's something difficult you're avoiding dealing with?",
      "When did you last feel truly proud of yourself and why?",
      "What's a recurring pattern in your life you'd like to change?",
      "If you could give yourself advice 5 years ago, what would it be?"
    ]
  },
  mindfulness: {
    name: "Mindfulness",
    prompts: [
      "Describe your surroundings right now using all five senses.",
      "What's one thing you noticed today that you usually don't pay attention to?",
      "How does your body feel right now? Notice any areas of tension or comfort.",
      "Describe your breath and how it changes as you focus on it.",
      "What's one activity you could do more mindfully tomorrow?",
      "Describe a moment today when you were fully present, not thinking about past or future.",
      "What sounds can you hear right now? Try to notice even the quietest ones.",
      "How does the air feel on your skin right now?",
      "What colors and shapes are in your field of vision? Notice the details.",
      "What's one routine task you could turn into a mindfulness practice?"
    ]
  },
  stress: {
    name: "Stress Relief",
    prompts: [
      "What's causing you the most stress right now and what's one small step to address it?",
      "List three things within your control and three things beyond your control right now.",
      "What activities help you feel calm? How could you incorporate one tomorrow?",
      "What would you say to a friend experiencing the stress you're feeling now?",
      "What's a worry that's been on your mind? Write it out completely.",
      "What's one boundary you need to establish or maintain for your well-being?",
      "Describe a safe, peaceful place (real or imagined) in detail.",
      "What's something you've been overthinking that you could simplify?",
      "What negative thought patterns do you notice when you're stressed?",
      "What's a self-care practice you've neglected lately that you could restart?"
    ]
  },
  growth: {
    name: "Personal Growth",
    prompts: [
      "What's one small win you've had recently that deserves celebration?",
      "What's a fear you'd like to overcome? What's one tiny step toward facing it?",
      "What's a value that's important to you? How did you honor it today?",
      "What would you attempt if you knew you couldn't fail?",
      "What's a goal you're working toward? What progress have you made?",
      "What's something new you'd like to learn and why?",
      "How have you grown or changed in the past year?",
      "What's a mistake you've made that taught you something valuable?",
      "What's a strength you have that you'd like to develop further?",
      "What brings you a sense of purpose or meaning?"
    ]
  }
};

const JournalPrompts = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('gratitude');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);
  
  // Load favorite prompts from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoritePrompts');
    if (savedFavorites) {
      try {
        setFavoritePrompts(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error loading favorite prompts", e);
      }
    }
    
    const savedUsed = localStorage.getItem('usedPrompts');
    if (savedUsed) {
      try {
        setUsedPrompts(JSON.parse(savedUsed));
      } catch (e) {
        console.error("Error loading used prompts", e);
      }
    }
  }, []);
  
  // Get a random prompt from the selected category
  const getRandomPrompt = () => {
    const category = PROMPT_CATEGORIES[selectedCategory as keyof typeof PROMPT_CATEGORIES];
    const availablePrompts = category.prompts.filter(prompt => !usedPrompts.includes(prompt));
    
    // If all prompts have been used, reset the used prompts
    if (availablePrompts.length === 0) {
      setUsedPrompts([]);
      setCurrentPrompt(category.prompts[Math.floor(Math.random() * category.prompts.length)]);
      return;
    }
    
    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
    setCurrentPrompt(randomPrompt);
    
    // Add to used prompts
    const updatedUsed = [...usedPrompts, randomPrompt];
    setUsedPrompts(updatedUsed);
    localStorage.setItem('usedPrompts', JSON.stringify(updatedUsed));
  };
  
  // Initialize with a random prompt
  useEffect(() => {
    if (!currentPrompt) {
      getRandomPrompt();
    }
  }, [selectedCategory]);
  
  const toggleFavorite = (prompt: string) => {
    let updated;
    if (favoritePrompts.includes(prompt)) {
      updated = favoritePrompts.filter(p => p !== prompt);
      toast({
        title: "Removed from favorites",
        description: "The prompt has been removed from your favorites."
      });
    } else {
      updated = [...favoritePrompts, prompt];
      toast({
        title: "Added to favorites",
        description: "The prompt has been added to your favorites."
      });
    }
    
    setFavoritePrompts(updated);
    localStorage.setItem('favoritePrompts', JSON.stringify(updated));
  };
  
  const usePromptForJournaling = () => {
    // Save the current prompt to localStorage for the journal editor to use
    localStorage.setItem('currentJournalPrompt', currentPrompt);
    
    toast({
      title: "Prompt selected",
      description: "Switch to the Daily Journal tab to start writing based on this prompt."
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left - Category selection */}
      <div className="md:col-span-1">
        <Card className="border-mindful-light">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-mindful-dark">Prompt Categories</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-2">
            {Object.entries(PROMPT_CATEGORIES).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                className={`w-full justify-start ${
                  selectedCategory === key 
                    ? 'bg-mindful text-white' 
                    : 'hover:bg-mindful-lighter hover:text-mindful-dark'
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                {category.name}
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <Card className="border-mindful-light mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-mindful-dark">Favorite Prompts</CardTitle>
          </CardHeader>
          
          <CardContent>
            {favoritePrompts.length === 0 ? (
              <p className="text-center py-4 text-gray-500 text-sm">
                Save your favorite prompts here for easy access
              </p>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                {favoritePrompts.map((prompt, index) => (
                  <div 
                    key={index} 
                    className="p-3 border border-mindful-light rounded-lg text-sm"
                  >
                    <p>{prompt}</p>
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-500 hover:text-red-500"
                        onClick={() => toggleFavorite(prompt)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-mindful"
                        onClick={() => {
                          setCurrentPrompt(prompt);
                          toast({
                            title: "Prompt selected",
                            description: "The favorite prompt has been loaded."
                          });
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Right - Current prompt */}
      <div className="md:col-span-2">
        <Card className="border-mindful-light">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-mindful-dark">
                Today's Prompt
              </CardTitle>
              <Button
                variant="outline"
                className="hover:bg-mindful-lighter hover:text-mindful-dark"
                onClick={getRandomPrompt}
              >
                New Prompt
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              From: {PROMPT_CATEGORIES[selectedCategory as keyof typeof PROMPT_CATEGORIES].name}
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="bg-mindful-lighter p-6 rounded-lg mb-6">
              <p className="text-xl font-medium text-center text-mindful-darker">
                {currentPrompt}
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="hover:bg-mindful-lighter hover:text-mindful-dark"
                onClick={() => toggleFavorite(currentPrompt)}
              >
                {favoritePrompts.includes(currentPrompt) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              
              <Button
                onClick={usePromptForJournaling}
                className="bg-mindful hover:bg-mindful-dark"
              >
                Journal with this Prompt
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-mindful-light">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-mindful-dark">How to Use Prompts</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">1.</span>
                <p>Select a category that resonates with your current mood or goals.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">2.</span>
                <p>Use the prompt as a starting point, but feel free to let your writing go in any direction.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">3.</span>
                <p>Try to write without editing or judgment. Focus on the process, not the output.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">4.</span>
                <p>If a prompt particularly resonates with you, save it to your favorites for later use.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">5.</span>
                <p>Set a timer (5-15 minutes) to keep your journaling session focused.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-mindful-light">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-mindful-dark">Benefits of Prompted Journaling</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">•</span>
                <p>Helps overcome writer's block or uncertainty about what to write.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">•</span>
                <p>Encourages exploration of topics you might not consider on your own.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">•</span>
                <p>Provides structure and direction to your journaling practice.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">•</span>
                <p>Creates opportunities for deeper self-reflection and emotional processing.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-mindful-dark mr-2">•</span>
                <p>Builds a consistent journaling habit by making it easier to get started.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JournalPrompts;
