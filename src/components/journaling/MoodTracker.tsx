
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  note: string;
}

interface SemiCircleChartProps {
  percentage: number;
  color: string;
  label: string;
  value: string | number;
}

const MOOD_LABELS = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
const ENERGY_LABELS = ['Exhausted', 'Tired', 'Neutral', 'Energetic', 'Very Energetic'];

const SemiCircleChart: React.FC<SemiCircleChartProps> = ({ percentage, color, label, value }) => {
  const rotation = percentage * 1.8; // 180 degrees * percentage/100

  return (
    <div className="flex flex-col items-center text-center">
      <div className="semi-circle-chart">
        <div className="semi-circle-background"></div>
        <div 
          className="semi-circle-fill" 
          style={{ 
            backgroundColor: color,
            transform: `rotate(${rotation}deg)` 
          }}
        ></div>
        <div className="chart-label font-raleway">{value}</div>
      </div>
      <p className="mt-2 text-sm text-gray-600 font-stay-calm">{label}</p>
    </div>
  );
};

const MoodTracker = () => {
  const { toast } = useToast();
  const [mood, setMood] = useState<number>(2);
  const [energy, setEnergy] = useState<number>(2);
  const [note, setNote] = useState<string>('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().substring(0, 7) // YYYY-MM format
  );
  const [calendarDays, setCalendarDays] = useState<JSX.Element[]>([]);
  
  // Load mood entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      try {
        setMoodEntries(JSON.parse(savedEntries));
      } catch (e) {
        console.error("Error loading mood entries", e);
        // Initialize with empty array if there was an error
        localStorage.setItem('moodEntries', JSON.stringify([]));
      }
    } else {
      // Initialize with empty array if no entries exist
      localStorage.setItem('moodEntries', JSON.stringify([]));
    }
  }, []);
  
  // Generate calendar days whenever selectedMonth or moodEntries changes
  useEffect(() => {
    generateCalendarDays();
  }, [selectedMonth, moodEntries]);
  
  const saveMoodEntry = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Check if an entry for today already exists
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === today);
    
    let updatedEntries;
    if (existingEntryIndex >= 0) {
      // Update existing entry
      updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = { date: today, mood, energy, note };
      
      toast({
        title: "Mood updated",
        description: "Your mood entry for today has been updated.",
      });
    } else {
      // Add new entry
      updatedEntries = [...moodEntries, { date: today, mood, energy, note }];
      
      toast({
        title: "Mood logged",
        description: "Your mood has been recorded for today.",
      });
    }
    
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    setNote('');
  };
  
  const generateCalendarDays = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 md:h-16 p-1"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const entry = moodEntries.find(e => e.date === date);
      
      let moodColor = 'bg-gray-100';
      if (entry) {
        if (entry.mood === 0) moodColor = 'bg-red-200';
        else if (entry.mood === 1) moodColor = 'bg-orange-200';
        else if (entry.mood === 2) moodColor = 'bg-yellow-200';
        else if (entry.mood === 3) moodColor = 'bg-green-200';
        else if (entry.mood === 4) moodColor = 'bg-green-300';
      }
      
      days.push(
        <div 
          key={date} 
          className={`h-12 md:h-16 p-1 border border-gray-200 flex flex-col ${
            date === new Date().toISOString().split('T')[0] ? 'border-mindful' : ''
          }`}
          title={entry ? `Mood: ${MOOD_LABELS[entry.mood]}, Energy: ${ENERGY_LABELS[entry.energy]}${entry.note ? `, Note: ${entry.note}` : ''}` : ''}
        >
          <div className="text-xs font-medium">{day}</div>
          {entry && (
            <div className={`flex-grow rounded-full mt-1 ${moodColor}`}></div>
          )}
        </div>
      );
    }
    
    setCalendarDays(days);
  };
  
  const handlePreviousMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    let newMonth, newYear;
    
    if (month === 1) {
      newMonth = 12;
      newYear = year - 1;
    } else {
      newMonth = month - 1;
      newYear = year;
    }
    
    setSelectedMonth(`${newYear}-${newMonth.toString().padStart(2, '0')}`);
  };
  
  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    let newMonth, newYear;
    
    if (month === 12) {
      newMonth = 1;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
      newYear = year;
    }
    
    setSelectedMonth(`${newYear}-${newMonth.toString().padStart(2, '0')}`);
  };
  
  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Get today's entry if it exists
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moodEntries.find(entry => entry.date === today);
  
  // If there's an entry for today, use those values
  useEffect(() => {
    if (todayEntry) {
      setMood(todayEntry.mood);
      setEnergy(todayEntry.energy);
      setNote(todayEntry.note);
    }
  }, [todayEntry]);
  
  // Calculate mood and energy averages for statistics
  const calculateStats = () => {
    if (moodEntries.length === 0) return { avgMood: 2, avgEnergy: 2, totalEntries: 0 };
    
    const sum = moodEntries.reduce(
      (acc, entry) => ({
        mood: acc.mood + entry.mood,
        energy: acc.energy + entry.energy
      }),
      { mood: 0, energy: 0 }
    );
    
    return {
      avgMood: Math.round((sum.mood / moodEntries.length) * 10) / 10,
      avgEnergy: Math.round((sum.energy / moodEntries.length) * 10) / 10,
      totalEntries: moodEntries.length
    };
  };
  
  const stats = calculateStats();

  // Fix: Ensure value prop is always a string or number
  const renderMoodEmoji = (value: number): string => {
    if (value < 1) return '😢';
    if (value < 2) return '😔'; 
    if (value < 3) return '😐';
    if (value < 4) return '🙂';
    return '😄';
  };
  
  const renderEnergyEmoji = (value: number): string => {
    if (value < 1) return '😴';
    if (value < 2) return '🥱'; 
    if (value < 3) return '😐';
    if (value < 4) return '💪';
    return '⚡';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Mood input */}
      <Card className="border-mindful-light">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-mindful-dark font-calming">How are you feeling today?</CardTitle>
          <p className="text-gray-600 text-sm font-raleway">
            Track your mood and energy levels to identify patterns over time.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-ff-yoga">Mood</Label>
            <div className="flex justify-between text-xs text-gray-500 px-2 font-raleway">
              {MOOD_LABELS.map((label, i) => (
                <span key={label} className={i === mood ? 'font-bold text-mindful' : ''}>
                  {label}
                </span>
              ))}
            </div>
            <Slider
              min={0}
              max={4}
              step={1}
              value={[mood]}
              onValueChange={(values) => setMood(values[0])}
              className="py-2"
            />
            <div className="flex justify-center mt-2 text-2xl">
              {mood === 0 && '😢'}
              {mood === 1 && '😔'}
              {mood === 2 && '😐'}
              {mood === 3 && '🙂'}
              {mood === 4 && '😄'}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-ff-yoga">Energy Level</Label>
            <div className="flex justify-between text-xs text-gray-500 px-2 font-raleway">
              {ENERGY_LABELS.map((label, i) => (
                <span key={label} className={i === energy ? 'font-bold text-mindful' : ''}>
                  {label}
                </span>
              ))}
            </div>
            <Slider
              min={0}
              max={4}
              step={1}
              value={[energy]}
              onValueChange={(values) => setEnergy(values[0])}
              className="py-2"
            />
            <div className="flex justify-center mt-2 text-2xl">
              {energy === 0 && '😴'}
              {energy === 1 && '🥱'}
              {energy === 2 && '😐'}
              {energy === 3 && '💪'}
              {energy === 4 && '⚡'}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mood-note" className="font-ff-yoga">Note (optional)</Label>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's influencing your mood today?"
              className="w-full p-2 border border-mindful-light rounded-md text-sm min-h-[80px] font-raleway"
            />
          </div>
          
          <Button
            onClick={saveMoodEntry}
            className="w-full bg-mindful hover:bg-mindful-dark text-white rounded-full shadow-md transition-all duration-300"
          >
            {moodEntries.find(entry => entry.date === new Date().toISOString().split('T')[0]) 
              ? 'Update Today\'s Mood' 
              : 'Save Today\'s Mood'
            }
          </Button>
        </CardContent>
      </Card>
      
      {/* Right side - Calendar view */}
      <div className="space-y-6">
        <Card className="border-mindful-light">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-mindful-dark font-calming">Mood Calendar</CardTitle>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={handlePreviousMonth} className="h-8 w-8 p-0">
                  &lt;
                </Button>
                <span className="text-sm font-medium font-raleway">
                  {getMonthName(selectedMonth)}
                </span>
                <Button variant="ghost" size="sm" onClick={handleNextMonth} className="h-8 w-8 p-0">
                  &gt;
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium py-1 font-raleway">
                  {day}
                </div>
              ))}
              {calendarDays}
            </div>
            
            <div className="mt-4 flex justify-between">
              <div className="flex space-x-3 text-xs font-raleway">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-200 mr-1"></div>
                  <span>Very Sad</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-200 mr-1"></div>
                  <span>Sad</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-200 mr-1"></div>
                  <span>Neutral</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-200 mr-1"></div>
                  <span>Happy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-300 mr-1"></div>
                  <span>Very Happy</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-mindful-light">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-mindful-dark font-calming">Mood Insights</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <SemiCircleChart 
                percentage={stats.totalEntries > 0 ? 100 : 0} 
                color="#73A580" 
                label="Total Entries" 
                value={stats.totalEntries} 
              />
              
              <SemiCircleChart 
                percentage={(stats.avgMood / 4) * 100} 
                color={
                  stats.avgMood < 1 ? '#FCA5A5' : 
                  stats.avgMood < 2 ? '#FDBA74' : 
                  stats.avgMood < 3 ? '#FDE68A' : 
                  stats.avgMood < 4 ? '#A3E635' : '#86EFAC'
                } 
                label="Avg Mood" 
                value={`${stats.avgMood.toFixed(1)} ${renderMoodEmoji(stats.avgMood)}`}
              />
              
              <SemiCircleChart 
                percentage={(stats.avgEnergy / 4) * 100} 
                color={
                  stats.avgEnergy < 1 ? '#CBD5E1' : 
                  stats.avgEnergy < 2 ? '#BAE6FD' : 
                  stats.avgEnergy < 3 ? '#A5F3FC' : 
                  stats.avgEnergy < 4 ? '#5EEAD4' : '#34D399'
                } 
                label="Avg Energy" 
                value={`${stats.avgEnergy.toFixed(1)} ${renderEnergyEmoji(stats.avgEnergy)}`}
              />
            </div>
            
            {moodEntries.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm font-raleway">
                Start tracking your mood to see insights
              </div>
            ) : (
              <div className="mt-4 text-sm text-gray-600 space-y-2 font-raleway">
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-mindful" />
                  <span>
                    {moodEntries.length > 0 
                      ? `First entry: ${new Date(moodEntries.sort((a, b) => 
                          new Date(a.date).getTime() - new Date(b.date).getTime()
                        )[0].date).toLocaleDateString()}`
                      : 'No entries yet'}
                  </span>
                </p>
                <p>
                  Tracking your mood can help identify patterns and triggers that affect your wellbeing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;
