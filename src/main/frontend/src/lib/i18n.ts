import i18n, { type Callback } from "i18next";
import { initReactI18next } from "react-i18next";
import { getClientLocale } from "@/lib/utils";

import en from "@/lib/localization/en.json";
import tr from "@/lib/localization/tr.json";

const savedLanguage = localStorage.getItem("nat-calc-lang");
const browserLanguage = getClientLocale();

i18n.use(initReactI18next).init({
  resources: { en, tr },
  lng: savedLanguage || browserLanguage || "en",
  interpolation: {
    escapeValue: false,
  },
});

const changeLocale = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (language: string, callback?: Callback) => {
  localStorage.setItem("nat-calc-lang", language);
  return changeLocale(language, callback);
};

export default i18n;
