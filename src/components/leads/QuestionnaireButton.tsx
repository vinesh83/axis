import React, { useState } from 'react';
import { Send, Mail, MessageSquare, X, Check } from 'lucide-react';
import { leadService } from '../../services/leadService';

interface QuestionnaireButtonProps {
  status: string;
  leadId: string;
  onSend: (method: 'email' | 'sms') => Promise<void>;
}

const QuestionnaireButton = ({ status, leadId, onSend }: QuestionnaireButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (method: 'email' | 'sms') => {
    try {
      setSending(true);
      setError(null);
      await onSend(method);
      
      // Update lead status in database
      await leadService.updateLead(leadId, {
        questionnaire: 'Sent to client',
        updatedAt: new Date()
      });
      
      setShowOptions(false);
    } catch (err) {
      setError('Failed to send questionnaire');
    } finally {
      setSending(false);
    }
  };

  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        <Check className="w-3 h-3 mr-1" />
        Completed
      </span>
    );
  }

  if (status === 'In progress') {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
        In progress
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(true)}
        className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
      >
        <Send className="w-3 h-3 mr-1" />
        Send Questionnaire
      </button>

      {showOptions && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowOptions(false)} />
          <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-2">
              <button
                onClick={() => handleSend('email')}
                disabled={sending}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md"
              >
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                Send via Email
              </button>
              <button
                onClick={() => handleSend('sms')}
                disabled={sending}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                Send via SMS
              </button>
            </div>

            {error && (
              <div className="px-3 py-2 text-xs text-red-600 border-t border-gray-100">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionnaireButton;