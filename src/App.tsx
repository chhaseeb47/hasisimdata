import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeSwitch } from './components/ThemeSwitch';
import { SearchBox } from './components/SearchBox';
import { Counter } from './components/Counter';
import { ServiceFeatures } from './components/ServiceFeatures';
import { WhatsAppButton } from './components/WhatsAppButton';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Add WhatsApp widget script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://d2mpatx37cqexb.cloudfront.net/delightchat-whatsapp-widget/embeds/embed.min.js';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      var wa_btnSetting = {
        "btnColor": "#25D366",
        "ctaText": "",
        "cornerRadius": 40,
        "marginBottom": 20,
        "marginLeft": 20,
        "marginRight": 20,
        "btnPosition": "right",
        "whatsAppNumber": "+923462054847",
        "welcomeMessage": "I am here from Your website.",
        "zIndex": 999999,
        "btnColorScheme": "light"
      };
      
      function initWhatsApp() {
        if (window._waEmbed) {
          window._waEmbed(wa_btnSetting);
        } else {
          setTimeout(initWhatsApp, 100);
        }
      }
      
      initWhatsApp();
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const handleOtherWebsitesClick = () => {
    window.open('https://www.xhasi.xyz/', '_blank');
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `linear-gradient(135deg, ${theme.background} 0%, ${theme.border} 100%)`
      }}
    >
      <ThemeSwitch />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
            style={{ 
              backgroundImage: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`
            }}
          >
            Hasi Sim Database
          </h1>
          <p 
            className="text-lg"
            style={{ color: theme.textSecondary }}
          >
            Your trusted source for accurate sim information
          </p>
        </div>

        {/* Search Box */}
        <SearchBox />

        {/* Other Websites Button */}
        <div className="w-full max-w-md mx-auto mb-8">
          <button
            onClick={handleOtherWebsitesClick}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 border-2"
            style={{
              backgroundColor: 'transparent',
              borderColor: theme.primary,
              color: theme.primary
            }}
          >
            <ExternalLink size={20} />
            <span>Other Websites</span>
          </button>
        </div>

        {/* Counter */}
        <Counter />

        {/* Service Features */}
        <ServiceFeatures />

        {/* WhatsApp Channel Button */}
        <WhatsAppButton />

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t" style={{ borderColor: theme.border }}>
          <p 
            className="text-sm"
            style={{ color: theme.textSecondary }}
          >
            Developed By <span className="font-bold" style={{ color: theme.primary }}>Haseeb Rashid</span>
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;