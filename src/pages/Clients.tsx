import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, Filter } from 'lucide-react';
import ClientCard from '../components/clients/ClientCard';
import { Client } from '../types/clients';
import { clientService } from '../services/clientService';
import { MOCK_CLIENTS } from "../data/mockClients";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'timeline'>('grid');

  useEffect(() => {
    // const fetchClients = async () => {
    //   try {
    //     setLoading(true);
    //     const fetchedClients = await clientService.getClients();
    //     setClients(fetchedClients);
    //     setError(null);
    //   } catch (err) {
    //     console.error('Error fetching clients:', err);
    //     setError('Failed to load clients. Please try again later.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchClients();
    setLoading(true);
    setClients(MOCK_CLIENTS);
    setLoading(false);
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.citizenship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
            {clients.length} Total
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                view === 'grid'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                view === 'timeline'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Timeline
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Client
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Client Timeline</h2>
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="space-y-8">
            {filteredClients.map((client) => (
              <div key={client.id} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={client.imageUrl}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/clients/${client.id}`)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;