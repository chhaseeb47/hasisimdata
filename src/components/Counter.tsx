import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { getCounter, getActiveUsers } from '../services/simApi';

export const Counter: React.FC = () => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    setTotalUsage(getCounter());
    setActiveUsers(getActiveUsers());
    
    const interval = setInterval(() => {
      setActiveUsers(getActiveUsers());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div 
        className="rounded-2xl p-6 shadow-lg border"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
          boxShadow: `0 10px 25px -5px ${theme.primary}20`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-lg font-semibold"
            style={{ color: theme.text }}
          >
            Website Statistics
          </h3>
          <div 
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <TrendingUp size={20} style={{ color: theme.primary }} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <Users size={16} style={{ color: theme.accent }} />
              </div>
              <span style={{ color: theme.textSecondary }}>Total Usage</span>
            </div>
            <span 
              className="text-2xl font-bold"
              style={{ color: theme.primary }}
            >
              {totalUsage.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="p-2 rounded-full bg-green-100"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span style={{ color: theme.textSecondary }}>Active Users</span>
            </div>
            <span 
              className="text-2xl font-bold text-green-600"
            >
              {activeUsers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};