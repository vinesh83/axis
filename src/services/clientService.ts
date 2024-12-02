import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  DocumentData,
  Firestore,
  where
} from 'firebase/firestore';
import { initializeDb } from '../lib/firebase';
import { Client } from '../types/clients';
import { MOCK_CLIENTS } from '../data/mockClients';
import { seedService } from './seedService';

const COLLECTION_NAME = 'clients';

const handleFirestoreError = async (error: any, operation: string) => {
  console.error(`Error during ${operation}:`, error);

  // If offline or error occurs, try to seed data first
  if (error?.code === 'unavailable' || error?.code === 'failed-precondition') {
    try {
      await seedService.seedData();
    } catch (seedError) {
      console.error('Error seeding data:', seedError);
    }
    console.log('Using mock data due to offline/error state');
    return MOCK_CLIENTS;
  }

  throw new Error(`Failed to ${operation}. ${error.message || 'Please try again later.'}`);
};

const convertDatesToTimestamps = (data: any): any => {
  if (data instanceof Date) {
    return Timestamp.fromDate(data);
  }
  if (Array.isArray(data)) {
    return data.map(item => convertDatesToTimestamps(item));
  }
  if (data && typeof data === 'object') {
    const converted: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(data)) {
      converted[key] = convertDatesToTimestamps(value);
    }
    return converted;
  }
  return data;
};

const convertTimestampsToDate = (data: any): any => {
  if (data?.toDate && typeof data.toDate === 'function') {
    return data.toDate();
  }
  if (Array.isArray(data)) {
    return data.map(item => convertTimestampsToDate(item));
  }
  if (data && typeof data === 'object') {
    const converted: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(data)) {
      converted[key] = convertTimestampsToDate(value);
    }
    return converted;
  }
  return data;
};

export const clientService = {
  // Ensure Ana Martinez exists
  async ensureAnaMartinez(): Promise<void> {
    try {
      const db = await initializeDb();
      const clientsRef = collection(db, COLLECTION_NAME);
      
      // Check if Ana Martinez exists
      const anaQuery = query(
        clientsRef, 
        where('firstName', '==', 'Ana'),
        where('lastName', '==', 'Martinez')
      );
      
      const querySnapshot = await getDocs(anaQuery);
      
      if (querySnapshot.empty) {
        const anaMartinez = MOCK_CLIENTS.find(
          client => client.firstName === 'Ana' && client.lastName === 'Martinez'
        );
        
        if (anaMartinez) {
          const convertedData = convertDatesToTimestamps(anaMartinez);
          await addDoc(clientsRef, {
            ...convertedData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          });
          console.log('Successfully added Ana Martinez to Firestore');
        }
      } else {
        console.log('Ana Martinez already exists in Firestore');
      }
    } catch (error) {
      console.error('Error ensuring Ana Martinez exists:', error);
      throw error;
    }
  },

  // Get all clients
  async getClients(): Promise<Client[]> {
    try {
      const db = await initializeDb();
      const clientsRef = collection(db, COLLECTION_NAME);
      
      // Ensure Ana Martinez exists before fetching clients
      await this.ensureAnaMartinez();
      
      const querySnapshot = await getDocs(clientsRef);
      
      if (querySnapshot.empty) {
        console.log('No clients found in Firestore, attempting to seed data...');
        await seedService.seedData();
        
        // Try fetching again after seeding
        const newSnapshot = await getDocs(clientsRef);
        if (newSnapshot.empty) {
          console.log('Still no data after seeding, using mock data');
          return MOCK_CLIENTS;
        }

        return newSnapshot.docs.map(doc => ({
          id: doc.id,
          ...convertTimestampsToDate(doc.data())
        })) as Client[];
      }

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...convertTimestampsToDate(doc.data())
      })) as Client[];
    } catch (error) {
      return handleFirestoreError(error, 'fetch clients');
    }
  },

  // Add new client
  async addClient(client: Omit<Client, 'id'>): Promise<string> {
    try {
      const db = await initializeDb();
      const clientsRef = collection(db, COLLECTION_NAME);
      const convertedData = convertDatesToTimestamps(client);
      const docRef = await addDoc(clientsRef, {
        ...convertedData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(`Failed to add client: ${error}`);
    }
  },

  // Update client
  async updateClient(id: string, updates: Partial<Client>): Promise<void> {
    try {
      const db = await initializeDb();
      const clientRef = doc(db, COLLECTION_NAME, id);
      const convertedUpdates = convertDatesToTimestamps(updates);
      await updateDoc(clientRef, {
        ...convertedUpdates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error(`Failed to update client: ${error}`);
    }
  },

  // Delete client
  async deleteClient(id: string): Promise<void> {
    try {
      const db = await initializeDb();
      const clientRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(clientRef);
    } catch (error) {
      throw new Error(`Failed to delete client: ${error}`);
    }
  }
};