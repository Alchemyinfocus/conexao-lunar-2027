
'use strict';

(function () {
  const STORAGE_KEY = 'alchemy-lunar-2027:language';

  const translations = {
    pt: {
      home: 'Início',
      calendar: 'Calendário',
      cycles: 'Ciclos',
      diary: 'Diário Lunar',
      planning: 'Planejamento',
      settings: 'Configurações',
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      weekdays: [
        'Domingo', 'Segunda-feira', 'Terça-feira',
        'Quarta-feira', 'Quinta-feira', 'Sexta-feira',
        'Sábado'
      ],
      phases: {
        nova: 'Lua Nova',
        crescente: 'Quarto Crescente',
        cheia: 'Lua Cheia',
        minguante: 'Quarto Minguante'
      }
    },

    en: {
      home: 'Home',
      calendar: 'Calendar',
      cycles: 'Cycles',
      diary: 'Lunar Journal',
      planning: 'Planning',
      settings: 'Settings',
      months: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ],
      weekdays: [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday',
        'Saturday'
      ],
      phases: {
        nova: 'New Moon',
        crescente: 'First Quarter',
        cheia: 'Full Moon',
        minguante: 'Last Quarter'
      }
    }
  };

  let currentLanguage = 'pt';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') {
      currentLanguage = saved;
    }
  } catch (error) {
    // Mantém português se o armazenamento falhar.
  }

  function translate(key) {
    return translations[currentLanguage][key] || key;
  }

  function getLanguage() {
    return currentLanguage;
  }

  function setLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    document.documentElement.lang =
      language === 'pt' ? 'pt-BR' : 'en';

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // A troca continua funcionando sem armazenamento.
    }

    document.dispatchEvent(
      new CustomEvent('lunar:languagechange', {
        detail: { language }
      })
    );
  }

  document.documentElement.lang =
    currentLanguage === 'pt' ? 'pt-BR' : 'en';

  window.LunarI18n = {
    translate,
    getLanguage,
    setLanguage,
    translations
  };
})();

