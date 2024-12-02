import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, ChevronRight } from 'lucide-react';

interface FormTemplate {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  lastUsed?: Date;
}

const COMMON_FORMS: FormTemplate[] = [
  {
    id: '42b',
    number: 'I-589',
    name: 'Application for Asylum and Withholding of Removal',
    category: 'Asylum',
    description: 'Form used to apply for asylum in the United States and for withholding of removal.'
  },
  {
    id: 'i130',
    number: 'I-130',
    name: 'Petition for Alien Relative',
    category: 'Family',
    description: 'Form used to establish the family relationship of a U.S. citizen or permanent resident to certain alien relatives.'
  },
  {
    id: 'i485',
    number: 'I-485',
    name: 'Application to Register Permanent Residence',
    category: 'Adjustment',
    description: 'Form used to apply for lawful permanent resident status in the United States.'
  }
];

const CATEGORIES = [
  'All Forms',
  'Recently Used',
  'Asylum',
  'Family',
  'Employment',
  'Citizenship',
  'Adjustment'
];

const FormAssembly = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Forms');
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);

  const filteredForms = COMMON_FORMS.filter(form => {
    const matchesSearch = 
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Forms' || 
      form.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Form Assembly</h2>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Form
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Form List */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredForms.map(form => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form)}
              className={`
                flex items-start p-4 rounded-lg border-2 text-left transition-all
                ${selectedForm?.id === form.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                }
              `}
            >
              <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Form {form.number}
                    </h3>
                    <p className="text-sm text-gray-600">{form.name}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">{form.description}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {form.category}
                  </span>
                  {form.lastUsed && (
                    <span className="text-xs text-gray-500">
                      Last used {form.lastUsed.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormAssembly;