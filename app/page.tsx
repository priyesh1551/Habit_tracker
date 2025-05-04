'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// User_Info
const user = {
  name: 'Priyesh',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
};

//Habits_Mock_Data
const habits = [
  {
    id: 'sleep',
    label: '😴 Sleep Hours',
    value: 7.2,
    goal: 8,
    image: 'https://images.unsplash.com/photo-1496174742515-d2146dcf8e80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    week: [6.5, 7.2, 7.8, 6.3, 8, 7.4, 7.6],
    tip: 'Aim for 6-8 hrs of sleep to feel refreshed.',
  },
  {
    id: 'water',
    label: '💧 Water Intake (L)',
    value: 2.8,
    goal: 3,
    image: 'https://images.unsplash.com/photo-1554135392-28d77d7e8202?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    week: [2.1, 2.5, 2.9, 2.4, 3, 2.6, 2.8],
    tip: 'Staying hydrated boosts energy & focus.',
  },
  {
    id: 'screen',
    label: '📱 Screen Time (hrs)',
    value: 3.6,
    goal: 3,
    image: 'https://images.unsplash.com/photo-1587978834371-9494c5a02221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    week: [5.2, 4.6, 3.8, 3.2, 2.9, 3.1, 3.6],
    tip: 'Less screen, more green 🌿',
  },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const chartData = days.map((day, i) => ({
  name: day,
  Sleep: habits[0].week[i],
  Water: habits[1].week[i],
  Screen: habits[2].week[i],
}));

export default function MyHabitsPage() {
  const [progress, setProgress] = useState(habits.map(h => h.value));
  const streak = 5;
  const totalDays = 13;

  const handleSliderChange = (index: number, val: number) => {
    setProgress(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 px-4 py-6 space-y-10">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <img
          src={user.avatar}
          alt="avatar"
          onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
          className="w-14 h-14 rounded-full border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold">Hi {user.name.split(' ')[0]}! 🌞</h1>
          <p className="text-sm text-gray-600">Here’s your progress for today:</p>
        </div>
      </motion.div>

      {/* Habit Sliders */}
      <div className="grid md:grid-cols-3 gap-6">
        {habits.map((habit, i) => (
          <div key={habit.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <img
              src={habit.image}
              alt={habit.label}
              className="w-full h-32 object-cover rounded-xl mb-3"
            />
            <h2 className="text-lg font-semibold mb-1">{habit.label}</h2>
            <p className="text-sm mb-2">
              Goal: {habit.goal} | Today: {progress[i].toFixed(1)}
            </p>
            <input
              type="range"
              min="0"
              max={habit.goal + 2}
              step="0.1"
              value={progress[i]}
              onChange={(e) => handleSliderChange(i, parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-500 italic mt-1">{habit.tip}</p>
          </div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-bold mb-4">📊 Weekly Habit Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Sleep" stroke="#6366f1" />
            <Line type="monotone" dataKey="Water" stroke="#10b981" />
            <Line type="monotone" dataKey="Screen" stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*  Streak + Days Counter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <h3 className="text-lg font-semibold">🔥 Current Streak</h3>
          <p className="text-4xl font-bold text-blue-600">{streak} days</p>
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold">✅ Days Logged</h3>
          <p className="text-4xl font-bold text-green-600">{totalDays}</p>
        </div>
      </div>

      {/* Footer  */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow border">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D://unsplash.com/photos/a-lake-surrounded-by-mountains-and-trees-under-a-blue-sky-jV8916l2k0I"
          alt="footer bg"
          className="w-full h-48 object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <blockquote className="text-xl font-semibold text-black drop-shadow-lg">
            “It’s not about being perfect, it’s about being consistent.” ✨
          </blockquote>
        </div>
      </div>
    </div>
  );
}
