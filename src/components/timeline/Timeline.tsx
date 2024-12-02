import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Plus } from 'lucide-react';
import TimelineEvent from './TimelineEvent';
import TimelineFilters from './TimelineFilters';
import { TimelineEvent as TimelineEventType, TimelineEventCategory } from '../../types/timeline';

interface TimelineProps {
  events: TimelineEventType[];
  onAddEvent?: () => void;
  compact?: boolean;
}

export default function Timeline({ events, onAddEvent, compact = false }: TimelineProps) {
  // Set isChronological to true by default for chronological order
  const [isChronological, setIsChronological] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<TimelineEventCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => selectedCategories.includes(event.category));
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting - chronological by default (oldest to newest)
    return filtered.sort((a, b) => 
      isChronological
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime()
    );
  }, [events, selectedCategories, searchTerm, isChronological]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsChronological(!isChronological)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            title={isChronological ? "Show newest first" : "Show oldest first"}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{isChronological ? 'Oldest First' : 'Latest First'}</span>
          </button>
        </div>
        {onAddEvent && (
          <button
            onClick={onAddEvent}
            className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        )}
      </div>

      <TimelineFilters
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        compact={compact}
      />

      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <TimelineEvent
            key={event.id}
            event={event}
            compact={compact}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No events found matching your filters.
        </div>
      )}
    </div>
  );
}