import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Clock, 
  Video, 
  User,
  BookOpen,
  Heart,
  Play
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Yoga = () => {
  const { toast } = useToast();
  const [filteredDay, setFilteredDay] = useState<string | null>(null);
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<YogaClass | null>(null);

  // Sample data - in a real app, this would come from an API
  const yogaTypes = ["Hatha", "Vinyasa", "Yin", "Power", "Restorative"];
  
  const daysOfWeek = [
    { id: "weekday", label: "Weekdays (Mon-Fri)" },
    { id: "weekend", label: "Weekends (Sat-Sun)" }
  ];

  type YogaClass = {
    id: string;
    time: string;
    type: string;
    instructor: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    day: "weekday" | "weekend";
    zoomLink: string;
    zoomId: string;
    zoomPassword: string;
  };

  const yogaClasses: YogaClass[] = [
    // Weekday classes
    { id: "1", time: "5:00–6:00 AM", type: "Hatha", instructor: "A", difficulty: "Beginner", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "2", time: "6:00–7:00 AM", type: "Vinyasa", instructor: "B", difficulty: "Intermediate", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "3", time: "7:00–8:00 AM", type: "Power", instructor: "C", difficulty: "Advanced", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "4", time: "8:00–9:00 AM", type: "Yin", instructor: "D", difficulty: "Beginner", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "5", time: "4:00–5:00 PM", type: "Restorative", instructor: "E", difficulty: "Beginner", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "6", time: "5:00–6:00 PM", type: "Hatha", instructor: "F", difficulty: "Intermediate", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "7", time: "6:00–7:00 PM", type: "Vinyasa", instructor: "G", difficulty: "Advanced", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "8", time: "7:00–8:00 PM", type: "Restorative", instructor: "H", difficulty: "Beginner", duration: "60 min", day: "weekday", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    
    // Weekend classes
    { id: "9", time: "5:00–6:00 AM", type: "Vinyasa", instructor: "I", difficulty: "Intermediate", duration: "60 min", day: "weekend", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "10", time: "6:00–7:00 AM", type: "Power", instructor: "J", difficulty: "Advanced", duration: "60 min", day: "weekend", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
    { id: "11", time: "7:00–8:00 AM", type: "Yin", instructor: "K", difficulty: "Beginner", duration: "60 min", day: "weekend", zoomLink: "https://us02web.zoom.us/j/87063555371?pwd=WlVzOWRkRkRCWUp1UkJmdFE4VWxhZz09", zoomId: "870 6355 5371", zoomPassword: "yoga" },
  ];

  // Sample recorded sessions for the library
  const recordedSessions = [
    { 
      id: "r1", 
      title: "Morning Flow", 
      instructor: "A", 
      type: "Vinyasa", 
      duration: "45 min", 
      difficulty: "Beginner", 
      videoUrl: "https://www.youtube.com/watch?v=7kgZnJqzNaU"  // Sample yoga video
    },
    { 
      id: "r2", 
      title: "Evening Relaxation", 
      instructor: "B", 
      type: "Restorative", 
      duration: "30 min", 
      difficulty: "Beginner", 
      videoUrl: "https://www.youtube.com/watch?v=6p_yaNFSYao"
    },
    { 
      id: "r3", 
      title: "Power Yoga", 
      instructor: "C", 
      type: "Power", 
      duration: "60 min", 
      difficulty: "Advanced", 
      videoUrl: "https://youtu.be/SS3WT91y48I?si=A_2HIdj1kGiGpsuw"
    },
    { id: "r4", title: "Gentle Stretch", instructor: "D", type: "Yin", duration: "40 min", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=4pKly2JojMw" },
    { id: "r5", title: "Balance & Strength", instructor: "E", type: "Hatha", duration: "50 min", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=7kgZnJqzNaU&t=900s" },
    { id: "r6", title: "Mindful Movement", instructor: "F", type: "Vinyasa", duration: "45 min", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=9kOCY0KNByw" },
  ];

  // Filter yoga classes based on selections
  const getFilteredClasses = () => {
    return yogaClasses.filter(yogaClass => {
      const dayMatch = filteredDay ? yogaClass.day === filteredDay : true;
      const typeMatch = filteredType ? yogaClass.type === filteredType : true;
      return dayMatch && typeMatch;
    });
  };

  const resetFilters = () => {
    setFilteredDay(null);
    setFilteredType(null);
  };

  const setReminder = (yogaClass: YogaClass) => {
    toast({
      title: "Reminder Set",
      description: `You'll be notified 10 minutes before the ${yogaClass.type} class at ${yogaClass.time}.`,
    });
  };

  const joinClass = (yogaClass: YogaClass) => {
    // In a real app, this would update statistics or other tracking
    toast({
      title: "Joining Class",
      description: `Opening Zoom link for ${yogaClass.type} with ${yogaClass.instructor}.`,
    });
    
    // Open Zoom link in a new tab
    window.open(yogaClass.zoomLink, '_blank');
  };

  const playRecordedSession = (session: any) => {
    toast({
      title: "Starting Session",
      description: `Playing ${session.title} with ${session.instructor}.`,
    });
  };

  return (
    <div className="container-custom mindful-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="mindful-heading text-left">Yoga <span className="text-mindful">Practice</span></h1>
          <p className="mindful-subheading text-left max-w-2xl md:pr-8">
            Discover the balance between mind and body through guided yoga sessions.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button className="bg-mindful hover:bg-mindful-dark">
            Start Free Trial
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          <TabsTrigger value="schedule" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Live Schedule
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            On-Demand Library
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Your Progress
          </TabsTrigger>
          <TabsTrigger value="instructors" className="data-[state=active]:bg-mindful data-[state=active]:text-white">
            Instructors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="focus:outline-none">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <Card className="md:w-3/4">
              <CardHeader>
                <CardTitle>Live Zoom Classes (IST)</CardTitle>
                <CardDescription>Join any of our live sessions with expert instructors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <span className="text-sm font-medium">Filter by Day:</span>
                    {daysOfWeek.map(day => (
                      <Badge 
                        key={day.id} 
                        variant={filteredDay === day.id ? "default" : "outline"}
                        className={`cursor-pointer ${filteredDay === day.id ? 'bg-mindful hover:bg-mindful-dark' : 'hover:bg-gray-100'}`}
                        onClick={() => setFilteredDay(filteredDay === day.id ? null : day.id)}
                      >
                        {day.label}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Filter by Type:</span>
                    <ScrollArea className="whitespace-nowrap h-10">
                      <div className="flex space-x-2 p-1">
                        {yogaTypes.map(type => (
                          <Badge 
                            key={type} 
                            variant={filteredType === type ? "default" : "outline"}
                            className={`cursor-pointer ${filteredType === type ? 'bg-mindful hover:bg-mindful-dark' : 'hover:bg-gray-100'}`}
                            onClick={() => setFilteredType(filteredType === type ? null : type)}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {(filteredDay || filteredType) && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto">
                      Reset Filters
                    </Button>
                  )}
                </div>

                {getFilteredClasses().length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredClasses().map((yogaClass) => (
                        <TableRow key={yogaClass.id}>
                          <TableCell className="font-medium">{yogaClass.time}</TableCell>
                          <TableCell>{yogaClass.type}</TableCell>
                          <TableCell>{yogaClass.instructor}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              yogaClass.difficulty === "Beginner" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                              yogaClass.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                              "bg-red-100 text-red-800 hover:bg-red-200"
                            }>
                              {yogaClass.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedClass(yogaClass)}
                                  >
                                    Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{yogaClass.type} Yoga with {yogaClass.instructor}</DialogTitle>
                                    <DialogDescription>
                                      {yogaClass.day === "weekday" ? "Weekdays (Mon-Fri)" : "Weekends (Sat-Sun)"} • {yogaClass.time}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <div className="flex items-start mb-4">
                                      <div className="mr-4 p-2 bg-mindful-lighter rounded-full">
                                        <User className="h-5 w-5 text-mindful" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">Instructor</h4>
                                        <p className="text-sm text-gray-500">{yogaClass.instructor}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start mb-4">
                                      <div className="mr-4 p-2 bg-mindful-lighter rounded-full">
                                        <Clock className="h-5 w-5 text-mindful" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">Duration</h4>
                                        <p className="text-sm text-gray-500">{yogaClass.duration}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start mb-4">
                                      <div className="mr-4 p-2 bg-mindful-lighter rounded-full">
                                        <BookOpen className="h-5 w-5 text-mindful" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">What to Bring</h4>
                                        <p className="text-sm text-gray-500">Yoga mat, comfortable clothes, water bottle</p>
                                      </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                      <h4 className="font-medium mb-2">Zoom Meeting Details</h4>
                                      <p className="text-sm mb-1">Meeting ID: {yogaClass.zoomId}</p>
                                      <p className="text-sm mb-2">Passcode: {yogaClass.zoomPassword}</p>
                                      <Button 
                                        onClick={() => joinClass(yogaClass)}
                                        className="w-full bg-mindful hover:bg-mindful-dark"
                                      >
                                        Join Class Now
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setReminder(yogaClass)}
                                    >
                                      Set Reminder
                                    </Button>
                                    <Button 
                                      onClick={() => joinClass(yogaClass)}
                                      className="bg-mindful hover:bg-mindful-dark"
                                    >
                                      Join Now
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setReminder(yogaClass)}
                              >
                                Remind
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => joinClass(yogaClass)}
                                className="bg-mindful hover:bg-mindful-dark"
                              >
                                Join
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No classes match your current filters. Try adjusting your filters or check back later.</p>
                    <Button variant="outline" onClick={resetFilters} className="mt-4">Reset Filters</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:w-1/4">
              <CardHeader>
                <CardTitle>About Our Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-mindful-lighter rounded-lg p-4">
                    <h3 className="font-medium text-mindful-dark mb-2">How It Works</h3>
                    <p className="text-sm text-gray-600 mb-4">Join our live Zoom yoga sessions from anywhere in the world. All you need is a device and a yoga mat!</p>
                    <ol className="text-sm list-decimal pl-5 space-y-2">
                      <li>Select a class from the schedule</li>
                      <li>Click the "Join" button</li>
                      <li>Connect through Zoom</li>
                      <li>Follow along with our expert instructors</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Testimonials</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-2">
                      <p className="text-sm italic">"This 6 AM class transformed my mornings! I feel energized all day."</p>
                      <p className="text-xs mt-2 text-gray-500">– Anita S.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm italic">"The evening restorative sessions have helped me sleep better than any medication."</p>
                      <p className="text-xs mt-2 text-gray-500">– David M.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-mindful hover:bg-mindful-dark">
                  Join Your First Class Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="library" className="focus:outline-none">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">On-Demand Sessions</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Missed a live class? Access our library of recorded sessions anytime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedSessions.map(session => (
                <Card key={session.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
                      <ReactPlayer
                        url={session.videoUrl}
                        width="100%"
                        height="100%"
                        light={true}
                        controls={true}
                        playIcon={
                          <Button 
                            size="icon" 
                            className="rounded-full bg-white/80 text-mindful hover:bg-white"
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        }
                      />
                    </AspectRatio>
                    <Badge className="absolute top-2 right-2 bg-mindful text-white">
                      {session.duration}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription>
                      with {session.instructor} • {session.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="outline" className={
                      session.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                      session.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {session.difficulty}
                    </Badge>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      onClick={() => playRecordedSession(session)}
                      className="w-full bg-mindful hover:bg-mindful-dark"
                    >
                      Watch Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="focus:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Yoga Journey</CardTitle>
                <CardDescription>Track your progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-mindful-lighter rounded-lg">
                    <div className="w-16 h-16 bg-mindful rounded-full flex items-center justify-center text-white text-xl font-bold">
                      3
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Classes This Week</h3>
                      <p className="text-sm text-gray-600">You're 2 classes away from your goal!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-mindful-lighter rounded-lg">
                    <div className="w-16 h-16 bg-mindful rounded-full flex items-center justify-center text-white text-xl font-bold">
                      5
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Current Streak</h3>
                      <p className="text-sm text-gray-600">Keep the momentum going!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-mindful-lighter rounded-lg">
                    <div className="w-16 h-16 bg-mindful rounded-full flex items-center justify-center text-white text-xl font-bold">
                      12h
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Total Hours</h3>
                      <p className="text-sm text-gray-600">You've dedicated 12 hours to your practice</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements unlocked on your yoga journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="font-medium">5-Day Streak</h3>
                    <p className="text-xs text-gray-500">Consistent practice</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-mindful-lighter rounded-full flex items-center justify-center mb-2">
                      <Heart className="h-6 w-6 text-mindful" />
                    </div>
                    <h3 className="font-medium">Morning Riser</h3>
                    <p className="text-xs text-gray-500">Attended 3 AM classes</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Video className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="font-medium text-gray-400">Explorer</h3>
                    <p className="text-xs text-gray-400">Try 3 different types</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="font-medium text-gray-400">10 Hour Club</h3>
                    <p className="text-xs text-gray-400">Complete 10 hours</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Badges</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Journal Your Practice</CardTitle>
                <CardDescription>Reflect on your yoga journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-mindful-lighter p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">How did you feel after today's session?</h3>
                  <p className="text-sm text-gray-600 mb-4">Tracking your emotions and physical sensations helps deepen your practice.</p>
                  <Button className="bg-mindful hover:bg-mindful-dark">Add to Journal</Button>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">Your journal entries sync with your mindfulness journal for a complete view of your wellness journey.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="instructors" className="focus:outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <div className="h-48 overflow-hidden">
                <img 
                  src="src/pages/images/INSTRUCTOR_1.jpg"
                  alt="Instructor-1"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Bhavya</CardTitle>
                <CardDescription>Hatha & Vinyasa Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Bhavya brings 10 years of experience and a calming presence to her classes, specializing in helping beginners build a strong foundation.
                </p>
                <div className="flex space-x-2">
                  <Badge variant="outline">Hatha</Badge>
                  <Badge variant="outline">Vinyasa</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Schedule</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <div className="h-48 overflow-hidden">
                <img 
                  src="src/pages/images/INSTRUCTOR_2.jpg"
                  alt="Instructor-2"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Ayush</CardTitle>
                <CardDescription>Power Yoga Expert</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Ayush's energetic classes focus on building strength and flexibility through dynamic sequences and mindful transitions.
                </p>
                <div className="flex space-x-2">
                  <Badge variant="outline">Power</Badge>
                  <Badge variant="outline">Vinyasa</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Schedule</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <div className="h-48 overflow-hidden">
                <img
                  src="src/pages/images/INSTRUCTOR_3.jpg"
                  alt="Instructor-3"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Prathmesh</CardTitle>
                <CardDescription>Yin & Restorative Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Prathmesh creates a peaceful environment for his classes, focusing on deep stretches and mindful breathing for stress reduction.
                </p>
                <div className="flex space-x-2">
                  <Badge variant="outline">Yin</Badge>
                  <Badge variant="outline">Restorative</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Schedule</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Yoga;
