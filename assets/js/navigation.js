'use strict';
(function(){
const root=document.getElementById('resource-view');
const hero=document.getElementById('inicio');
const dashboard=document.getElementById('calendario');
const sections=document.getElementById('resource-sections');
const toolbar=document.querySelector('#resource-view > .toolbar');
const title=document.getElementById('resource-title');
const back=document.getElementById('return-home');
const labels={calendar:'Calendário Anual',phases:'Fases da Lua',ingresses:'Ingressos nos Signos',diary:'Diário Lunar',planning:'Planejamento Lunar',settings:'Configurações'};
const targets={calendar:'calendario',phases:'ciclos',ingresses:'ingressos',diary:'diario',planning:'planejamento',settings:'configuracoes'};
function show(page,historyChange){
 if(page!=='home'&&!labels[page])page='home';
 const home=page==='home';
 root.dataset.currentPage=page;
 hero.hidden=!home;
 dashboard.hidden=!home&&page!=='calendar';
 if(toolbar)toolbar.hidden=!home&&page!=='calendar';
 sections.hidden=home||page==='calendar';
 title.hidden=home;back.hidden=home;
 if (!home) {
  const keys = {
    calendar: 'cardCalendarTitle',
    phases: 'cardPhasesTitle',
    ingresses: 'cardIngressesTitle',
    diary: 'cardDiaryTitle',
    planning: 'planning',
    settings: 'settings'
  };

  title.textContent = window.LunarI18n.translate(keys[page]);
}
 for(const section of sections.querySelectorAll('.feature-content'))section.hidden=section.id!==targets[page];
 const render={phases:'renderPhasesPage',ingresses:'renderIngressesPage',diary:'renderDiaryPage',planning:'renderPlanningPage',settings:'renderSettingsPage'}[page];
 if(render&&typeof window[render]==='function')window[render]();
 if(historyChange)history.pushState({page},'',home?'#inicio':'#'+targets[page]);
 window.scrollTo(0,0);
}
document.querySelectorAll('[data-feature]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();show(link.dataset.feature,true)}));
back.addEventListener('click',()=>show('home',true));
window.addEventListener('popstate',()=>show(Object.keys(targets).find(key=>'#'+targets[key]===location.hash)||'home',false));
 document.addEventListener('lunar:languagechange', () => {
  const page = root.dataset.currentPage;
  if (page === 'home') return;

  const keys = {
    calendar: 'cardCalendarTitle',
    phases: 'cardPhasesTitle',
    ingresses: 'cardIngressesTitle',
    diary: 'cardDiaryTitle',
    planning: 'planning',
    settings: 'settings'
  };

  title.textContent = window.LunarI18n.translate(keys[page]);
  back.textContent = window.LunarI18n.translate('backToHome');
});
show(Object.keys(targets).find(key=>'#'+targets[key]===location.hash)||'home',false);
})();
