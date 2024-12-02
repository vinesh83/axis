import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import LeadTable from '../components/leads/LeadTable';
import LeadStatusTabs from '../components/leads/LeadStatusTabs';
import NewCaseModal from '../components/leads/NewCaseModal';
import { Lead, LeadStatus } from '../types/leads';
import { leadService } from '../services/leadService';

const Leads = () => {
  const [activeStatus, setActiveStatus] = useState<LeadStatus>('new_prospects');
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedLeads = await leadService.getLeadsByStatus(activeStatus);
        if (mounted) {
          setLeads(fetchedLeads);
        }
      } catch (err) {
        console.error('Error fetching leads:', err);
        if (mounted) {
          setError('Failed to load leads. Please try again later.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchLeads();

    return () => {
      mounted = false;
    };
  }, [activeStatus]);

  const handleNewCase = async (newLead: Omit<Lead, 'id'>) => {
    try {
      setError(null);
      await leadService.addLead(newLead);
      const updatedLeads = await leadService.getLeadsByStatus(activeStatus);
      setLeads(updatedLeads);
      setIsNewCaseModalOpen(false);
    } catch (err) {
      console.error('Error adding new lead:', err);
      setError('Failed to add new lead. Please try again.');
    }
  };

  return (
    <div className="ml-20 px-4 sm:px-6 lg:px-8 py-8 max-w-full transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Leads
          </h1>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium border border-blue-100 shadow-sm">
            {leads.length} Cases
          </div>
        </div>
        <button 
          onClick={() => setIsNewCaseModalOpen(true)}
          className="relative group btn-primary overflow-hidden shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center whitespace-nowrap">
            <Plus className="w-5 h-5 mr-2" />
            New case
          </div>
        </button>
      </div>

      <LeadStatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 flow-root">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <LeadTable leads={leads} />
        )}
      </div>

      <NewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onSubmit={handleNewCase}
      />
    </div>
  );
};

export default Leads;