import { TimelineEventCategory } from './timeline';

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: TimelineEventCategory;
  type: 'document' | 'milestone' | 'update';
  subtype?: string;
  relatedForm?: string;
  documentUrl?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'completed' | 'cancelled';
  assignedTo?: string;
}

export interface TimelineNote {
  id: string;
  eventId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  attachments?: NoteAttachment[];
}

export interface NoteAttachment {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf';
  fileName: string;
  uploadedAt: Date;
}

export interface TimelineFilter {
  categories: TimelineEventCategory[];
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

export type TimelineEventCategory = 'personal' | 'immigration' | 'criminal' | 'internal';