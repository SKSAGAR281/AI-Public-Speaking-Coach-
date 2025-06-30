import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, Mic, CheckCircle, ArrowLeft, ArrowRight, Timer, Target } from 'lucide-react';

interface VoiceLessonPlayerProps {
  lesson: any;
  onComplete: () => void;
  onClose: () => void;
}

const VoiceLessonPlayer: React.FC<VoiceLessonPlayerProps> = ({ lesson, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stepProgress, setStepProgress] = useState<boolean[]>(new Array(lesson.steps?.length || 0).fill(false));
  const [voiceMetrics, setVoiceMetrics] = useState({
    clarity: 0,
    volume: 0,
    pace: 0,
    confidence: 0
  });

  const steps = lesson.steps || [
    {
      type: 'instruction',
      title: 'Welcome to the Lesson',
      content: 'In this lesson, you will learn the fundamentals of voice improvement.',
      duration: 30
    },
    {
      type: 'demonstration',
      title: 'Voice Technique Demo',
      content: 'Listen to the proper technique demonstration.',
      audioDescription: 'Demonstration of proper breathing and voice projection',
      duration: 45
    },
    {
      type: 'practice',
      title: 'Your Turn to Practice',
      content: 'Now practice the technique yourself. Record your voice and receive feedback.',
      exercise: 'Practice diaphragmatic breathing while speaking this phrase: "My voice is strong and clear."',
      duration: 60
    },
    {
      type: 'feedback',
      title: 'Voice Analysis',
      content: 'Review your performance and get personalized feedback.',
      duration: 30
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        updateVoiceMetrics();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const updateVoiceMetrics = () => {
    setVoiceMetrics(prev => ({
      clarity: Math.min(prev.clarity + Math.random() * 5, 95),
      volume: Math.min(prev.volume + Math.random() * 4, 88),
      pace: Math.min(prev.pace + Math.random() * 6, 92),
      confidence: Math.min(prev.confidence + Math.random() * 3, 85)
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = () => {
    const newProgress = [...stepProgress];
    newProgress[currentStep] = true;
    setStepProgress(newProgress);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setTimeout(() => {
      handleStepComplete();
    }, 1000);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{lesson.title}</h2>
              <p className="text-blue-100">Step {currentStep + 1} of {steps.length}: {currentStepData.title}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step Content */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{currentStepData.title}</h3>
                <p className="text-slate-700 mb-4">{currentStepData.content}</p>
                
                {currentStepData.type === 'demonstration' && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Volume2 className="h-6 w-6 text-blue-600" />
                      <span className="font-medium text-blue-900">Audio Demonstration</span>
                    </div>
                    <p className="text-blue-800 text-sm mb-4">{currentStepData.audioDescription}</p>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      <span>{isPlaying ? 'Pause' : 'Play'} Demo</span>
                    </button>
                  </div>
                )}

                {currentStepData.type === 'practice' && (
                  <div className="bg-green-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mic className="h-6 w-6 text-green-600" />
                      <span className="font-medium text-green-900">Practice Exercise</span>
                    </div>
                    <p className="text-green-800 text-sm mb-4">{currentStepData.exercise}</p>
                    
                    {/* Recording Interface */}
                    <div className="bg-white rounded-xl p-4">
                      <div className="text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                          isRecording ? 'bg-red-500/20 ring-4 ring-red-500/30' : 'bg-slate-100'
                        }`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'
                          }`}>
                            <Mic className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        <div className="text-2xl font-mono font-bold mb-2">
                          {formatTime(recordingTime)}
                        </div>
                        
                        <div className="flex items-center justify-center space-x-4">
                          {!isRecording ? (
                            <button
                              onClick={handleStartRecording}
                              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                            >
                              <Mic className="h-5 w-5" />
                              <span>Start Practice</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleStopRecording}
                              className="bg-slate-600 hover:bg-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                            >
                              <Square className="h-5 w-5" />
                              <span>Complete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData.type === 'feedback' && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-purple-600" />
                      <span className="font-medium text-purple-900">Your Performance</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(voiceMetrics).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg p-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium capitalize text-slate-700">{key}</span>
                            <span className="text-slate-600">{Math.round(value)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {currentStepData.type !== 'practice' && (
                  <button
                    onClick={handleStepComplete}
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>{currentStep === steps.length - 1 ? 'Complete Lesson' : 'Next Step'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lesson Overview */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3">Lesson Steps</h4>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                      index === currentStep ? 'bg-blue-50 text-blue-700' : 
                      stepProgress[index] ? 'bg-green-50 text-green-700' : 'text-slate-600'
                    }`}>
                      {stepProgress[index] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : index === currentStep ? (
                        <div className="w-5 h-5 border-2 border-blue-500 rounded-full"></div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-3">💡 Pro Tips</h4>
                <div className="space-y-2 text-sm text-orange-800">
                  <p>• Find a quiet space for best results</p>
                  <p>• Speak naturally, don't force it</p>
                  <p>• Focus on consistency over perfection</p>
                  <p>• Practice regularly for best improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceLessonPlayer;