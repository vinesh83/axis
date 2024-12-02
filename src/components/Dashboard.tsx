import React from 'react';
import { Clock, Users, FileText, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const upcomingDeadlines = [
    { id: 1, client: "Sarah Chen", type: "I-485 Filing", deadline: "2024-03-25" },
    { id: 2, client: "Miguel Rodriguez", type: "H-1B Extension", deadline: "2024-03-28" },
    { id: 3, client: "Aisha Patel", type: "N-400 Interview", deadline: "2024-04-02" }
  ];

  return (
    <div className="ml-64 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Jessica</h1>
        <p className="text-gray-600">Here's what's happening with your cases today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Clock className="text-blue-500" />}
          title="Pending Cases"
          value="28"
          trend="+4"
        />
        <StatCard
          icon={<Users className="text-green-500" />}
          title="Active Clients"
          value="156"
          trend="+12"
        />
        <StatCard
          icon={<FileText className="text-purple-500" />}
          title="Documents Due"
          value="15"
          trend="-3"
        />
        <StatCard
          icon={<AlertCircle className="text-red-500" />}
          title="Urgent Actions"
          value="5"
          trend="+2"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Deadline</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingDeadlines.map((deadline) => (
                <tr key={deadline.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{deadline.client}</td>
                  <td className="py-3 px-4">{deadline.type}</td>
                  <td className="py-3 px-4">{deadline.deadline}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  trend: string; 
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <span className={`text-sm ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}%
      </span>
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;