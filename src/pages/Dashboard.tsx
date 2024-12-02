import React, { useState } from 'react';
import { Users, FileText, Clock, AlertCircle, TrendingUp, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import StatsModal from '../components/dashboard/StatsModal';
import DeadlinesModal from '../components/dashboard/DeadlinesModal';
import AppointmentsModal from '../components/dashboard/AppointmentsModal';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<{
    title: string;
    value: string;
    trend: string;
    data: { labels: string[]; values: number[] };
  } | null>(null);
  
  const [showDeadlines, setShowDeadlines] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  const stats = [
    { 
      icon: <Users className="text-blue-500" />, 
      title: "Active Clients", 
      value: "156", 
      trend: "+12",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [120, 132, 141, 138, 149, 156]
      }
    },
    { 
      icon: <FileText className="text-purple-500" />, 
      title: "Pending Cases", 
      value: "28", 
      trend: "+4",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [18, 22, 25, 24, 26, 28]
      }
    },
    { 
      icon: <Clock className="text-amber-500" />, 
      title: "Upcoming Deadlines", 
      value: "15", 
      trend: "-3",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [12, 15, 18, 20, 17, 15]
      }
    },
    { 
      icon: <AlertCircle className="text-red-500" />, 
      title: "Urgent Actions", 
      value: "5", 
      trend: "+2",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [3, 2, 4, 3, 4, 5]
      }
    },
    { 
      icon: <TrendingUp className="text-green-500" />, 
      title: "Success Rate", 
      value: "94%", 
      trend: "+2.5",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [88, 90, 91, 92, 93, 94]
      }
    },
    { 
      icon: <DollarSign className="text-emerald-500" />, 
      title: "Revenue MTD", 
      value: "$45.2K", 
      trend: "+8.1",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [35000, 37500, 40000, 42500, 44000, 45200]
      }
    },
  ];

  const upcomingDeadlines = [
    { 
      id: 1, 
      client: "Sarah Chen", 
      type: "I-485 Filing", 
      deadline: "2024-03-25", 
      status: "pending",
      priority: "high",
      assignedTo: "Vinesh Patel",
      description: "Complete and file I-485 application for adjustment of status. All supporting documents have been received."
    },
    { 
      id: 2, 
      client: "Miguel Rodriguez", 
      type: "H-1B Extension", 
      deadline: "2024-03-28", 
      status: "in_progress",
      priority: "medium",
      assignedTo: "David Kim",
      description: "Prepare H-1B extension petition. Waiting for updated employment letter from employer."
    },
    { 
      id: 3, 
      client: "Aisha Patel", 
      type: "N-400 Interview", 
      deadline: "2024-04-02", 
      status: "scheduled",
      priority: "medium",
      assignedTo: "Vinesh Patel",
      description: "Prepare client for naturalization interview. Schedule mock interview session."
    }
  ];

  const appointments = [
    { 
      id: 1, 
      time: "9:00 AM", 
      client: "John Smith", 
      type: "Initial Consultation",
      method: "video" as const,
      duration: "1 hour",
      notes: "First-time consultation regarding employment-based green card options."
    },
    { 
      id: 2, 
      time: "11:30 AM", 
      client: "Emma Davis", 
      type: "Document Review",
      method: "in-person" as const,
      duration: "45 minutes",
      location: "Main Office",
      notes: "Review and sign I-130 petition documents."
    },
    { 
      id: 3, 
      time: "2:00 PM", 
      client: "Carlos Mendoza", 
      type: "Case Strategy",
      method: "phone" as const,
      duration: "30 minutes",
      notes: "Discuss response strategy for RFE received on I-601A waiver application."
    },
    { 
      id: 4, 
      time: "4:30 PM", 
      client: "Sofia Kim", 
      type: "Follow-up Meeting",
      method: "in-person" as const,
      duration: "1 hour",
      location: "Main Office",
      notes: "Review case progress and collect additional evidence for asylum application."
    }
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Vinesh</h1>
        <p className="text-gray-600">Here's what's happening with your cases today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
            onClick={() => setSelectedStat(stat)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50">{stat.icon}</div>
              <span className={`text-sm ${
                stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => setShowDeadlines(true)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{deadline.client}</p>
                    <p className="text-sm text-gray-500">{deadline.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{deadline.deadline}</p>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${deadline.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      deadline.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {deadline.status === 'pending' ? 'Pending' :
                     deadline.status === 'in_progress' ? 'In Progress' :
                     'Scheduled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => setShowAppointments(true)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Today's Appointments</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View calendar</button>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.client}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedStat && (
        <StatsModal
          title={selectedStat.title}
          value={selectedStat.value}
          trend={selectedStat.trend}
          data={selectedStat.data}
          onClose={() => setSelectedStat(null)}
        />
      )}

      {showDeadlines && (
        <DeadlinesModal
          deadlines={upcomingDeadlines}
          onClose={() => setShowDeadlines(false)}
        />
      )}

      {showAppointments && (
        <AppointmentsModal
          appointments={appointments}
          onClose={() => setShowAppointments(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;