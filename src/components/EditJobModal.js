import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { X, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' }
];

const currencyOptions = [
  { value: 'PHP', label: '₱ PHP (Philippine Peso)', symbol: '₱' },
  { value: 'USD', label: '$ USD (US Dollar)', symbol: '$' },
  { value: 'EUR', label: '€ EUR (Euro)', symbol: '€' },
  { value: 'GBP', label: '£ GBP (British Pound)', symbol: '£' },
  { value: 'JPY', label: '¥ JPY (Japanese Yen)', symbol: '¥' },
  { value: 'CAD', label: 'C$ CAD (Canadian Dollar)', symbol: 'C$' },
  { value: 'AUD', label: 'A$ AUD (Australian Dollar)', symbol: 'A$' },
  { value: 'SGD', label: 'S$ SGD (Singapore Dollar)', symbol: 'S$' },
  { value: 'HKD', label: 'HK$ HKD (Hong Kong Dollar)', symbol: 'HK$' },
  { value: 'KRW', label: '₩ KRW (South Korean Won)', symbol: '₩' },
  { value: 'INR', label: '₹ INR (Indian Rupee)', symbol: '₹' },
  { value: 'CNY', label: '¥ CNY (Chinese Yuan)', symbol: '¥' },
  { value: 'THB', label: '฿ THB (Thai Baht)', symbol: '฿' },
  { value: 'MYR', label: 'RM MYR (Malaysian Ringgit)', symbol: 'RM' },
  { value: 'IDR', label: 'Rp IDR (Indonesian Rupiah)', symbol: 'Rp' },
  { value: 'VND', label: '₫ VND (Vietnamese Dong)', symbol: '₫' },
  { value: 'OTHER', label: 'Other', symbol: '' }
];

export default function EditJobModal({ job, onClose, onJobUpdated }) {
  const [formData, setFormData] = useState({
    company: job.company || '',
    role: job.role || '',
    location: job.location || '',
    salary: job.salary || '',
    currency: job.currency || 'PHP',
    status: job.status || 'applied',
    jobUrl: job.jobUrl || '',
    notes: job.notes || ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role) {
      toast.error('Please fill in company and role fields');
      return;
    }

    try {
      setLoading(true);
      await updateDoc(doc(db, 'jobs', job.id), {
        ...formData,
        updatedAt: new Date()
      });
      
      toast.success('Job application updated successfully!');
      onJobUpdated();
    } catch (error) {
      toast.error('Failed to update job application');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Job Application</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter job title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="City, State or Remote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary
              </label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., 80,000 - 100,000"
                  />
                </div>
                <div className="w-32">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {currencyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.symbol} {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="input-field"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job URL
              </label>
              <input
                type="url"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleInputChange}
                className="input-field"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="input-field"
              placeholder="Add any notes about this application..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 