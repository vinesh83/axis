export type LeadStatus = 
  | 'new_prospects'
  | 'under_attorney_review'
  | 'awaiting_hire'
  | 'hired'
  | 'not_hired'
  | 'completed';

export interface Lead {
  id: string;
  lastName: string;
  firstName: string;
  countryCode: string;
  citizenship: string;
  caseType: string;
  contacts: number;
  addedBy: string;
  services: string[];
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Common fields
  questionnaire: string;
  consultation: string;
  days: number;
  total: number;
  firstPayment: number;

  // Status-specific fields
  client?: string;
  leadSource?: string;
  startOfReview?: string;
  approvalDate?: string;
  dueDate?: string;
  hiredDate?: string;
  completedDate?: string;
  nextPayment?: number;
  consultationDetails?: {
    type: 'video' | 'phone' | 'in-person';
    date: Date;
    time: string;
  };
}