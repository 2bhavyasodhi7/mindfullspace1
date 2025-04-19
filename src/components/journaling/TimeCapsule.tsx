
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, Calendar } from 'lucide-react';

interface TimeCapsuleEntry {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  unlockDate: string;
  isLocked: boolean;
}

const TimeCapsule = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [email, setEmail] = useState('');
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleEntry[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsuleEntry | null>(null);
  const [animation, setAnimation] = useState<string>('');
  
  useEffect(() => {
    // Load existing time capsules from localStorage
    const savedCapsules = localStorage.getItem('timeCapsules');
    if (savedCapsules) {
      try {
        const parsedCapsules = JSON.parse(savedCapsules);
        setTimeCapsules(parsedCapsules);
        
        // Check for any capsules that need to be unlocked
        const now = new Date();
        let capsuleUnlocked = false;
        
        const updatedCapsules = parsedCapsules.map((capsule: TimeCapsuleEntry) => {
          const unlockDateObj = new Date(capsule.unlockDate);
          
          if (capsule.isLocked && unlockDateObj <= now) {
            capsuleUnlocked = true;
            return { ...capsule, isLocked: false };
          }
          
          return capsule;
        });
        
        if (capsuleUnlocked) {
          localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));
          setTimeCapsules(updatedCapsules);
          
          toast({
            title: "Time Capsule Unlocked! 🎉",
            description: "One or more of your time capsules are now available to view.",
          });
        }
      } catch (e) {
        console.error("Error loading time capsules", e);
      }
    }
  }, []);
  
  const saveCapsule = () => {
    if (!title.trim() || !message.trim() || !unlockDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create your time capsule.",
        variant: "destructive"
      });
      return;
    }
    
    const unlockDateObj = new Date(unlockDate);
    const now = new Date();
    
    if (unlockDateObj <= now) {
      toast({
        title: "Invalid date",
        description: "The unlock date must be in the future.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new time capsule entry
    const newCapsule: TimeCapsuleEntry = {
      id: Date.now().toString(),
      title,
      content: message,
      createdDate: new Date().toISOString(),
      unlockDate: unlockDateObj.toISOString(),
      isLocked: true
    };
    
    // Add email notification info if requested
    if (notifyByEmail && email) {
      // In a real app, we would store this in a database with a scheduled task
      console.log(`Email notification scheduled for ${email} on ${unlockDate}`);
    }
    
    // Add to existing capsules
    const updatedCapsules = [...timeCapsules, newCapsule];
    localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));
    setTimeCapsules(updatedCapsules);
    
    // Play animation
    setAnimation('burying');
    
    // Clear form
    setTitle('');
    setMessage('');
    setUnlockDate('');
    
    toast({
      title: "Time Capsule Created! 🎁",
      description: `Your message will be locked until ${new Date(unlockDate).toLocaleDateString()}.`,
    });
    
    // Reset animation
    setTimeout(() => {
      setAnimation('');
    }, 2000);
  };
  
  const viewCapsule = (capsule: TimeCapsuleEntry) => {
    setSelectedCapsule(capsule);
    
    if (!capsule.isLocked) {
      setAnimation('unearthing');
      
      setTimeout(() => {
        setAnimation('');
      }, 2000);
    }
  };
  
  const closeSelectedCapsule = () => {
    setSelectedCapsule(null);
  };
  
  // Minimum date for unlock date picker (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Create time capsule */}
      <Card className="border-mindful-light">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-mindful-dark">Create a Time Capsule</CardTitle>
          <p className="text-gray-600 text-sm">
            Write a message to your future self. It will be locked until the date you choose.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="capsule-title">Title</Label>
            <Input 
              id="capsule-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your time capsule a title..."
              className="border-mindful-light mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="capsule-message">Message to your future self</Label>
            <Textarea 
              id="capsule-message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like to tell your future self? What are your current goals, dreams, or thoughts?"
              className="min-h-[150px] border-mindful-light mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="unlock-date">When should this be unlocked?</Label>
            <div className="relative">
              <Input 
                id="unlock-date" 
                type="date" 
                min={minDate}
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                className="pl-9 border-mindful-light mt-1"
              />
              <Calendar className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              id="notify-email"
              checked={notifyByEmail}
              onChange={() => setNotifyByEmail(!notifyByEmail)}
              className="rounded border-gray-300 text-mindful focus:ring-mindful"
            />
            <Label htmlFor="notify-email" className="cursor-pointer">Notify me by email when it unlocks</Label>
          </div>
          
          {notifyByEmail && (
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-mindful-light mt-1"
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button
            onClick={saveCapsule}
            className={`w-full bg-mindful hover:bg-mindful-dark ${animation === 'burying' ? 'animate-bounce' : ''}`}
          >
            <Lock className="mr-2 h-4 w-4" />
            Lock Time Capsule
          </Button>
        </CardFooter>
      </Card>
      
      {/* Right side - View time capsules */}
      <div>
        {selectedCapsule ? (
          <Card className={`border-mindful-light ${animation === 'unearthing' ? 'animate-pulse' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-mindful-dark">{selectedCapsule.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={closeSelectedCapsule} className="h-8 w-8 p-0">
                  &times;
                </Button>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>Created: {new Date(selectedCapsule.createdDate).toLocaleDateString()}</div>
                <div className="flex items-center">
                  {selectedCapsule.isLocked ? (
                    <>
                      <Lock className="h-4 w-4 text-orange-500 mr-1" />
                      <span>Locked until {new Date(selectedCapsule.unlockDate).toLocaleDateString()}</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 text-green-500 mr-1" />
                      <span>Unlocked on {new Date(selectedCapsule.unlockDate).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {selectedCapsule.isLocked ? (
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                  <Lock className="h-10 w-10 mx-auto mb-2 text-mindful" />
                  <p className="font-medium">This time capsule is still locked</p>
                  <p className="text-sm text-gray-600 mt-2">
                    You'll be able to view it on {new Date(selectedCapsule.unlockDate).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="bg-mindful-lighter p-6 rounded-lg">
                  <p className="whitespace-pre-line">{selectedCapsule.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-mindful-light h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-mindful-dark">Your Time Capsules</CardTitle>
              <p className="text-gray-600 text-sm">
                View your locked and unlocked time capsules
              </p>
            </CardHeader>
            
            <CardContent>
              {timeCapsules.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't created any time capsules yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {timeCapsules.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).map((capsule) => (
                    <div 
                      key={capsule.id}
                      onClick={() => viewCapsule(capsule)}
                      className="p-3 border border-mindful-light rounded-lg cursor-pointer hover:bg-mindful-lighter transition-colors"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{capsule.title}</h3>
                        {capsule.isLocked ? (
                          <Lock className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Unlock className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600 flex justify-between mt-1">
                        <span>Created: {new Date(capsule.createdDate).toLocaleDateString()}</span>
                        <span>{capsule.isLocked ? 'Unlock' : 'Unlocked'}: {new Date(capsule.unlockDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TimeCapsule;
