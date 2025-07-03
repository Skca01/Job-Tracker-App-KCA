import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import AddJobModal from './AddJobModal';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/', icon: HomeIcon },
  { label: 'Add Job', to: '/add', icon: PlusCircleIcon },
  { label: 'Profile', to: '/profile', icon: UserCircleIcon },
];

const BottomNavBar = () => {
  const location = useLocation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow flex justify-around items-center h-16 md:hidden">
        {navItems.map(({ label, to, icon: Icon }) => (
          <button
            key={label}
            onClick={label === 'Add Job' ? () => setShowAddModal(true) : label === 'Profile' ? () => setShowProfileModal(true) : undefined}
            className={`flex flex-col items-center text-xs focus:outline-none w-full ${location.pathname === to ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Icon className="h-6 w-6 mb-1" />
            {label}
          </button>
        ))}
      </nav>
      {showAddModal && (
        <AddJobModal onClose={() => setShowAddModal(false)} onJobAdded={() => setShowAddModal(false)} />
      )}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-80 max-w-full p-6 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={() => setShowProfileModal(false)}>&times;</button>
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2">
                {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U'}
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg">{currentUser?.displayName || currentUser?.email || 'User'}</div>
                <div className="text-xs text-gray-500">Profile</div>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 text-base font-medium">
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavBar; 