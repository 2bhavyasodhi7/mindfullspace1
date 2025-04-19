import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';
import { 
  Heart, 
  Activity, 
  Smile, 
  Frown, 
  Meh, 
  ThumbsUp, 
  Clock, 
  Timer,
  BookOpen,
  User,
  Menu,
  Wind,
  Brain,
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { applyStressPageStyles } from './StressAndAnxietyStyles';

const StressAndAnxiety = () => {
  const [activeTab, setActiveTab] = useState('stress');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'in' | 'out'>('in');
  const [breathingProgress, setBreathingProgress] = useState(0);

  const weeklyStats = {
    relief: [2.5, 1.8, 3.2, 2.1, 1.5, 2.8, 3.5],
    breathing: [1.8, 2.2, 1.5, 2.8, 3.1, 2.5, 2.0]
  };

  const quickReliefAudios = [
    { id: 1, title: 'Ocean Waves', duration: '5:30', url: '/music/ocean-waves.mp3' },
    { id: 2, title: 'Rain Sounds', duration: '6:15', url: '/music/rain-sounds.mp3' },
    { id: 3, title: 'Forest Ambience', duration: '4:45', url: '/music/forest-ambience.mp3' },
    { id: 4, title: 'Gentle Stream', duration: '5:00', url: '/music/gentle-stream.mp3' },
    { id: 5, title: 'Wind Chimes', duration: '4:30', url: '/music/wind-chimes.mp3' },
    { id: 6, title: 'Bird Songs', duration: '5:15', url: '/music/bird-songs.mp3' }
  ];

  const breathingAudios = [
    { id: 1, title: '4-7-8 Breathing', duration: '8:00', url: '/music/breathing/478-breathing.mp3' },
    { id: 2, title: 'Box Breathing', duration: '10:00', url: 'https://youtu.be/tEmt1Znux58?si=YxZCijMKcPI-bAUH' },
    { id: 3, title: 'Deep Breathing', duration: '7:30', url: '/music/breathing/deep-breathing.mp3' },
    { id: 4, title: 'Calm Breath', duration: '6:45', url: '/music/breathing/calm-breath.mp3' },
    { id: 5, title: 'Energy Breath', duration: '5:30', url: '/music/breathing/energy-breath.mp3' },
    { id: 6, title: 'Sleep Breath', duration: '9:15', url: '/music/breathing/sleep-breath.mp3' }
  ];

  const practicalWays = [
    { title: 'Physical Activity', description: 'Regular exercise reduces stress hormones' },
    { title: 'Deep Breathing & Meditation', description: 'Calms mind and body' },
    { title: 'Time Management & Prioritization', description: 'Reduce overwhelm' },
    { title: 'Healthy Diet', description: 'Nourish your body and mind' },
    { title: 'Engage in Hobbies', description: 'Find joy in activities' },
    { title: 'Laughing', description: 'Natural stress reliever' },
    { title: 'Journaling', description: 'Express thoughts and emotions' },
    { title: 'Nature Walks', description: 'Connect with nature' },
    { title: 'Limiting Social Media', description: 'Reduce digital stress' },
    { title: 'Therapeutic Techniques', description: 'Professional guidance' }
  ];

  useEffect(() => {
    if (activeSection === 'breathing') {
      const interval = setInterval(() => {
        setBreathingProgress((prev) => {
          if (prev >= 100) {
            setBreathingPhase(p => p === 'in' ? 'out' : 'in');
            return 0;
          }
          return prev + (100 / 40); // 4 seconds = 40 steps (100ms interval)
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeSection, breathingPhase]);

  const leftTabs = [
    { id: 'app', label: 'App' },
    { id: 'stress', label: 'Stress & Anxiety' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'meditation', label: 'Meditation' },
  ];

  const rightTabs = [
    { id: 'journaling', label: 'Journaling' },
    { id: 'articles', label: 'Articles', icon: <BookOpen size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> }
  ];

  const articleCategories = [
    { name: 'Sleep', image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=200&q=80' },
    { name: 'Meditation', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80' },
    { name: 'Stress', image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=200&q=80' },
    { name: 'Gratitude', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=200&q=80' }
  ];

  const profileOptions = [
    'Account Details',
    'Change Password',
    'Your Stats',
    'Language',
    'Logout'
  ];

  const renderUsageGraph = (data: number[]) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="h-48 flex items-end space-x-4">
        {data.map((hours, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-mindful rounded-t-lg transition-all duration-300"
              style={{ height: `${(hours / 4) * 100}%` }}
            />
            <span className="text-sm text-gray-600 mt-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>0h</span>
          <span>4h</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    applyStressPageStyles();
  }, []);

  return (
    <div className="min-h-screen stress-anxiety-page">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-mindful-dark flex items-center">
            <Heart className="mr-3 text-mindful" /> Stress & Anxiety Management
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Tools and techniques to help you manage stress and anxiety in your daily life.
          </p>
        </div>

        <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Stress & Anxiety <span className="text-mindful">Free.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Take control of your mental well-being with our scientifically proven techniques for stress and anxiety management.
              </p>
              <button className="bg-mindful hover:bg-mindful-dark text-white px-8 py-3 rounded-full 
                font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Explore Now
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="https://images.pexels.com/photos/6806390/pexels-photo-6806390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Peaceful meditation"
                className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-mindful mb-12">
              Remove Your Stress
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="relative group">
                <button
                  onClick={() => setActiveSection(activeSection === 'quick-relief' ? null : 'quick-relief')}
                  className="w-full bg-[#8BA989] text-white p-6 rounded-xl shadow-lg
                    transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                    flex flex-col items-center space-y-3"
                >
                  <Activity size={32} />
                  <span className="font-medium">Quick Relief</span>
                </button>

                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                  absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                  transition-all duration-200 p-6 z-20">
                  <div className="flex space-x-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stress Relief</h3>
                      <p className="text-gray-600">Instant calm through soothing sounds and guided relaxation.</p>
                    </div>
                    <img 
                      src="https://images.pexels.com/photos/4971619/pexels-photo-4971619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Quick relief"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={() => setActiveSection(activeSection === 'breathing' ? null : 'breathing')}
                  className="w-full bg-[#8BA989] text-white p-6 rounded-xl shadow-lg
                    transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                    flex flex-col items-center space-y-3"
                >
                  <Wind size={32} />
                  <span className="font-medium">Breathing</span>
                </button>

                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                  absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                  transition-all duration-200 p-6 z-20">
                  <div className="flex space-x-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Breathing Exercises</h3>
                      <p className="text-gray-600">Master your breath to reduce stress and anxiety.</p>
                    </div>
                    <img 
                      src="https://images.pexels.com/photos/8940499/pexels-photo-8940499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Breathing"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={() => setActiveSection(activeSection === 'practical' ? null : 'practical')}
                  className="w-full bg-[#8BA989] text-white p-6 rounded-xl shadow-lg
                    transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                    flex flex-col items-center space-y-3"
                >
                  <Brain size={32} />
                  <span className="font-medium">Practical Ways</span>
                </button>

                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                  absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                  transition-all duration-200 p-6 z-20">
                  <div className="flex space-x-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Stress Relief</h3>
                      <p className="text-gray-600">Simple, effective techniques for daily stress management.</p>
                    </div>
                    <img 
                      src="https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Practical ways"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {activeSection === 'quick-relief' && (
              <div className="mt-16 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickReliefAudios.map((audio) => (
                    <div
                      key={audio.id}
                      className="bg-gradient-to-br from-[#8BA989]/80 to-[#F2C94C]/40 backdrop-blur-sm 
                        rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-white/10"
                    >
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-white">{audio.title}</h3>
                        <p className="text-sm text-white/80">{audio.duration}</p>
                      </div>
                      <AudioPlayer
                        src={audio.url}
                        onPlay={() => setCurrentAudio(`quick-relief-${audio.id}`)}
                        showJumpControls={true}
                        layout="stacked-reverse"
                        customControlsSection={defaultControlsSection}
                        customProgressBarSection={defaultProgressBarSection}
                        className="audio-player-custom rounded-md bg-transparent"
                        style={audioPlayerStyles}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-white mb-6">Time Spent Hearing Relief Music</h3>
                  {renderUsageGraph(weeklyStats.relief)}
                </div>
              </div>
            )}

            {activeSection === 'breathing' && (
              <div className="mt-16 max-w-5xl mx-auto">
                <div className="mb-12 flex justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full border-4 border-mindful-lighter" />
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-mindful transition-all duration-100"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((breathingProgress / 100) * 2 * Math.PI - Math.PI/2)}% ${50 + 50 * Math.sin((breathingProgress / 100) * 2 * Math.PI - Math.PI/2)}%, 50% 50%)`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-medium text-mindful-dark">
                        {breathingPhase === 'in' ? 'Breathe In' : 'Breathe Out'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {breathingAudios.map((audio) => (
                    <div
                      key={audio.id}
                      className="bg-gradient-to-br from-[#8BA989]/80 to-[#F2C94C]/40 backdrop-blur-sm 
                        rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-white/10"
                    >
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-white">{audio.title}</h3>
                        <p className="text-sm text-white/80">{audio.duration}</p>
                      </div>
                      <AudioPlayer
                        src={audio.url}
                        onPlay={() => setCurrentAudio(`breathing-${audio.id}`)}
                        showJumpControls={true}
                        layout="stacked-reverse"
                        customControlsSection={defaultControlsSection}
                        customProgressBarSection={defaultProgressBarSection}
                        className="audio-player-custom rounded-md bg-transparent"
                        style={audioPlayerStyles}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-white mb-6">Time Spent on Guided Breathing</h3>
                  {renderUsageGraph(weeklyStats.breathing)}
                </div>
              </div>
            )}

            {activeSection === 'practical' && (
              <div className="mt-16 max-w-5xl mx-auto">
                <div className="space-y-4">
                  {practicalWays.map((way, index) => (
                    <button
                      key={index}
                      className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
                        flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-mindful-lighter flex items-center justify-center">
                        <span className="text-mindful-dark font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900">{way.title}</h3>
                        <p className="text-sm text-gray-500">{way.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-12">
                  <img 
                    src="src/pages/images/STRESS_PAGE_END_PHOTO.jpg"
                    alt="Peaceful nature"
                    className="w-full h-[20vh] object-cover rounded-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="bg-gradient-to-b from-transparent to-white/80 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
            <p>© 2024 Mindfulness App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default StressAndAnxiety;
