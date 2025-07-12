import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { searchSimData, incrementCounter, SimRecord } from '../services/simApi';

export const SearchBox: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SimRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber.trim()) {
      setError('Please enter a mobile number');
      return;
    }

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const searchResult = await searchSimData(mobileNumber);
      
      if (searchResult.success && searchResult.data) {
        setResults(searchResult.data);
        incrementCounter();
        // Keep results visible for 30 seconds, then refresh to update counter
        setTimeout(() => {
          window.location.reload();
        }, 30000); // 30 seconds
      } else {
        setError(searchResult.message || 'No data found');
      }
    } catch (error) {
      setError('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number here"
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.background,
                color: theme.text
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{
              backgroundColor: theme.primary,
              color: 'white'
            }}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>

        {/* Results Display */}
        {results && results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg" style={{ color: theme.text }}>
              Search Results:
            </h3>
            {results.map((record, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }}
              >
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: theme.border }}>
                    <span className="font-medium" style={{ color: theme.textSecondary }}>Name:</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {record.Name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: theme.border }}>
                    <span className="font-medium" style={{ color: theme.textSecondary }}>Number:</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {record.Mobile}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: theme.border }}>
                    <span className="font-medium" style={{ color: theme.textSecondary }}>Address:</span>
                    <span className="font-semibold text-right" style={{ color: theme.text }}>
                      {record.Address}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium" style={{ color: theme.textSecondary }}>ID Card:</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {record.CNIC}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};