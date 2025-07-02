import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ExternalLink,
  FileText,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import EditJobModal from './EditJobModal';
import toast from 'react-hot-toast';

const statusColors = {
  applied: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn'
};

const getCurrencySymbol = (currency) => {
  const currencyMap = {
    'PHP': '₱',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'KRW': '₩',
    'INR': '₹',
    'CNY': '¥',
    'THB': '฿',
    'MYR': 'RM',
    'IDR': 'Rp',
    'VND': '₫'
  };
  return currencyMap[currency] || '';
};

const formatDate = (timestamp) => {
  try {
    if (!timestamp) return 'Just now';
    
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return format(timestamp.toDate(), 'MMM dd, yyyy');
    }
    
    if (timestamp instanceof Date) {
      return format(timestamp, 'MMM dd, yyyy');
    }
    
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      return format(new Date(timestamp), 'MMM dd, yyyy');
    }
    
    return 'Just now';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Just now';
  }
};

export default function JobCard({ job }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job application?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteDoc(doc(db, 'jobs', job.id));
      toast.success('Job application deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job application');
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="card group">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {job.role}
            </h3>
            <p className="text-lg text-gray-600 mb-3 font-medium">{job.company}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              {job.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    {job.currency && job.currency !== 'OTHER' ? 
                      `${getCurrencySymbol(job.currency)}${job.salary}` : 
                      job.salary
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[job.status]}`}>
              {statusLabels[job.status]}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatDate(job.createdAt)}</span>
            </div>
          </div>

          {job.notes && (
            <div className="text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
              <p className="line-clamp-3 leading-relaxed">{job.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {job.jobUrl && (
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Job
              </a>
            )}
            {job.attachments && job.attachments.length > 0 && (
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <div className="font-medium text-gray-700 mb-1 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Attachments:
                </div>
                {job.attachments.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600"
                    download
                  >
                    <Download className="h-4 w-4" />
                    <span className="underline">{file.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditJobModal
          job={job}
          onClose={() => setShowEditModal(false)}
          onJobUpdated={() => setShowEditModal(false)}
        />
      )}
    </>
  );
} 