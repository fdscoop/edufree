import React, { useState } from 'react';

// Custom Icons as SVG components
const Icons = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Book: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Calendar: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Trophy: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Bell: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Award: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  EyeOff: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  ),
  HelpCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  Moon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Volume: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  MessageCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Info: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
};

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = "#FF6B35" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
};

// Main App Component
export default function EduFreeApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState('10');
  const [showPassword, setShowPassword] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    firstName: 'Arjun',
    lastName: 'Kumar',
    email: 'arjun.kumar@email.com',
    phone: '+91 98765 43210',
    nosId: 'NOS-2024-78542',
    class: 'X',
    dateOfBirth: '2008-05-15',
    gender: 'Male',
    address: '123 Main Street, Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    parentName: 'Rajesh Kumar',
    parentPhone: '+91 98765 43211',
    school: 'National Open School',
    avatar: 'A',
  });

  // Settings State
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    language: 'English',
    autoplay: true,
    downloadQuality: 'HD',
    soundEffects: true,
  });

  // Notifications Data
  const notifications = [
    { id: 1, type: 'achievement', title: 'New Badge Earned!', message: 'You earned the "Week Warrior" badge for 7-day streak', time: '2 hours ago', read: false, icon: '🏆' },
    { id: 2, type: 'course', title: 'New Lesson Available', message: 'Chapter 5: Polynomials is now available in Mathematics', time: '5 hours ago', read: false, icon: '📚' },
    { id: 3, type: 'event', title: 'Event Reminder', message: 'Annual Sports Day is tomorrow at 9:00 AM', time: '1 day ago', read: true, icon: '🏃' },
    { id: 4, type: 'system', title: 'Profile Updated', message: 'Your profile information has been updated successfully', time: '2 days ago', read: true, icon: '✅' },
    { id: 5, type: 'course', title: 'Quiz Results', message: 'You scored 85% in Science Chapter 3 Quiz', time: '3 days ago', read: true, icon: '📊' },
    { id: 6, type: 'event', title: 'New Event', message: 'Art Competition registration is now open', time: '4 days ago', read: true, icon: '🎨' },
  ];

  // Certificates Data
  const certificates = [
    { id: 1, title: 'Mathematics Excellence', course: 'Mathematics', date: 'Nov 15, 2025', grade: 'A+', score: '95%', color: '#FF6B35', icon: '📐' },
    { id: 2, title: 'Science Proficiency', course: 'Science', date: 'Oct 28, 2025', grade: 'A', score: '88%', color: '#4ECDC4', icon: '🔬' },
    { id: 3, title: 'English Communication', course: 'English', date: 'Oct 10, 2025', grade: 'A+', score: '92%', color: '#9B59B6', icon: '📚' },
    { id: 4, title: 'Sports Day Participation', course: 'Extra Curricular', date: 'Sep 20, 2025', grade: 'Gold', score: '1st Place', color: '#E74C3C', icon: '🏆' },
  ];

  // Quiz Data
  const quizQuestions = [
    {
      id: 1,
      question: 'What is the discriminant of the quadratic equation ax² + bx + c = 0?',
      options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', '2ab - c'],
      correct: 0,
    },
    {
      id: 2,
      question: 'If the discriminant is negative, the roots are:',
      options: ['Real and equal', 'Real and distinct', 'Complex/Imaginary', 'Zero'],
      correct: 2,
    },
    {
      id: 3,
      question: 'The sum of roots of ax² + bx + c = 0 is:',
      options: ['b/a', '-b/a', 'c/a', '-c/a'],
      correct: 1,
    },
    {
      id: 4,
      question: 'Which method cannot be used to solve quadratic equations?',
      options: ['Factoring', 'Completing the square', 'Integration', 'Quadratic formula'],
      correct: 2,
    },
    {
      id: 5,
      question: 'The product of roots of ax² + bx + c = 0 is:',
      options: ['b/a', '-b/a', 'c/a', '-c/a'],
      correct: 2,
    },
  ];

  // Sample Data
  const courses = [
    { id: 1, title: 'Mathematics', subject: 'Algebra & Geometry', progress: 68, lessons: 24, completed: 16, thumbnail: '📐', color: '#FF6B35' },
    { id: 2, title: 'Science', subject: 'Physics & Chemistry', progress: 45, lessons: 32, completed: 14, thumbnail: '🔬', color: '#4ECDC4' },
    { id: 3, title: 'English', subject: 'Grammar & Literature', progress: 82, lessons: 28, completed: 23, thumbnail: '📚', color: '#9B59B6' },
    { id: 4, title: 'Hindi', subject: 'Vyakaran & Sahitya', progress: 55, lessons: 20, completed: 11, thumbnail: '📖', color: '#E74C3C' },
    { id: 5, title: 'Social Science', subject: 'History & Geography', progress: 30, lessons: 26, completed: 8, thumbnail: '🌍', color: '#3498DB' },
    { id: 6, title: 'Computer Science', subject: 'Programming Basics', progress: 72, lessons: 18, completed: 13, thumbnail: '💻', color: '#1ABC9C' },
  ];

  const events = [
    { id: 1, title: 'Annual Sports Day', date: 'Dec 15, 2025', time: '9:00 AM', type: 'Sports', location: 'School Ground', participants: 250, color: '#FF6B35' },
    { id: 2, title: 'Science Exhibition', date: 'Dec 20, 2025', time: '10:00 AM', type: 'Academic', location: 'Main Hall', participants: 180, color: '#4ECDC4' },
    { id: 3, title: 'Art Competition', date: 'Dec 25, 2025', time: '2:00 PM', type: 'Arts', location: 'Art Room', participants: 85, color: '#9B59B6' },
    { id: 4, title: 'Music Festival', date: 'Jan 5, 2026', time: '5:00 PM', type: 'Cultural', location: 'Auditorium', participants: 120, color: '#E74C3C' },
    { id: 5, title: 'Quiz Competition', date: 'Jan 10, 2026', time: '11:00 AM', type: 'Academic', location: 'Library', participants: 60, color: '#3498DB' },
  ];

  const videoLessons = [
    { id: 1, title: 'Introduction to Quadratic Equations', duration: '18:45', completed: true },
    { id: 2, title: 'Solving Quadratic by Factoring', duration: '22:30', completed: true },
    { id: 3, title: 'Quadratic Formula Derivation', duration: '15:20', completed: true },
    { id: 4, title: 'Discriminant and Nature of Roots', duration: '20:15', completed: false, current: true },
    { id: 5, title: 'Word Problems on Quadratics', duration: '25:00', completed: false },
    { id: 6, title: 'Graphing Quadratic Functions', duration: '19:45', completed: false },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Complete your first lesson', icon: '🎯', earned: true },
    { id: 2, title: 'Week Warrior', desc: '7-day learning streak', icon: '🔥', earned: true },
    { id: 3, title: 'Math Whiz', desc: 'Score 90%+ in Math quiz', icon: '🧮', earned: true },
    { id: 4, title: 'Bookworm', desc: 'Complete 50 lessons', icon: '📚', earned: false },
    { id: 5, title: 'Champion', desc: 'Top 10 in leaderboard', icon: '🏆', earned: false },
  ];

  // Navigation Component
  const Navigation = ({ transparent = false }) => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 2rem',
      background: transparent ? 'transparent' : 'rgba(15, 23, 42, 0.95)',
      backdropFilter: transparent ? 'none' : 'blur(20px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setCurrentPage('landing')}>
          <div style={{
            width: '45px',
            height: '45px',
            background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
          }}>
            📚
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
            Edu<span style={{ color: '#FF6B35' }}>Free</span>
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {currentPage === 'landing' ? (
            <>
              <a href="#features" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Features</a>
              <a href="#courses" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '500' }}>Courses</a>
              <a href="#about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '500' }}>About</a>
              <button onClick={() => setCurrentPage('login')} style={{
                padding: '0.75rem 1.75rem',
                background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                Get Started
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <Icons.Bell />
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '18px',
                  height: '18px',
                  background: '#FF6B35',
                  borderRadius: '50%',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>3</span>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
              }} onClick={() => setCurrentPage('profile')}>
                A
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }} className="mobile-menu-btn">
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>
    </nav>
  );

  // Bottom Navigation for Mobile (when logged in)
  const BottomNav = () => (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(15, 23, 42, 0.98)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-around',
      zIndex: 1000,
    }}>
      {[
        { icon: Icons.Home, label: 'Home', page: 'dashboard' },
        { icon: Icons.Book, label: 'Courses', page: 'courses' },
        { icon: Icons.Chart, label: 'Progress', page: 'progress' },
        { icon: Icons.Calendar, label: 'Events', page: 'events' },
        { icon: Icons.User, label: 'Profile', page: 'profile' },
      ].map(({ icon: Icon, label, page }) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            color: currentPage === page ? '#FF6B35' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.2s',
          }}
        >
          <Icon />
          <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>{label}</span>
        </button>
      ))}
    </div>
  );

  // Landing Page
  const LandingPage = () => (
    <div style={{ minHeight: '100vh', background: '#0F172A' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: '50px',
              color: '#FF6B35',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}>
              🎓 National Open Schooling • Class I to XII
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              letterSpacing: '-1px',
            }}>
              Learn Without
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Boundaries</span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.8',
              marginBottom: '2rem',
              maxWidth: '500px',
            }}>
              Free quality education for NOS students. Video tutorials, progress tracking, and exciting events — all in one place.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentPage('login')} style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s',
              }}>
                Start Learning <Icons.ArrowRight />
              </button>
              <button style={{
                padding: '1rem 2.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem' }}>
              {[
                { value: '50K+', label: 'Students' },
                { value: '500+', label: 'Videos' },
                { value: '12', label: 'Classes' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#FF6B35' }}>{stat.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              borderRadius: '30px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                background: '#1E293B',
                borderRadius: '20px',
                padding: '1.5rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>📐</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600' }}>Mathematics</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Chapter 4: Quadratic Equations</div>
                  </div>
                </div>
                <div style={{
                  background: '#0F172A',
                  borderRadius: '12px',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(78, 205, 196, 0.2))',
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF6B35',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}>
                    <Icons.Play />
                  </div>
                </div>
              </div>
              
              {/* Progress Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>Today's Goal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white' }}>3/5</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Lessons</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>Streak</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white' }}>12 🔥</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 2rem', background: '#0F172A' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>
              Everything You Need to <span style={{ color: '#FF6B35' }}>Succeed</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Designed specifically for National Open Schooling students
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🎬', title: 'Video Tutorials', desc: 'High-quality video lessons for every subject, aligned with NOS curriculum', color: '#FF6B35' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics and insights', color: '#4ECDC4' },
              { icon: '🏆', title: 'Events & Activities', desc: 'Participate in sports, arts, and cultural events to grow holistically', color: '#9B59B6' },
              { icon: '📱', title: 'Learn Anywhere', desc: 'Access your courses on web or mobile, even offline', color: '#E74C3C' },
              { icon: '🎯', title: 'Personalized Path', desc: 'AI-powered recommendations based on your learning style', color: '#3498DB' },
              { icon: '🤝', title: 'Community Support', desc: 'Connect with fellow students and mentors for help', color: '#1ABC9C' },
            ].map(feature => (
              <div key={feature.title} style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '1.5rem',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => (
    <div style={{ padding: '6rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Welcome Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          borderRadius: '24px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
              Welcome back, Arjun! 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Continue your learning journey. You're doing great!</p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Current Class</div>
                <div style={{ color: '#FF6B35', fontWeight: '700', fontSize: '1.25rem' }}>Class X</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>NOS ID</div>
                <div style={{ color: 'white', fontWeight: '600' }}>NOS-2024-78542</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Streak</div>
                <div style={{ color: '#4ECDC4', fontWeight: '700', fontSize: '1.25rem' }}>12 Days 🔥</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <ProgressRing progress={68} size={140} strokeWidth={12} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(0deg)',
            }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>68%</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Overall</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Courses Enrolled', value: '6', icon: '📚', color: '#FF6B35' },
            { label: 'Videos Completed', value: '85', icon: '🎬', color: '#4ECDC4' },
            { label: 'Hours Learned', value: '42', icon: '⏱️', color: '#9B59B6' },
            { label: 'Achievements', value: '8', icon: '🏆', color: '#E74C3C' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: stat.color }}>{stat.value}</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Continue Learning & Upcoming */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Continue Learning */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>Continue Learning</h2>
              <button onClick={() => setCurrentPage('courses')} style={{
                background: 'none',
                border: 'none',
                color: '#FF6B35',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}>
                View All <Icons.ArrowRight />
              </button>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {courses.slice(0, 3).map(course => (
                <div key={course.id} onClick={() => { setSelectedCourse(course); setCurrentPage('video'); }} style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${course.color}33, ${course.color}11)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    flexShrink: 0,
                  }}>
                    {course.thumbnail}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>{course.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{course.subject}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                          borderRadius: '3px',
                        }} />
                      </div>
                      <span style={{ color: course.color, fontWeight: '600', fontSize: '0.9rem' }}>{course.progress}%</span>
                    </div>
                  </div>
                  <div style={{ color: '#FF6B35' }}>
                    <Icons.ArrowRight />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>Upcoming Events</h2>
              <button onClick={() => setCurrentPage('events')} style={{
                background: 'none',
                border: 'none',
                color: '#FF6B35',
                cursor: 'pointer',
                fontWeight: '600',
              }}>
                View All
              </button>
            </div>
            <div style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {events.slice(0, 3).map((event, idx) => (
                <div key={event.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '1rem 0',
                  borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `${event.color}22`,
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '0.7rem', color: event.color, fontWeight: '600' }}>{event.date.split(' ')[0]}</span>
                    <span style={{ fontSize: '1rem', color: 'white', fontWeight: '700' }}>{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{event.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{event.time} • {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Courses Page
  const CoursesPage = () => (
    <div style={{ padding: '6rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>My Courses</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Class X - NOS Curriculum</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Icons.Search />
              <input placeholder="Search courses..." style={{
                background: 'none',
                border: 'none',
                color: 'white',
                outline: 'none',
                width: '200px',
              }} />
            </div>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              color: 'white',
              outline: 'none',
              cursor: 'pointer',
            }}>
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={i+1} style={{ background: '#1E293B' }}>Class {i+1}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} onClick={() => { setSelectedCourse(course); setCurrentPage('video'); }} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}>
              <div style={{
                height: '160px',
                background: `linear-gradient(135deg, ${course.color}44, ${course.color}11)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: '4rem' }}>{course.thumbnail}</span>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <Icons.Clock />
                  <span style={{ color: 'white', fontSize: '0.85rem' }}>{course.lessons} lessons</span>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.25rem' }}>{course.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>{course.subject}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{course.completed}/{course.lessons} completed</span>
                  <span style={{ color: course.color, fontWeight: '700' }}>{course.progress}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${course.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Video Player Page
  const VideoPage = () => (
    <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button onClick={() => setCurrentPage('courses')} style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.95rem',
        }}>
          ← Back to Courses
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Video Player */}
          <div>
            <div style={{
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${selectedCourse?.color || '#FF6B35'}33, transparent)`,
              }} />
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: selectedCourse?.color || '#FF6B35',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s',
              }}>
                <Icons.Play />
              </div>
              
              {/* Video Controls */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem 1.5rem',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              }}>
                <div style={{
                  height: '4px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: '35%',
                    height: '100%',
                    background: selectedCourse?.color || '#FF6B35',
                    borderRadius: '2px',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.85rem' }}>
                  <span>7:12 / 20:15</span>
                  <span>1x Speed</span>
                </div>
              </div>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
              Discriminant and Nature of Roots
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              {selectedCourse?.title || 'Mathematics'} • Chapter 4: Quadratic Equations
            </p>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              {['Overview', 'Notes', 'Resources', 'Discussion'].map((tab, idx) => (
                <button key={tab} style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: idx === 0 ? '#FF6B35' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Take Quiz Button */}
            <button onClick={() => { setQuizStep(0); setSelectedAnswers({}); setCurrentPage('quiz'); }} style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              border: 'none',
              borderRadius: '14px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)',
            }}>
              📝 Take Chapter Quiz
            </button>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>About this lesson</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
                In this lesson, we'll explore the discriminant of a quadratic equation and how it determines the nature of roots. You'll learn to identify whether an equation has two distinct real roots, equal roots, or complex roots without actually solving the equation.
              </p>
            </div>
          </div>

          {/* Playlist */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            height: 'fit-content',
          }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1rem' }}>Course Content</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>6 lessons • 2h 1m total</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {videoLessons.map((lesson, idx) => (
                <div key={lesson.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: lesson.current ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
                  border: lesson.current ? '1px solid rgba(255, 107, 53, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: lesson.completed ? '#4ECDC4' : lesson.current ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {lesson.completed ? (
                      <Icons.Check />
                    ) : lesson.current ? (
                      <span style={{ color: 'white', fontWeight: '600', fontSize: '0.8rem' }}>{idx + 1}</span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: '0.8rem' }}>{idx + 1}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: lesson.completed ? 'rgba(255,255,255,0.5)' : 'white',
                      fontWeight: '500',
                      fontSize: '0.9rem',
                      marginBottom: '0.25rem',
                      textDecoration: lesson.completed ? 'line-through' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {lesson.title}
                    </p>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{lesson.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Progress Page
  const ProgressPage = () => (
    <div style={{ padding: '6rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '2rem' }}>My Progress</h1>

        {/* Overall Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Total Hours', value: '42h', subtext: 'Last 30 days', icon: '⏱️', color: '#FF6B35' },
            { label: 'Lessons Done', value: '85', subtext: '+12 this week', icon: '✅', color: '#4ECDC4' },
            { label: 'Current Streak', value: '12', subtext: 'Days', icon: '🔥', color: '#E74C3C' },
            { label: 'Avg. Score', value: '87%', subtext: 'In quizzes', icon: '📊', color: '#9B59B6' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: stat.color, marginBottom: '0.25rem' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{stat.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{stat.subtext}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Subject Progress */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ color: 'white', fontWeight: '700', marginBottom: '1.5rem' }}>Subject Progress</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {courses.map(course => (
                <div key={course.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{course.thumbnail}</span>
                      <span style={{ color: 'white', fontWeight: '500' }}>{course.title}</span>
                    </div>
                    <span style={{ color: course.color, fontWeight: '600' }}>{course.progress}%</span>
                  </div>
                  <div style={{
                    height: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${course.progress}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                      borderRadius: '5px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ color: 'white', fontWeight: '700', marginBottom: '1.5rem' }}>Achievements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {achievements.map(badge => (
                <div key={badge.id} style={{
                  background: badge.earned ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  border: badge.earned ? '1px solid rgba(255, 107, 53, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                  opacity: badge.earned ? 1 : 0.5,
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{badge.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Events Page
  const EventsPage = () => (
    <div style={{ padding: '6rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Events & Activities</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Sports, Arts, Cultural & Academic events</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Sports', 'Arts', 'Academic', 'Cultural'].map((filter, idx) => (
              <button key={filter} style={{
                padding: '0.6rem 1.25rem',
                background: idx === 0 ? '#FF6B35' : 'rgba(255,255,255,0.05)',
                border: '1px solid',
                borderColor: idx === 0 ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {events.map(event => (
            <div key={event.id} onClick={() => { setSelectedEvent(event); setCurrentPage('eventDetail'); }} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}>
              <div style={{
                height: '120px',
                background: `linear-gradient(135deg, ${event.color}55, ${event.color}22)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: event.color,
                  color: 'white',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                }}>
                  {event.type}
                </span>
                <span style={{ fontSize: '3rem' }}>
                  {event.type === 'Sports' ? '🏃' : event.type === 'Arts' ? '🎨' : event.type === 'Cultural' ? '🎭' : '📖'}
                </span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.75rem' }}>{event.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                    <Icons.Calendar /> {event.date} at {event.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                    <Icons.MapPin /> {event.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                    <Icons.Users /> {event.participants} participants
                  </div>
                </div>
                <button style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: `linear-gradient(135deg, ${event.color}, ${event.color}CC)`,
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div style={{ padding: '6rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 auto 1rem',
            border: '4px solid #0F172A',
            boxShadow: '0 0 0 4px rgba(78, 205, 196, 0.3)',
          }}>
            A
          </div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Arjun Kumar</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>arjun.kumar@email.com</p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 107, 53, 0.15)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            color: '#FF6B35',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}>
            Class X • NOS ID: NOS-2024-78542
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          {[
            { label: 'Courses', value: '6', color: '#FF6B35' },
            { label: 'Completed', value: '85', color: '#4ECDC4' },
            { label: 'Badges', value: '8', color: '#9B59B6' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '16px',
              padding: '1.25rem',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Menu Options */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          {[
            { icon: <Icons.User />, label: 'Edit Profile', desc: 'Update your personal information', page: 'editProfile' },
            { icon: <Icons.Award />, label: 'Certificates', desc: 'View earned certificates', page: 'certificates' },
            { icon: <Icons.Bell />, label: 'Notifications', desc: 'Manage notification preferences', page: 'notifications' },
            { icon: <Icons.Settings />, label: 'Settings', desc: 'App settings and preferences', page: 'settings' },
            { icon: <Icons.HelpCircle />, label: 'Help & Support', desc: 'Get help and contact support', page: 'help' },
            { icon: <Icons.LogOut />, label: 'Logout', desc: 'Sign out of your account', danger: true, page: 'landing' },
          ].map((item, idx) => (
            <div key={item.label} onClick={() => setCurrentPage(item.page)} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              borderBottom: idx < 5 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: item.danger ? 'rgba(231, 76, 60, 0.15)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.danger ? '#E74C3C' : 'rgba(255,255,255,0.7)',
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: item.danger ? '#E74C3C' : 'white', fontWeight: '600' }}>{item.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Icons.ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ LOGIN PAGE ============
  const LoginPage = () => (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1rem',
            boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
          }}>📚</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>Welcome to <span style={{ color: '#FF6B35' }}>EduFree</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Your learning companion for NOS</p>
        </div>

        {/* Auth Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '0.5rem',
          marginBottom: '2rem',
        }}>
          {['login', 'register'].map(tab => (
            <button key={tab} onClick={() => setAuthTab(tab)} style={{
              flex: 1,
              padding: '1rem',
              background: authTab === tab ? '#FF6B35' : 'transparent',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Login Form */}
        {authTab === 'login' ? (
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>NOS ID or Email</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <Icons.Mail />
                <input placeholder="Enter your NOS ID or email" style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem',
                }} />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <Icons.Lock />
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem',
                }} />
                <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
                  {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#FF6B35' }} /> Remember me
              </label>
              <span onClick={() => setCurrentPage('forgotPassword')} style={{ color: '#FF6B35', fontSize: '0.9rem', cursor: 'pointer' }}>Forgot Password?</span>
            </div>

            <button onClick={() => setCurrentPage('dashboard')} style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
            }}>Login</button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Don't have an account? </span>
              <span onClick={() => setAuthTab('register')} style={{ color: '#FF6B35', cursor: 'pointer', fontWeight: '600' }}>Register</span>
            </div>
          </div>
        ) : (
          /* Register Form */
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>First Name</label>
                <input placeholder="First name" style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  outline: 'none',
                }} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Last Name</label>
                <input placeholder="Last name" style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  outline: 'none',
                }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>NOS Enrollment ID</label>
              <input placeholder="Enter your NOS ID (e.g., NOS-2024-XXXXX)" style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" placeholder="Enter your email" style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Select Class</label>
              <select style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }}>
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1} style={{ background: '#1E293B' }}>Class {i+1}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" placeholder="Create a password" style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>

            <button onClick={() => setCurrentPage('dashboard')} style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
            }}>Create Account</button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Already have an account? </span>
              <span onClick={() => setAuthTab('login')} style={{ color: '#FF6B35', cursor: 'pointer', fontWeight: '600' }}>Login</span>
            </div>
          </div>
        )}

        <button onClick={() => setCurrentPage('landing')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '2rem auto 0',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
        }}>
          <Icons.ArrowLeft /> Back to Home
        </button>
      </div>
    </div>
  );

  // ============ FORGOT PASSWORD PAGE ============
  const ForgotPasswordPage = () => (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'rgba(255, 107, 53, 0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <Icons.Lock />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Forgot Password?</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Enter your email to receive a reset link</p>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Icons.Mail />
              <input type="email" placeholder="Enter your registered email" style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontSize: '1rem',
              }} />
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}>Send Reset Link</button>
        </div>

        <button onClick={() => setCurrentPage('login')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '2rem auto 0',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
        }}>
          <Icons.ArrowLeft /> Back to Login
        </button>
      </div>
    </div>
  );

  // ============ EDIT PROFILE PAGE ============
  const EditProfilePage = () => (
    <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setCurrentPage('profile')} style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icons.ArrowLeft />
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Edit Profile</h1>
        </div>

        {/* Avatar Section */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
            }}>
              {userProfile.avatar}
            </div>
            <button style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FF6B35',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icons.Camera />
            </button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', fontSize: '0.9rem' }}>Tap to change profile photo</p>
        </div>

        {/* Personal Information */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icons.User /> Personal Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>First Name</label>
              <input value={userProfile.firstName} onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Last Name</label>
              <input value={userProfile.lastName} onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Date of Birth</label>
              <input type="date" value={userProfile.dateOfBirth} onChange={(e) => setUserProfile({...userProfile, dateOfBirth: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Gender</label>
              <select value={userProfile.gender} onChange={(e) => setUserProfile({...userProfile, gender: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }}>
                <option value="Male" style={{ background: '#1E293B' }}>Male</option>
                <option value="Female" style={{ background: '#1E293B' }}>Female</option>
                <option value="Other" style={{ background: '#1E293B' }}>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icons.Mail /> Contact Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" value={userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
              <input value={userProfile.phone} onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Address</label>
              <input value={userProfile.address} onChange={(e) => setUserProfile({...userProfile, address: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>State</label>
              <input value={userProfile.state} onChange={(e) => setUserProfile({...userProfile, state: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>PIN Code</label>
              <input value={userProfile.pincode} onChange={(e) => setUserProfile({...userProfile, pincode: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icons.Book /> Academic Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>NOS ID</label>
              <input value={userProfile.nosId} disabled style={{
                width: '100%',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'rgba(255,255,255,0.5)',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Class</label>
              <select value={userProfile.class} onChange={(e) => setUserProfile({...userProfile, class: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }}>
                {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map(c => (
                  <option key={c} value={c} style={{ background: '#1E293B' }}>Class {c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icons.Users /> Parent/Guardian Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Parent/Guardian Name</label>
              <input value={userProfile.parentName} onChange={(e) => setUserProfile({...userProfile, parentName: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Parent/Guardian Phone</label>
              <input value={userProfile.parentPhone} onChange={(e) => setUserProfile({...userProfile, parentPhone: e.target.value})} style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                outline: 'none',
              }} />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={() => setCurrentPage('profile')} style={{
          width: '100%',
          padding: '1rem',
          background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
          border: 'none',
          borderRadius: '16px',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
        }}>Save Changes</button>
      </div>
    </div>
  );

  // ============ CERTIFICATES PAGE ============
  const CertificatesPage = () => (
    <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setCurrentPage('profile')} style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icons.ArrowLeft />
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>My Certificates</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{certificates.length} certificates earned</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {certificates.map(cert => (
            <div key={cert.id} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {/* Certificate Header */}
              <div style={{
                background: `linear-gradient(135deg, ${cert.color}44, ${cert.color}22)`,
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: cert.color,
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                }}>{cert.grade}</div>
                <span style={{ fontSize: '3rem' }}>{cert.icon}</span>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '1rem auto 0',
                }}>
                  <Icons.Award />
                </div>
              </div>
              
              {/* Certificate Body */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cert.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>{cert.course}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Date</div>
                    <div style={{ color: 'white', fontWeight: '500' }}>{cert.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Score</div>
                    <div style={{ color: cert.color, fontWeight: '700' }}>{cert.score}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: `linear-gradient(135deg, ${cert.color}, ${cert.color}CC)`,
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}>
                    <Icons.Download /> Download
                  </button>
                  <button style={{
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>
                    <Icons.Share />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if no certificates */}
        {certificates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>No Certificates Yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Complete courses and quizzes to earn certificates</p>
          </div>
        )}
      </div>
    </div>
  );

  // ============ NOTIFICATIONS PAGE ============
  const NotificationsPage = () => {
    const [notifFilter, setNotifFilter] = useState('all');
    const filteredNotifications = notifFilter === 'all' 
      ? notifications 
      : notifFilter === 'unread' 
        ? notifications.filter(n => !n.read)
        : notifications.filter(n => n.type === notifFilter);

    return (
      <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setCurrentPage('profile')} style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icons.ArrowLeft />
              </button>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Notifications</h1>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#FF6B35',
              fontWeight: '600',
              cursor: 'pointer',
            }}>Mark all read</button>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}>
            {['all', 'unread', 'course', 'event', 'achievement', 'system'].map(filter => (
              <button key={filter} onClick={() => setNotifFilter(filter)} style={{
                padding: '0.5rem 1rem',
                background: notifFilter === filter ? '#FF6B35' : 'rgba(255,255,255,0.05)',
                border: '1px solid',
                borderColor: notifFilter === filter ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
              }}>{filter}</button>
            ))}
          </div>

          {/* Notifications List */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}>
            {filteredNotifications.map((notif, idx) => (
              <div key={notif.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                borderBottom: idx < filteredNotifications.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                background: notif.read ? 'transparent' : 'rgba(255, 107, 53, 0.05)',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                }}>
                  {notif.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: 'white', fontWeight: '600' }}>{notif.title}</h4>
                    {!notif.read && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#FF6B35',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }} />
                    )}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{notif.message}</p>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{notif.time}</span>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>No notifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ============ SETTINGS PAGE ============
  const SettingsPage = () => {
    const ToggleSwitch = ({ enabled, onToggle }) => (
      <div onClick={onToggle} style={{
        width: '50px',
        height: '28px',
        background: enabled ? '#FF6B35' : 'rgba(255,255,255,0.2)',
        borderRadius: '14px',
        padding: '3px',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}>
        <div style={{
          width: '22px',
          height: '22px',
          background: 'white',
          borderRadius: '50%',
          transform: enabled ? 'translateX(22px)' : 'translateX(0)',
          transition: 'transform 0.2s',
        }} />
      </div>
    );

    return (
      <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => setCurrentPage('profile')} style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icons.ArrowLeft />
            </button>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Settings</h1>
          </div>

          {/* Notifications Settings */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Bell /> Notifications
            </h2>
            
            {[
              { key: 'notifications', label: 'Push Notifications', desc: 'Receive push notifications' },
              { key: 'emailUpdates', label: 'Email Updates', desc: 'Receive updates via email' },
            ].map(item => (
              <div key={item.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div>
                  <div style={{ color: 'white', fontWeight: '500' }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.desc}</div>
                </div>
                <ToggleSwitch 
                  enabled={settings[item.key]} 
                  onToggle={() => setSettings({...settings, [item.key]: !settings[item.key]})} 
                />
              </div>
            ))}
          </div>

          {/* Appearance Settings */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Moon /> Appearance
            </h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div>
                <div style={{ color: 'white', fontWeight: '500' }}>Dark Mode</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Use dark theme</div>
              </div>
              <ToggleSwitch 
                enabled={settings.darkMode} 
                onToggle={() => setSettings({...settings, darkMode: !settings.darkMode})} 
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
            }}>
              <div>
                <div style={{ color: 'white', fontWeight: '500' }}>Language</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Select app language</div>
              </div>
              <select value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: 'white',
                outline: 'none',
              }}>
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam'].map(lang => (
                  <option key={lang} value={lang} style={{ background: '#1E293B' }}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Playback Settings */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Play /> Playback
            </h2>
            
            {[
              { key: 'autoplay', label: 'Autoplay Videos', desc: 'Automatically play next video' },
              { key: 'soundEffects', label: 'Sound Effects', desc: 'Play sounds for achievements' },
            ].map(item => (
              <div key={item.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div>
                  <div style={{ color: 'white', fontWeight: '500' }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.desc}</div>
                </div>
                <ToggleSwitch 
                  enabled={settings[item.key]} 
                  onToggle={() => setSettings({...settings, [item.key]: !settings[item.key]})} 
                />
              </div>
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
            }}>
              <div>
                <div style={{ color: 'white', fontWeight: '500' }}>Download Quality</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Video download quality</div>
              </div>
              <select value={settings.downloadQuality} onChange={(e) => setSettings({...settings, downloadQuality: e.target.value})} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: 'white',
                outline: 'none',
              }}>
                {['Auto', 'HD', 'SD', 'Low'].map(q => (
                  <option key={q} value={q} style={{ background: '#1E293B' }}>{q}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Account Actions */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Shield /> Account
            </h2>
            
            {[
              { icon: <Icons.Lock />, label: 'Change Password', desc: 'Update your password' },
              { icon: <Icons.FileText />, label: 'Privacy Policy', desc: 'Read our privacy policy' },
              { icon: <Icons.FileText />, label: 'Terms of Service', desc: 'Read our terms' },
            ].map((item, idx) => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '500' }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.desc}</div>
                </div>
                <Icons.ChevronRight />
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(231, 76, 60, 0.2)',
          }}>
            <h2 style={{ color: '#E74C3C', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Trash /> Danger Zone
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(231, 76, 60, 0.2)',
              border: '1px solid #E74C3C',
              borderRadius: '10px',
              color: '#E74C3C',
              fontWeight: '600',
              cursor: 'pointer',
            }}>Delete Account</button>
          </div>
        </div>
      </div>
    );
  };

  // ============ HELP & SUPPORT PAGE ============
  const HelpPage = () => {
    const faqs = [
      { q: 'How do I reset my password?', a: 'Go to Login page and click on "Forgot Password". Enter your registered email to receive a reset link.' },
      { q: 'How can I download videos for offline viewing?', a: 'Click on the download icon next to any video lesson. Downloaded videos will be available in your offline library.' },
      { q: 'How do I get my certificate?', a: 'Complete all lessons and quizzes in a course with a passing grade. Your certificate will be available in the Certificates section.' },
      { q: 'Can I change my registered class?', a: 'Yes, go to Edit Profile and select your new class from the dropdown. Your courses will be updated accordingly.' },
      { q: 'How do I register for events?', a: 'Go to the Events section, find the event you want to join, and click "Register Now".' },
    ];
    const [openFaq, setOpenFaq] = useState(null);

    return (
      <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => setCurrentPage('profile')} style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icons.ArrowLeft />
            </button>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Help & Support</h1>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '2rem',
          }}>
            <Icons.Search />
            <input placeholder="Search for help..." style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: 'white',
              outline: 'none',
              fontSize: '1rem',
            }} />
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: '💬', label: 'Live Chat', desc: 'Chat with us' },
              { icon: '📧', label: 'Email', desc: 'Send email' },
              { icon: '📞', label: 'Call', desc: 'Call support' },
            ].map(action => (
              <div key={action.label} style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                <div style={{ color: 'white', fontWeight: '600' }}>{action.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{action.desc}</div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '2rem',
          }}>
            <h2 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
            
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                borderBottom: idx < faqs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  cursor: 'pointer',
                }}>
                  <span style={{ color: 'white', fontWeight: '500' }}>{faq.q}</span>
                  <span style={{ 
                    color: 'rgba(255,255,255,0.5)', 
                    transform: openFaq === idx ? 'rotate(90deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}>
                    <Icons.ChevronRight />
                  </span>
                </div>
                {openFaq === idx && (
                  <div style={{
                    padding: '0 0 1rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Still need help?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>Our support team is available 24/7</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                <Icons.Mail /> support@edufree.in
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                <Icons.Phone /> 1800-123-4567
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ QUIZ PAGE ============
  const QuizPage = () => {
    const totalQuestions = quizQuestions.length;
    const currentQuestion = quizQuestions[quizStep];
    const isCompleted = quizStep >= totalQuestions;

    const handleAnswer = (answerIdx) => {
      setSelectedAnswers({ ...selectedAnswers, [quizStep]: answerIdx });
    };

    const calculateScore = () => {
      let correct = 0;
      quizQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correct) correct++;
      });
      return Math.round((correct / totalQuestions) * 100);
    };

    if (isCompleted) {
      const score = calculateScore();
      return (
        <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                {score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}
              </div>
              <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Quiz Completed!
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
                {score >= 80 ? 'Excellent work!' : score >= 50 ? 'Good effort!' : 'Keep practicing!'}
              </p>
              
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                <ProgressRing progress={score} size={160} strokeWidth={12} color={score >= 80 ? '#4ECDC4' : score >= 50 ? '#FF6B35' : '#E74C3C'} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white' }}>{score}%</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Score</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={() => { setQuizStep(0); setSelectedAnswers({}); }} style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>Retry Quiz</button>
                <button onClick={() => setCurrentPage('courses')} style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>Back to Course</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <button onClick={() => setCurrentPage('video')} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
            }}>
              <Icons.ArrowLeft /> Exit Quiz
            </button>
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>
              Question {quizStep + 1} of {totalQuestions}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${((quizStep + 1) / totalQuestions) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF6B35, #FF8F5E)',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '2rem',
          }}>
            <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem', lineHeight: '1.5' }}>
              {currentQuestion.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentQuestion.options.map((option, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} style={{
                  padding: '1rem 1.25rem',
                  background: selectedAnswers[quizStep] === idx ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedAnswers[quizStep] === idx ? '2px solid #FF6B35' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: selectedAnswers[quizStep] === idx ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ fontWeight: '500' }}>{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {quizStep > 0 && (
              <button onClick={() => setQuizStep(quizStep - 1)} style={{
                flex: 1,
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
              }}>Previous</button>
            )}
            <button 
              onClick={() => setQuizStep(quizStep + 1)} 
              disabled={selectedAnswers[quizStep] === undefined}
              style={{
                flex: 1,
                padding: '1rem',
                background: selectedAnswers[quizStep] !== undefined ? 'linear-gradient(135deg, #FF6B35, #FF8F5E)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                fontWeight: '600',
                cursor: selectedAnswers[quizStep] !== undefined ? 'pointer' : 'not-allowed',
                opacity: selectedAnswers[quizStep] !== undefined ? 1 : 0.5,
              }}>
              {quizStep === totalQuestions - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============ EVENT DETAIL PAGE ============
  const EventDetailPage = () => {
    const event = selectedEvent || events[0];
    return (
      <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Back Button */}
          <button onClick={() => setCurrentPage('events')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            marginBottom: '1.5rem',
          }}>
            <Icons.ArrowLeft /> Back to Events
          </button>

          {/* Event Banner */}
          <div style={{
            height: '200px',
            background: `linear-gradient(135deg, ${event.color}66, ${event.color}22)`,
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            position: 'relative',
          }}>
            <span style={{ fontSize: '5rem' }}>
              {event.type === 'Sports' ? '🏃' : event.type === 'Arts' ? '🎨' : event.type === 'Cultural' ? '🎭' : '📖'}
            </span>
            <span style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: event.color,
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontWeight: '600',
            }}>{event.type}</span>
          </div>

          {/* Event Info */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}>
            <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem' }}>{event.title}</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.color,
                }}>
                  <Icons.Calendar />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Date</div>
                  <div style={{ color: 'white', fontWeight: '600' }}>{event.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.color,
                }}>
                  <Icons.Clock />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Time</div>
                  <div style={{ color: 'white', fontWeight: '600' }}>{event.time}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.color,
                }}>
                  <Icons.MapPin />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Location</div>
                  <div style={{ color: 'white', fontWeight: '600' }}>{event.location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.color,
                }}>
                  <Icons.Users />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Participants</div>
                  <div style={{ color: 'white', fontWeight: '600' }}>{event.participants} registered</div>
                </div>
              </div>
            </div>

            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>About this Event</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Join us for an exciting {event.title.toLowerCase()}! This event is open to all NOS students from Class I to XII. 
              Come and showcase your talents, make new friends, and create lasting memories. Certificates will be awarded to all participants.
            </p>

            <button style={{
              width: '100%',
              padding: '1rem',
              background: `linear-gradient(135deg, ${event.color}, ${event.color}CC)`,
              border: 'none',
              borderRadius: '14px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: `0 8px 25px ${event.color}44`,
            }}>Register for this Event</button>
          </div>
        </div>
      </div>
    );
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'login': return <LoginPage />;
      case 'forgotPassword': return <ForgotPasswordPage />;
      case 'dashboard': return <DashboardPage />;
      case 'courses': return <CoursesPage />;
      case 'video': return <VideoPage />;
      case 'progress': return <ProgressPage />;
      case 'events': return <EventsPage />;
      case 'eventDetail': return <EventDetailPage />;
      case 'profile': return <ProfilePage />;
      case 'editProfile': return <EditProfilePage />;
      case 'certificates': return <CertificatesPage />;
      case 'notifications': return <NotificationsPage />;
      case 'settings': return <SettingsPage />;
      case 'help': return <HelpPage />;
      case 'quiz': return <QuizPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      background: '#0F172A',
      color: 'white',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        button:hover {
          transform: translateY(-1px);
        }
        
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr"],
          div[style*="grid-template-columns: 1fr 1fr"],
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        
        ::selection {
          background: rgba(255, 107, 53, 0.3);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0F172A;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
      
      <Navigation transparent={currentPage === 'landing'} />
      {renderPage()}
      {!['landing', 'login', 'forgotPassword', 'quiz'].includes(currentPage) && <BottomNav />}
    </div>
  );
}