
'use strict';

(function () {
  const STORAGE_KEY = 'alchemy-lunar-2027:language';

  const translations = {
    pt: {
      diaryPageTitle: "Meu Diário Lunar · 2027",
      diaryPageDescription: "Um espaço para registrar percepções, intenções e reflexões ao longo do ano.",
      diaryDate: "Escolha a data",
      diaryNotes: "Minhas anotações",
      diaryPrompt: "Como me sinto hoje? Quais são minhas intenções e reflexões?",
      diaryBackup: "Exportar backup das notas",
      restoreBackup: "Restaurar backup",
      printPdf: "Imprimir / Salvar PDF",
      diaryPrivacy: "Os registros ficam armazenados localmente neste navegador e dispositivo, não em uma conta online. Faça backups periódicos para evitar perdas. Ao restaurar, notas existentes nas mesmas datas poderão ser substituídas após confirmação.",
      planningPageTitle: "Planejamento Lunar · 2027",
      planningDescription: "Organize suas intenções, prioridades e tarefas mês a mês, acompanhando seus próprios ciclos.",
      planningIntentions: "Intenções do mês",
      planningIntentionsPrompt: "O que desejo cultivar neste mês?",
      planningPriorities: "Prioridades e foco",
      planningPrioritiesPrompt: "O que merece minha atenção?",
      planningReflections: "Reflexões e aprendizados",
      planningReflectionsPrompt: "O que aprendi e quero levar adiante?",
      planningTasks: "Minhas tarefas e compromissos",
      planningNewTask: "Nova tarefa",
      planningTaskPrompt: "Escreva uma tarefa",
      planningAddTask: "Adicionar tarefa",
      backupComplete: "Exportar backup completo",
      planningPrivacy: "Os dados são locais e não sincronizam entre dispositivos. Exporte backups regularmente. A organização por mês é pessoal e não constitui previsão astrológica.",
      settingsPageTitle: "Configurações · 2027",
      settingsDescription: "Preferências, proteção dos registros e impressão do seu planner.",
      settingsUse: "Escolha como utilizar o Conexão Lunar 2027",
      installRecommended: "Instalar como aplicativo (recomendado):",
      installRequirements: "a primeira instalação requer internet e um endereço seguro (HTTPS). Após a instalação e o carregamento dos recursos, o uso offline poderá ser disponibilizado. A instalação ainda será habilitada e testada.",
      browserUse: "Usar no navegador, sem instalar:",
      browserRequirements: "você poderá acessar o conteúdo online sem instalação, mas não deve contar com acesso offline ou preservação garantida das anotações nessa modalidade.",
      yourRecords: "Seus registros:",
      yourRecordsDetails: "são armazenados no dispositivo, sem sincronização automática. Exporte e guarde backups JSON regularmente. Limpar dados do navegador ou desinstalar o aplicativo pode apagar os registros locais.",
      installChoice: "Você poderá escolher a modalidade que preferir quando a versão instalável estiver disponível.",
      installButton: "Instalar aplicativo (opcional)",
      settingsZoneDescription: "Os eventos lunares são apresentados no horário da região selecionada.",
      settingsRegion: "Região",
      settingsBackup: "Backup e restauração",
      settingsBackupDescription: "Exporte um único arquivo JSON com suas notas do Diário e seus planejamentos mensais.",
      settingsRestoreDescription: "Ao restaurar, registros existentes nas mesmas datas e meses poderão ser substituídos após confirmação.",
      settingsPrint: "Impressão e PDF",
      settingsPrintInstructions: "Abra a página que deseja imprimir e use a impressão do navegador. Na janela de impressão, escolha",
      settingsSavePdf: "Salvar como PDF",
      settingsPrintEnd: "para gerar um arquivo.",
      settingsOpenCalendar: "Abrir Calendário Anual",
      settingsPrintPage: "Imprimir esta página",
      settingsOffline: "Privacidade e uso offline",
      settingsOfflineDetails: "As anotações e planejamentos são armazenados neste navegador e neste dispositivo. Não há sincronização automática com outros aparelhos.",
      settingsImportant: "Importante:",
      settingsDataWarning: "excluir dados do navegador, utilizar modo anônimo ou trocar de dispositivo pode tornar seus registros inacessíveis. Guarde cópias do backup em local seguro.",
      journalInvalidDate: "Escolha uma data válida de 2027.",
      journalNoteLoaded: "Nota recuperada deste navegador.",
      journalNoNote: "Nenhuma anotação salva nesta data.",
      journalStorageUnavailable: "Armazenamento local indisponível. Copie suas notas para não perdê-las.",
      journalNoteSaved: "Nota salva neste navegador; exporte um backup para protegê-la.",
      journalSaveFailed: "Falha ao salvar. Exporte ou copie o texto antes de sair.",
      journalRestoreFailed: "Não foi possível transferir o arquivo. Restaure pelo Calendário Anual.",
      calendarNoteSaved: "Nota salva neste navegador.",
      planningLoaded: "Planejamento carregado deste navegador.",
      planningReadFailed: "Não foi possível ler os dados deste mês. Não faça alterações antes de recuperar seu backup.",
      planningSaved: "Planejamento salvo neste navegador; exporte um backup para protegê-lo.",
      planningSaveFailed: "Falha ao salvar. Faça backup ou copie os textos.",
      restoreSelectFailed: "Não foi possível selecionar o backup. Use a restauração pelo Calendário Anual.",
      planningNoTasks: "Nenhuma tarefa cadastrada",
      planningCompleteTask: "Concluir ",
      planningDeleteTask: "Excluir",
      planningDeleteTaskLabel: "Excluir ",
      planningProgress: "{done} de {total} tarefas concluídas",
      settingsCurrentZone: "Fuso atual: {zone}.",
      zoneNewYork: "Nova York",
      zoneLondon: "Londres",
      zoneLisbon: "Lisboa",
      installLocalFile: "Instalação indisponível ao abrir um arquivo local. A versão instalável requer um endereço HTTPS; o acesso pelo navegador continua disponível.",
      installBrowserAvailable: "Acesso pelo navegador disponível. A instalação é opcional; a disponibilidade offline depende da instalação e do primeiro carregamento completo.",
      installOfflineUnavailable: "Não foi possível preparar o acesso offline neste navegador.",
      installAvailable: "Seu navegador permite instalar este planner. A escolha é sua.",
      installCompleted: "Aplicativo instalado. Exporte backups regularmente para proteger seus registros.",
      installAccepted: "Instalação aceita. Verifique o ícone no seu dispositivo.",
      installCanceled: "Instalação cancelada. Você pode continuar usando no navegador.",
      installManual: "Se a instalação não estiver disponível aqui, use o menu do navegador: Instalar aplicativo (Chrome/Edge/Android) ou Compartilhar → Adicionar à Tela de Início (Safari no iPhone).",
      installChecking: "Verificando se este navegador oferece instalação.",
      backupPending: "Atenção: registros armazenados apenas neste navegador. Exporte um backup JSON e guarde o arquivo fora da pasta do produto.",
      backupSaved: "Backup exportado. Confira se o arquivo foi salvo em local seguro.",
      backupSavedAt: "Backup exportado em {date}. Confira se o arquivo foi salvo em local seguro.",
      backupExportFailed: "Não foi possível preparar o backup completo.",
      backupTooLarge: "Arquivo maior que 5 MB",
      backupInvalidFormat: "Backup inválido",
      backupInvalidNotes: "Notas inválidas",
      backupInvalidPlanning: "Planejamento inválido",
      backupInvalidMonthlyPlan: "Dados de planejamento inválidos",
      backupRestoreSuccess: "Backup restaurado com sucesso.",
      backupRestoreError: "Falha na restauração: ",
      backupConfirm: "Restaurar {notes} notas e {plans} meses de planejamento? Registros existentes nas mesmas datas e meses serão substituídos.",
      backupInvalidJson: "JSON inválido",
      heroTitle: 'Conexão Lunar 2027',
heroSubtitle: 'PLANNER · CALENDÁRIO · CICLOS · DIÁRIO',
heroDescription: 'Acompanhe a Lua, compreenda seus ciclos e caminhe em sintonia com o tempo natural.',
      home: 'Início',
      calendar: 'Calendário',
      cycles: 'Ciclos',
      diary: 'Diário Lunar',
      diaryTitle: 'MEU DIÁRIO LUNAR',
diaryPlaceholder: 'Registre suas observações e intenções...',
diaryStorageNote: 'As notas são salvas neste navegador',
diaryExport: 'Exportar notas',
diaryRestore: 'Restaurar backup',
      cardCalendarTitle: 'Calendário Anual',
cardCalendarSubtitle: '2027',
cardPhasesTitle: 'Fases da Lua',
      phasesPageTitle: 'Fases da Lua · 2027',
phasesPageDescription: 'Calendário completo das quatro fases principais da Lua, com datas e horários ajustados ao seu fuso horário.',
phasesSelectMonth: 'Selecione o mês',
phasesTimezone: 'Fuso horário',
phasesSource: 'Fonte das fases principais: U.S. Naval Observatory (USNO), tabela de 2027 em UTC. Os horários apresentados são convertidos para o fuso escolhido. Os símbolos são representações gráficas, não fotografias da Lua.',
backToHome: 'Voltar à Página Principal',
cardPhasesSubtitle: 'Datas e horários',
cardIngressesTitle: 'Ingressos nos Signos',
cardIngressesSubtitle: 'Toda a programação',
cardDiaryTitle: 'Diário Lunar',
cardDiarySubtitle: 'Registros e reflexões',
cardPlanningTitle: 'Planejamento',
cardPlanningSubtitle: 'Por ciclos lunares',
cardSettingsTitle: 'Configurações',
cardSettingsSubtitle: 'Preferências e dados',
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
      
calendarNote: 'Datas civis verificadas pelo calendário gregoriano. Fases principais: Observatório Naval dos EUA (USNO).',

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
      diaryPageTitle: "My Lunar Journal · 2027",
      diaryPageDescription: "A space to record insights, intentions, and reflections throughout the year.",
      diaryDate: "Choose a date",
      diaryNotes: "My notes",
      diaryPrompt: "How do I feel today? What intentions and reflections do I want to record?",
      diaryBackup: "Export notes backup",
      restoreBackup: "Restore backup",
      printPdf: "Print / Save as PDF",
      diaryPrivacy: "Your entries are stored in this browser and on this device. Export backups regularly to avoid losing them. Restoring a backup may replace entries for matching dates after you confirm.",
      planningPageTitle: "Lunar Planning · 2027",
      planningDescription: "Organize your intentions, priorities, and tasks month by month as you follow your own cycles.",
      planningIntentions: "Monthly intentions",
      planningIntentionsPrompt: "What do I want to cultivate this month?",
      planningPriorities: "Priorities and focus",
      planningPrioritiesPrompt: "What deserves my attention?",
      planningReflections: "Reflections and lessons",
      planningReflectionsPrompt: "What have I learned and want to carry forward?",
      planningTasks: "My tasks and commitments",
      planningNewTask: "New task",
      planningTaskPrompt: "Enter a task",
      planningAddTask: "Add task",
      backupComplete: "Export full backup",
      planningPrivacy: "Data is stored locally and does not sync across devices. Export backups regularly. Monthly planning is for personal organization, not astrological predictions.",
      settingsPageTitle: "Settings · 2027",
      settingsDescription: "Manage your preferences, protect your entries, and print your planner.",
      settingsUse: "Choose how to use Lunar Connection 2027",
      installRecommended: "Install as an app (recommended):",
      installRequirements: "Initial installation requires an internet connection and a secure address (HTTPS). Offline use may become available after installation and after the resources have loaded. Installation still needs to be enabled and tested.",
      browserUse: "Use in your browser without installing:",
      browserRequirements: "You can access the planner online without installing it. Offline access and preservation of your entries are not guaranteed in this mode.",
      yourRecords: "Your entries:",
      yourRecordsDetails: "Entries are stored on your device without automatic syncing. Export and save JSON backups regularly. Clearing browser data or uninstalling the app can delete local entries.",
      installChoice: "Choose the option you prefer once installation is available.",
      installButton: "Install app (optional)",
      settingsZoneDescription: "Lunar events are shown in the selected region’s local time.",
      settingsRegion: "Region",
      settingsBackup: "Backup and restore",
      settingsBackupDescription: "Export a single JSON file with your journal entries and monthly plans.",
      settingsRestoreDescription: "Restoring a backup may replace existing entries for matching dates and months after you confirm.",
      settingsPrint: "Printing and PDF",
      settingsPrintInstructions: "Open the page you want to print and use your browser’s print command. In the print dialog, choose",
      settingsSavePdf: "Save as PDF",
      settingsPrintEnd: "to create a file.",
      settingsOpenCalendar: "Open Annual Calendar",
      settingsPrintPage: "Print this page",
      settingsOffline: "Privacy and offline use",
      settingsOfflineDetails: "Notes and plans are stored in this browser and on this device. They do not sync automatically across devices.",
      settingsImportant: "Important:",
      settingsDataWarning: "Clearing browser data, using private browsing, or switching devices may make your entries unavailable. Keep copies of your backups somewhere safe.",
      journalInvalidDate: "Choose a valid date in 2027.",
      journalNoteLoaded: "Note loaded from this browser.",
      journalNoNote: "No notes saved for this date.",
      journalStorageUnavailable: "Local storage is unavailable. Copy your notes to avoid losing them.",
      journalNoteSaved: "Note saved in this browser. Export a backup to protect it.",
      journalSaveFailed: "Could not save. Export or copy the text before leaving.",
      journalRestoreFailed: "Could not transfer the file. Restore it from the Annual Calendar.",
      calendarNoteSaved: "Note saved in this browser.",
      planningLoaded: "Plan loaded from this browser.",
      planningReadFailed: "Could not read this month’s data. Restore your backup before making changes.",
      planningSaved: "Plan saved in this browser. Export a backup to protect it.",
      planningSaveFailed: "Could not save. Export a backup or copy the text.",
      restoreSelectFailed: "Could not select the backup. Restore it from the Annual Calendar.",
      planningNoTasks: "No tasks yet",
      planningCompleteTask: "Complete ",
      planningDeleteTask: "Delete",
      planningDeleteTaskLabel: "Delete ",
      planningProgress: "{done} of {total} tasks completed",
      settingsCurrentZone: "Current time zone: {zone}.",
      zoneNewYork: "New York",
      zoneLondon: "London",
      zoneLisbon: "Lisbon",
      installLocalFile: "Installation is unavailable from a local file. The app requires an HTTPS address. You can still use the planner in your browser.",
      installBrowserAvailable: "You can use the planner in your browser. Installation is optional. Offline access requires installation and a complete first load.",
      installOfflineUnavailable: "Could not prepare offline access in this browser.",
      installAvailable: "You can install this planner in your browser. Installation is optional.",
      installCompleted: "App installed. Export backups regularly to protect your entries.",
      installAccepted: "Installation accepted. Look for the app icon on your device.",
      installCanceled: "Installation canceled. You can keep using the planner in your browser.",
      installManual: "If you cannot install here, use your browser menu: Install app (Chrome/Edge/Android) or Share → Add to Home Screen (Safari on iPhone).",
      installChecking: "Checking whether this browser supports installation.",
      backupPending: "Your entries are stored in this browser only. Export a JSON backup and keep it outside the planner folder.",
      backupSaved: "Backup exported. Make sure the file was saved somewhere safe.",
      backupSavedAt: "Backup exported on {date}. Make sure the file was saved somewhere safe.",
      backupExportFailed: "Could not prepare the full backup.",
      backupTooLarge: "File is larger than 5 MB",
      backupInvalidFormat: "Invalid backup",
      backupInvalidNotes: "Invalid notes",
      backupInvalidPlanning: "Invalid planning data",
      backupInvalidMonthlyPlan: "Invalid monthly planning data",
      backupRestoreSuccess: "Backup restored successfully.",
      backupRestoreError: "Restore failed: ",
      backupConfirm: "Restore {notes} notes and {plans} months of planning? Existing entries for matching dates and months will be replaced.",
      backupInvalidJson: "Invalid JSON",
      heroTitle: 'Lunar Connection 2027',
heroSubtitle: 'PLANNER · CALENDAR · CYCLES · JOURNAL',
heroDescription: 'Follow the Moon, understand its cycles, and move in harmony with the natural rhythm of time.',
      home: 'Home',
      calendar: 'Calendar',
      cycles: 'Cycles',
      diary: 'Lunar Journal',
      diaryTitle: 'MY LUNAR JOURNAL',
diaryPlaceholder: 'Record your observations and intentions...',
diaryStorageNote: 'Notes are saved in this browser',
diaryExport: 'Export notes',
diaryRestore: 'Restore backup',
      cardCalendarTitle: 'Annual Calendar',
cardCalendarSubtitle: '2027',
cardPhasesTitle: 'Moon Phases',
      phasesPageTitle: 'Moon Phases · 2027',
phasesPageDescription: 'Complete calendar of the Moon’s four major phases, with dates and times adjusted to your time zone.',
phasesSelectMonth: 'Select month',
phasesTimezone: 'Time zone',
phasesSource: 'Main lunar phase source: U.S. Naval Observatory (USNO), 2027 table in UTC. Displayed times are converted to the selected time zone. The symbols are graphical representations, not photographs of the Moon.',
backToHome: 'Back to Home',
cardPhasesSubtitle: 'Dates and times',
cardIngressesTitle: 'Zodiac Ingresses',
cardIngressesSubtitle: 'Full schedule',
cardDiaryTitle: 'Lunar Journal',
cardDiarySubtitle: 'Notes and reflections',
cardPlanningTitle: 'Planning',
cardPlanningSubtitle: 'By lunar cycles',
cardSettingsTitle: 'Settings',
cardSettingsSubtitle: 'Preferences and data',
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
      
calendarNote: 'Civil dates verified against the Gregorian calendar. Main lunar phases: United States Naval Observatory (USNO).',

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

  function getLocale() {
    return currentLanguage === 'pt' ? 'pt-BR' : 'en-US';
  }

  function updateResourceText() {
    document.querySelectorAll('[data-lunar-text]').forEach(element => {
      element.textContent = translate(element.dataset.lunarText);
    });
    document.querySelectorAll('[data-lunar-placeholder]').forEach(element => {
      element.placeholder = translate(element.dataset.lunarPlaceholder);
    });
  }

  document.addEventListener('DOMContentLoaded', updateResourceText);
  document.addEventListener('lunar:languagechange', updateResourceText);

  window.LunarI18n = {
    getLocale,
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
    const cycleEnergyLabel = document.getElementById('cycle-energy-label');

if (cycleEnergyLabel) {
  cycleEnergyLabel.textContent = translate('cycleEnergy');
}
const calendarNote = document.getElementById('calendar-note');

if (calendarNote) {
  calendarNote.textContent = translate('calendarNote');
}

const upcomingTitle = document.getElementById('upcoming-title');
    

if (upcomingTitle) {
  upcomingTitle.textContent = translate('upcomingEvents');
}
    
  const cycleMessage = document.getElementById('cycle-message');

  if (cycleMessage) {
    const stage = document.getElementById('today-moon-stage');
    const language = getLanguage();
    const messages = translations[language].cycleMessages;

    if (stage && messages) {
    const phase = stage.textContent
  .replace(/\s+(?:in|em)\s+.+$/i, '')
  .trim();
      const phaseKeys = Object.keys(translations.pt.cycleMessages);
      const englishPhases = {
        'New Moon': 'Lua Nova',
        'Waxing Moon': 'Lua Crescente',
        'First Quarter': 'Quarto Crescente',
        'Waxing Gibbous': 'Gibosa Crescente',
        'Full Moon': 'Lua Cheia',
        'Waning Gibbous': 'Gibosa Minguante',
        'Last Quarter': 'Quarto Minguante',
        'Waning Moon': 'Lua Minguante'
      };

      const phaseKey = englishPhases[phase] || phase;
      if (phaseKeys.includes(phaseKey)) {
        cycleMessage.textContent = messages[phaseKey];
      }
    }
  }

}
function updateHomeCardsLanguage() {
  const keys = [
    ['cardCalendarTitle', 'cardCalendarSubtitle'],
    ['cardPhasesTitle', 'cardPhasesSubtitle'],
    ['cardIngressesTitle', 'cardIngressesSubtitle'],
    ['cardDiaryTitle', 'cardDiarySubtitle'],
    ['cardPlanningTitle', 'cardPlanningSubtitle'],
    ['cardSettingsTitle', 'cardSettingsSubtitle']
  ];

  const cards = document.querySelectorAll(
  '.rebuild-feature-grid a'
  );

  if (cards.length !== 6) return;

  cards.forEach((card, index) => {
    const title = card.querySelector('strong');
    const subtitle = card.querySelector('small');

    if (title) title.textContent = translate(keys[index][0]);
    if (subtitle) subtitle.textContent = translate(keys[index][1]);
  });
}

document.addEventListener(
  'lunar:languagechange',
  updateHomeCardsLanguage
);
document.addEventListener(
  'DOMContentLoaded',
  updateHomeCardsLanguage
);
  document.addEventListener('lunar:languagechange', updateNavigationLanguage);
  document.addEventListener('DOMContentLoaded', updateNavigationLanguage);
document.addEventListener('lunar:languagechange', updateMoonTodayLanguage);
document.addEventListener('DOMContentLoaded', updateMoonTodayLanguage);
  document.addEventListener('lunar:calendarupdated', updateMoonTodayLanguage);
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

function updateHeroLanguage() {
  const title = document.getElementById('landing-title');
  const subtitle = document.querySelector('.approved-hero-kicker');
  const description = document.querySelector('.approved-hero-subtitle');

  if (title) title.textContent = translate('heroTitle');
  if (subtitle) subtitle.textContent = translate('heroSubtitle');
  if (description) description.textContent = translate('heroDescription');
}

document.addEventListener('lunar:languagechange', updateHeroLanguage);
document.addEventListener('DOMContentLoaded', updateHeroLanguage);
  })();
