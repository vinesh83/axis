import React from 'react';
import { Calendar, Flag, Baby, Globe2, Heart } from 'lucide-react';
import { Client } from '../../types/clients';

interface ClientInfoCardProps {
  client: Client;
}

const ClientInfoCard = ({ client }: ClientInfoCardProps) => {
  const birthDate = new Date(client.birthInfo.dateOfBirth);
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const bioInfo = [
    { icon: <Calendar className="w-4 h-4" />, label: 'DOB', value: birthDate.toLocaleDateString() },
    { icon: <Baby className="w-4 h-4" />, label: 'Age', value: `${age} years` },
    { icon: <Flag className="w-4 h-4" />, label: 'Citizenship', value: client.citizenship },
    { icon: <Heart className="w-4 h-4" />, label: 'Status', value: 'Married' },
    { icon: <Baby className="w-4 h-4" />, label: 'Children', value: client.contacts.filter(c => c.relationship === 'Child').length.toString() },
    { 
      icon: <Globe2 className="w-4 h-4" />, 
      label: 'Languages', 
      value: client.birthInfo.languages.join(', '),
      fullWidth: true
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Client Information</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h3>
          <div className="space-y-2">
            {bioInfo.map((info, index) => (
              <div 
                key={index}
                className={`
                  bg-gray-50 rounded-md p-3
                  ${info.fullWidth ? 'block space-y-1' : 'flex items-center space-x-3'}
                `}
              >
                <div className="text-gray-400 flex-shrink-0 flex items-center space-x-3">
                  {info.icon}
                  <p className="text-xs text-gray-500">{info.label}</p>
                </div>
                {info.fullWidth ? (
                  <p className="text-sm font-medium text-gray-900 break-words mt-1">
                    {info.value}
                  </p>
                ) : (
                  <div className="min-w-0 flex-1 flex justify-end">
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {info.value}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoCard;