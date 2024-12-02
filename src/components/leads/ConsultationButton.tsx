import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, X, Check } from 'lucide-react';
import Portal from '../modals/Portal';
import { leadService } from '../../services/leadService';

interface ConsultationButtonProps {
  status: string;
  leadId: string;
  onSchedule: (type: 'video' | 'phone' | 'in-person', date: Date, time: string) => Promise<void>;
}

const ConsultationButton = ({ status, leadId, onSchedule }: ConsultationButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  const validateScheduling = () => {
    if (!selectedDate) {
      setError('Please select a date');
      return false;
    }
    if (!selectedTime) {
      setError('Please select a time');
      return false;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (scheduledDateTime < new Date()) {
      setError('Cannot schedule consultation in the past');
      return false;
    }

    return true;
  };

  const handleSchedule = async () => {
    if (scheduling || !validateScheduling()) return;

    try {
      setScheduling(true);
      setError(null);
      
      const consultationDate = new Date(`${selectedDate}T${selectedTime}`);
      
      // First update the lead in the database
      await leadService.updateLead(leadId, {
        consultation: 'Scheduled',
        consultationDetails: {
          type: consultationType,
          date: consultationDate,
          time: selectedTime
        }
      });

      // Then notify parent component
      await onSchedule(consultationType, consultationDate, selectedTime);
      
      setShowModal(false);
    } catch (err) {
      console.error('Error scheduling consultation:', err);
      setError('Failed to schedule consultation. Please try again.');
    } finally {
      setScheduling(false);
    }
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const today = new Date().toISOString().split('T')[0];

  if (status === 'Scheduled') {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        <Check className="w-3 h-3 mr-1" />
        Scheduled
      </span>
    );
  }

  if (status === 'Missed') {
    return (
      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
        Missed
      </span>
    );
  }

  if (status === 'Not required') {
    return (
      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
        Not required
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
      >
        <Calendar className="w-3 h-3 mr-1" />
        Schedule Consultation
      </button>

      {showModal && (
        <Portal>
          <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                aria-hidden="true"
                onClick={() => !scheduling && setShowModal(false)}
              />

              {/* Modal */}
              <div className="relative z-[70] w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all sm:my-8">
                <div className="flex justify-between items-center p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
                    Schedule Consultation
                  </h3>
                  <button
                    onClick={() => !scheduling && setShowModal(false)}
                    disabled={scheduling}
                    className="text-gray-400 hover:text-gray-500 transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Consultation Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Consultation
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { type: 'video', icon: Video, label: 'Video Call' },
                        { type: 'phone', icon: Phone, label: 'Phone Call' },
                        { type: 'in-person', icon: MapPin, label: 'In Person' }
                      ].map(({ type, icon: Icon, label }) => (
                        <button
                          key={type}
                          onClick={() => setConsultationType(type as any)}
                          disabled={scheduling}
                          className={`
                            p-3 rounded-lg flex flex-col items-center text-sm transition-all
                            ${consultationType === type
                              ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                          `}
                        >
                          <Icon className="w-5 h-5 mb-1" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setError(null);
                      }}
                      min={today}
                      disabled={scheduling}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto rounded-lg border border-gray-200 p-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setError(null);
                          }}
                          disabled={scheduling}
                          className={`
                            p-2 text-sm rounded-lg transition-all
                            ${selectedTime === time
                              ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
                  <button
                    onClick={() => !scheduling && setShowModal(false)}
                    disabled={scheduling}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSchedule}
                    disabled={!selectedDate || !selectedTime || scheduling}
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                  >
                    {scheduling ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Scheduling...
                      </>
                    ) : (
                      'Schedule'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default ConsultationButton;