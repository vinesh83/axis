import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  Timestamp,
  serverTimestamp,
  QueryConstraint,
  FirestoreError,
  limit,
  startAfter,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { initializeDb } from '../lib/firebase';
import { Lead, LeadStatus } from '../types/leads';
import { MOCK_LEADS } from '../data/mockLeads';

const COLLECTION_NAME = 'leads';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const PAGE_SIZE = 25;

// Cache implementation
const cache = new Map<string, { data: Lead[]; timestamp: number; lastDoc?: QueryDocumentSnapshot }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isCacheValid = (key: string) => {
  const cached = cache.get(key);
  return cached && Date.now() - cached.timestamp < CACHE_DURATION;
};

const transformLeadForFirestore = (lead: Omit<Lead, 'id'>) => {
  return {
    ...lead,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: lead.status || 'new_prospects',
    services: lead.services || [],
    total: lead.total || 0,
    firstPayment: lead.firstPayment || 0,
    consultationDetails: lead.consultationDetails ? {
      ...lead.consultationDetails,
      date: Timestamp.fromDate(lead.consultationDetails.date)
    } : null
  };
};

const transformLeadFromFirestore = (doc: QueryDocumentSnapshot): Lead => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    services: data.services || [],
    total: data.total || 0,
    firstPayment: data.firstPayment || 0,
    consultationDetails: data.consultationDetails ? {
      ...data.consultationDetails,
      date: data.consultationDetails.date.toDate()
    } : undefined
  } as Lead;
};

export const leadService = {
  async getLeads(page = 1): Promise<{ leads: Lead[]; hasMore: boolean }> {
    const cacheKey = `leads_page_${page}`;
    
    if (isCacheValid(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      return { leads: cached.data, hasMore: !!cached.lastDoc };
    }

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
      try {
        const db = await initializeDb();
        const leadsRef = collection(db, COLLECTION_NAME);
        
        let q = query(
          leadsRef,
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );

        if (page > 1 && cache.has(`leads_page_${page - 1}`)) {
          const prevCache = cache.get(`leads_page_${page - 1}`)!;
          if (prevCache.lastDoc) {
            q = query(q, startAfter(prevCache.lastDoc));
          }
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty && page === 1) {
          const mockResult = { 
            leads: MOCK_LEADS.slice(0, PAGE_SIZE),
            hasMore: MOCK_LEADS.length > PAGE_SIZE
          };
          cache.set(cacheKey, { 
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }

        const leads = querySnapshot.docs.map(transformLeadFromFirestore);
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        cache.set(cacheKey, {
          data: leads,
          timestamp: Date.now(),
          lastDoc
        });

        return {
          leads,
          hasMore: querySnapshot.docs.length === PAGE_SIZE
        };
      } catch (error) {
        if (error instanceof FirestoreError && error.code === 'unavailable') {
          const mockResult = {
            leads: MOCK_LEADS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
            hasMore: MOCK_LEADS.length > page * PAGE_SIZE
          };
          cache.set(cacheKey, {
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }
        
        if (retries === MAX_RETRIES - 1) {
          const mockResult = {
            leads: MOCK_LEADS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
            hasMore: MOCK_LEADS.length > page * PAGE_SIZE
          };
          cache.set(cacheKey, {
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }

        await delay(RETRY_DELAY * Math.pow(2, retries));
      }
    }
    
    const mockResult = {
      leads: MOCK_LEADS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      hasMore: MOCK_LEADS.length > page * PAGE_SIZE
    };
    cache.set(cacheKey, {
      data: mockResult.leads,
      timestamp: Date.now()
    });
    return mockResult;
  },

  async getLeadsByStatus(status: LeadStatus, page = 1): Promise<{ leads: Lead[]; hasMore: boolean }> {
    const cacheKey = `leads_${status}_page_${page}`;
    
    if (isCacheValid(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      return { leads: cached.data, hasMore: !!cached.lastDoc };
    }

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
      try {
        const db = await initializeDb();
        const leadsRef = collection(db, COLLECTION_NAME);
        
        let constraints: QueryConstraint[] = [
          where('status', '==', status),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        ];

        if (page > 1 && cache.has(`leads_${status}_page_${page - 1}`)) {
          const prevCache = cache.get(`leads_${status}_page_${page - 1}`)!;
          if (prevCache.lastDoc) {
            constraints.push(startAfter(prevCache.lastDoc));
          }
        }

        const q = query(leadsRef, ...constraints);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty && page === 1) {
          const filteredMock = MOCK_LEADS.filter(lead => lead.status === status);
          const mockResult = {
            leads: filteredMock.slice(0, PAGE_SIZE),
            hasMore: filteredMock.length > PAGE_SIZE
          };
          cache.set(cacheKey, {
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }

        const leads = querySnapshot.docs.map(transformLeadFromFirestore);
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        cache.set(cacheKey, {
          data: leads,
          timestamp: Date.now(),
          lastDoc
        });

        return {
          leads,
          hasMore: querySnapshot.docs.length === PAGE_SIZE
        };
      } catch (error) {
        if (error instanceof FirestoreError && error.code === 'unavailable') {
          const filteredMock = MOCK_LEADS.filter(lead => lead.status === status);
          const mockResult = {
            leads: filteredMock.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
            hasMore: filteredMock.length > page * PAGE_SIZE
          };
          cache.set(cacheKey, {
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }

        if (retries === MAX_RETRIES - 1) {
          const filteredMock = MOCK_LEADS.filter(lead => lead.status === status);
          const mockResult = {
            leads: filteredMock.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
            hasMore: filteredMock.length > page * PAGE_SIZE
          };
          cache.set(cacheKey, {
            data: mockResult.leads,
            timestamp: Date.now()
          });
          return mockResult;
        }

        await delay(RETRY_DELAY * Math.pow(2, retries));
      }
    }
    
    const filteredMock = MOCK_LEADS.filter(lead => lead.status === status);
    const mockResult = {
      leads: filteredMock.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      hasMore: filteredMock.length > page * PAGE_SIZE
    };
    cache.set(cacheKey, {
      data: mockResult.leads,
      timestamp: Date.now()
    });
    return mockResult;
  },

  async addLead(lead: Omit<Lead, 'id'>): Promise<string> {
    // Clear cache when adding new lead
    cache.clear();

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
      try {
        const db = await initializeDb();
        const leadsRef = collection(db, COLLECTION_NAME);
        const transformedLead = transformLeadForFirestore(lead);
        const docRef = await addDoc(leadsRef, transformedLead);
        return docRef.id;
      } catch (error) {
        if (retries === MAX_RETRIES - 1) {
          throw new Error('Failed to add lead after multiple retries');
        }
        await delay(RETRY_DELAY * Math.pow(2, retries));
      }
    }
    
    throw new Error('Failed to add lead after multiple retries');
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<void> {
    // Clear cache when updating lead
    cache.clear();

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
      try {
        const db = await initializeDb();
        const leadRef = doc(db, COLLECTION_NAME, id);
        const transformedUpdates = {
          ...updates,
          updatedAt: serverTimestamp(),
          ...(updates.consultationDetails && {
            consultationDetails: {
              ...updates.consultationDetails,
              date: Timestamp.fromDate(updates.consultationDetails.date)
            }
          })
        };
        await updateDoc(leadRef, transformedUpdates);
        return;
      } catch (error) {
        if (retries === MAX_RETRIES - 1) {
          throw new Error('Failed to update lead after multiple retries');
        }
        await delay(RETRY_DELAY * Math.pow(2, retries));
      }
    }
  },

  async deleteLead(id: string): Promise<void> {
    // Clear cache when deleting lead
    cache.clear();

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
      try {
        const db = await initializeDb();
        const leadRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(leadRef);
        return;
      } catch (error) {
        if (retries === MAX_RETRIES - 1) {
          throw new Error('Failed to delete lead after multiple retries');
        }
        await delay(RETRY_DELAY * Math.pow(2, retries));
      }
    }
  }
};