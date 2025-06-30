import React, { useState } from 'react';
import { Play, CheckCircle, Clock, Star, Volume2, Mic, Target, ArrowRight, BookOpen, Award, Lock, Trophy } from 'lucide-react';
import VoiceLessonPlayer from './VoiceLessonPlayer';

interface LessonsProps {
  userProfile?: any;
}

const Lessons: React.FC<LessonsProps> = ({ userProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('foundation');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [playingLesson, setPlayingLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Complete voice analysis to access personalized lessons</p>
      </div>
    );
  }

  const categories = [
    { id: 'foundation', label: 'Foundation Skills', color: 'blue', unlocked: true, progress: 50 },
    { id: 'professional', label: 'Professional Presence', color: 'teal', unlocked: true, progress: 0 },
    { id: 'advanced', label: 'Advanced Communication', color: 'orange', unlocked: false, progress: 0 },
    { id: 'executive', label: 'Executive Mastery', color: 'purple', unlocked: false, progress: 0 }
  ];

  const lessons = {
    foundation: [
      {
        id: 1,
        title: "Diaphragmatic Breathing Mastery",
        description: "Learn the foundation of powerful voice projection through proper breathing techniques",
        duration: "15 min",
        difficulty: "Beginner",
        completed: true,
        rating: 4.9,
        keyPoints: ["Breath support fundamentals", "Diaphragm control exercises", "Breathing rhythm"],
        exercises: [
          "4-7-8 Breathing technique",
          "Diaphragm strengthening",
          "Breath control while speaking"
        ],
        voiceImprovement: ["Volume control", "Vocal stamina", "Reduced strain"],
        steps: [
          {
            type: 'instruction',
            title: 'Understanding Diaphragmatic Breathing',
            content: 'Diaphragmatic breathing is the foundation of powerful voice projection. Your diaphragm is a large muscle that sits below your lungs and helps control your breathing.',
            duration: 30
          },
          {
            type: 'demonstration',
            title: 'Proper Breathing Technique',
            content: 'Listen to how proper diaphragmatic breathing sounds and feels.',
            audioDescription: 'Demonstration of deep, controlled breathing with voice projection',
            duration: 45
          },
          {
            type: 'practice',
            title: 'Practice Diaphragmatic Breathing',
            content: 'Now it\'s your turn to practice. Place one hand on your chest and one on your stomach.',
            exercise: 'Breathe deeply so that your stomach hand moves more than your chest hand. Then say: "My voice comes from deep within, strong and clear."',
            duration: 90
          },
          {
            type: 'practice',
            title: 'Breathing While Speaking',
            content: 'Practice maintaining diaphragmatic breathing while speaking longer phrases.',
            exercise: 'Using your diaphragmatic breathing, read this passage: "Effective communication starts with proper breath support. When I breathe from my diaphragm, my voice becomes more powerful and controlled."',
            duration: 120
          },
          {
            type: 'feedback',
            title: 'Performance Analysis',
            content: 'Review your breathing technique and voice quality.',
            duration: 30
          }
        ]
      },
      {
        id: 2,
        title: "Clear Articulation Techniques",
        description: "Master consonant precision and vowel clarity for crystal-clear speech",
        duration: "18 min",
        difficulty: "Beginner",
        completed: true,
        rating: 4.8,
        keyPoints: ["Consonant precision", "Vowel clarity", "Tongue positioning"],
        exercises: [
          "Tongue twisters progression",
          "Consonant drills",
          "Vowel shaping exercises"
        ],
        voiceImprovement: ["Speech clarity", "Professional sound", "Confidence boost"],
        steps: [
          {
            type: 'instruction',
            title: 'The Importance of Clear Articulation',
            content: 'Clear articulation ensures your message is understood. It involves precise movement of your tongue, lips, and jaw.',
            duration: 30
          },
          {
            type: 'demonstration',
            title: 'Consonant Precision Demo',
            content: 'Listen to examples of crisp consonant sounds.',
            audioDescription: 'Demonstration of precise P, B, T, D, K, G sounds',
            duration: 40
          },
          {
            type: 'practice',
            title: 'Consonant Drills',
            content: 'Practice these consonant combinations for clarity.',
            exercise: 'Repeat clearly: "Peter Piper picked a peck of pickled peppers. Betty bought butter but the butter was bitter."',
            duration: 60
          },
          {
            type: 'practice',
            title: 'Vowel Clarity Exercise',
            content: 'Focus on clear vowel sounds for professional speech.',
            exercise: 'Practice these vowel sounds with clear distinction: "The quick brown fox jumps over the lazy dog. How now brown cow."',
            duration: 90
          },
          {
            type: 'feedback',
            title: 'Articulation Assessment',
            content: 'Analysis of your consonant precision and vowel clarity.',
            duration: 30
          }
        ]
      },
      {
        id: 3,
        title: "Voice Projection Fundamentals",
        description: "Project your voice effectively without strain in any environment",
        duration: "20 min",
        difficulty: "Beginner",
        completed: false,
        rating: 4.7,
        keyPoints: ["Projection techniques", "Volume without strain", "Room acoustics"],
        exercises: [
          "Distance projection drills",
          "Volume scaling exercises",
          "Resonance building"
        ],
        voiceImprovement: ["Commanding presence", "Audience reach", "Vocal power"],
        steps: [
          {
            type: 'instruction',
            title: 'Understanding Voice Projection',
            content: 'Voice projection is about reaching your audience without straining your vocal cords. It combines breath support, resonance, and proper technique.',
            duration: 30
          },
          {
            type: 'demonstration',
            title: 'Projection vs. Shouting',
            content: 'Learn the difference between healthy projection and harmful shouting.',
            audioDescription: 'Comparison of projected voice versus strained shouting',
            duration: 45
          },
          {
            type: 'practice',
            title: 'Distance Projection',
            content: 'Practice projecting your voice to different distances.',
            exercise: 'Imagine speaking to someone 10 feet away, then 20 feet. Say: "Good morning, everyone. Thank you for being here today."',
            duration: 90
          },
          {
            type: 'practice',
            title: 'Volume Control',
            content: 'Practice controlling volume while maintaining voice quality.',
            exercise: 'Speak this sentence at three different volumes while keeping the same quality: "My voice adapts to any room size."',
            duration: 75
          },
          {
            type: 'feedback',
            title: 'Projection Analysis',
            content: 'Review your projection technique and volume control.',
            duration: 30
          }
        ]
      },
      {
        id: 4,
        title: "Posture & Voice Connection",
        description: "Understand how body alignment directly impacts voice quality and projection",
        duration: "12 min",
        difficulty: "Beginner",
        completed: false,
        rating: 4.6,
        keyPoints: ["Posture alignment", "Body-voice connection", "Standing vs sitting"],
        exercises: [
          "Posture awareness drills",
          "Alignment exercises",
          "Voice quality comparison"
        ],
        voiceImprovement: ["Better resonance", "Reduced fatigue", "Professional appearance"],
        steps: [
          {
            type: 'instruction',
            title: 'Posture and Voice Quality',
            content: 'Your posture directly affects your breathing and voice quality. Good alignment creates space for optimal voice production.',
            duration: 30
          },
          {
            type: 'demonstration',
            title: 'Posture Impact Demo',
            content: 'Hear how posture changes voice quality.',
            audioDescription: 'Voice comparison between good and poor posture',
            duration: 30
          },
          {
            type: 'practice',
            title: 'Standing Posture Practice',
            content: 'Practice optimal standing posture for speaking.',
            exercise: 'Stand with feet shoulder-width apart, shoulders back, head aligned. Say: "I stand tall and speak with confidence."',
            duration: 45
          },
          {
            type: 'practice',
            title: 'Seated Speaking Posture',
            content: 'Learn proper posture for seated presentations.',
            exercise: 'Sit with both feet on floor, back straight, shoulders relaxed. Speak: "Even when seated, my voice projects clearly."',
            duration: 60
          },
          {
            type: 'feedback',
            title: 'Posture Assessment',
            content: 'Analysis of how posture affects your voice quality.',
            duration: 25
          }
        ]
      }
    ],
    professional: [
      {
        id: 5,
        title: "Confident Body Language",
        description: "Master non-verbal communication to enhance your vocal delivery",
        duration: "25 min",
        difficulty: "Intermediate",
        completed: false,
        rating: 4.8,
        keyPoints: ["Eye contact mastery", "Gesture coordination", "Spatial awareness"],
        exercises: [
          "Eye contact patterns",
          "Gesture timing drills",
          "Stage presence practice"
        ],
        voiceImprovement: ["Enhanced credibility", "Audience connection", "Leadership presence"],
        steps: [
          {
            type: 'instruction',
            title: 'Body Language and Voice Synergy',
            content: 'Your body language should complement and enhance your vocal message. Confident posture supports confident voice.',
            duration: 40
          },
          {
            type: 'demonstration',
            title: 'Professional Presence Demo',
            content: 'Observe how body language affects vocal perception.',
            audioDescription: 'Demonstration of confident vs. uncertain body language with voice',
            duration: 50
          },
          {
            type: 'practice',
            title: 'Eye Contact and Voice',
            content: 'Practice maintaining eye contact while speaking confidently.',
            exercise: 'Look directly ahead (imagine eye contact) and speak: "I connect with my audience through confident eye contact and clear communication."',
            duration: 90
          },
          {
            type: 'practice',
            title: 'Gesture Coordination',
            content: 'Coordinate hand gestures with your vocal emphasis.',
            exercise: 'Use appropriate gestures while saying: "We have three main objectives: first, to inform; second, to engage; and third, to inspire action."',
            duration: 120
          },
          {
            type: 'feedback',
            title: 'Presence Analysis',
            content: 'Review your body language and vocal coordination.',
            duration: 30
          }
        ]
      },
      {
        id: 6,
        title: "Professional Tone Development",
        description: "Develop authority and warmth in your professional speaking voice",
        duration: "22 min",
        difficulty: "Intermediate",
        completed: false,
        rating: 4.9,
        keyPoints: ["Authority building", "Warmth balance", "Tone consistency"],
        exercises: [
          "Authority tone practice",
          "Warmth calibration",
          "Situational tone shifts"
        ],
        voiceImprovement: ["Executive presence", "Trustworthiness", "Influence"],
        steps: [
          {
            type: 'instruction',
            title: 'Professional Tone Balance',
            content: 'Professional tone combines authority with approachability. You want to sound competent yet warm.',
            duration: 35
          },
          {
            type: 'demonstration',
            title: 'Authority vs. Warmth',
            content: 'Listen to examples of authoritative and warm tones.',
            audioDescription: 'Comparison of authoritative, warm, and balanced professional tones',
            duration: 45
          },
          {
            type: 'practice',
            title: 'Authority Building',
            content: 'Practice speaking with confident authority.',
            exercise: 'Speak with authority: "Based on our analysis, I recommend we proceed with option two. This approach will deliver the best results."',
            duration: 75
          },
          {
            type: 'practice',
            title: 'Warmth and Approachability',
            content: 'Add warmth while maintaining professionalism.',
            exercise: 'Speak warmly but professionally: "I\'m excited to work with this team. Together, we can achieve remarkable results."',
            duration: 90
          },
          {
            type: 'feedback',
            title: 'Tone Assessment',
            content: 'Analysis of your professional tone balance.',
            duration: 30
          }
        ]
      }
    ],
    advanced: [
      {
        id: 7,
        title: "Storytelling Voice Mastery",
        description: "Use vocal variety to bring stories to life and captivate audiences",
        duration: "30 min",
        difficulty: "Advanced",
        completed: false,
        rating: 4.9,
        keyPoints: ["Narrative pacing", "Character voices", "Emotional range"],
        exercises: [
          "Story arc vocalization",
          "Character voice development",
          "Emotional transition practice"
        ],
        voiceImprovement: ["Audience engagement", "Memorable delivery", "Persuasive power"],
        steps: [
          {
            type: 'instruction',
            title: 'The Power of Vocal Storytelling',
            content: 'Great storytellers use their voice as an instrument, varying pace, pitch, and volume to create emotional impact.',
            duration: 45
          },
          {
            type: 'demonstration',
            title: 'Storytelling Techniques',
            content: 'Listen to professional storytelling voice techniques.',
            audioDescription: 'Demonstration of pacing, emphasis, and emotional variation in storytelling',
            duration: 60
          },
          {
            type: 'practice',
            title: 'Narrative Pacing',
            content: 'Practice varying your pace to build tension and interest.',
            exercise: 'Tell this story with varied pacing: "It was a quiet morning... until suddenly, everything changed. The phone rang, and I knew... this call would change everything."',
            duration: 120
          },
          {
            type: 'practice',
            title: 'Emotional Range',
            content: 'Practice conveying different emotions through your voice.',
            exercise: 'Express these emotions clearly: excitement, concern, determination, and hope while saying: "We faced challenges, but we never gave up."',
            duration: 150
          },
          {
            type: 'feedback',
            title: 'Storytelling Analysis',
            content: 'Review your vocal variety and emotional expression.',
            duration: 35
          }
        ]
      }
    ],
    executive: [
      {
        id: 8,
        title: "Executive Presence Voice",
        description: "Develop the commanding voice quality of top executives and leaders",
        duration: "35 min",
        difficulty: "Expert",
        completed: false,
        rating: 4.8,
        keyPoints: ["Gravitas development", "Command presence", "Strategic pausing"],
        exercises: [
          "Leadership voice drills",
          "Gravitas building",
          "Strategic silence practice"
        ],
        voiceImprovement: ["Executive authority", "Board room presence", "Leadership credibility"],
        steps: [
          {
            type: 'instruction',
            title: 'Executive Voice Qualities',
            content: 'Executive presence requires a voice that commands respect while inspiring confidence. It combines authority, clarity, and strategic communication.',
            duration: 50
          },
          {
            type: 'demonstration',
            title: 'Leadership Voice Examples',
            content: 'Study the vocal qualities of effective leaders.',
            audioDescription: 'Examples of executive-level voice qualities and presence',
            duration: 70
          },
          {
            type: 'practice',
            title: 'Command Presence',
            content: 'Practice speaking with executive authority.',
            exercise: 'Deliver with command presence: "Our strategy is clear. We will focus on three key initiatives that will drive sustainable growth and market leadership."',
            duration: 120
          },
          {
            type: 'practice',
            title: 'Strategic Pausing',
            content: 'Master the power of strategic silence.',
            exercise: 'Use strategic pauses: "The decision we make today... [pause] will determine our success... [pause] for years to come."',
            duration: 150
          },
          {
            type: 'feedback',
            title: 'Executive Presence Analysis',
            content: 'Comprehensive analysis of your leadership voice qualities.',
            duration: 40
          }
        ]
      }
    ]
  };

  const currentLessons = lessons[selectedCategory as keyof typeof lessons] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-orange-100 text-orange-700';
      case 'Expert': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      teal: 'from-teal-500 to-teal-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => [...prev, lessonId]);
    setPlayingLesson(null);
  };

  const isLessonCompleted = (lessonId: number) => completedLessons.includes(lessonId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Voice Improvement Lessons</h2>
            <p className="text-slate-600">Structured lessons designed specifically for your voice profile and goals</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedLessons.length}</div>
              <div className="text-xs text-slate-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-xs text-slate-600">Total Lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Learning Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => category.unlocked && setSelectedCategory(category.id)}
              disabled={!category.unlocked}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedCategory === category.id
                  ? `border-${category.color}-500 bg-${category.color}-50`
                  : category.unlocked
                  ? 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900">{category.label}</h4>
                {!category.unlocked ? (
                  <Lock className="h-4 w-4 text-slate-400" />
                ) : category.progress > 0 ? (
                  <Trophy className="h-4 w-4 text-yellow-500" />
                ) : null}
              </div>
              <div className="text-sm text-slate-600 mb-2">
                {category.unlocked ? 'Available now' : 'Complete previous category'}
              </div>
              {category.progress > 0 && (
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getCategoryColor(category.color)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${category.progress}%` }}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {currentLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {isLessonCompleted(lesson.id) ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-blue-500 rounded-full"></div>
                    )}
                    <h3 className="text-xl font-bold text-slate-900">{lesson.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{lesson.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{lesson.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{lesson.steps?.length || 5} Steps</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setPlayingLesson(lesson)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isLessonCompleted(lesson.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : `bg-gradient-to-r ${getCategoryColor(categories.find(c => c.id === selectedCategory)?.color || 'blue')} text-white hover:shadow-lg`
                  }`}
                >
                  <Play className="h-4 w-4" />
                  <span>{isLessonCompleted(lesson.id) ? 'Review' : 'Start Lesson'}</span>
                </button>
              </div>

              {/* Expanded Lesson Details */}
              {activeLesson === lesson.id && (
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Key Points */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Key Learning Points</span>
                      </h4>
                      <ul className="space-y-2">
                        {lesson.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercises */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center space-x-2">
                        <Mic className="h-5 w-5" />
                        <span>Practice Exercises</span>
                      </h4>
                      <ul className="space-y-2">
                        {lesson.exercises.map((exercise, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Target className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Voice Improvements */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Voice Improvements</span>
                      </h4>
                      <ul className="space-y-2">
                        {lesson.voiceImprovement.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Volume2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-200">
                    <button 
                      onClick={() => setPlayingLesson(lesson)}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isLessonCompleted(lesson.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r ${getCategoryColor(categories.find(c => c.id === selectedCategory)?.color || 'blue')} text-white hover:shadow-lg`
                      }`}
                    >
                      {isLessonCompleted(lesson.id) ? 'Review Interactive Lesson' : 'Start Interactive Lesson'}
                    </button>
                    <button 
                      onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                      className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-all duration-200"
                    >
                      {activeLesson === lesson.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Preview */}
              {activeLesson !== lesson.id && (
                <button
                  onClick={() => setActiveLesson(lesson.id)}
                  className="w-full mt-4 p-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>View Lesson Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Learning Progress</h3>
            <p className="text-blue-100">Keep up the great work! Consistency is key to voice improvement.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{completedLessons.length}/16</div>
            <div className="text-sm text-blue-100">Lessons Complete</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedLessons.length / 16) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lesson Player Modal */}
      {playingLesson && (
        <VoiceLessonPlayer
          lesson={playingLesson}
          onComplete={() => handleLessonComplete(playingLesson.id)}
          onClose={() => setPlayingLesson(null)}
        />
      )}
    </div>
  );
};

export default Lessons;