
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save, Download, Tag, Smile, Frown, Meh, Search } from 'lucide-react';

const MOODS = [
  { emoji: "😊", name: "Happy", icon: Smile },
  { emoji: "😐", name: "Neutral", icon: Meh }, 
  { emoji: "😔", name: "Sad", icon: Frown },
  { emoji: "😡", name: "Angry", icon: null },
  { emoji: "😌", name: "Calm", icon: null },
  { emoji: "🙂", name: "Content", icon: null },
  { emoji: "😰", name: "Anxious", icon: null },
  { emoji: "🤔", name: "Thoughtful", icon: null },
];

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  tags: string[];
}

const JournalEditor = () => {
  const { toast } = useToast();
  const [entry, setEntry] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Handle auto-save
  useEffect(() => {
    if (entry.length > 0) {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      const timer = setTimeout(() => {
        saveEntryToLocalStorage();
        toast({
          title: "Entry auto-saved",
          description: "Your journal entry has been automatically saved as a draft.",
        });
      }, 30000); // Auto-save after 30 seconds of inactivity
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [entry]);

  // Check for existing draft on load
  useEffect(() => {
    const draft = localStorage.getItem('journalDraft');
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        setEntry(draftData.content || '');
        setTitle(draftData.title || '');
        setSelectedMood(draftData.mood || '');
        setTags(draftData.tags.join(', ') || '');
        setDate(draftData.date || new Date().toISOString().split('T')[0]);
        
        toast({
          title: "Draft loaded",
          description: "We've restored your previous unsaved entry.",
        });
      } catch (e) {
        console.error("Error parsing draft", e);
      }
    }
  }, []);

  const saveEntryToLocalStorage = () => {
    const entryData = {
      title,
      content: entry,
      mood: selectedMood,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      date,
    };
    
    localStorage.setItem('journalDraft', JSON.stringify(entryData));
  };

  const saveEntry = () => {
    if (!entry.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }

    // Create unique ID for entry
    const entryId = Date.now().toString();
    
    // Format the entry data
    const entryData: JournalEntry = {
      id: entryId,
      date,
      content: entry,
      mood: selectedMood,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    
    // Get existing entries or initialize empty array
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    
    // Add new entry and save back to localStorage
    existingEntries.unshift(entryData);
    localStorage.setItem('journalEntries', JSON.stringify(existingEntries));
    
    // Clear the draft
    localStorage.removeItem('journalDraft');
    
    // Reset form
    setEntry('');
    setSelectedMood('');
    setTitle('');
    setTags('');
    setDate(new Date().toISOString().split('T')[0]);
    
    toast({
      title: "Entry saved!",
      description: "Your journal entry has been successfully saved.",
    });
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      toast({
        title: "Focus mode enabled",
        description: "Distractions minimized for better journaling.",
      });
    }
  };

  return (
    <div className={`transition-all duration-300 ${focusMode ? 'bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg' : ''}`}>
      <Card className="border-mindful-light">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-mindful-dark">Daily Journal</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFocusMode}
                className="text-xs hover:bg-mindful-lighter hover:text-mindful-dark"
              >
                {focusMode ? "Exit Focus Mode" : "Focus Mode"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
            <div className="flex flex-col space-y-1 flex-grow">
              <Label htmlFor="entry-title">Title</Label>
              <Input 
                id="entry-title" 
                placeholder="Give your entry a title..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-mindful-light"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full md:w-auto">
              <Label htmlFor="entry-date">Date</Label>
              <div className="relative">
                <Input 
                  id="entry-date" 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 border-mindful-light"
                />
                <Calendar className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-1">
          <div className="mb-4">
            <Label htmlFor="mood-selector" className="mb-2 block">How are you feeling today?</Label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => (
                <Button
                  key={mood.name}
                  type="button"
                  variant={selectedMood === mood.name ? "default" : "outline"}
                  className={`py-1 px-3 ${selectedMood === mood.name ? 'bg-mindful' : 'hover:bg-mindful-lighter'}`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <span className="mr-1">{mood.emoji}</span> {mood.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="entry-content" className="mb-2 block">Write your thoughts...</Label>
            <Textarea 
              id="entry-content"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="What's on your mind today? How are you feeling? What are you grateful for?"
              className="min-h-[200px] md:min-h-[300px] border-mindful-light"
            />
          </div>
          
          <div className="mb-1">
            <Label htmlFor="entry-tags" className="mb-2 block">Tags (comma separated)</Label>
            <div className="relative">
              <Input 
                id="entry-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="gratitude, reflection, goals..."
                className="pl-9 border-mindful-light"
              />
              <Tag className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-mindful-light pt-4">
          <Button 
            variant="outline" 
            className="hover:bg-mindful-lighter hover:text-mindful-dark"
            onClick={() => {
              setEntry('');
              setSelectedMood('');
              setTitle('');
              setTags('');
              localStorage.removeItem('journalDraft');
              toast({
                title: "Entry cleared",
                description: "Your draft has been cleared."
              });
            }}
          >
            Clear
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="hover:bg-mindful-lighter hover:text-mindful-dark"
              onClick={saveEntryToLocalStorage}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              onClick={saveEntry}
              className="bg-mindful hover:bg-mindful-dark"
            >
              Save Entry
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JournalEditor;
