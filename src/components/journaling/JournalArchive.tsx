
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Search, Tag, Download, Smile, Frown, Meh } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  tags: string[];
  title?: string;
}

const JournalArchive = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  
  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
        setFilteredEntries(parsedEntries);
      } catch (e) {
        console.error("Error loading journal entries", e);
      }
    }
  }, []);
  
  useEffect(() => {
    // Apply filters when any filter changes
    applyFilters();
  }, [searchTerm, dateFilter, moodFilter, tagFilter, entries]);
  
  const applyFilters = () => {
    let filtered = [...entries];
    
    // Apply search term filter (content and title)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        (entry.content && entry.content.toLowerCase().includes(term)) || 
        (entry.title && entry.title.toLowerCase().includes(term))
      );
    }
    
    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(entry => entry.date === dateFilter);
    }
    
    // Apply mood filter
    if (moodFilter) {
      filtered = filtered.filter(entry => entry.mood === moodFilter);
    }
    
    // Apply tag filter
    if (tagFilter) {
      const tag = tagFilter.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.tags && entry.tags.some(t => t.toLowerCase().includes(tag))
      );
    }
    
    setFilteredEntries(filtered);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setMoodFilter('');
    setTagFilter('');
    setFilteredEntries(entries);
  };
  
  const downloadEntry = (entry: JournalEntry) => {
    // Create a text representation of the entry
    const title = entry.title || 'Journal Entry';
    const date = new Date(entry.date).toLocaleDateString();
    const mood = entry.mood ? `Mood: ${entry.mood}` : '';
    const tags = entry.tags && entry.tags.length > 0 ? `Tags: ${entry.tags.join(', ')}` : '';
    
    const content = `
${title}
Date: ${date}
${mood}
${tags}

${entry.content}
    `.trim();
    
    // Create a download link
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `journal-entry-${date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const deleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      setFilteredEntries(updatedEntries.filter(entry => filteredEntries.includes(entry)));
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      
      if (selectedEntry && selectedEntry.id === id) {
        setSelectedEntry(null);
      }
    }
  };
  
  // Helper function to get mood icon
  const getMoodIcon = (mood: string) => {
    switch(mood) {
      case 'Happy':
        return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'Sad':
        return <Frown className="h-4 w-4 text-blue-500" />;
      case 'Neutral':
        return <Meh className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left sidebar - Filters */}
      <div className="md:col-span-1">
        <Card className="border-mindful-light sticky top-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-mindful-dark">Search & Filter</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search entries</Label>
              <div className="relative">
                <Input 
                  id="search"
                  placeholder="Search by content or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-mindful-light"
                />
                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="date-filter">Filter by date</Label>
              <div className="relative">
                <Input 
                  id="date-filter"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-9 border-mindful-light"
                />
                <Calendar className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="mood-filter">Filter by mood</Label>
              <select
                id="mood-filter"
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="w-full rounded-md border border-mindful-light p-2 text-sm"
              >
                <option value="">All moods</option>
                <option value="Happy">Happy</option>
                <option value="Neutral">Neutral</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Calm">Calm</option>
                <option value="Content">Content</option>
                <option value="Anxious">Anxious</option>
                <option value="Thoughtful">Thoughtful</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="tag-filter">Filter by tag</Label>
              <div className="relative">
                <Input 
                  id="tag-filter"
                  placeholder="gratitude, reflection..."
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="pl-9 border-mindful-light"
                />
                <Tag className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <Button 
              onClick={resetFilters}
              variant="outline" 
              className="w-full hover:bg-mindful-lighter hover:text-mindful-dark"
            >
              Reset Filters
            </Button>
            
            <div className="pt-2 text-sm text-gray-600">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Middle - Entry list */}
      <div className="md:col-span-1">
        <Card className="border-mindful-light h-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-mindful-dark">Your Journal Entries</CardTitle>
          </CardHeader>
          
          <CardContent>
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No journal entries found.</p>
                {entries.length > 0 && (
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your filters.</p>
                )}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredEntries.map((entry) => (
                  <div 
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedEntry && selectedEntry.id === entry.id 
                        ? 'border-mindful bg-mindful-lighter' 
                        : 'border-mindful-light hover:bg-mindful-lighter'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        {entry.title || new Date(entry.date).toLocaleDateString()}
                      </h3>
                      {entry.mood && getMoodIcon(entry.mood)}
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-600">
                      {!entry.title && `Date: ${new Date(entry.date).toLocaleDateString()}`}
                    </div>
                    
                    <p className="mt-2 text-sm line-clamp-2 text-gray-700">
                      {entry.content}
                    </p>
                    
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {entry.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-0.5 rounded-full bg-mindful-lighter text-mindful-dark text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Right - Entry detail */}
      <div className="md:col-span-1">
        {selectedEntry ? (
          <Card className="border-mindful-light">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-mindful-dark">
                  {selectedEntry.title || new Date(selectedEntry.date).toLocaleDateString()}
                </CardTitle>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => downloadEntry(selectedEntry)}
                    className="h-8 w-8 text-gray-500 hover:text-mindful"
                    title="Download entry"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteEntry(selectedEntry.id)}
                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                    title="Delete entry"
                  >
                    <span aria-hidden="true">&times;</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-gray-600">
                  Date: {new Date(selectedEntry.date).toLocaleDateString()}
                </div>
                
                {selectedEntry.mood && (
                  <div className="flex items-center text-gray-600">
                    Mood: {getMoodIcon(selectedEntry.mood)}
                    <span className="ml-1">{selectedEntry.mood}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="bg-mindful-lighter p-4 rounded-lg">
                <p className="whitespace-pre-line">{selectedEntry.content}</p>
              </div>
              
              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="mt-4">
                  <Label className="text-sm text-gray-600">Tags</Label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedEntry.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 rounded-full bg-mindful-lighter text-mindful-dark text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-mindful-light h-full flex items-center justify-center">
            <CardContent className="text-center py-16">
              <p className="text-gray-500">Select an entry to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JournalArchive;
