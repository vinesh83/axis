import React from 'react';
import { AlertCircle, Clock, Building2, ExternalLink, RefreshCcw } from 'lucide-react';
import { USCISStatus } from '../../types/clients';

interface USCISStatusCardProps {
  status: USCISStatus;
  onRefresh?: () => void;
}

const USCISStatusCard = ({ status, onRefresh }: USCISStatusCardProps) => {
  if (!status) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-50 border-green-100 text-green-700';
      case 'denied':
        return 'bg-red-50 border-red-100 text-red-700';
      case 'rfe issued':
        return 'bg-yellow-50 border-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-50 border-blue-100 text-blue-700';
    }
  };

  return (
    <div className={`mt-6 rounded-lg p-6 border ${getStatusColor(status.status)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h4 className="text-lg font-semibold">USCIS Case Status</h4>
          <span className="px-3 py-1 rounded-full text-sm bg-white/50">
            Form {status.form}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              title="Refresh status"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          )}
          <a
            href={`https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=${status.receiptNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1 bg-white/50 rounded-lg hover:bg-white/75 transition-colors"
          >
            <span>Check on USCIS</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">{status.status}</p>
              <p className="text-sm mt-1">
                Receipt Number: <span className="font-medium">{status.receiptNumber}</span>
              </p>
              <p className="text-sm mt-1">
                Last Updated: {status.lastUpdated
                  ? new Date(status.lastUpdated).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {status.processingCenter && (
            <div className="flex items-start space-x-3">
              <Building2 className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">{status.processingCenter}</p>
                <p className="text-sm">Processing Location</p>
              </div>
            </div>
          )}
        </div>

        <div>
          {status.estimatedProcessingTime && (
            <div className="bg-white/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">Processing Time</h5>
              <p className="text-sm">{status.estimatedProcessingTime}</p>
            </div>
          )}

          {status.alerts && status.alerts.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h5 className="font-medium">Important Alerts</h5>
              </div>
              <div className="space-y-2">
                {status.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="bg-white/50 rounded-lg p-3 text-sm"
                  >
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default USCISStatusCard;