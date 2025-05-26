# Internationalization with react-i18next

This document explains how the internationalization (i18n) feature is implemented in the Strawberry Rover Mobile application using react-i18next.

## Overview

We use the react-i18next library, a powerful internationalization framework for React and React Native apps. The implementation supports multiple languages including English, French, Spanish, and Sinhala.

## Key Components

### 1. i18n Configuration (`utils/i18n.ts`)

- Initializes the i18next library
- Sets up language detection from AsyncStorage
- Registers available languages and their translation files
- Configures fallback behavior and other i18n features

### 2. Translation Files (`utils/locales/*.json`)

- Language-specific JSON files with key-value pairs for all translatable text
- Located in the `utils/locales` directory:
  - `en.json` - English translations
  - `fr.json` - French translations
  - `es.json` - Spanish translations
  - `si.json` - Sinhala translations

### 3. Type Definitions (`utils/i18n.d.ts`)

- TypeScript definitions for type-safe translations
- Enhances developer experience with autocomplete

### 4. UI Components for Language Selection

- `LanguageSelector.tsx`: Component with buttons for each available language
- `LanguageButton.tsx`: Compact language toggle button with flag icons

## How to Use

### In Components

1. **Import the translation hook:**

   ```tsx
   import { useTranslation } from "react-i18next";
   ```

2. **Use the hook in your component:**

   ```tsx
   const { t, i18n } = useTranslation();
   ```

3. **Translate text:**

   ```tsx
   <Text>{t("welcome")}</Text>
   ```

4. **Change language programmatically:**
   ```tsx
   i18n.changeLanguage("fr"); // Change to French
   ```

### For Component Props

These components have built-in translation support:

```tsx
// For buttons
<CustomButton
  label="signin"
  useTranslation={true}
  onPress={handleLogin}
/>

// For input fields
<CustomInputField
  placeholder="email"
  useTranslation={true}
  value={email}
  handleChangeText={setEmail}
/>
```

## Adding New Translations

1. Add new keys to all language JSON files in `utils/locales/`
2. Use the new keys in your components with the `t()` function

## Language Persistence

The selected language is automatically saved to AsyncStorage and restored when the app is restarted.

## Supported Languages

- English (en) - Default
- French (fr)
- Spanish (es)
- Sinhala (si)

## Adding a New Language

To add a new language:

1. Create a new JSON file in `utils/locales/` (e.g., `ja.json` for Japanese)
2. Register the language in `utils/i18n.ts`:
   ```typescript
   resources: {
     en: { translation: en },
     fr: { translation: fr },
     es: { translation: es },
     si: { translation: si },
     ja: { translation: ja }, // Add new language
   }
   ```
3. Update the language selector components to include the new language

## Notes on React Native Specific Implementation

- Uses AsyncStorage for persisting language preferences
- Integrates with Expo Localization for detecting device language
- Ensures compatibility with React Native by setting `compatibilityJSON: 'v3'` and `useSuspense: false`
