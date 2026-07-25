A mobile employee management system built with Expo React Native, Firebase Authentication, and Firestore.
Users can register, log in, and manage employee records (CRUD).

# Overview
This project demonstrates:

Secure Firebase Authentication

User‑specific Firestore data

Full CRUD operations

Expo Router navigation

Form validation with Formik + Yup

Built for Android/iOS using Expo.

# Backend Choice: Firebase
Our group selected Firebase because it provides:

Easy integration with Expo

Secure email/password authentication

Cloud Firestore for employee data

Real‑time updates

Built‑in security rules

No backend server required

# Firebase Services Used
Authentication — Login & Register

Firestore — Employee CRUD

# Local Setup Instructions
1. Clone the project
git clone https://github.com/EchoSave/MADASS3.git
cd MADASS3

# Install dependencies 
 npm install 

Create a .env file 

EXPO_PUBLIC_FIREBASE_API_KEY=<your_api_key>
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
EXPO_PUBLIC_FIREBASE_PROJECT_ID=<your_project_id>
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
EXPO_PUBLIC_FIREBASE_APP_ID=<your_app_id>
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_measurement_id>


# Start the app
npx expo start 

# Test Account Credentials

Email: testuser@email.com
Password: Test1234!

# implementation  by each group member 
Create Employee (Member 1)
Formik + Yup validation

Save to Firestore

Includes userId

Authentication (Member 2)
Register

Login

Logout

Persistent session

AuthContext + Provider

Protected routes

Read Employees (Member 3)
List employees for logged‑in user

Firestore query filtered by userId

Employee Details (Member 3)
Tap employee → details screen

Shows all fields

Update Employee (Member 3)
Edit employee

Save changes

Delete Employee (Member 3)
Remove employee from Firestore

Security Rules (Member 2)

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{employeeId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
    }
  }
}


Group Member Responsibilities
Member 1 — Firebase Architecture, Authentication & Protected Navigation
Firebase project setup + environment variables

Sign‑In & Sign‑Up connected to Firebase Auth

Auth error handling (invalid email, weak password, etc.)

onAuthStateChanged session persistence

Protected navigation (redirect unauthenticated users)

Loading/splash screen during auth check

Profile screen + Sign‑Out (bonus)

Member 2 — Firestore Integration, Security Rules & Backend Logic
Firestore database setup

Firestore security rules (request.auth.uid == resource.data.userId)

Firebase Auth setup for React Native (AsyncStorage persistence)

AuthContext + Provider

Login/Register functionality

Backend documentation + README

Ensured secure user‑specific Firestore access


Member 3 — CRUD (Read, Update, Delete) & UX Enhancements
Employee List screen (Firestore read)

Employee Details screen

Edit employee (updateDoc)

Delete employee with confirmation modal

Empty states (“No employees found”)

Loading indicators & error handling

Cross‑platform testing (Android/iOS)