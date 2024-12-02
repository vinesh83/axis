import React, { useState } from 'react';
import { Client } from '../../types/clients';
import { generateClientSummary } from '../../utils/openai';
import { Loader2, AlertCircle } from 'lucide-react';

interface ClientSummaryProps {
  client: Client;
}

const ClientSummary = ({ client }: ClientSummaryProps) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const generatedSummary = await generateClientSummary(client);
      
      if (generatedSummary.includes('API key') || 
          generatedSummary.includes('Error generating')) {
        setError(generatedSummary);
      } else {
        setSummary(generatedSummary);
      }
    } catch (err) {
      setError('Failed to generate summary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    generateSummary();
  }, []);

  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return (
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
          <h2 className="text-sm font-medium text-yellow-800">Configuration Required</h2>
        </div>
        <p className="mt-2 text-sm text-yellow-700">
          OpenAI API key not configured. Please add your API key to the environment variables.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="ml-3 text-gray-600">Analyzing case...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-indigo max-w-none">
      {summary.split('\n').map((paragraph, index) => (
        paragraph.trim() && (
          <p key={index} className="mb-4 text-sm text-gray-700">
            {paragraph}
          </p>
        )
      ))}
    </div>
  );
};

export default ClientSummary;