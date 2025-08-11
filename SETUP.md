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
REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## ✅ Step 3: Verify Setup

1. Restart your development server (`npm start`)
2. Your app should work exactly the same as before
3. Check that your `.env` file is NOT showing up in `git status`

## 🚀 Step 4: Vercel Deployment (Production)

**IMPORTANT**: For production deployment on Vercel, you need to set environment variables in Vercel's dashboard:

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add the same environment variables** with these exact names:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
   - `REACT_APP_FIREBASE_MEASUREMENT_ID`
3. **Set Environment** to "Production" (and "Preview" if needed)
4. **Redeploy** your application after adding variables

**Note**: Local `.env` files only work for development. Vercel needs its own environment variables set in their dashboard.

## 🚨 Security Checklist

- [ ] `.env` file is created with your actual Firebase values
- [ ] `.env` file is NOT committed to Git (check `git status`)
- [ ] Application runs without errors
- [ ] Firebase functionality works as expected

## 🔍 Troubleshooting

### Local Development Issues

If you get errors about missing environment variables:

1. Make sure your `.env` file is in the root directory (same level as `package.json`)
2. Restart your development server after creating the `.env` file
3. Check that all environment variable names start with `REACT_APP_`
4. Verify there are no spaces around the `=` sign in your `.env` file

### Vercel Deployment Issues

If you get `auth/invalid-api-key` errors on Vercel:

1. **Check Vercel Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Verify all 7 Firebase variables are set
   - Ensure Environment is set to "Production"

2. **Redeploy after adding variables**:
   - Environment variables must be set BEFORE deployment
   - Go to Deployments tab and click "Redeploy"

3. **Common mistakes**:
   - Forgetting to set environment variables in Vercel
   - Using wrong variable names (must start with `REACT_APP_`)
   - Not redeploying after adding variables

## 📚 Additional Resources

- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Remember**: Never commit your `.env` file to version control! It's already protected by `.gitignore`. 
