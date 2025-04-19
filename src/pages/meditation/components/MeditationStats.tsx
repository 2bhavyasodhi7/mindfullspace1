
import React, { useState, useEffect } from 'react';
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { weeklyStats } from '../../audioData1';

const MeditationStats = () => {
  const [meditationStats, setMeditationStats] = useState([
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ]);

  useEffect(() => {
    setMeditationStats(weeklyStats);
  }, []);

  return (
    <div 
      className="bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden shadow-lg"
      style={{ 
        backgroundImage: `url('/lovable-uploads/3a0d229f-22c2-46f9-9aec-6cf2e97f5d1f.png')`,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255,255,255,0.2)'
      }}
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Your Meditation Progress</h2>
        <div className="h-80">
          <ChartContainer
            config={{
              hours: {
                label: "Meditation Hours",
                color: "#73A580"
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={meditationStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: 'white' }} 
                  axisLine={{ stroke: 'white' }}
                />
                <YAxis 
                  label={{ 
                    value: 'Hours', 
                    angle: -90, 
                    position: 'insideLeft', 
                    fill: 'white' 
                  }} 
                  tick={{ fill: 'white' }}
                  axisLine={{ stroke: 'white' }}
                />
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
      </div>
    </div>
  );
};

export default MeditationStats;
