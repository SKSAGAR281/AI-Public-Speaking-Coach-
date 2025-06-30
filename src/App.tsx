import React, { useState } from 'react';
import { Mic, BarChart3, Settings, Play, Map, BookOpen } from 'lucide-react';
import VoiceAnalysis from './components/VoiceAnalysis';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Roadmap from './components/Roadmap';
import Lessons from './components/Lessons';
import SettingsPanel from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('voice-analysis');
  const [voiceAnalysisComplete, setVoiceAnalysisComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const navigation = [
    { id: 'voice-analysis', label: 'Voice Analysis', icon: Mic, disabled: false },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, disabled: !voiceAnalysisComplete },
    { id: 'roadmap', label: 'Roadmap', icon: Map, disabled: !voiceAnalysisComplete },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, disabled: !voiceAnalysisComplete },
    { id: 'practice', label: 'Practice', icon: Play, disabled: !voiceAnalysisComplete },
    { id: 'settings', label: 'Settings', icon: Settings, disabled: !voiceAnalysisComplete },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'voice-analysis':
        return <VoiceAnalysis 
          onAnalysisComplete={(profile) => {
            setUserProfile(profile);
            setVoiceAnalysisComplete(true);
            setActiveTab('dashboard');
          }} 
        />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'roadmap':
        return <Roadmap userProfile={userProfile} />;
      case 'lessons':
        return <Lessons userProfile={userProfile} />;
      case 'practice':
        return <Practice />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <VoiceAnalysis onAnalysisComplete={(profile) => {
          setUserProfile(profile);
          setVoiceAnalysisComplete(true);
          setActiveTab('dashboard');
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SpeakAI Coach</h1>
                <p className="text-xs text-slate-600">AI-Powered Speaking Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {voiceAnalysisComplete && (
                <div className="bg-gradient-to-r from-green-100 to-green-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-green-800">Analysis Complete</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <span className="text-sm font-medium text-slate-600">Navigation</span>
              </div>
              <div className="p-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => !item.disabled && setActiveTab(item.id)}
                      disabled={item.disabled}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 shadow-sm'
                          : item.disabled
                          ? 'text-slate-400 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.disabled && (
                        <div className="w-2 h-2 bg-slate-300 rounded-full ml-auto"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;