import React from 'react';
import { Filter, Calendar, Search, X } from 'lucide-react';
import { TimelineEventCategory } from '../../types/timeline';

interface TimelineFiltersProps {
  selectedCategories: TimelineEventCategory[];
  onCategoryChange: (categories: TimelineEventCategory[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  compact?: boolean;
}

const CATEGORIES: { id: TimelineEventCategory; label: string; color: string }[] = [
  { id: 'personal', label: 'Personal', color: 'bg-pink-100 text-pink-800 hover:bg-pink-200' },
  { id: 'immigration', label: 'Immigration', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
  { id: 'criminal', label: 'Criminal', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
  { id: 'internal', label: 'Internal', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' }
];

const TimelineFilters = ({
  selectedCategories,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  compact = false
}: TimelineFiltersProps) => {
  const toggleCategory = (category: TimelineEventCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className={`space-y-4 ${compact ? 'px-2' : ''}`}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search timeline..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => toggleCategory(id)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${selectedCategories.includes(id) ? color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineFilters;