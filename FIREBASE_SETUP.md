# Firebase Setup Guide for AyurSutra

This guide will help you set up Firebase authentication for your AyurSutra application.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if not needed)

## Step 2: Add Web App

1. In your Firebase project dashboard, click the "Web" icon (`</>`)
2. Register your app with a nickname (e.g., "AyurSutra Web")
3. Copy the configuration object that appears

## Step 3: Configure Environment Variables

In your v0 project:

1. Click the **Settings gear icon** (⚙️) in the top right
2. Go to **Environment Variables**
3. Add these variables with your Firebase config values:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## Step 4: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider
4. Add your domain to **Authorized domains** (v0 preview URL will be added automatically)

## Step 5: Test Your Setup

1. Refresh your v0 preview
2. The demo mode warning should disappear
3. Try signing up with email - you should receive real verification emails
4. Try Google sign-in - it should work with real Google authentication

## Troubleshooting

- **Still seeing demo mode?** Check that all environment variables are set correctly
- **Google sign-in not working?** Ensure Google provider is enabled and domain is authorized
- **Email verification not working?** Check that Email/Password provider is enabled

## Features Enabled After Setup

✅ Real email verification codes sent to user emails
✅ Google OAuth authentication
✅ Secure user sessions
✅ Password reset functionality
✅ Role-based authentication (Patient/Therapist)

---

Need help? Check the Firebase documentation or contact support.
