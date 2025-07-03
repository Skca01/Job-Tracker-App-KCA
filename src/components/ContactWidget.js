import React, { useState } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const AVATAR_URL = '/kent.jpg';

export default function ContactWidget({ showButton = true }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-end">
      {/* Contact Button with Ping and Tooltip */}
      {showButton && (
        <div className="relative group">
          <button
            className="bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-full shadow-xl p-3 flex items-center transition-all duration-200 border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen((o) => !o)}
            aria-label="Contact Kent Carlo Amante"
            tabIndex={0}
          >
            {/* Ping Animation */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <Mail className="h-6 w-6" />
          </button>
          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none select-none shadow-lg whitespace-nowrap">
            Contact Kent Carlo Amante
          </span>
        </div>
      )}
      {/* Contact Card */}
      {open && (
        <div
          className="mt-2 w-80 bg-white/95 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 flex flex-col gap-3 animate-fade-in scale-95 origin-bottom-right transition-all duration-200"
          style={{ animation: 'fadeInScale 0.18s cubic-bezier(0.4,0,0.2,1)' }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          tabIndex={0}
          aria-label="Contact card for Kent Carlo Amante"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={AVATAR_URL}
              alt="Kent Carlo Amante avatar"
              className="w-12 h-12 rounded-full shadow-md border-2 border-white object-cover bg-blue-100"
              draggable="false"
            />
            <div className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">Kent Carlo Amante</div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
          <a
            href="https://github.com/Skca01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white font-medium py-1 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
            aria-label="GitHub: github.com/Skca01"
            style={{ outline: 'none' }}
          >
            <Github className="h-5 w-5 transition-transform duration-150 group-hover:scale-110" style={{ color: '#fff' }} />
            <span className="hover:underline">github.com/Skca01</span>
          </a>
          <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
          <a
            href="mailto:carloamante125@gmail.com"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-600 font-medium py-1 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
            aria-label="Email: carloamante125@gmail.com"
            style={{ outline: 'none' }}
          >
            <Mail className="h-5 w-5 transition-transform duration-150 group-hover:scale-110 group-hover:text-red-600" style={{ color: '#D14836' }} />
            <span className="hover:underline">carloamante125@gmail.com</span>
          </a>
          <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
          <a
            href="https://www.linkedin.com/in/kent-carlo-amante-238583368/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-700 font-medium py-1 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
            aria-label="LinkedIn: kent-carlo-amante-238583368"
            style={{ outline: 'none' }}
          >
            <Linkedin className="h-5 w-5 transition-transform duration-150 group-hover:scale-110 group-hover:text-blue-700" style={{ color: '#0077B5' }} />
            <span className="hover:underline">linkedin.com/in/kent-carlo-amante-238583368</span>
          </a>
        </div>
      )}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 