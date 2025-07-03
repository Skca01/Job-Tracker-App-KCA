import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { X, Upload, FileText } from 'lucide-react';
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

export default function AddJobModal({ onClose, onJobAdded }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    currency: 'PHP',
    status: 'applied',
    jobUrl: '',
    notes: ''
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `attachments/${currentUser.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return {
        name: file.name,
        url: downloadURL,
        size: file.size
      };
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role) {
      toast.error('Please fill in company and role fields');
      return;
    }

    try {
      setLoading(true);
      setUploading(true);

      const uploadedFiles = await uploadFiles();
      setUploading(false);

      const jobData = {
        ...formData,
        userId: currentUser.uid,
        attachments: uploadedFiles,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'jobs'), jobData);
      
      toast.success('Job application added successfully!');
      onJobAdded();
    } catch (error) {
      toast.error('Failed to add job application');
      console.error(error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50 transition-opacity duration-300 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-1 animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Job Application</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload resume, cover letter, or other documents
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
              />
              <label
                htmlFor="file-upload"
                className="btn-secondary cursor-pointer inline-flex items-center"
              >
                Choose Files
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-5 py-3 text-base rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="btn-primary px-5 py-3 text-base rounded-xl"
            >
              {loading ? 'Adding...' : uploading ? 'Uploading files...' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 