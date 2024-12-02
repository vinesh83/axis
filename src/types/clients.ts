import { TimelineEvent } from './timeline';

export interface Client {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  imageUrl: string;
  countryCode: string;
  citizenship: string;
  birthInfo: {
    dateOfBirth: string;
    countryOfBirth: string;
    gender: string;
    languages: string[];
    preferredLanguage: string;
  };
  contacts: Contact[];
  caseCount: number;
  timeline: TimelineEvent[];
  documents: Document[];
  cases: Case[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  bestContact: string[];
  preferredLanguage: string;
  role: string[];
}

export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  thumbnailUrl?: string;
  url?: string;
}

export interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  strategy: string;
  instructions: string;
  isActive: boolean;
  progress: {
    currentStage: number;
    totalStages: number;
    stages: CaseStage[];
  };
  uscisStatus?: USCISStatus;
}

export interface CaseStage {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  estimatedDuration?: string;
  dueDate?: Date;
}

export interface USCISStatus {
  receiptNumber: string;
  status: string;
  form: string;
  lastUpdated: Date;
  estimatedProcessingTime?: string;
  processingCenter?: string;
  alerts?: string[];
}

export interface Filing {
  id: string;
  formNumber: string;
  formName: string;
  receiptNumber: string;
  status: 'completed' | 'pending' | 'in_progress';
  substatus?: 'approved' | 'denied' | 'rfe' | 'scheduled' | 'waiting';
  filedDate: Date;
  lastUpdated: Date;
  processingTime?: string;
  priority?: 'normal' | 'expedited';
  alerts?: string[];
}