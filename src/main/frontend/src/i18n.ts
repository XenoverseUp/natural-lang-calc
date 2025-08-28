import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/lib/localization/en.json";
import tr from "@/lib/localization/tr.json";
import { getClientLocale } from "@/lib/utils";

const resources = { en, tr };

const savedLanguage = localStorage.getItem("calc-lang");
const browserLanguage = getClientLocale();

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || browserLanguage || "en",
  interpolation: {
    escapeValue: false,
  },
});

export function changeLocale(language: string) {
  i18n.changeLanguage(language);
  localStorage.setItem("calc-lang", language);
}

export default i18n;
