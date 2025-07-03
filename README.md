# Job Tracker - Professional Application Manager

A modern, full-stack job application tracking system built with React and Firebase. Created by Kent Carlo Amante as a comprehensive solution for managing job applications and showcasing full-stack development skills.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/signup with Firebase Auth
- **Job Application Management** - Add, edit, and delete job applications
- **Status Tracking** - Track applications through different stages (Applied, Interview, Offer, Rejected, Withdrawn)
- **File Attachments** - Upload resumes, cover letters, and other documents
- **Search & Filter** - Find applications by company, role, or status
- **Real-time Updates** - Live data synchronization with Firestore

### Professional Features
- **Dashboard Analytics** - Visual statistics of your job search progress
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface with Tailwind CSS
- **Toast Notifications** - User-friendly feedback for all actions
- **Data Security** - User-specific data isolation

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS with custom animations and glass morphism effects
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Currency Support**: Multi-currency support with 16+ currencies including PHP, USD, EUR, and more

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- A Firebase project with Authentication, Firestore, and Storage enabled

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd job-tracker-app
npm install
npm install @heroicons/react
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Storage
5. Get your Firebase config from Project Settings

### 3. Configure Firebase

Replace the placeholder config in `src/firebase.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Firestore Security Rules

Set up Firestore security rules to ensure data security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 5. Storage Security Rules

Set up Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /attachments/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Run the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## 📱 Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Add Job Applications** - Click "Add Job" to create new applications
3. **Track Progress** - Update status as your application progresses
4. **Upload Documents** - Attach resumes, cover letters, etc.
5. **Search & Filter** - Find specific applications quickly
6. **Monitor Analytics** - View your job search statistics

## 🎯 Portfolio Benefits

This project demonstrates Kent Carlo Amante's expertise in:

- **Full-Stack Development** - Complete React + Firebase integration
- **Authentication & Security** - User management and data protection
- **CRUD Operations** - Complete data management with real-time updates
- **File Upload** - Document handling with Firebase Storage
- **Real-time Data** - Live updates and synchronization
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Modern UI/UX** - Professional interface with glass morphism and animations
- **Multi-currency Support** - International job application tracking
- **Production Deployment** - Firebase hosting ready

## 🔒 Security Features

- User authentication with Firebase Auth
- Data isolation per user
- Secure file uploads
- Input validation and sanitization
- Protected routes

## 📊 Database Schema

### Jobs Collection
```javascript
{
  userId: string,           // Firebase Auth UID
  company: string,          // Company name
  role: string,            // Job title
  location: string,        // Job location
  salary: string,          // Salary information
  status: string,          // applied, interview, offer, rejected, withdrawn
  jobUrl: string,          // Job posting URL
  notes: string,           // Additional notes
  attachments: array,      // File attachments
  createdAt: timestamp,    // Creation date
  updatedAt: timestamp     // Last update date
}
```

## 🎨 Design Features

- **Glass Morphism UI** - Modern semi-transparent cards with backdrop blur
- **Animated Backgrounds** - Floating blob animations on authentication pages
- **Gradient Effects** - Beautiful color transitions throughout the interface
- **Hover Animations** - Interactive elements with smooth transitions
- **Responsive Layout** - Optimized for all device sizes
- **Professional Color Scheme** - Blue to indigo gradients with proper contrast

## 🚀 Deployment

This application is production-ready and can be deployed to Firebase Hosting with minimal configuration. The project includes all necessary security rules and optimization for real-world usage.

## 📊 Database Schema

### Jobs Collection
```javascript
{
  userId: string,           // Firebase Auth UID
  company: string,          // Company name
  role: string,            // Job title
  location: string,        // Job location
  salary: string,          // Salary information
  currency: string,        // Currency code (PHP, USD, EUR, etc.)
  status: string,          // applied, interview, offer, rejected, withdrawn
  jobUrl: string,          // Job posting URL
  notes: string,           // Additional notes
  attachments: array,      // File attachments
  createdAt: timestamp,    // Creation date
  updatedAt: timestamp     // Last update date
}
```

## 🎯 About the Developer

**Kent Carlo Amante** - A passionate Electronics Engineering graduate turned software engineer from the Philippines, specializing in modern web technologies, IoT systems, and user experience design. This project showcases expertise in React, Firebase, and professional application development.

### 🌐 Connect With Me
- **GitHub**: [@Skca01](https://github.com/Skca01)
- **Portfolio**: [Kent Carlo Amante](https://skca01.github.io/Kent-Portfolio/)

### 🚀 Other Projects
- **ESP32 Web-Based IR Remote Control** - IoT project with responsive web interface
- **ESP32 LoRa Chat** - Long-range wireless messaging system
- **ESP32 UDP Chat** - Real-time communication application
- **Star Topology with ESP-NOW** - Wireless communication protocols

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For technical support or questions about this project:

1. Check the Firebase documentation
2. Review the console for error messages
3. Ensure all dependencies are installed
4. Verify Firebase configuration

## 🎉 Future Enhancements

Potential features for future development:

- Email notifications for status changes
- Export data to CSV/PDF
- Calendar integration for interviews
- Contact management for recruiters
- Interview preparation notes
- Salary negotiation tracking
- Application analytics and insights
- Dark mode support
- Advanced filtering and sorting

---

**Built with ❤️ by Kent Carlo Amante for professional job application management!**

---

<div align="center">
  <a href="https://github.com/Skca01">
    <img src="https://img.shields.io/badge/GitHub-@Skca01-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://github.com/Skca01/Kent-Portfolio">
    <img src="https://img.shields.io/badge/Portfolio-Kent%20Carlo%20Amante-blue?style=for-the-badge" alt="Portfolio" />
  </a>
</div> 