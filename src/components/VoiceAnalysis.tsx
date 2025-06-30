import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Volume2, BarChart3, Timer, CheckCircle, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';

interface VoiceAnalysisProps {
  onAnalysisComplete: (profile: any) => void;
}

const VoiceAnalysis: React.FC<VoiceAnalysisProps> = ({ onAnalysisComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [voiceMetrics, setVoiceMetrics] = useState({
    pitch: 0,
    volume: 0,
    pace: 0,
    clarity: 0,
    confidence: 0,
    articulation: 0,
    tonalVariety: 0,
    fillerWords: 0
  });

  const analysisSteps = [
    {
      title: "Introduction Reading",
      instruction: "Please read the following text naturally, as if introducing yourself in a professional meeting:",
      text: "Hello, my name is [Your Name]. I'm excited to be here today to discuss new opportunities and share my experience in [Your Field]. I believe effective communication is key to success in any professional environment."
    },
    {
      title: "Impromptu Speaking",
      instruction: "Speak for 30 seconds about your career goals or business objectives:",
      text: "Take a moment to think, then speak naturally about where you see yourself professionally in the next 2-3 years."
    },
    {
      title: "Presentation Style",
      instruction: "Imagine you're presenting to a team. Explain a recent project or achievement:",
      text: "Describe a project you've worked on or an achievement you're proud of, as if presenting to colleagues or potential clients."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate real-time voice analysis
        updateVoiceMetrics();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const updateVoiceMetrics = () => {
    setVoiceMetrics(prev => ({
      pitch: Math.min(prev.pitch + Math.random() * 10, 85),
      volume: Math.min(prev.volume + Math.random() * 8, 78),
      pace: Math.min(prev.pace + Math.random() * 12, 82),
      clarity: Math.min(prev.clarity + Math.random() * 9, 88),
      confidence: Math.min(prev.confidence + Math.random() * 7, 75),
      articulation: Math.min(prev.articulation + Math.random() * 11, 80),
      tonalVariety: Math.min(prev.tonalVariety + Math.random() * 8, 72),
      fillerWords: Math.min(prev.fillerWords + Math.random() * 3, 15)
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setTimeout(() => {
      if (currentStep < analysisSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setRecordingTime(0);
      } else {
        completeAnalysis();
      }
    }, 1000);
  };

  const completeAnalysis = () => {
    setAnalysisComplete(true);
    
    // Generate user profile based on analysis
    const profile = {
      voiceMetrics,
      strengths: getStrengths(),
      weaknesses: getWeaknesses(),
      recommendedPath: getRecommendedPath(),
      personalityType: getPersonalityType(),
      careerFocus: getCareerFocus()
    };

    setTimeout(() => {
      onAnalysisComplete(profile);
    }, 3000);
  };

  const getStrengths = () => {
    const strengths = [];
    if (voiceMetrics.clarity > 80) strengths.push("Clear articulation");
    if (voiceMetrics.confidence > 70) strengths.push("Natural confidence");
    if (voiceMetrics.pace > 75) strengths.push("Good pacing");
    if (voiceMetrics.tonalVariety > 65) strengths.push("Expressive delivery");
    return strengths.length > 0 ? strengths : ["Consistent voice quality", "Professional tone"];
  };

  const getWeaknesses = () => {
    const weaknesses = [];
    if (voiceMetrics.pitch < 60) weaknesses.push("Pitch variation");
    if (voiceMetrics.volume < 65) weaknesses.push("Voice projection");
    if (voiceMetrics.fillerWords > 10) weaknesses.push("Filler word usage");
    if (voiceMetrics.confidence < 60) weaknesses.push("Speaking confidence");
    return weaknesses.length > 0 ? weaknesses : ["Minor pacing adjustments"];
  };

  const getPersonalityType = () => {
    const avgScore = Object.values(voiceMetrics).reduce((a, b) => a + b, 0) / Object.keys(voiceMetrics).length;
    if (avgScore > 75) return "Natural Leader";
    if (avgScore > 60) return "Collaborative Communicator";
    return "Thoughtful Presenter";
  };

  const getCareerFocus = () => {
    if (voiceMetrics.confidence > 75 && voiceMetrics.clarity > 80) return "Executive Leadership";
    if (voiceMetrics.tonalVariety > 70) return "Client Relations & Sales";
    return "Team Leadership & Management";
  };

  const getRecommendedPath = () => {
    const avgScore = Object.values(voiceMetrics).reduce((a, b) => a + b, 0) / Object.keys(voiceMetrics).length;
    if (avgScore > 75) return "Advanced Executive Communication";
    if (avgScore > 60) return "Professional Development Track";
    return "Foundation Building Program";
  };

  if (analysisComplete) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
            <p className="text-green-100 text-lg">Processing your voice profile and generating personalized roadmap...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(voiceMetrics).map(([key, value]) => (
            <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {key === 'fillerWords' ? Math.round(value) : `${Math.round(value)}%`}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${key === 'fillerWords' ? Math.min(value * 6, 100) : value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Voice Analysis Assessment</h2>
        <p className="text-slate-600">Complete our 3-step voice analysis to receive your personalized speaking roadmap</p>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Step {currentStep + 1} of {analysisSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / analysisSteps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recording Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Step */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">{currentStep + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{analysisSteps[currentStep].title}</h3>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-slate-700 font-medium mb-2">{analysisSteps[currentStep].instruction}</p>
              <p className="text-slate-600 italic">"{analysisSteps[currentStep].text}"</p>
            </div>
          </div>

          {/* Recording Controls */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="mb-6">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  isRecording ? 'bg-red-500/20 ring-4 ring-red-500/30' : 'bg-white/10'
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-white/20'
                  }`}>
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="text-3xl font-mono font-bold mb-2">
                  {formatTime(recordingTime)}
                </div>
                
                <p className="text-white/80">
                  {!isRecording ? 'Ready to record' : 'Recording your voice...'}
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
                  <button
                    onClick={handleStopRecording}
                    className="bg-slate-600 hover:bg-slate-700 px-8 py-4 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <Square className="h-5 w-5" />
                    <span>Stop & Continue</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Analysis */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Live Analysis</span>
            </h3>
            
            <div className="space-y-4">
              {Object.entries(voiceMetrics).slice(0, 6).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium capitalize text-slate-700">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-slate-600">
                      {key === 'fillerWords' ? Math.round(value) : `${Math.round(value)}%`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${key === 'fillerWords' ? Math.min(value * 6, 100) : value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>What's Next?</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-slate-700">Personalized roadmap for your career goals</p>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-slate-700">Targeted lessons based on your voice profile</p>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-slate-700">Custom practice scenarios for your industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAnalysis;