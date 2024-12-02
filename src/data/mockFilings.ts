import { Filing } from '../types/clients';

export const MOCK_FILINGS: Filing[] = [
  // H-1B Related Filings
  {
    id: '1',
    formNumber: 'I-129',
    formName: 'Petition for Nonimmigrant Worker (H-1B)',
    receiptNumber: 'WAC2390123456',
    status: 'in_progress',
    substatus: 'rfe',
    filedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-02-01'),
    processingTime: '2-4 months',
    priority: 'normal',
    alerts: ['RFE response due by March 15, 2024']
  },
  {
    id: '2',
    formNumber: 'I-907',
    formName: 'Request for Premium Processing',
    receiptNumber: 'EAC2390123457',
    status: 'completed',
    substatus: 'approved',
    filedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-20'),
    processingTime: '15 calendar days',
    priority: 'expedited'
  },
  // Green Card Related Filings
  {
    id: '3',
    formNumber: 'I-485',
    formName: 'Application to Register Permanent Residence',
    receiptNumber: 'MSC2390123458',
    status: 'pending',
    substatus: 'waiting',
    filedDate: new Date('2024-02-01'),
    lastUpdated: new Date('2024-02-01'),
    processingTime: '12-18 months'
  },
  {
    id: '4',
    formNumber: 'I-765',
    formName: 'Application for Employment Authorization',
    receiptNumber: 'MSC2390123459',
    status: 'in_progress',
    substatus: 'scheduled',
    filedDate: new Date('2024-02-01'),
    lastUpdated: new Date('2024-02-15'),
    processingTime: '3-5 months',
    alerts: ['Biometrics appointment scheduled for March 1, 2024']
  },
  {
    id: '5',
    formNumber: 'I-131',
    formName: 'Application for Travel Document',
    receiptNumber: 'MSC2390123460',
    status: 'pending',
    filedDate: new Date('2024-02-01'),
    lastUpdated: new Date('2024-02-01'),
    processingTime: '4-6 months'
  }
];