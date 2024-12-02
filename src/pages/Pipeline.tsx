import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import LeadTable from '../components/leads/LeadTable';
import LeadStatusTabs from '../components/leads/LeadStatusTabs';
import NewCaseWizard from '../components/cases/NewCaseWizard';
import { Lead, LeadStatus } from '../types/leads';
import { NewCase } from '../types/case';
import { leadService } from '../services/leadService';
import { MOCK_LEADS } from "../data/mockLeads";

const Pipeline = () => {
  const [activeStatus, setActiveStatus] = useState<LeadStatus>('new_prospects');
  const [isNewCaseWizardOpen, setIsNewCaseWizardOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // const fetchLeads = async (page = 1, append = false) => {
  //   try {
  //     if (page === 1) {
  //       setLoading(true);
  //     } else {
  //       setLoadingMore(true);
  //     }
  //     setError(null);

  //     const { leads: newLeads, hasMore: more } = await leadService.getLeadsByStatus(activeStatus, page);
      
  //     setLeads(prev => append ? [...prev, ...newLeads] : newLeads);
  //     setHasMore(more);
  //     setCurrentPage(page);
  //   } catch (err) {
  //     console.error('Error fetching leads:', err);
  //     setError('Changes will sync when you\'re back online');
  //   } finally {
  //     setLoading(false);
  //     setLoadingMore(false);
  //   }
  // };
  const fetchLeads = async (page = 1, append = false) => {
  try {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    // Simulate filtering and pagination using MOCK_LEADS
    const filteredLeads = MOCK_LEADS.filter(lead => lead.status === activeStatus);
    const pageSize = 10; // Define the number of leads per page
    const paginatedLeads = filteredLeads.slice((page - 1) * pageSize, page * pageSize);

    setLeads(prev => (append ? [...prev, ...paginatedLeads] : paginatedLeads));
    setHasMore(page * pageSize < filteredLeads.length);
    setCurrentPage(page);
  } catch (err) {
    console.error('Error fetching leads:', err);
    setError('An error occurred while fetching leads.');
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};


  useEffect(() => {
    setCurrentPage(1);
    fetchLeads(1, false);
  }, [activeStatus]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchLeads(currentPage + 1, true);
    }
  };

  const handleNewCase = async (caseData: NewCase) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);
      
      const basePricing = {
        'Asylum': 5000,
        'Citizenship & naturalization': 3000,
        'Deportation concern & defence': 8000,
        'Employment-based visas': 6000,
        'Family-based immigration': 4000,
        'Student visas': 2500,
        'Temporary protected status': 3500,
        'U visa / T visa': 4500,
        'VAWA': 4000
      };

      const total = basePricing[caseData.caseDetails.type as keyof typeof basePricing] || 3500;
      const firstPayment = Math.round(total * 0.25);

      const newLead: Omit<Lead, 'id'> = {
        lastName: caseData.clientInfo.lastName,
        firstName: caseData.clientInfo.firstName,
        countryCode: caseData.birthInfo.countryOfBirth.substring(0, 2).toUpperCase(),
        citizenship: caseData.birthInfo.citizenship,
        caseType: caseData.caseDetails.type,
        contacts: caseData.contact.contacts.length,
        addedBy: 'Vinesh Patel',
        services: [],
        approvalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        days: 0,
        questionnaire: 'Not started',
        consultation: 'Not scheduled',
        total,
        firstPayment,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: 'new_prospects',
        createdAt: new Date(),
        updatedAt: new Date(),
        leadSource: caseData.caseDetails.leadSource,
        isReturning: caseData.clientType === 'existing'
      };

      const leadId = await leadService.addLead(newLead);
      
      // Optimistically update the UI
      setLeads(prev => [{ ...newLead, id: leadId } as Lead, ...prev]);
      setIsNewCaseWizardOpen(false);
    } catch (err) {
      console.error('Error adding new case:', err);
      setError('Changes will sync when you\'re back online');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ml-20 px-4 sm:px-6 lg:px-8 py-8 max-w-full transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pipeline
          </h1>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium border border-blue-100 shadow-sm">
            {leads.length} Potential Cases
          </div>
        </div>
        <button 
          onClick={() => setIsNewCaseWizardOpen(true)}
          disabled={isSubmitting}
          className="relative group btn-primary overflow-hidden shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center whitespace-nowrap">
            <Plus className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Adding Case...' : 'New case'}
          </div>
        </button>
      </div>

      <LeadStatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      {error && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center text-yellow-800">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
          <button 
            onClick={() => fetchLeads(1, false)}
            className="ml-auto text-sm underline hover:text-yellow-900"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-6 flow-root">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <>
            <LeadTable leads={leads} status={activeStatus} />
            
            {hasMore && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2" />
                      Loading more...
                    </span>
                  ) : (
                    'Load more'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isNewCaseWizardOpen && (
        <NewCaseWizard
          onClose={() => !isSubmitting && setIsNewCaseWizardOpen(false)}
          onSubmit={handleNewCase}
        />
      )}
    </div>
  );
};

export default Pipeline;