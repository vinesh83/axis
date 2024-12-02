import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import AxisLogo from './AxisLogo';

const Header = () => {
  return (
    <header className="ml-20 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-10 transition-all duration-300">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-6xl">
          <AxisLogo textClassName="text-xl text-gray-900" />
          <div className="relative ml-8 flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search cases, clients, or documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 ml-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">Vinesh Patel</p>
              <p className="text-xs text-gray-500">Immigration Attorney</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;