# 🍓 Mobile App For Strawberry Pollinating Rover

A mobile application for monitoring and controlling autonomous strawberry pollination rover. Built with React Native and Expo, this app provides near real-time rover visualization using Three.js, rover control interfaces, and comprehensive analytics for precision agriculture operations.

## 🎢 Product Website
[BumbleB](https://bumble-b-web.vercel.app/)

## 📘 Architecture
<img width="500" height="600" alt="arch" src="https://github.com/user-attachments/assets/23c826a7-f43f-4d93-95f4-ae2cbed8e207" />


## ⛳ 3D Model Repository
[3D Rover Repository](https://github.com/IT21292422/Strawberry-3D-Rover-Model)

## 📸 Screenshots
<img width="2666" height="1080" alt="04" src="https://github.com/user-attachments/assets/c0914276-f29d-4952-a999-83712ec30ba3" />

[Video Demo](https://drive.google.com/file/d/1-Jxcae3eU3iBs6Lq_LjwBnZ7XuCvH2pX/view?usp=sharing)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)

## 🎯 Overview

The Strawberry Rover Mobile app is designed to help farmers, monitor autonomous pollination rovers in strawberry fields. It provides a comprehensive mobile interface for:

- **Near Real-time monitoring** of rover status and operational metrics
- **Data visualization** through interactive charts and analytics dashboards
- **Pollination tracking** with detailed timelines and historical data
- **Image galleries** showing captured field photos organized by date and mission
- **Multi-language support** for international agricultural operations
- **Secure authentication** for user management

The app bridges the gap between autonomous agricultural technology and hands-on farm management, making precision pollination accessible and actionable.

## ✨ Key Features

### 🌍 Internationalization (i18n)

- Multi-language support (English, Spanish, French, Sinhala)
- Dynamic language switching
- Implemented using `react-i18next` and `expo-localization`

### 🔐 Authentication & User Management

- Secure sign-in and sign-up flows
- Firebase Authentication integration
- Persistent session management with secure storage
- User profile management

### 🤖 Rover Monitoring & Control

- Near real-time rover status dashboard
- 3D Visualization of the Rover using Three.js
- Status cards showing key metrics

### 📊 Data Visualization & Analytics

- Interactive charts powered by `react-native-gifted-charts`
- Weekly/Monthly analytics views

### 🖼️ Image Gallery

- Browse photos captured by rovers

### 💾 State Management

- Zustand for lightweight, efficient state management
- Separate stores for Auth, Backend URL, and Rover data

## 🛠️ Technologies Used

### Core Framework

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript

### UI & Styling

- **NativeWind** - Tailwind CSS for React Native
- **React Native Paper** - Material Design components

### State & Data Management

- **Zustand** - Lightweight state management
- **TanStack React Query** - Server state management
- **Axios** - HTTP client for API requests

### Authentication & Storage

- **Firebase** - Authentication and backend services
- **Expo Secure Store** - Secure credential storage
- **AsyncStorage** - Local data persistence

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **expo-localization** - Device locale detection

### Data Visualization

- **react-native-gifted-charts** - Chart library

### Forms & Validation

- **Formik** - Form management
- **Yup** - Schema validation

### Testing

- **Jest** - Testing framework
- **@testing-library/react-native** - Component testing
- **jest-expo** - Expo-specific Jest configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** (16.x or higher)
- **npm** or **yarn**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Expo CLI** (optional, but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/IT21292422/Strawberry-Rover-Mobile.git
   cd Strawberry-Rover-Mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your configuration:

   ```env
   EXPO_PUBLIC_API_KEY=
   EXPO_PUBLIC_AUTH_DOMAIN=
   EXPO_PUBLIC_PROJECT_ID=
   EXPO_PUBLIC_STORAGE_BUCKET=
   EXPO_PUBLIC_MESSAGING_SENDER_ID=
   EXPO_PUBLIC_APP_ID=
   EXPO_PUBLIC_ROVER_BACKEND=
   EXPO_PUBLIC_3D_MODEL_FRONTEND=
   EXPO_PUBLIC_IMAGE_SERVICE=
   ```

4. **Update Firebase configuration**

   Edit `config/firebase.tsx` with your Firebase project credentials.

### Running the App

#### Development Mode

Start the Expo development server:

```bash
npm run start
# or
npx expo start
```

#### Run on Android

```bash
npm run android
```

Make sure you have:

- Android Studio installed
- An Android emulator running, or
- A physical device connected via USB with USB debugging enabled

## 📦 Building for Production

### ⚙️ CI/CD

Automated APK Builds with Expo. Every push to the main branch triggers a GitHub Actions workflow that builds the Android APK using EAS Build, Expo’s cloud-based build service.

### Build Profiles

Build profiles are defined in `eas.json`. Common profiles:

## �📁 Project Structure

```
Strawberry-Rover-Mobile/
├── app/                          # Application routes (Expo Router)
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Entry screen
│   ├── (auth)/                  # Authentication screens
│   │   ├── signin.tsx          # Sign in page
│   │   └── signup.tsx          # Sign up page
│   └── (tabs)/                  # Main app with tabs
│       ├── _layout.tsx         # Tab layout
│       ├── analytics.tsx       # Analytics dashboard
│       ├── profile.tsx         # User profile
│       ├── rover-monitor.tsx   # Rover monitoring
│       └── (drawer)/           # Drawer navigation
│           ├── home.tsx        # Home screen
│           ├── images.tsx      # Image gallery
│           └── pollination-timeline.tsx
│
├── components/                  # Reusable UI components
│   ├── CustomButton.tsx
│   ├── CustomInputField.tsx
│   ├── LanguageSelector.tsx
│   ├── ScreenWrapper.tsx
│   ├── StatusCard.tsx
│   ├── TimelineCard.tsx
│   ├── TodayPollinatedCard.tsx
│   └── __tests__/              # Component tests
│
├── config/                      # Configuration files
│   └── firebase.tsx            # Firebase configuration
│
├── store/                       # State management (Zustand)
│   ├── AuthStore.ts            # Authentication state
│   ├── BackendUrlStore.ts      # API endpoint configuration
│   └── RoverStore.ts           # Rover data state
│
├── utils/                       # Utility functions
│   ├── api.ts                  # API client
│   ├── i18n.ts                 # Internationalization setup
│   ├── AuthUtils.ts            # Auth helpers
│   ├── SecureStoreUtils.ts     # Secure storage helpers
│   ├── locales/                # Translation files
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   └── si.json
│   ├── types/                  # TypeScript type definitions
│   └── Validations/            # Form validation schemas
│
├── assets/                      # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── android/                     # Android native project
├── coverage/                    # Test coverage reports
├── docs/                        # Documentation
│
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── babel.config.js             # Babel configuration
└── app.json                    # Expo configuration
```

### Key Directories Explained

- **`app/`** - Contains all application screens using Expo Router's file-based routing system
- **`components/`** - Reusable React components with tests
- **`store/`** - Zustand state management stores
- **`utils/`** - Helper functions, API clients, validators, and localization
- **`config/`** - App configuration (Firebase, environment settings)
- **`assets/`** - Images, fonts, icons, and other static resources

## 📜 Available Scripts

- **`npm run start`** - Start Expo development server
- **`npm run android`** - Run on Android device/emulator
- **`npm run ios`** - Run on iOS simulator (macOS only)
- **`npm run web`** - Run on web browser
- **`npm run test`** - Run Jest tests in watch mode
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run reset-project`** - Reset to blank project template

## 🧪 Testing

The project uses Jest and React Native Testing Library for unit and component testing.

### Run Tests

```bash
npm run test
```

### View Coverage Report

Test coverage reports are generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in a browser to view detailed coverage.

Current test coverage includes:

- Custom components (Button, Input, Cards)
- Screen wrappers
- Key UI components

## ⚙️ Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Update `config/firebase.tsx` with your project credentials
4. Configure security rules for your database/storage

### Backend API

Update the backend URL of both the Rust Server and Python Server in the `.env` file.
