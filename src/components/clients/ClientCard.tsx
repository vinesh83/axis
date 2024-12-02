import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../types/clients';

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clients/${client.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="hover-card bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-6 cursor-pointer"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={client.imageUrl}
            alt={client.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100"
          />
          <span 
            className="absolute bottom-0 right-0 text-xl transform translate-x-1/4"
            title={client.citizenship}
          >
            {getFlagEmoji(client.countryCode)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {client.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="badge badge-blue">
              {client.caseCount} Active Cases
            </span>
            {client.cases.some(c => c.type === 'Deportation Defense') && (
              <span className="badge badge-red">
                Deportation Defense
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center group">
          <Mail className="w-4 h-4 mr-2 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          <span className="group-hover:text-gray-900 transition-colors">{client.email}</span>
        </div>
        <div className="flex items-center group">
          <Phone className="w-4 h-4 mr-2 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          <span className="group-hover:text-gray-900 transition-colors">{client.phone}</span>
        </div>
        <div className="flex items-center group">
          <MapPin className="w-4 h-4 mr-2 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          <span className="group-hover:text-gray-900 transition-colors">{client.location}</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default ClientCard;