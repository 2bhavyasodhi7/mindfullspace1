
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Settings, Calendar, Award } from 'lucide-react';
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem('profileImage'));
  const [name, setName] = useState(localStorage.getItem('userName') || 'User Name');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image Section */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-mindful">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-mindful text-white text-3xl">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-mindful text-white p-2 rounded-full cursor-pointer">
              <Camera size={16} />
              <input 
                type="file" 
                id="profile-image" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Premium Member</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Edit Profile
              </Button>
              <Button className="bg-mindful hover:bg-mindful-dark flex items-center gap-2">
                <Calendar size={16} />
                Schedule Session
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-4 text-center">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">Meditation Minutes</h3>
            <p className="text-3xl font-bold mt-2">120</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">Completed Sessions</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">Mindfulness Score</h3>
            <p className="text-3xl font-bold mt-2">85</p>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award size={20} className="text-mindful" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { title: "Completed Deep Sleep Meditation", date: "Yesterday", duration: "15 min" },
              { title: "Started Stress Reduction Program", date: "3 days ago", duration: "30 min" },
              { title: "Completed Yoga Session", date: "1 week ago", duration: "45 min" }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                </div>
                <span className="bg-mindful-lighter text-mindful-dark px-3 py-1 rounded-full text-sm">
                  {activity.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
