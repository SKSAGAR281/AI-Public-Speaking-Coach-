import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Square, Volume2, BarChart3, Timer } from 'lucide-react';

const Practice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [scenario, setScenario] = useState('presentation');

  const scenarios = [
    { id: 'presentation', label: 'Business Presentation', audience: '20-50 people' },
    { id: 'interview', label: 'Job Interview', audience: '2-5 people' },
    { id: 'wedding', label: 'Wedding Speech', audience: '50-100 people' },
    { id: 'conference', label: 'Conference Talk', audience: '100+ people' },
    { id: 'meeting', label: 'Team Meeting', audience: '5-15 people' }
  ];

  const voiceMetrics = {
    pitch: 78,
    volume: 65,
    pace: 145,
    clarity: 92,
    fillerWords: 3,
    pauses: 12
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Speech Practice</h2>
        <p className="text-slate-600">Practice your speeches with real-time AI feedback and analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scenario Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Choose Practice Scenario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScenario(s.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    scenario === s.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-medium text-slate-900">{s.label}</h4>
                  <p className="text-sm text-slate-600">Audience: {s.audience}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recording Interface */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="mb-6">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  isRecording ? 'bg-red-500/20 ring-4 ring-red-500/30' : 'bg-white/10'
                }`}>
                  {isRecording ? (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
                    }`}>
                      <Mic className="h-8 w-8 text-white" />
                    </div>
                  ) : (
                    <Mic className="h-16 w-16 text-white/60" />
                  )}
                </div>
                
                <div className="text-3xl font-mono font-bold mb-2">
                  {formatTime(recordingTime)}
                </div>
                
                <p className="text-white/80">
                  {!isRecording ? 'Ready to practice' : isPaused ? 'Recording paused' : 'Recording in progress...'}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <Mic className="h-5 w-5" />
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePauseRecording}
                      className="bg-yellow-500 hover:bg-yellow-600 px-6 py-4 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                      <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                    <button
                      onClick={handleStopRecording}
                      className="bg-slate-600 hover:bg-slate-700 px-6 py-4 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <Square className="h-5 w-5" />
                      <span>Stop</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Feedback */}
        <div className="space-y-6">
          {/* Voice Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Voice Analysis</span>
            </h3>
            
            <div className="space-y-4">
              {Object.entries(voiceMetrics).map(([key, value]) => {
                const getColor = (metric: string, val: number) => {
                  if (metric === 'fillerWords') return val < 5 ? 'green' : val < 10 ? 'yellow' : 'red';
                  if (metric === 'clarity') return val > 85 ? 'green' : val > 70 ? 'yellow' : 'red';
                  return val > 70 ? 'green' : val > 50 ? 'yellow' : 'red';
                };
                
                const color = getColor(key, value);
                const colorClasses = {
                  green: 'bg-green-500',
                  yellow: 'bg-yellow-500',
                  red: 'bg-red-500'
                };

                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium capitalize text-slate-700">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-slate-600">
                        {key === 'pace' ? `${value} WPM` : 
                         key === 'fillerWords' || key === 'pauses' ? value : `${value}%`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
                        style={{ width: `${key === 'fillerWords' ? Math.min(value * 10, 100) : 
                                       key === 'pauses' ? Math.min(value * 8, 100) : value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips & Suggestions */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Real-time Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">Great job maintaining clear articulation!</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">Try to slow down slightly - your current pace is 145 WPM.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">Consider adding more pauses for emphasis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;