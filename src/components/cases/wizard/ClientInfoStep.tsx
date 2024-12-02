import React from 'react';
import { User, Globe } from 'lucide-react';
import { NewCase } from '../../../types/case';

interface ClientInfoStepProps {
  data: NewCase;
  onUpdate: (data: Partial<NewCase>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const COUNTRIES = [
  'Mexico', 'Honduras', 'Guatemala', 'El Salvador', 'Nicaragua',
  'Colombia', 'Venezuela', 'Brazil', 'Peru', 'Ecuador',
  'United States', 'Canada', 'Other'
];

const LANGUAGES = [
  'English', 'Spanish', 'Portuguese', 'French',
  'Mandarin', 'Arabic', 'Hindi', 'Other'
];

const ClientInfoStep = ({ data, onUpdate, onNext, onBack }: ClientInfoStepProps) => {
  const updateClientInfo = (field: keyof typeof data.clientInfo, value: string) => {
    onUpdate({
      clientInfo: { ...data.clientInfo, [field]: value }
    });
  };

  const updateBirthInfo = (field: keyof typeof data.birthInfo, value: any) => {
    onUpdate({
      birthInfo: { ...data.birthInfo, [field]: value }
    });
  };

  const isFormValid = () => {
    const { lastName, firstName, phone, email } = data.clientInfo;
    const { month, day, year, countryOfBirth, citizenship, gender } = data.birthInfo;
    return (
      lastName && firstName && phone && email &&
      month && day && year && countryOfBirth && 
      citizenship && gender
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Client Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <User className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold">Client information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              value={data.clientInfo.lastName}
              onChange={(e) => updateClientInfo('lastName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                type="text"
                value={data.clientInfo.firstName}
                onChange={(e) => updateClientInfo('firstName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle name
              </label>
              <input
                type="text"
                value={data.clientInfo.middleName}
                onChange={(e) => updateClientInfo('middleName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={data.clientInfo.phone}
              onChange={(e) => updateClientInfo('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={data.clientInfo.email}
              onChange={(e) => updateClientInfo('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Birth & Citizenship */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold">Birth & citizenship</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month of birth
              </label>
              <select
                value={data.birthInfo.month}
                onChange={(e) => updateBirthInfo('month', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {MONTHS.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={data.birthInfo.day}
                onChange={(e) => updateBirthInfo('day', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={data.birthInfo.year}
                onChange={(e) => updateBirthInfo('year', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country of birth
              </label>
              <select
                value={data.birthInfo.countryOfBirth}
                onChange={(e) => updateBirthInfo('countryOfBirth', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Citizenship
              </label>
              <select
                value={data.birthInfo.citizenship}
                onChange={(e) => updateBirthInfo('citizenship', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex space-x-4">
              {['Male', 'Female', 'Nonbinary', 'Other'].map((gender) => (
                <label
                  key={gender}
                  className={`
                    flex items-center px-4 py-2 rounded-lg cursor-pointer
                    ${data.birthInfo.gender === gender
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={data.birthInfo.gender === gender}
                    onChange={(e) => updateBirthInfo('gender', e.target.value)}
                    className="sr-only"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred language
            </label>
            <div className="flex space-x-4">
              {['English', 'Spanish', 'Other'].map((lang) => (
                <label
                  key={lang}
                  className={`
                    flex items-center px-4 py-2 rounded-lg cursor-pointer
                    ${data.birthInfo.preferredLanguage === lang
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value={lang}
                    checked={data.birthInfo.preferredLanguage === lang}
                    onChange={(e) => updateBirthInfo('preferredLanguage', e.target.value)}
                    className="sr-only"
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Languages
            </label>
            <select
              multiple
              value={data.birthInfo.languages}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                updateBirthInfo('languages', selected);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            >
              {LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="col-span-2 flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClientInfoStep;