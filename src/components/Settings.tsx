import React, { useState } from 'react';
import { User, Bell, Mic, Palette, Globe, Shield, Save } from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      experience: 'intermediate',
      goals: 'confidence'
    },
    preferences: {
      theme: 'light',
      language: 'english',
      difficultyLevel: 'intermediate',
      focusAreas: ['voice', 'body-language']
    },
    notifications: {
      practiceReminders: true,
      goalDeadlines: true,
      weeklyProgress: true,
      achievements: true
    },
    voice: {
      sensitivity: 70,
      noiseReduction: true,
      autoDetectPauses: true,
      feedbackDelay: 'real-time'
    }
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      color: 'blue'
    },
    {
      id: 'preferences',
      title: 'Learning Preferences',
      icon: Palette,
      color: 'teal'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'orange'
    },
    {
      id: 'voice',
      title: 'Voice Analysis',
      icon: Mic,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings</h2>
        <p className="text-slate-600">Customize your learning experience and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Categories</span>
            </div>
            <div className="p-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Profile Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
                <select
                  value={settings.profile.experience}
                  onChange={(e) => updateSetting('profile', 'experience', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Goal</label>
                <select
                  value={settings.profile.goals}
                  onChange={(e) => updateSetting('profile', 'goals', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="confidence">Build Confidence</option>
                  <option value="skills">Improve Skills</option>
                  <option value="career">Career Development</option>
                  <option value="personal">Personal Growth</option>
                </select>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Palette className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Learning Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Focus Areas</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'voice', label: 'Voice Control' },
                  { id: 'body-language', label: 'Body Language' },
                  { id: 'storytelling', label: 'Storytelling' },
                  { id: 'confidence', label: 'Confidence' }
                ].map((area) => (
                  <label key={area.id} className="flex items-center space-x-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.preferences.focusAreas.includes(area.id)}
                      onChange={(e) => {
                        const newAreas = e.target.checked
                          ? [...settings.preferences.focusAreas, area.id]
                          : settings.preferences.focusAreas.filter(a => a !== area.id);
                        updateSetting('preferences', 'focusAreas', newAreas);
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{area.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-slate-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {key === 'practiceReminders' && 'Get reminded to practice daily'}
                      {key === 'goalDeadlines' && 'Notifications about upcoming goal deadlines'}
                      {key === 'weeklyProgress' && 'Weekly summary of your progress'}
                      {key === 'achievements' && 'Celebrate when you earn new achievements'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Mic className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Voice Analysis</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Microphone Sensitivity: {settings.voice.sensitivity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.voice.sensitivity}
                  onChange={(e) => updateSetting('voice', 'sensitivity', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-slate-900">Noise Reduction</h4>
                    <p className="text-sm text-slate-600">Filter background noise</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.voice.noiseReduction}
                      onChange={(e) => updateSetting('voice', 'noiseReduction', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-slate-900">Auto-detect Pauses</h4>
                    <p className="text-sm text-slate-600">Automatically identify speech pauses</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.voice.autoDetectPauses}
                      onChange={(e) => updateSetting('voice', 'autoDetectPauses', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;