import { 
  collection, 
  getDocs, 
  addDoc, 
  Timestamp, 
  writeBatch, 
  doc,
  getDoc,
  query,
  where
} from 'firebase/firestore';
import { initializeDb } from '../lib/firebase';
import { MOCK_CLIENTS } from '../data/mockClients';
import { MOCK_LEADS } from '../data/mockLeads';

export const seedService = {
  async seedData() {
    try {
      const db = await initializeDb();
      if (!db) {
        console.warn('Firestore not initialized, using mock data');
        return false;
      }

      // Check if Ana Martinez exists
      const clientsRef = collection(db, 'clients');
      const anaQuery = query(clientsRef, where('lastName', '==', 'Martinez'), where('firstName', '==', 'Ana'));
      const anaSnapshot = await getDocs(anaQuery);

      if (anaSnapshot.empty) {
        console.log('Ana Martinez not found, adding to database...');
        const anaMartinez = MOCK_CLIENTS.find(client => 
          client.firstName === 'Ana' && client.lastName === 'Martinez'
        );

        if (anaMartinez) {
          const batch = writeBatch(db);
          const docRef = doc(clientsRef);

          // Convert all dates to Firestore Timestamps
          const formattedClient = {
            ...anaMartinez,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            timeline: anaMartinez.timeline.map(event => ({
              ...event,
              date: Timestamp.fromDate(new Date(event.date))
            })),
            cases: anaMartinez.cases.map(case_ => ({
              ...case_,
              progress: {
                ...case_.progress,
                stages: case_.progress.stages.map(stage => ({
                  ...stage,
                  dueDate: stage.dueDate ? Timestamp.fromDate(new Date(stage.dueDate)) : null
                }))
              },
              uscisStatus: case_.uscisStatus ? {
                ...case_.uscisStatus,
                lastUpdated: Timestamp.fromDate(new Date(case_.uscisStatus.lastUpdated))
              } : null
            }))
          };

          batch.set(docRef, formattedClient);
          await batch.commit();
          console.log('Successfully added Ana Martinez to database');
        }
      } else {
        console.log('Ana Martinez already exists in database');
      }

      // Check and seed other collections if empty
      const collections = {
        clients: MOCK_CLIENTS,
        leads: MOCK_LEADS
      };

      for (const [collectionName, documents] of Object.entries(collections)) {
        try {
          const collectionRef = collection(db, collectionName);
          const snapshot = await getDocs(collectionRef);
          
          if (snapshot.empty) {
            console.log(`Seeding ${collectionName}...`);
            
            const batch = writeBatch(db);
            const chunkSize = 500;

            for (let i = 0; i < documents.length; i += chunkSize) {
              const chunk = documents.slice(i, i + chunkSize);
              
              for (const doc_ of chunk) {
                const docRef = doc(collectionRef);
                const formattedDoc = {
                  ...doc_,
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now(),
                  timeline: doc_.timeline?.map((event: any) => ({
                    ...event,
                    date: Timestamp.fromDate(new Date(event.date))
                  })),
                  cases: doc_.cases?.map((case_: any) => ({
                    ...case_,
                    progress: case_.progress ? {
                      ...case_.progress,
                      stages: case_.progress.stages.map((stage: any) => ({
                        ...stage,
                        dueDate: stage.dueDate ? Timestamp.fromDate(new Date(stage.dueDate)) : null
                      }))
                    } : null,
                    uscisStatus: case_.uscisStatus ? {
                      ...case_.uscisStatus,
                      lastUpdated: Timestamp.fromDate(new Date(case_.uscisStatus.lastUpdated))
                    } : null
                  }))
                };

                batch.set(docRef, formattedDoc);
              }

              await batch.commit();
              console.log(`Committed batch of ${chunk.length} documents to ${collectionName}`);
            }
            
            console.log(`Successfully seeded ${collectionName}`);
          } else {
            console.log(`Collection ${collectionName} already has data`);
          }
        } catch (error) {
          console.error(`Error seeding ${collectionName}:`, error);
        }
      }

      return true;
    } catch (error) {
      console.error('Error during database initialization:', error);
      return false;
    }
  }
};