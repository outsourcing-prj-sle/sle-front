// i18n.js
import { createI18n } from 'vue-i18n';
import common from '@/assets/dictionary/common';
import footer from '@/assets/dictionary/footer';
import header from '@/assets/dictionary/header';
import home from '@/assets/dictionary/home';
import login_popup from '@/assets/dictionary/login_popup';
import login from '@/assets/dictionary/login';
import myinfo from '@/assets/dictionary/myinfo';
import report from '@/assets/dictionary/report';
import report1 from '@/assets/dictionary/report1';
import report2 from '@/assets/dictionary/report2';
import report3 from '@/assets/dictionary/report3';
import report4 from '@/assets/dictionary/report4';
import report5 from '@/assets/dictionary/report5';
import report6 from '@/assets/dictionary/report6';
import sel from '@/assets/dictionary/sel';
import social from '@/assets/dictionary/social';

// 메시지 객체 변환 함수
const formatMessages = (json, namespace) => {
  return Object.keys(json).reduce((acc, key) => {
    Object.keys(json[key]).forEach((lang) => {
      if (!acc[lang]) acc[lang] = {};
      if (!acc[lang][namespace]) acc[lang][namespace] = {};
      acc[lang][namespace][key] = json[key][lang];
    });
    return acc;
  }, {});
};

const commonMessages = formatMessages(common, 'common');
const footerMessages = formatMessages(footer, 'footer');
const headerMessages = formatMessages(header, 'header');
const homeMessages = formatMessages(home, 'home');
const login_popupMessages = formatMessages(login_popup, 'login_popup');
const loginMessages = formatMessages(login, 'login');
const myinfoMessages = formatMessages(myinfo, 'myinfo');
const reportMessages = formatMessages(report, 'report');
const report1Messages = formatMessages(report1, 'report1');
const report2Messages = formatMessages(report2, 'report2');
const report3Messages = formatMessages(report3, 'report3');
const report4Messages = formatMessages(report4, 'report4');
const report5Messages = formatMessages(report5, 'report5');
const report6Messages = formatMessages(report6, 'report6');
const selMessages = formatMessages(sel, 'sel');
const socialMessages = formatMessages(social, 'social');

// 메시지 통합
const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...headerMessages.en,
    ...homeMessages.en,
    ...login_popupMessages.en,
    ...loginMessages.en,
    ...myinfoMessages.en,
    ...reportMessages.en,
    ...report1Messages.en,
    ...report2Messages.en,
    ...report3Messages.en,
    ...report4Messages.en,
    ...report5Messages.en,
    ...report6Messages.en,
    ...selMessages.en,
    ...socialMessages.en,
  },
  ko: {
    ...commonMessages.ko,
    ...footerMessages.ko,
    ...headerMessages.ko,
    ...homeMessages.ko,
    ...login_popupMessages.ko,
    ...loginMessages.ko,
    ...myinfoMessages.ko,
    ...reportMessages.ko,
    ...report1Messages.ko,
    ...report2Messages.ko,
    ...report3Messages.ko,
    ...report4Messages.ko,
    ...report5Messages.ko,
    ...report6Messages.ko,
    ...selMessages.ko,
    ...socialMessages.ko,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
