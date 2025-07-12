import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://whatsapp.com/channel/0029VaHI7LsFnSz1irwgsL1z', '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-3 group"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        <span className="text-lg">Follow our WhatsApp Channel</span>
      </button>
    </div>
  );
};