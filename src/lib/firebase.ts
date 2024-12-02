import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  enableIndexedDbPersistence,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  CACHE_SIZE_UNLIMITED,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setLogLevel,
  Firestore,
  writeBatch,
  doc,
  serverTimestamp,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
  waitForPendingWrites
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { MOCK_LEADS } from '../data/mockLeads';

const firebaseConfig = {
  apiKey: "AIzaSyAsuxKoYqUa8c68nuLGo0u3CfVJhWiQhJ0",
  authDomain: "immigration-saas-aab83.firebaseapp.com",
  projectId: "immigration-saas-aab83",
  storageBucket: "immigration-saas-aab83.firebasestorage.app",
  messagingSenderId: "778725145050",
  appId: "1:778725145050:web:1bbb7c787575660ee228e3",
  measurementId: "G-ZS5SWXWW0F"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics in production
let analytics;
if (typeof window !== 'undefined' && !import.meta.env.DEV) {
  analytics = getAnalytics(app);
}

// Enable detailed logging in development
if (import.meta.env.DEV) {
  setLogLevel('debug');
}

// Initialize Firestore with optimized settings
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    tabManager: persistentSingleTabManager()
  }),
  experimentalForceLongPolling: true,
  useFetchStreams: false
});

// Initialize other services
const auth = getAuth(app);
const storage = getStorage(app);

// Track offline status
let isOffline = false;

// Create required indexes and seed initial data
const createRequiredIndexes = async () => {
  try {
    const batch = writeBatch(db);
    const leadsRef = collection(db, 'leads');

    // Create composite indexes
    const indexQueries = [
      query(leadsRef, where('status', '==', 'new_prospects'), orderBy('createdAt', 'desc')),
      query(leadsRef, orderBy('createdAt', 'desc'))
    ];

    for (const indexQuery of indexQueries) {
      try {
        await getDocs(indexQuery);
      } catch (error: any) {
        if (error.code === 'failed-precondition') {
          // Seed initial data to help create indexes
          const mockLeads = MOCK_LEADS.slice(0, 5); // Start with a small batch
          for (const lead of mockLeads) {
            const docRef = doc(leadsRef);
            batch.set(docRef, {
              ...lead,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
          await batch.commit();
          
          // Wait for indexes to be created
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Retry the query
          try {
            await getDocs(indexQuery);
          } catch (retryError) {
            console.warn('Index creation retry failed:', retryError);
          }
        }
      }
    }
  } catch (error) {
    console.warn('Index creation attempted:', error);
  }
};

// Enable offline persistence and handle online/offline status
const enableOfflineSupport = async () => {
  try {
    await enableIndexedDbPersistence(db);
    
    window.addEventListener('online', async () => {
      console.log('App is online');
      isOffline = false;
      try {
        await enableNetwork(db);
        await waitForPendingWrites(db);
        await createRequiredIndexes(); // Retry index creation when back online
      } catch (error) {
        console.warn('Error enabling network:', error);
      }
    });

    window.addEventListener('offline', async () => {
      console.log('App is offline');
      isOffline = true;
      try {
        await disableNetwork(db);
      } catch (error) {
        console.warn('Error disabling network:', error);
      }
    });

  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser does not support persistence');
    }
  }
};

// Initialize database with all required setup
const initializeDb = async (): Promise<Firestore> => {
  try {
    await Promise.all([
      enableOfflineSupport(),
      createRequiredIndexes()
    ]);
    return db;
  } catch (error) {
    console.warn('Error during initialization:', error);
    return db; // Return db instance anyway to allow offline functionality
  }
};

export { initializeDb, auth, storage, app, analytics, isOffline };