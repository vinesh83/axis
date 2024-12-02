import React, { useState } from 'react';
import { Lead, LeadStatus } from '../../types/leads';
import { PROFILE_PHOTOS } from '../../data/mockPhotos';
import QuestionnaireButton from './QuestionnaireButton';
import ConsultationButton from './ConsultationButton';
import { leadService } from '../../services/leadService';
import LeadDrawer from './LeadDrawer';

interface LeadTableProps {
  leads: Lead[];
  status: LeadStatus;
}

const LeadTable = ({ leads, status }: LeadTableProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getColumns = (status: LeadStatus) => {
    const baseColumns = [
      { key: 'name', label: 'Name', minWidth: '200px' },
      { key: 'caseType', label: 'Case Type', minWidth: '180px' },
      { key: 'contacts', label: 'Contacts', minWidth: '100px' },
    ];

    const statusSpecificColumns = {
      'new_prospects': [
        { key: 'client', label: 'Client', minWidth: '120px' },
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'leadSource', label: 'Lead Source', minWidth: '120px' },
        { key: 'createdDate', label: 'Created Date', minWidth: '120px' },
        { key: 'days', label: 'Days', minWidth: '80px' },
        { key: 'questionnaire', label: 'Questionnaire', minWidth: '140px' },
        { key: 'consultation', label: 'Consultation', minWidth: '140px' }
      ],
      'under_attorney_review': [
        { key: 'client', label: 'Client', minWidth: '120px' },
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'services', label: 'Services', minWidth: '180px' },
        { key: 'startOfReview', label: 'Start of Review', minWidth: '130px' },
        { key: 'days', label: 'Days', minWidth: '80px' },
        { key: 'questionnaire', label: 'Questionnaire', minWidth: '140px' },
        { key: 'consultation', label: 'Consultation', minWidth: '140px' }
      ],
      'awaiting_hire': [
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'services', label: 'Services', minWidth: '180px' },
        { key: 'approvalDate', label: 'Approval Date', minWidth: '130px' },
        { key: 'days', label: 'Days', minWidth: '80px' },
        { key: 'questionnaire', label: 'Questionnaire', minWidth: '140px' },
        { key: 'consultation', label: 'Consultation', minWidth: '140px' },
        { key: 'total', label: 'Total', minWidth: '100px' },
        { key: 'firstPayment', label: 'Down Payment', minWidth: '120px' }
      ],
      'hired': [
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'services', label: 'Services', minWidth: '180px' },
        { key: 'hiredDate', label: 'Hired Date', minWidth: '130px' },
        { key: 'questionnaire', label: 'Questionnaire', minWidth: '140px' },
        { key: 'consultation', label: 'Consultation', minWidth: '140px' },
        { key: 'total', label: 'Total', minWidth: '100px' },
        { key: 'nextPayment', label: 'Next Payment', minWidth: '120px' }
      ],
      'not_hired': [
        { key: 'client', label: 'Client', minWidth: '120px' },
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'services', label: 'Services', minWidth: '180px' },
        { key: 'createdDate', label: 'Created Date', minWidth: '130px' },
        { key: 'days', label: 'Days', minWidth: '80px' },
        { key: 'status', label: 'Status', minWidth: '140px' }
      ],
      'completed': [
        { key: 'addedBy', label: 'Added By', minWidth: '150px' },
        { key: 'services', label: 'Services', minWidth: '180px' },
        { key: 'completedDate', label: 'Completed Date', minWidth: '130px' },
        { key: 'total', label: 'Total', minWidth: '100px' }
      ]
    };

    return [...baseColumns, ...statusSpecificColumns[status]];
  };

  const handleSendQuestionnaire = async (leadId: string, method: 'email' | 'sms') => {
    try {
      await leadService.updateLead(leadId, {
        questionnaire: 'Sent to client',
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Failed to update questionnaire status:', error);
    }
  };

  const handleScheduleConsultation = async (
    leadId: string, 
    type: 'video' | 'phone' | 'in-person',
    date: Date,
    time: string
  ) => {
    try {
      await leadService.updateLead(leadId, {
        consultation: 'Scheduled',
        consultationDetails: { type, date, time },
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Failed to update consultation status:', error);
    }
  };

  const renderCell = (lead: Lead, column: { key: string; label: string }) => {
    switch (column.key) {
      case 'name':
        return (
          <div className="flex items-center space-x-3">
            <img
              src={PROFILE_PHOTOS[lead.lastName] || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${lead.firstName} ${lead.lastName}`)}&background=random`}
              alt={`${lead.firstName} ${lead.lastName}`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 truncate">{lead.lastName}</span>
                <span className="text-gray-900 truncate">{lead.firstName}</span>
              </div>
            </div>
          </div>
        );

      case 'questionnaire':
        return (
          <QuestionnaireButton 
            status={lead.questionnaire || 'Not started'} 
            leadId={lead.id}
            onSend={(method) => handleSendQuestionnaire(lead.id, method)}
          />
        );

      case 'consultation':
        return (
          <ConsultationButton 
            status={lead.consultation || 'Not scheduled'} 
            leadId={lead.id}
            onSchedule={(type, date, time) => handleScheduleConsultation(lead.id, type, date, time)}
          />
        );

      case 'services':
        return lead.services?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {lead.services.map((service, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {service}
              </span>
            ))}
          </div>
        ) : null;

      case 'total':
        return lead.total ? `$${lead.total.toLocaleString()}` : null;

      case 'firstPayment':
        return lead.firstPayment ? `$${lead.firstPayment.toLocaleString()}` : null;

      case 'nextPayment':
        return lead.nextPayment ? `$${lead.nextPayment.toLocaleString()}` : null;

      case 'createdDate':
        return lead.createdAt?.toLocaleDateString();

      case 'contacts':
        return lead.contacts || '0';

      default:
        return lead[column.key as keyof Lead];
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-xl shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  {getColumns(status).map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="py-4 px-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {leads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {getColumns(status).map((column) => (
                      <td key={column.key} className="whitespace-nowrap py-4 px-3 text-sm">
                        {renderCell(lead, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLead && (
        <LeadDrawer 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
};

export default LeadTable;