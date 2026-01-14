# AyurSutra - Ayurvedic Wellness Platform

## Firebase Setup Instructions

To enable real email verification and authentication, you need to set up Firebase:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" and "Google" sign-in methods

### 3. Get Configuration Keys
1. Go to Project Settings (gear icon)
2. In "General" tab, scroll to "Your apps"
3. Click "Web app" icon to create a web app
4. Copy the configuration values

### 4. Set Environment Variables
Add these to your Vercel project settings:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 5. Deploy Cloud Functions (Optional)
For real email verification codes:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init functions` in your project
3. Deploy the functions from `functions/src/index.ts`

### 6. Configure Email Service
Set up email configuration for sending verification codes:
\`\`\`bash
firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"
\`\`\`

Once configured, the app will automatically switch from demo mode to real Firebase authentication with email verification codes sent to users' email addresses.
