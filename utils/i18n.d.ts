import "react-i18next";
import en from "./locales/en.json";

// Add resources type declaration to enhance type checking
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
