import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// Language resources
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import si from "./locales/si.json";

// Language detector for AsyncStorage
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Get stored language from AsyncStorage
      const storedLanguage = await AsyncStorage.getItem("user-language");
      if (storedLanguage) {
        return callback(storedLanguage);
      }

      // If no stored language, use device language or default to English
      const deviceLanguage = Localization.locale.split("-")[0];
      callback(deviceLanguage || "en");
    } catch (error) {
      console.log("Error detecting language:", error);
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      // Store selected language in AsyncStorage
      await AsyncStorage.setItem("user-language", language);
    } catch (error) {
      console.log("Error caching language:", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3", // Required for Android
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      si: { translation: si },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // React Native doesn't support suspense yet
    },
  });

export default i18n;
