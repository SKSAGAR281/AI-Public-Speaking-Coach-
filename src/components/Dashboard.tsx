import React from 'react';
import { TrendingUp, Clock, Target, Award, Mic, Users, ArrowRight, Briefcase, Star, CheckCircle } from 'lucide-react';

interface DashboardProps {
  userProfile?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Complete voice analysis to view your dashboard</p>
      </div>
    );
  }

  const roadmapSteps = [
    {
      title: "Foundation Skills",
      description: "Master basic voice control and clarity",
      duration: "2-3 weeks",
      status: "current",
      lessons: ["Voice Projection", "Clear Articulation", "Breathing Techniques"]
    },
    {
      title: "Professional Presence",
      description: "Develop confident speaking style",
      duration: "3-4 weeks", 
      status: "upcoming",
      lessons: ["Body Language", "Eye Contact", "Professional Tone"]
    },
    {
      title: "Advanced Communication",
      description: "Leadership and persuasion skills",
      duration: "4-5 weeks",
      status: "upcoming", 
      lessons: ["Storytelling", "Audience Engagement", "Persuasive Speaking"]
    },
    {
      title: "Executive Mastery",
      description: "High-level presentation skills",
      duration: "3-4 weeks",
      status: "upcoming",
      lessons: ["Executive Presence", "Crisis Communication", "Media Training"]
    }
  ];

  const careerApplications = [
    {
      scenario: "Job Interviews",
      confidence: 85,
      description: "Articulate your value proposition clearly",
      nextStep: "Practice behavioral questions"
    },
    {
      scenario: "Team Meetings", 
      confidence: 78,
      description: "Lead discussions and present ideas",
      nextStep: "Work on interruption handling"
    },
    {
      scenario: "Client Presentations",
      confidence: 72,
      description: "Deliver compelling business proposals", 
      nextStep: "Improve storytelling techniques"
    },
    {
      scenario: "Networking Events",
      confidence: 68,
      description: "Make memorable first impressions",
      nextStep: "Practice elevator pitches"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Voice Profile Summary */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Voice Profile</h2>
            <p className="text-blue-100 text-lg mb-4">
              Personality Type: <span className="font-semibold">{userProfile.personalityType}</span>
            </p>
            <p className="text-blue-100 mb-6">
              Recommended Focus: <span className="font-semibold">{userProfile.careerFocus}</span>
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm">Strengths:</span>
              {userProfile.strengths.map((strength: string, index: number) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {strength}
                </span>
              ))}
            </div>
            
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200">
              View Detailed Analysis
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Mic className="h-16 w-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Roadmap */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Your Personalized Roadmap</h3>
            <p className="text-slate-600">Path: {userProfile.recommendedPath}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-orange-800">16 weeks total</span>
          </div>
        </div>

        <div className="space-y-4">
          {roadmapSteps.map((step, index) => (
            <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              step.status === 'current' 
                ? 'border-blue-200 bg-blue-50' 
                : step.status === 'completed'
                ? 'border-green-200 bg-green-50'
                : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === 'current' ? 'bg-blue-500' :
                    step.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{step.title}</h4>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-600">{step.duration}</span>
                  {step.status === 'current' && (
                    <div className="text-xs text-blue-600 font-medium mt-1">In Progress</div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {step.lessons.map((lesson, lessonIndex) => (
                  <span key={lessonIndex} className="text-xs bg-white px-2 py-1 rounded-full text-slate-600 border">
                    {lesson}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Applications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Career Applications</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
            <span>Practice Scenarios</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerApplications.map((app, index) => (
            <div key={index} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900">{app.scenario}</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    app.confidence > 80 ? 'bg-green-500' :
                    app.confidence > 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-600">{app.confidence}%</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">{app.description}</p>
              
              <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    app.confidence > 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    app.confidence > 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${app.confidence}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-slate-500">
                Next: {app.nextStep}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-left hover:shadow-md transition-all duration-200">
          <Briefcase className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-2">Practice Interview</h4>
          <p className="text-sm text-slate-600">Simulate job interview scenarios</p>
        </button>
        
        <button className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl text-left hover:shadow-md transition-all duration-200">
          <Users className="h-8 w-8 text-teal-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-2">Team Presentation</h4>
          <p className="text-sm text-slate-600">Practice presenting to colleagues</p>
        </button>
        
        <button className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-left hover:shadow-md transition-all duration-200">
          <Star className="h-8 w-8 text-orange-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-2">Elevator Pitch</h4>
          <p className="text-sm text-slate-600">Perfect your 30-second introduction</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;