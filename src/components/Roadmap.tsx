import React, { useState } from 'react';
import { CheckCircle, Clock, Target, Star, ArrowRight, Play, Lock, Trophy, Calendar } from 'lucide-react';

interface RoadmapProps {
  userProfile?: any;
}

const Roadmap: React.FC<RoadmapProps> = ({ userProfile }) => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Complete voice analysis to view your personalized roadmap</p>
      </div>
    );
  }

  const roadmapPhases = [
    {
      id: 0,
      title: "Foundation Skills",
      description: "Master basic voice control and clarity",
      duration: "2-3 weeks",
      status: "current",
      progress: 25,
      color: "blue",
      modules: [
        {
          title: "Voice Projection Fundamentals",
          lessons: ["Diaphragmatic Breathing", "Vocal Warm-ups", "Volume Control"],
          duration: "45 min",
          completed: true
        },
        {
          title: "Clear Articulation",
          lessons: ["Consonant Precision", "Vowel Clarity", "Tongue Twisters"],
          duration: "40 min",
          completed: true
        },
        {
          title: "Breathing Techniques",
          lessons: ["Breath Support", "Pacing with Breath", "Relaxation Methods"],
          duration: "35 min",
          completed: false
        },
        {
          title: "Posture & Alignment",
          lessons: ["Standing Posture", "Seated Speaking", "Body Awareness"],
          duration: "30 min",
          completed: false
        }
      ]
    },
    {
      id: 1,
      title: "Professional Presence",
      description: "Develop confident speaking style",
      duration: "3-4 weeks",
      status: "upcoming",
      progress: 0,
      color: "teal",
      modules: [
        {
          title: "Confident Body Language",
          lessons: ["Eye Contact Mastery", "Gesture Control", "Spatial Awareness"],
          duration: "50 min",
          completed: false
        },
        {
          title: "Professional Tone",
          lessons: ["Authority Building", "Warmth & Approachability", "Tone Variation"],
          duration: "45 min",
          completed: false
        },
        {
          title: "Pace & Rhythm",
          lessons: ["Strategic Pausing", "Emphasis Techniques", "Flow Control"],
          duration: "40 min",
          completed: false
        },
        {
          title: "Vocal Variety",
          lessons: ["Pitch Modulation", "Dynamic Range", "Emotional Expression"],
          duration: "55 min",
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Communication",
      description: "Leadership and persuasion skills",
      duration: "4-5 weeks",
      status: "locked",
      progress: 0,
      color: "orange",
      modules: [
        {
          title: "Storytelling Mastery",
          lessons: ["Narrative Structure", "Emotional Hooks", "Visual Language"],
          duration: "60 min",
          completed: false
        },
        {
          title: "Audience Engagement",
          lessons: ["Reading the Room", "Interactive Techniques", "Q&A Handling"],
          duration: "55 min",
          completed: false
        },
        {
          title: "Persuasive Speaking",
          lessons: ["Logical Arguments", "Emotional Appeals", "Call to Action"],
          duration: "50 min",
          completed: false
        },
        {
          title: "Handling Difficult Situations",
          lessons: ["Objection Management", "Conflict Resolution", "Crisis Communication"],
          duration: "45 min",
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "Executive Mastery",
      description: "High-level presentation skills",
      duration: "3-4 weeks",
      status: "locked",
      progress: 0,
      color: "purple",
      modules: [
        {
          title: "Executive Presence",
          lessons: ["Leadership Voice", "Gravitas Development", "Command Techniques"],
          duration: "65 min",
          completed: false
        },
        {
          title: "Strategic Communication",
          lessons: ["Vision Casting", "Change Management", "Stakeholder Alignment"],
          duration: "60 min",
          completed: false
        },
        {
          title: "Media & Public Speaking",
          lessons: ["Interview Techniques", "Press Conferences", "Public Appearances"],
          duration: "70 min",
          completed: false
        },
        {
          title: "Advanced Facilitation",
          lessons: ["Meeting Leadership", "Workshop Facilitation", "Panel Discussions"],
          duration: "55 min",
          completed: false
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current': return <Play className="h-6 w-6 text-blue-500" />;
      case 'upcoming': return <Clock className="h-6 w-6 text-orange-500" />;
      case 'locked': return <Lock className="h-6 w-6 text-slate-400" />;
      default: return <Target className="h-6 w-6 text-slate-400" />;
    }
  };

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }
    };
    return colors[color as keyof typeof colors]?.[variant] || colors.blue[variant];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Learning Roadmap</h2>
            <p className="text-slate-600">Personalized path: {userProfile.recommendedPath}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-xs text-slate-600">Total Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">25%</div>
              <div className="text-xs text-slate-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Overall Progress</h3>
          <Trophy className="h-8 w-8 text-yellow-300" />
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-blue-100">
          <span>Foundation Skills in progress</span>
          <span>25% of total roadmap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Learning Phases</h3>
            </div>
            <div className="p-2">
              {roadmapPhases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(index)}
                  disabled={phase.status === 'locked'}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 mb-2 ${
                    selectedPhase === index
                      ? `${getColorClasses(phase.color, 'bg')} ${getColorClasses(phase.color, 'border')} border-2`
                      : phase.status === 'locked'
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(phase.status)}
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{phase.title}</h4>
                      <p className="text-xs text-slate-600">{phase.duration}</p>
                    </div>
                  </div>
                  {phase.progress > 0 && (
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className={`bg-gradient-to-r from-${phase.color}-500 to-${phase.color}-600 h-1.5 rounded-full transition-all duration-300`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{roadmapPhases[selectedPhase].title}</h3>
                <p className="text-slate-600">{roadmapPhases[selectedPhase].description}</p>
              </div>
              <div className={`px-4 py-2 rounded-full ${getColorClasses(roadmapPhases[selectedPhase].color, 'bg')}`}>
                <span className={`text-sm font-medium ${getColorClasses(roadmapPhases[selectedPhase].color, 'text')}`}>
                  {roadmapPhases[selectedPhase].duration}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {roadmapPhases[selectedPhase].modules.map((module, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  module.completed 
                    ? 'border-green-200 bg-green-50' 
                    : roadmapPhases[selectedPhase].status === 'locked'
                    ? 'border-slate-200 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : roadmapPhases[selectedPhase].status === 'locked' ? (
                        <Lock className="h-6 w-6 text-slate-400" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 ${getColorClasses(roadmapPhases[selectedPhase].color, 'border')}`}></div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900">{module.title}</h4>
                        <p className="text-sm text-slate-600">{module.duration}</p>
                      </div>
                    </div>
                    {roadmapPhases[selectedPhase].status !== 'locked' && (
                      <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        module.completed
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r from-${roadmapPhases[selectedPhase].color}-500 to-${roadmapPhases[selectedPhase].color}-600 text-white hover:from-${roadmapPhases[selectedPhase].color}-600 hover:to-${roadmapPhases[selectedPhase].color}-700`
                      }`}>
                        {module.completed ? 'Review' : 'Start'}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <span key={lessonIndex} className={`text-xs px-2 py-1 rounded-full ${
                        module.completed 
                          ? 'bg-green-100 text-green-700'
                          : roadmapPhases[selectedPhase].status === 'locked'
                          ? 'bg-slate-100 text-slate-500'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lesson}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">16</div>
              <div className="text-sm text-blue-700">Total Modules</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">2</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-900">2</div>
              <div className="text-sm text-orange-700">In Progress</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">12</div>
              <div className="text-sm text-purple-700">Weeks Left</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;