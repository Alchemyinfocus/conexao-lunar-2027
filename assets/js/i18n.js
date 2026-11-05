
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
      moonToday: 'A LUA HOJE',
cycleEnergy: 'ENERGIA DO CICLO',
      upcomingEvents: 'PRÓXIMOS MOVIMENTOS',
      moonIn: 'Lua em',
since: 'Desde',
until: 'Até',
selectedDate: 'Data selecionada',
estimatedIllumination: 'iluminação estimada',
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
      },
          cycleMessages: {
      'Lua Nova': 'Um novo ciclo começa. Recolha-se, escute sua intuição e plante suas intenções.',
      'Lua Crescente': 'Suas intenções começam a ganhar forma. Cultive a confiança e dê os primeiros passos.',
      'Quarto Crescente': 'É tempo de agir, enfrentar obstáculos e fortalecer suas decisões.',
      'Gibosa Crescente': 'Aprimore seus planos, ajuste os detalhes e prepare-se para os resultados.',
      'Lua Cheia': 'Um momento de plenitude e revelação. Reconheça suas conquistas e acolha suas emoções.',
      'Gibosa Minguante': 'Compartilhe aprendizados, pratique a gratidão e reconheça o que amadureceu.',
      'Quarto Minguante': 'Reavalie suas escolhas, libere o que não serve mais e reorganize suas prioridades.',
      'Lua Minguante': 'Desacelere, descanse e permita que o silêncio prepare o próximo recomeço.'
    },
    },

    en: {
      home: 'Home',
      calendar: 'Calendar',
      cycles: 'Cycles',
      diary: 'Lunar Journal',
      planning: 'Planning',
      settings: 'Settings',
      moonToday: 'THE MOON TODAY',
cycleEnergy: 'CYCLE ENERGY',
      upcomingEvents: 'UPCOMING EVENTS',
      moonIn: 'Moon in',
since: 'Since',
until: 'Until',
selectedDate: 'Selected date',
estimatedIllumination: 'estimated illumination',
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
      },
          cycleMessages: {
      'Lua Nova': 'A new cycle begins. Turn inward, listen to your intuition, and plant your intentions.',
      'Lua Crescente': 'Your intentions begin to take shape. Cultivate confidence and take the first steps.',
      'Quarto Crescente': 'It is time to act, face obstacles, and strengthen your decisions.',
      'Gibosa Crescente': 'Refine your plans, adjust the details, and prepare for the results.',
      'Lua Cheia': 'A moment of fullness and revelation. Recognize your achievements and embrace your emotions.',
      'Gibosa Minguante': 'Share what you have learned, practice gratitude, and acknowledge your growth.',
      'Quarto Minguante': 'Reevaluate your choices, release what no longer serves you, and reorganize your priorities.',
      'Lua Minguante': 'Slow down, rest, and allow silence to prepare the next beginning.'
    },
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
  
  function updateLanguageButtons() {
    const ptButton = document.getElementById('lang-pt');
    const enButton = document.getElementById('lang-en');

    if (!ptButton || !enButton) return;

    ptButton.classList.toggle('lang-active', currentLanguage === 'pt');
    enButton.classList.toggle('lang-active', currentLanguage === 'en');

    ptButton.setAttribute('aria-pressed', String(currentLanguage === 'pt'));
    enButton.setAttribute('aria-pressed', String(currentLanguage === 'en'));
  }

  function updateNavigationLanguage() {
    const labels = {
      home: 'home',
      calendar: 'calendar',
      phases: 'cycles',
      diary: 'diary',
      planning: 'planning'
    };

    document.querySelectorAll('.approved-nav nav a[data-feature]').forEach(link => {
      const key = labels[link.dataset.feature];

      if (key) {
        link.textContent = translate(key);
      }
    });
  }
  function updateMoonTodayLanguage() {
  const title = document.getElementById('moon-today-title');

  if (title) {
    title.textContent = translate('moonToday');
  }
    const upcomingTitle = document.getElementById('upcoming-title');

if (upcomingTitle) {
  upcomingTitle.textContent = translate('upcomingEvents');
}
}

  document.addEventListener('lunar:languagechange', updateNavigationLanguage);
  document.addEventListener('DOMContentLoaded', updateNavigationLanguage);
document.addEventListener('lunar:languagechange', updateMoonTodayLanguage);
document.addEventListener('DOMContentLoaded', updateMoonTodayLanguage);
  function initializeLanguageButtons() {
    const ptButton = document.getElementById('lang-pt');
    const enButton = document.getElementById('lang-en');

    if (!ptButton || !enButton) return;

    ptButton.addEventListener('click', () => setLanguage('pt'));
    enButton.addEventListener('click', () => setLanguage('en'));

    document.addEventListener('lunar:languagechange', updateLanguageButtons);

    updateLanguageButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageButtons);
  } else {
    initializeLanguageButtons();
  }

})();

