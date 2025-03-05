
import { useState, useCallback } from 'react';
import { Tool, getRecommendations } from '@/lib/dummyData';

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  const searchTools = useCallback(async (query: string) => {
    if (!query) return;
    
    setIsLoading(true);
    setError(null);
    setLastQuery(query);

    try {
      const results = await getRecommendations(query);
      setTools(results);
    } catch (err) {
      console.error('Error fetching tool recommendations:', err);
      setError('Failed to get recommendations. Please try again.');
      setTools([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tools,
    isLoading,
    error,
    lastQuery,
    searchTools
  };
};
