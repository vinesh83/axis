import React, { useState, useRef } from 'react';
import { X, CheckCircle2, UserPlus } from 'lucide-react';
import { NewCase } from '../../../types/case';
import { MOCK_CLIENTS } from '../../../data/mockClients';

interface ClientTypeStepProps {
  data: NewCase;
  onUpdate: (data: Partial<NewCase>) => void;
  onNext: () => void;
  onCancel: () => void;
}

const ClientTypeStep = ({ data, onUpdate, onNext, onCancel }: ClientTypeStepProps) => {
  const [selectedClient, setSelectedClient] = useState<typeof MOCK_CLIENTS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<typeof MOCK_CLIENTS>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = MOCK_CLIENTS.filter(client => {
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const searchLower = query.toLowerCase();
        return fullName.includes(searchLower) || 
               client.email.toLowerCase().includes(searchLower) ||
               client.phone.includes(query);
      });
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  };

  const handleClientSelect = (client: typeof MOCK_CLIENTS[0]) => {
    setSelectedClient(client);
    setSearchQuery(`${client.firstName} ${client.lastName}`);
    setFilteredClients([]);
    
    onUpdate({
      clientType: 'existing',
      clientInfo: {
        lastName: client.lastName,
        firstName: client.firstName,
        phone: client.phone,
        email: client.email
      },
      birthInfo: {
        month: new Date(client.birthInfo.dateOfBirth).toLocaleString('default', { month: 'long' }),
        day: new Date(client.birthInfo.dateOfBirth).getDate().toString(),
        year: new Date(client.birthInfo.dateOfBirth).getFullYear().toString(),
        countryOfBirth: client.birthInfo.countryOfBirth,
        citizenship: client.citizenship,
        gender: client.birthInfo.gender as NewCase['birthInfo']['gender'],
        languages: client.birthInfo.languages,
        preferredLanguage: client.birthInfo.preferredLanguage as NewCase['birthInfo']['preferredLanguage']
      },
      contact: {
        type: 'client',
        contacts: client.contacts
      }
    });
  };

  const handleDeselect = () => {
    setSelectedClient(null);
    setSearchQuery('');
    onUpdate({
      clientType: 'new',
      clientInfo: {
        lastName: '',
        firstName: '',
        phone: '',
        email: ''
      },
      birthInfo: {
        month: '',
        day: '',
        year: '',
        countryOfBirth: '',
        citizenship: '',
        gender: 'Male',
        languages: [],
        preferredLanguage: 'English'
      },
      contact: {
        type: 'client',
        contacts: []
      }
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Create New Client */}
      <div 
        onClick={() => {
          handleDeselect();
          onUpdate({ clientType: 'new' });
        }}
        className={`
          relative p-6 rounded-xl cursor-pointer transition-all duration-200
          ${data.clientType === 'new'
            ? 'bg-blue-50 border-2 border-blue-500 shadow-lg'
            : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }
        `}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Create a</h3>
            <p className="text-blue-600 font-medium">new client</p>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-8 flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="text-center">
            <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Add client</p>
          </div>
        </div>
      </div>

      {/* Select Existing Client */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <UserPlus className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Select from</h3>
            <p className="text-yellow-600 font-medium">existing clients</p>
          </div>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Dropdown Results */}
          {searchQuery && filteredClients.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={client.imageUrl}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{client.citizenship}</span>
                        <span>•</span>
                        <span>{getAge(client.birthInfo.dateOfBirth)} years old</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Client Card */}
        {selectedClient && !filteredClients.length && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedClient.imageUrl}
                  alt={selectedClient.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{selectedClient.name}</h4>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>{selectedClient.citizenship}</span>
                      <span>•</span>
                      <span>{getAge(selectedClient.birthInfo.dateOfBirth)} years old</span>
                      <span>•</span>
                      <span>{selectedClient.caseCount} existing cases</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {selectedClient.contacts.length} existing contacts
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeselect();
                }}
                className="p-1 hover:bg-green-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-green-600" />
              </button>
            </div>

            {/* Verification Notice */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                Please verify all contact information in the next steps is still current.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="col-span-2 flex justify-between mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClientTypeStep;