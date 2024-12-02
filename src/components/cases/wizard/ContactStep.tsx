import React, { useState } from 'react';
import { UserPlus, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { NewCase, Contact } from '../../../types/case';
import { v4 as uuidv4 } from 'uuid';

interface ContactStepProps {
  data: NewCase;
  onUpdate: (data: Partial<NewCase>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ContactStep = ({ data, onUpdate, onNext, onBack }: ContactStepProps) => {
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    id: uuidv4(),
    bestContact: [],
    role: []
  });

  const handleContactTypeChange = (type: 'client' | 'other') => {
    onUpdate({
      contact: { ...data.contact, type, selectedContactId: undefined }
    });
  };

  const handleSelectContact = (contactId: string) => {
    onUpdate({
      contact: { 
        ...data.contact, 
        type: 'other',
        selectedContactId: contactId 
      }
    });
  };

  const handleSaveContact = () => {
    if (newContact.lastName && newContact.firstName && newContact.phone && newContact.email) {
      onUpdate({
        contact: {
          ...data.contact,
          contacts: [...data.contact.contacts, newContact as Contact]
        }
      });
      setShowNewContactForm(false);
      setNewContact({ id: uuidv4(), bestContact: [], role: [] });
    }
  };

  const updateNewContact = (field: keyof Contact, value: any) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const toggleBestContact = (method: 'Text' | 'Email' | 'Phone call') => {
    setNewContact(prev => ({
      ...prev,
      bestContact: prev.bestContact?.includes(method)
        ? prev.bestContact.filter(m => m !== method)
        : [...(prev.bestContact || []), method]
    }));
  };

  const toggleRole = (role: Contact['role'][number]) => {
    setNewContact(prev => ({
      ...prev,
      role: prev.role?.includes(role)
        ? prev.role.filter(r => r !== role)
        : [...(prev.role || []), role]
    }));
  };

  const getBestContactIcon = (method: string) => {
    switch (method) {
      case 'Text': return <MessageSquare className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'Phone call': return <Phone className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Contact Selection */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Who is the point of contact?</h3>
        
        {/* Client Option */}
        <label className={`
          block p-4 rounded-lg cursor-pointer border-2 transition-all
          ${data.contact.type === 'client' && !data.contact.selectedContactId
            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
            : 'border-gray-200 hover:border-blue-200'
          }
        `}>
          <input
            type="radio"
            name="contactType"
            checked={data.contact.type === 'client' && !data.contact.selectedContactId}
            onChange={() => handleContactTypeChange('client')}
            className="sr-only"
          />
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {data.clientInfo.firstName} {data.clientInfo.lastName}
              </p>
              <p className="text-sm text-gray-500">Client</p>
            </div>
          </div>
        </label>

        {/* Existing Contacts */}
        {data.contact.contacts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700">Existing Contacts</h4>
              <button
                onClick={() => setShowNewContactForm(true)}
                className="text-blue-600 text-sm hover:text-blue-700 flex items-center space-x-1"
              >
                <UserPlus className="w-4 h-4" />
                <span>New contact</span>
              </button>
            </div>

            <div className="space-y-2">
              {data.contact.contacts.map(contact => (
                <label
                  key={contact.id}
                  className={`
                    block p-4 rounded-lg cursor-pointer border-2 transition-all
                    ${data.contact.selectedContactId === contact.id
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="contact"
                    checked={data.contact.selectedContactId === contact.id}
                    onChange={() => handleSelectContact(contact.id)}
                    className="sr-only"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{contact.relationship}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contact.bestContact.map(method => (
                          <div key={method} className="text-gray-400 hover:text-gray-600" title={method}>
                            {getBestContactIcon(method)}
                          </div>
                        ))}
                      </div>
                    </div>
                    {contact.role && contact.role.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {contact.role.map(role => (
                          <span
                            key={role}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Add Contact Button (when no contacts exist) */}
        {data.contact.contacts.length === 0 && (
          <button
            onClick={() => setShowNewContactForm(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <div className="flex flex-col items-center space-y-2">
              <UserPlus className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-600">Add a new contact</span>
            </div>
          </button>
        )}
      </div>

      {/* New Contact Form */}
      {showNewContactForm && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Create a new contact</h3>
            </div>
            <button
              onClick={handleSaveContact}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Save contact
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                type="text"
                value={newContact.lastName || ''}
                onChange={(e) => updateNewContact('lastName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                type="text"
                value={newContact.firstName || ''}
                onChange={(e) => updateNewContact('firstName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={newContact.phone || ''}
                onChange={(e) => updateNewContact('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newContact.email || ''}
                onChange={(e) => updateNewContact('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship to client
            </label>
            <select
              value={newContact.relationship || ''}
              onChange={(e) => updateNewContact('relationship', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best means of contact
            </label>
            <div className="flex space-x-4">
              {['Text', 'Email', 'Phone call'].map((method) => (
                <label
                  key={method}
                  className={`
                    flex items-center px-4 py-2 rounded-lg cursor-pointer
                    ${newContact.bestContact?.includes(method as any)
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={newContact.bestContact?.includes(method as any)}
                    onChange={() => toggleBestContact(method as any)}
                    className="sr-only"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interested party role
            </label>
            <div className="space-y-2">
              {[
                'Contacted us for help with case',
                'Former or current client',
                'Assistance with providing information'
              ].map((role) => (
                <label
                  key={role}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={newContact.role?.includes(role as any)}
                    onChange={() => toggleRole(role as any)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="col-span-2 flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactStep;