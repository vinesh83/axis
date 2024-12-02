import React from 'react';
import { X, Calendar, Clock, Video, Phone, Users, MapPin } from 'lucide-react';

interface Appointment {
  id: number;
  time: string;
  client: string;
  type: string;
  method: 'in-person' | 'video' | 'phone';
  duration: string;
  notes?: string;
  location?: string;
}

interface AppointmentsModalProps {
  onClose: () => void;
  appointments: Appointment[];
}

const AppointmentsModal = ({ onClose, appointments }: AppointmentsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
            <p className="text-gray-600 mt-1">Manage your appointments and meetings</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      {appointment.method === 'video' && <Video className="w-5 h-5 text-indigo-600" />}
                      {appointment.method === 'phone' && <Phone className="w-5 h-5 text-indigo-600" />}
                      {appointment.method === 'in-person' && <Users className="w-5 h-5 text-indigo-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.client}</h3>
                      <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time} ({appointment.duration})
                        </span>
                        {appointment.location && (
                          <span className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {appointment.method === 'video' && (
                      <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200 transition-colors">
                        Join Call
                      </button>
                    )}
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
                {appointment.notes && (
                  <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {appointment.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button className="btn-secondary">
            View Calendar
          </button>
          <button className="btn-primary">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsModal;