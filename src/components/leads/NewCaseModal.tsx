import React, { useState } from 'react';
import { X } from 'lucide-react';
import NewCaseForm from './NewCaseForm';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCaseModal = ({ isOpen, onClose }: NewCaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">Create</h2>
            <p className="text-gray-600">a new case</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <NewCaseForm onClose={onClose} />
      </div>
    </div>
  );
};

export default NewCaseModal;