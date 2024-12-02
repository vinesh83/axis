import React from 'react';
import Timeline from './Timeline';
import { TimelineEvent } from '../../types/timeline';

interface TimelineCardProps {
  events: TimelineEvent[];
  onAddEvent?: () => void;
  compact?: boolean;
}

const TimelineCard = ({ events, onAddEvent, compact = false }: TimelineCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Timeline</h2>
      </div>
      
      <div className="p-6">
        <Timeline 
          events={events}
          onAddEvent={onAddEvent}
          compact={compact}
        />
      </div>
    </div>
  );
};

export default TimelineCard;