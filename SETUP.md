# 🔐 Environment Variables Setup

## Protecting Your Firebase API Keys

This project uses environment variables to keep your Firebase configuration secure. Follow these steps to set up your project safely.

## 📝 Step 1: Create Environment File

1. In the root directory of your project, create a file named `.env`
2. **IMPORTANT**: This file is already in `.gitignore` and will NOT be committed to GitHub

## 🔑 Step 2: Add Your Firebase Configuration

Copy your Firebase configuration from the Firebase Console and add it to your `.env` file:

```bash
# .env file
REACT_APP_FIREBASE_API_KEY=AIzaSyBf2DNZg0mzrt8Wryt4AvcHMGa2B5PTeQc
REACT_APP_FIREBASE_AUTH_DOMAIN=job-tracker-ac91c.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=job-tracker-ac91c
REACT_APP_FIREBASE_STORAGE_BUCKET=job-tracker-ac91c.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=85193431892
REACT_APP_FIREBASE_APP_ID=1:85193431892:web:502fabb92475bf2d9b86c1
REACT_APP_FIREBASE_MEASUREMENT_ID=G-2TYF2ZFRTT
```

## ✅ Step 3: Verify Setup

1. Restart your development server (`npm start`)
2. Your app should work exactly the same as before
3. Check that your `.env` file is NOT showing up in `git status`

## 🚨 Security Checklist

- [ ] `.env` file is created with your actual Firebase values
- [ ] `.env` file is NOT committed to Git (check `git status`)
- [ ] Application runs without errors
- [ ] Firebase functionality works as expected

## 🔍 Troubleshooting

If you get errors about missing environment variables:

1. Make sure your `.env` file is in the root directory (same level as `package.json`)
2. Restart your development server after creating the `.env` file
3. Check that all environment variable names start with `REACT_APP_`
4. Verify there are no spaces around the `=` sign in your `.env` file

## 📚 Additional Resources

- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Remember**: Never commit your `.env` file to version control! It's already protected by `.gitignore`. 