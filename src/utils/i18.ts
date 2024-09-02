import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import { chinese } from './Language/chinese.ts';
import { englisth } from './Language/Englisth.ts';

i18n.use(initReactI18next).init({
  resources: {
    en_US: {
      translation: { ...englisth },
    },
    zh_CN: {
      translation: { ...chinese },
    },
  },
  lng: 'en_US',
  fallbackLng: 'en_US',
  // lng: "zh-CN",
  // fallbackLng: "zh-CN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

// import i18n from "@/Language/i18n";
