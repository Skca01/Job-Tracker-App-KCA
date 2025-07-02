import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  LogOut, 
  User,
  Briefcase,
  Calendar,
  DollarSign
} from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import JobCard from './JobCard';
import AddJobModal from './AddJobModal';
import toast from 'react-hot-toast';
import ContactWidget from './ContactWidget';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' }
];

const statusDotColors = {
  all: 'bg-gray-400',
  applied: 'bg-yellow-400',
  interview: 'bg-purple-500',
  offer: 'bg-green-500',
  rejected: 'bg-red-500',
  withdrawn: 'bg-gray-500'
};

function StatusDot({ status }) {
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full mr-2 align-middle ${statusDotColors[status] || 'bg-gray-400'}`}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
}

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'jobs'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) {
          data.createdAt = new Date();
        }
        jobsData.push({ id: doc.id, ...data });
      });
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      console.error('Firestore error:', error);
      if (error.code === 'failed-precondition') {
        toast.error('Database index is being created. Please wait a moment and refresh.');
      } else {
        toast.error('Failed to load job applications. Please try again.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === 'applied').length,
    interview: jobs.filter(job => job.status === 'interview').length,
    offer: jobs.filter(job => job.status === 'offer').length,
    rejected: jobs.filter(job => job.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card border-b-0 rounded-none shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4 sm:gap-0 text-center sm:text-left">
            {/* Logo and Title */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-2 sm:mb-0">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Job Tracker</h1>
                <p className="text-sm text-gray-600">Manage your career journey</p>
              </div>
            </div>
            {/* User Info and Logout */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:space-x-6 w-full sm:w-auto">
              <div className="flex items-center space-x-2 bg-white/50 rounded-xl px-4 py-2 mx-auto sm:mx-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-base">{currentUser?.displayName || currentUser?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/70 rounded-xl px-4 py-2 transition-all duration-300 text-base mx-auto sm:mx-0"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-10">
          <div className="card group">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="card group">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applied</p>
                <p className="text-3xl font-bold text-gray-900">{stats.applied}</p>
              </div>
            </div>
          </div>
          <div className="card group">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interview</p>
                <p className="text-3xl font-bold text-gray-900">{stats.interview}</p>
              </div>
            </div>
          </div>
          <div className="card group">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.offer}</p>
              </div>
            </div>
          </div>
          <div className="card group">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 sticky top-0 z-20 shadow-md sm:static sm:shadow-none">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-600 drop-shadow pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search companies or roles..."
                  className="input-field pl-14 py-3 w-full sm:w-80 text-lg sm:text-base rounded-xl border-2 border-blue-100 focus:border-blue-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative min-w-[160px] w-full sm:w-auto">
                <button
                  type="button"
                  className="input-field pl-12 pr-8 w-full flex items-center justify-between cursor-pointer"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="flex items-center">
                    <StatusDot status={statusFilter} />
                    {statusOptions.find(opt => opt.value === statusFilter)?.label || 'All Status'}
                  </span>
                  <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute z-[9999] mt-2 w-full min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-2xl py-1 max-h-60 overflow-auto" role="listbox" style={{zIndex: 9999, boxShadow: '0 8px 24px rgba(0,0,0,0.12)'}}>
                    {statusOptions.map(option => (
                      <li
                        key={option.value}
                        className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${statusFilter === option.value ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => { setStatusFilter(option.value); setDropdownOpen(false); }}
                        role="option"
                        aria-selected={statusFilter === option.value}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setStatusFilter(option.value); setDropdownOpen(false); } }}
                      >
                        <StatusDot status={option.value} />
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
                <Filter className="absolute left-4 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex btn-primary items-center justify-center space-x-3 px-8 py-3 text-base rounded-xl shadow-md"
            >
              <Plus className="h-6 w-6" />
              <span>Add Job</span>
            </button>
          </div>
        </div>
        {/* Floating Add Job Button for Mobile */}
        <button
          onClick={() => setShowAddModal(true)}
          className="sm:hidden fixed bottom-20 right-6 z-40 bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-full shadow-2xl p-5 flex items-center justify-center transition-all duration-200 border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add Job"
        >
          <Plus className="h-8 w-8" />
        </button>

        {/* Job List */}
        {/* Mobile: horizontally scrollable job cards */}
        <div className="block md:hidden w-full overflow-x-auto pb-4" aria-label="Saved jobs list, swipe left or right">
          <div className="flex gap-4 px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {filteredJobs.map(job => (
              <div key={job.id} className="min-w-[85vw] max-w-xs flex-shrink-0">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-10 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">No jobs found</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base">
              {jobs.length === 0 
                ? "Start your job search journey by adding your first application"
                : "Try adjusting your search or filter criteria"
              }
            </p>
            {jobs.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
              >
                Add your first job
              </button>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddJobModal
          onClose={() => setShowAddModal(false)}
          onJobAdded={() => setShowAddModal(false)}
        />
      )}
      <ContactWidget mobileOffset={true} />
      <style>{`
        @media (max-width: 640px) {
          .contact-widget-mobile {
            bottom: 90px !important;
            right: 16px !important;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
} 