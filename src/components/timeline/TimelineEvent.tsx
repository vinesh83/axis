import React from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  FileText,
  AlertTriangle,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  User,
  Heart,
  Baby,
  Scale,
  Plane,
  FileCheck,
  Award,
  Stamp,
  Building2,
  MessageCircle,
  Paperclip
} from 'lucide-react';
import { TimelineEvent as TimelineEventType } from '../../types/timeline';
import { useTimelineNotesStore } from '../../store/timelineNotesStore';
import { TimelineEventNotes } from './TimelineEventNotes';

interface TimelineEventProps {
  event: TimelineEventType;
  compact?: boolean;
}

const TimelineEvent = ({ event, compact = false }: TimelineEventProps) => {
  const { notes, activeEventId, setActiveEvent, isExpanded } = useTimelineNotesStore();
  const eventNotes = Object.values(notes).filter(note => note.eventId === event.id);
  const hasNotes = eventNotes.length > 0;
  const hasAttachments = eventNotes.some(note => note.attachments && note.attachments.length > 0);
  const isActive = activeEventId === event.id;

  const getEventIcon = () => {
    const iconProps = { className: 'w-5 h-5' };

    switch (event.category) {
      case 'personal':
        if (event.title.toLowerCase().includes('marriage')) return <Heart {...iconProps} />;
        if (event.title.toLowerCase().includes('birth')) return <Baby {...iconProps} />;
        return <User {...iconProps} />;

      case 'immigration':
        if (event.title.toLowerCase().includes('filed')) return <FileCheck {...iconProps} />;
        if (event.title.toLowerCase().includes('approved')) return <Award {...iconProps} />;
        if (event.title.toLowerCase().includes('travel')) return <Plane {...iconProps} />;
        if (event.title.toLowerCase().includes('receipt')) return <Stamp {...iconProps} />;
        if (event.title.toLowerCase().includes('uscis')) return <Building2 {...iconProps} />;
        return <FileText {...iconProps} />;

      case 'criminal':
        return <Scale {...iconProps} />;

      case 'internal':
        if (event.title.toLowerCase().includes('email')) return <Mail {...iconProps} />;
        if (event.title.toLowerCase().includes('message')) return <MessageSquare {...iconProps} />;
        if (event.type === 'document') return <FileText {...iconProps} />;
        return <Clock {...iconProps} />;

      default:
        return <Calendar {...iconProps} />;
    }
  };

  const getEventColor = () => {
    switch (event.category) {
      case 'personal':
        return {
          bg: 'bg-pink-100',
          text: 'text-pink-600',
          hover: 'hover:bg-pink-50',
          border: 'border-pink-200',
          ring: 'ring-pink-200'
        };
      case 'immigration':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          hover: 'hover:bg-blue-50',
          border: 'border-blue-200',
          ring: 'ring-blue-200'
        };
      case 'criminal':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          hover: 'hover:bg-red-50',
          border: 'border-red-200',
          ring: 'ring-red-200'
        };
      case 'internal':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          hover: 'hover:bg-purple-50',
          border: 'border-purple-200',
          ring: 'ring-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          hover: 'hover:bg-gray-50',
          border: 'border-gray-200',
          ring: 'ring-gray-200'
        };
    }
  };

  const colors = getEventColor();

  const handleClick = () => {
    setActiveEvent(event.id);
  };

  return (
    <div className="flex relative group">
      <div className="flex flex-col items-center mr-4">
        <div className={`rounded-full p-2 ${colors.bg} ${colors.text}`}>
          {getEventIcon()}
        </div>
        <div className="w-px h-full bg-gray-200 my-2" />
      </div>

      <div className="flex-1">
        <div 
          className={`
            relative p-4 rounded-lg border transition-all duration-200
            ${colors.hover} 
            ${hasNotes ? `${colors.border} ring-1 ${colors.ring}` : 'border-gray-200'}
            ${isActive ? 'bg-gray-50 shadow-md transform scale-[1.01]' : ''}
            cursor-pointer transform hover:scale-[1.01] hover:shadow-md
            flex items-start justify-between
          `}
          onClick={handleClick}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-500">
              {format(event.date, 'MMM d, yyyy')}
            </div>
            <h3 className="font-medium text-gray-900 mt-1">{event.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
            
            {!compact && event.status && (
              <div className="mt-2 flex items-center space-x-2">
                {event.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                {event.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {event.status === 'cancelled' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                <span className={`text-xs font-medium ${
                  event.status === 'pending' ? 'text-yellow-700' :
                  event.status === 'completed' ? 'text-green-700' :
                  'text-red-700'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            )}

            {!compact && event.assignedTo && (
              <div className="mt-2 flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{event.assignedTo}</span>
              </div>
            )}
          </div>

          {/* Notes & Attachments Indicators */}
          <div className="flex items-center space-x-2">
            {hasAttachments && (
              <div className={`
                flex items-center space-x-1 px-2 py-1 rounded-full
                ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}
                transition-colors duration-200
              `}>
                <Paperclip className="w-4 h-4" />
              </div>
            )}
            {hasNotes && (
              <div className={`
                flex items-center space-x-1 px-2 py-1 rounded-full
                ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}
                transition-colors duration-200
              `}>
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{eventNotes.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <TimelineEventNotes eventId={event.id} />
    </div>
  );
};

export default TimelineEvent;