'use strict';
(function(){
const landing=document.getElementById('landing-view');
const resource=document.getElementById('resource-view');
const sections=document.getElementById('resource-sections');
const title=document.getElementById('resource-title');
const dashboard=document.getElementById('calendario');
const toolbar=document.querySelector('#resource-view > .toolbar');
const labels={calendar:'Calendário Anual',phases:'Fases da Lua',ingresses:'Ingressos nos Signos',diary:'Diário Lunar',planning:'Planejamento Lunar',settings:'Configurações'};
const targets={calendar:'calendario',phases:'ciclos',ingresses:'ingressos',diary:'diario',planning:'planejamento',settings:'configuracoes'};
function openFeature(name){
 if(!labels[name])return;
 landing.hidden=true;resource.hidden=false;sections.hidden=name==='calendar';
 dashboard.hidden=name!=='calendar';toolbar.hidden=name!=='calendar';
 if(name==='phases'&&window.renderPhasesPage)window.renderPhasesPage();
 if(name==='ingresses'&&window.renderIngressesPage)window.renderIngressesPage();
 if(name==='diary'&&window.renderDiaryPage)window.renderDiaryPage();
 if(name==='planning'&&window.renderPlanningPage)window.renderPlanningPage();
 if(name==='settings'&&window.renderSettingsPage)window.renderSettingsPage();
 title.textContent=labels[name];
 for(const section of sections.querySelectorAll('.feature-content'))section.hidden=section.id!==targets[name];
 window.scrollTo(0,0);
 if(name==='calendar')document.getElementById('calendario').scrollIntoView({block:'start'});
 else document.getElementById(targets[name]).scrollIntoView({block:'start'});
}
function home(){resource.hidden=true;landing.hidden=false;sections.hidden=true;window.scrollTo(0,0)}
document.querySelectorAll('[data-feature]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openFeature(a.dataset.feature)}));
document.getElementById('return-home').addEventListener('click',home);
	document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',e=>{
	 const hash=a.getAttribute('href');
	 const name=Object.keys(targets).find(k=>'#'+targets[k]===hash);
	 e.preventDefault();if(name)openFeature(name);else home();
	}));
	if(location.hash){const name=Object.keys(targets).find(k=>'#'+targets[k]===location.hash);if(name)openFeature(name)}
	else openFeature('calendar');
})();
