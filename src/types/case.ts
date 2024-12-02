export interface NewCase {
  clientType: 'new' | 'existing';
  clientInfo: {
    lastName: string;
    firstName: string;
    middleName?: string;
    phone: string;
    email: string;
  };
  birthInfo: {
    month: string;
    day: string;
    year: string;
    countryOfBirth: string;
    citizenship: string;
    gender: 'Male' | 'Female' | 'Nonbinary' | 'Other';
    languages: string[];
    preferredLanguage: 'English' | 'Spanish' | 'Other';
  };
  contact: {
    type: 'client' | 'other';
    contacts: Contact[];
    selectedContactId?: string;
  };
  caseDetails: {
    type: string;
    description: string;
    leadSource: 'Meta' | 'Google' | 'LinkedIn' | 'Referral';
    notes: string;
  };
}

export interface Contact {
  id: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
  bestContact: ('Text' | 'Email' | 'Phone call')[];
  preferredLanguage: 'English' | 'Spanish' | 'Other';
  role: ('Contacted us for help with case' | 'Former or current client' | 'Assistance with providing information')[];
}