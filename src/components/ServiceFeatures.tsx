import React from 'react';
import { CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ServiceFeatures: React.FC = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: '100% Correct',
      description: 'Accurate and verified information'
    },
    {
      icon: <Zap size={24} />,
      title: 'Fresh Sim Details',
      description: 'Up-to-date database records'
    },
    {
      icon: <Shield size={24} />,
      title: 'No Website Ads',
      description: 'Clean, ad-free experience'
    },
    {
      icon: <Clock size={24} />,
      title: '24/7 Working',
      description: 'Available round the clock'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 text-center">
      <h2 
        className="text-2xl font-bold text-center mb-8"
        style={{ color: theme.text }}
      >
        Reasons of Using Our Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 text-center max-w-xs w-full"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              boxShadow: `0 4px 15px -2px ${theme.primary}15`
            }}
          >
            <div 
              className="p-3 rounded-full mb-4 w-fit"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <div style={{ color: theme.primary }}>
                {feature.icon}
              </div>
            </div>
            
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: theme.text }}
            >
              {feature.title}
            </h3>
            
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};