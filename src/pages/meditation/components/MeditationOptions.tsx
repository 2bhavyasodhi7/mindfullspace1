import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, BarChart3, BookOpen, Headphones, X, SkipForward, SkipBack, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { weeklyStats } from '../../audioData1';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';

const MeditationOptions = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showTechniques, setShowTechniques] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentClockTime, setCurrentClockTime] = useState(new Date());
  const [meditationStats, setMeditationStats] = useState([
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ]);

  const timerRef = useRef<NodeJS.Timeout>();
  const clockRef = useRef<NodeJS.Timeout>();

  const guidedMeditations = [
    { title: "Morning Meditation", duration: "10:00", url: "/music/guided meditaion/4-Minute Guided Mindfulness Meditation [TubeRipper.com].mp3"},
    { title: "Stress Relief", duration: "15:00", url: "/music/sample-audio.mp3" },
    { title: "Deep Sleep", duration: "20:00", url: "/music/sample-audio.mp3" },
    { title: "Anxiety Relief", duration: "12:00", url: "/music/sample-audio.mp3" },
    { title: "Focus Enhancement", duration: "8:00", url: "/music/sample-audio.mp3" },
    { title: "Gratitude Practice", duration: "10:00", url: "/music/sample-audio.mp3" }
  ];

  const meditationTechniques = [
    {
      title: "Mindfulness Meditation",
      description: "Focus on the present moment through breath awareness",
      image: "https://images.pexels.com/photos/31665863/pexels-photo-31665863/free-photo-of-yoga-practice-in-modern-office-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Loving-Kindness Meditation",
      description: "Cultivate compassion and positive feelings towards others",
      image: "https://images.pexels.com/photos/31681184/pexels-photo-31681184/free-photo-of-solitude-by-the-lake-in-scenic-turkish-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Transcendental Meditation",
      description: "Silent mantra meditation for deep relaxation",
      image: "https://images.pexels.com/photos/6806641/pexels-photo-6806641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const articles = [
    {
      title: "The Science Behind Meditation",
      url: "https://www.healthline.com/nutrition/12-benefits-of-meditation"
    },
    {
      title: "Getting Started with Meditation",
      url: "https://www.mindful.org/how-to-meditate/"
    },
    {
      title: "Different Types of Meditation",
      url: "https://www.verywellmind.com/types-of-meditation-for-stress-relief-3144989"
    },
    {
      title: "Benefits of Daily Practice",
      url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858"
    }
  ];

  useEffect(() => {
    setMeditationStats(weeklyStats);
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      clockRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (selectedTimer > 0 && prev >= selectedTimer * 60) {
            setIsTimerRunning(false);
            clearInterval(clockRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(clockRef.current);
  }, [isTimerRunning, selectedTimer]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentClockTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <section className="container mx-auto px-4 py-16 mb-32">
        
        <h2 className="text-4xl font-bold text-mindful mb-12 text-center nike-headline">Begin Your Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Headphones className="w-6 h-6 text-mindful" />
                <span className="font-medium text-mindful">Guided Meditation</span>
              </button>
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=200&q=80"
                    alt="Guided Meditation"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-mindful-dark mb-2">Guided Meditation</h3>
                    <p className="text-mindful text-sm">
                      Follow along with expert-led meditation sessions designed to help you relax, 
                      focus, and find inner peace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {showAudioPlayer && (
              <div className="grid gap-4 bg-white p-8 rounded-2xl shadow-lg">
                {guidedMeditations.map((meditation, index) => (
                  <div
                    key={index}
                    className={`rounded-lg transition-all duration-300 ${
                      currentAudioIndex === index 
                        ? 'bg-mindful-light text-mindful-dark' 
                        : 'bg-mindful-lighter hover:bg-mindful-light'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{meditation.title}</span>
                        <span className="text-sm text-mindful-dark">{meditation.duration}</span>
                      </div>
                      <AudioPlayer
                        src={meditation.url}
                        onPlay={() => setCurrentAudioIndex(index)}
                        showJumpControls={true}
                        layout="stacked-reverse"
                        customControlsSection={defaultControlsSection}
                        customProgressBarSection={defaultProgressBarSection}
                        className="audio-player-custom rounded-md"
                        style={{ 
                          backgroundColor: currentAudioIndex === index ? 'rgba(115, 165, 128, 0.2)' : '#f3f4f6', 
                          borderRadius: '0.5rem',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowTracker(!showTracker)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6 text-mindful" />
                <span className="font-medium text-mindful">Meditation Tracker</span>
              </button>
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.pexels.com/photos/5717413/pexels-photo-5717413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Meditation Tracker"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-mindful-dark mb-2">Track Your Progress</h3>
                    <p className="text-mindful text-sm">
                      Monitor your meditation journey, set goals, and maintain consistency 
                      with our easy-to-use tracking tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showTracker && (
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 gap-8">
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl font-bold text-mindful mb-4 text-center">
                      {formatTime(currentTime)}
                    </div>
                    <div className="flex justify-center gap-4 mb-6">
                      <button
                        onClick={() => {
                          setIsTimerRunning(!isTimerRunning);
                          setSelectedTimer(0);
                        }}
                        className="px-6 py-2 bg-mindful text-white rounded-full hover:bg-mindful-dark transition-colors"
                      >
                        {isTimerRunning ? 'Pause' : 'Start'}
                      </button>
                      <button
                        onClick={() => {
                          setIsTimerRunning(false);
                          setCurrentTime(0);
                          setSelectedTimer(0);
                        }}
                        className="px-6 py-2 bg-mindful-lighter text-mindful-dark rounded-full hover:bg-mindful-light transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[5, 10, 15, 20].map((minutes) => (
                        <button
                          key={minutes}
                          onClick={() => {
                            setSelectedTimer(minutes);
                            setCurrentTime(0);
                            setIsTimerRunning(true);
                          }}
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            selectedTimer === minutes
                              ? 'bg-mindful-light text-mindful-dark'
                              : 'bg-mindful-lighter hover:bg-mindful-light'
                          }`}
                        >
                          <Clock className="w-6 h-6 mx-auto mb-2" />
                          <span className="block text-sm font-medium">{minutes} min</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-mindful flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-mindful-dark">
                          {currentClockTime.toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-mindful">
                          {currentClockTime.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowTechniques(!showTechniques)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="w-6 h-6 text-mindful" />
                <span className="font-medium text-mindful">Meditation Techniques</span>
              </button>
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.pexels.com/photos/4908538/pexels-photo-4908538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Meditation Techniques"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-mindful-dark mb-2">Learn Techniques</h3>
                    <p className="text-mindful text-sm">
                      Discover various meditation methods and find the perfect 
                      practice that resonates with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showTechniques && (
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid gap-6 mb-8">
                  {meditationTechniques.map((technique, index) => (
                    <div 
                      key={index}
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <img 
                        src={technique.image}
                        alt={technique.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 p-6 flex flex-col justify-end">
                        <h4 className="text-white text-xl font-semibold mb-2 nike-headline">{technique.title}</h4>
                        <p className="text-white/80 text-sm nike-body-text">{technique.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-xl font-semibold text-mindful-dark mb-4 nike-headline">Related Articles</h4>
                  <div className="grid gap-4">
                    {articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-mindful-lighter rounded-lg hover:bg-mindful-light transition-colors"
                      >
                        <BookOpen className="w-5 h-5 text-mindful-dark" />
                        <span className="text-mindful-dark hover:text-mindful-darker transition-colors">
                          {article.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="h-80 w-full">
          <ChartContainer
            config={{
              hours: {
                label: "Meditation Hours",
                color: "#73A580"
              }
            }}
            className="mt-4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={meditationStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F0EA" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#73A580' }} />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(value) => `${value} Hours`}
                    />
                  }
                />
                <Bar dataKey="hours" fill="#73A580" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </section>
    </>
  );
};

export default MeditationOptions;
