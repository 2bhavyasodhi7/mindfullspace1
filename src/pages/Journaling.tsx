
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import JournalEditor from '@/components/journaling/JournalEditor';
import TimeCapsule from '@/components/journaling/TimeCapsule';
import JournalArchive from '@/components/journaling/JournalArchive';
import JournalPrompts from '@/components/journaling/JournalPrompts';
import MoodTracker from '@/components/journaling/MoodTracker';
import { Bell, BookOpen } from 'lucide-react';

const Journaling = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("daily-journal");
  const [journalStreak, setJournalStreak] = useState(0);

  // Check journal streak on component mount
  useEffect(() => {
    const checkStreak = () => {
      // For demo purposes, we'll just set a random streak
      // In a real app, this would check localStorage or a database
      const streak = localStorage.getItem('journalStreak') || '0';
      setJournalStreak(parseInt(streak));
      
      // If this is the first visit today, increment streak
      const lastVisit = localStorage.getItem('lastJournalDate');
      const today = new Date().toDateString();
      
      if (lastVisit !== today) {
        localStorage.setItem('lastJournalDate', today);
        const newStreak = parseInt(streak) + 1;
        localStorage.setItem('journalStreak', newStreak.toString());
        setJournalStreak(newStreak);
        
        if (newStreak > 1) {
          toast({
            title: "Journal Streak: " + newStreak + " days! 🎉",
            description: "Keep up the great mindfulness practice!",
          });
        }
      }
    };
    
    checkStreak();
  }, [toast]);

  return (
    <div className="container-custom mindful-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="mindful-heading text-left">Mindful <span className="text-mindful">Journaling</span></h1>
          <p className="mindful-subheading text-left max-w-2xl md:pr-8">
            Explore the practice of mindful journaling to process thoughts and emotions.
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 bg-mindful-lighter rounded-full py-2 px-4 self-start">
          <span className="text-mindful-dark font-medium mr-2">Journal Streak:</span>
          <span className="text-mindful-darker font-bold">{journalStreak} {journalStreak === 1 ? 'day' : 'days'}</span>
        </div>
      </div>

      <Tabs defaultValue="daily-journal" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-8">
          <TabsTrigger value="daily-journal" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Daily Journal
          </TabsTrigger>
          <TabsTrigger value="mood-tracker" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Mood Tracker
          </TabsTrigger>
          <TabsTrigger value="time-capsule" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Time Capsule
          </TabsTrigger>
          <TabsTrigger value="journal-archive" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Archive
          </TabsTrigger>
          <TabsTrigger value="prompts" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Prompts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily-journal" className="focus:outline-none">
          <JournalEditor />
        </TabsContent>

        <TabsContent value="mood-tracker" className="focus:outline-none">
          <MoodTracker />
        </TabsContent>

        <TabsContent value="time-capsule" className="focus:outline-none">
          <TimeCapsule />
        </TabsContent>

        <TabsContent value="journal-archive" className="focus:outline-none">
          <JournalArchive />
        </TabsContent>

        <TabsContent value="prompts" className="focus:outline-none">
          <JournalPrompts />
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 border border-mindful-light rounded-lg bg-mindful-lighter">
        <div className="flex items-start">
          <Bell className="w-6 h-6 text-mindful-dark mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-mindful-darker">Journal Privacy</h3>
            <p className="text-sm text-gray-600">
              Your journal entries are securely stored and only visible to you. 
              Time capsule entries are encrypted until their scheduled unlock date.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 border border-mindful-light rounded-lg bg-mindful-lighter">
        <div className="flex items-start">
          <BookOpen className="w-6 h-6 text-mindful-dark mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-mindful-darker">Mindful Tip</h3>
            <p className="text-sm text-gray-600">
              Set aside 5-10 minutes each day for journaling. Consistency over length is key to building a mindful journaling practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journaling;
