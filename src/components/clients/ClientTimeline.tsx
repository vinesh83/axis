import React from 'react';
import { 
  Calendar, 
  FileText, 
  CheckCircle, 
  ArrowUpDown,
  Plane,
  Award,
  AlertTriangle,
  UserCheck,
  Baby,
  Scale,
  Stamp,
  FileCheck
} from 'lucide-react';
import { format } from 'date-fns';

interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'document' | 'milestone' | 'update';
}

interface ClientTimelineProps {
  events: TimelineEvent[];
  isChronological?: boolean;
  onToggleOrder?: () => void;
  compact?: boolean;
}

const ClientTimeline = ({ events, isChronological = false, onToggleOrder, compact = false }: ClientTimelineProps) => {
  const getEventIcon = (title: string, type: string) => {
    // Match icon to event type and title keywords
    const titleLower = title.toLowerCase();
    
    if (type === 'document') return <FileText className="w-5 h-5" />;
    
    if (titleLower.includes('birth')) return <Baby className="w-5 h-5" />;
    if (titleLower.includes('travel') || titleLower.includes('entry')) return <Plane className="w-5 h-5" />;
    if (titleLower.includes('approved') || titleLower.includes('granted')) return <Award className="w-5 h-5" />;
    if (titleLower.includes('criminal')) return <AlertTriangle className="w-5 h-5" />;
    if (titleLower.includes('tps')) return <UserCheck className="w-5 h-5" />;
    if (titleLower.includes('filed')) return <FileCheck className="w-5 h-5" />;
    if (titleLower.includes('conviction')) return <Scale className="w-5 h-5" />;
    if (titleLower.includes('approval')) return <Stamp className="w-5 h-5" />;
    
    return <Calendar className="w-5 h-5" />;
  };

  const getEventColor = (title: string, type: string) => {
    const titleLower = title.toLowerCase();
    
    if (type === 'document') return 'bg-blue-100 text-blue-600';
    
    if (titleLower.includes('birth')) return 'bg-pink-100 text-pink-600';
    if (titleLower.includes('travel') || titleLower.includes('entry')) return 'bg-sky-100 text-sky-600';
    if (titleLower.includes('approved') || titleLower.includes('granted')) return 'bg-green-100 text-green-600';
    if (titleLower.includes('criminal')) return 'bg-red-100 text-red-600';
    if (titleLower.includes('tps')) return 'bg-purple-100 text-purple-600';
    if (titleLower.includes('filed')) return 'bg-indigo-100 text-indigo-600';
    if (titleLower.includes('conviction')) return 'bg-orange-100 text-orange-600';
    if (titleLower.includes('approval')) return 'bg-emerald-100 text-emerald-600';
    
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className={compact ? '' : 'bg-white rounded-lg shadow-md p-6'}>
      <div className="flex items-center justify-between mb-4">
        {!compact && <h2 className="text-xl font-semibold">Timeline</h2>}
        {onToggleOrder && (
          <button
            onClick={onToggleOrder}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{isChronological ? 'Oldest First' : 'Latest First'}</span>
          </button>
        )}
      </div>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className={`rounded-full p-2 ${getEventColor(event.title, event.type)}`}>
                {getEventIcon(event.title, event.type)}
              </div>
              {index !== events.length - 1 && (
                <div className="w-px h-full bg-gray-200 my-2" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">
                {format(event.date, 'MMM d, yyyy')}
              </div>
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientTimeline;