import React from 'react';
import { WifiOff } from 'lucide-react';
import { isOffline } from '../lib/firebase';

const OfflineIndicator = () => {
  const [showOffline, setShowOffline] = React.useState(isOffline);

  React.useEffect(() => {
    const handleOnline = () => setShowOffline(false);
    const handleOffline = () => setShowOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg shadow-lg border border-yellow-200 flex items-center space-x-2 animate-fade-in">
      <WifiOff className="w-5 h-5" />
      <span>You're offline. Changes will sync when you're back online.</span>
    </div>
  );
};

export default OfflineIndicator;