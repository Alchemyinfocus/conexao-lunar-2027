'use strict';
(function(){
const monthSelect=document.getElementById('ingresses-month');
const zoneSelect=document.getElementById('ingresses-timezone');
const mainZone=document.getElementById('timezone');
const list=document.getElementById('ingresses-list');
const count=document.getElementById('ingresses-count');

const language=()=>window.LunarI18n?.getLanguage()==='en'?'en':'pt';
const copy={
 pt:{
  title:'Ingressos nos Signos · 2027',
  description:'Acompanhe quando a Lua entra em cada signo do zodíaco tropical, com horários no fuso escolhido.',
  month:'Selecione o mês',zone:'Fuso horário',
  warningTitle:'Prévia técnica:',
  warning:' os horários dos ingressos são cálculos preliminares de longitude lunar geocêntrica, no zodíaco tropical, ainda sujeitos a auditoria astronômica independente. A data pode mudar conforme o fuso horário.',
  enters:'Lua entra em ',empty:'Nenhum ingresso cadastrado para este mês no fuso selecionado.',
  count:(n,z)=>n+' '+(n===1?'ingresso registrado':'ingressos registrados')+' neste mês · horário de '+z,
  zones:{'America/Sao_Paulo':'Brasília (São Paulo)','America/New_York':'Nova York','Europe/Lisbon':'Lisboa','Europe/London':'Londres',UTC:'UTC'}
 },
 en:{
  title:'Zodiac Ingresses · 2027',
  description:'Follow the Moon as it enters each tropical zodiac sign, with times in your selected time zone.',
  month:'Select month',zone:'Time zone',
  warningTitle:'Technical preview:',
  warning:' ingress times are preliminary calculations of geocentric lunar longitude in the tropical zodiac and remain subject to independent astronomical review. Dates may vary by time zone.',
  enters:'Moon enters ',empty:'No ingresses recorded for this month in the selected time zone.',
  count:(n,z)=>n+' '+(n===1?'ingress':'ingresses')+' this month · '+z+' time',
  zones:{'America/Sao_Paulo':'Brasília (São Paulo)','America/New_York':'New York','Europe/Lisbon':'Lisbon','Europe/London':'London',UTC:'UTC'}
 }
};
const englishSigns=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
function updateIngressesLanguage(){
 const section=document.getElementById('ingressos'),text=copy[language()];
 section.querySelector('#ingresses-title').textContent=text.title;
 section.querySelector('.phases-heading > p').textContent=text.description;
 section.querySelector('label[for="ingresses-month"]').textContent=text.month;
 section.querySelector('label[for="ingresses-timezone"]').textContent=text.zone;
 const source=section.querySelector('.phases-source'),strong=document.createElement('strong');
 strong.textContent=text.warningTitle;source.replaceChildren(strong,document.createTextNode(text.warning));
 const months=window.LunarI18n.translate('months');
 Array.from(monthSelect.options).forEach(option=>{option.textContent=months[Number(option.value)]});
 Array.from(zoneSelect.options).forEach(option=>{option.textContent=text.zones[option.value]||option.value});
}

const dateFormat=zone=>new Intl.DateTimeFormat(language()==='en'?'en-US':'pt-BR',{timeZone:zone,day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const monthFormat=zone=>new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'numeric',year:'numeric'});
function renderIngressesPage(){
 const month=Number(monthSelect.value),zone=zoneSelect.value;
 const formatter=dateFormat(zone),monthFormatter=monthFormat(zone);
 const events=ingressEvents.filter(e=>{
  const parts=monthFormatter.formatToParts(e.date);
  return Number(parts.find(p=>p.type==='month').value)===month+1&&Number(parts.find(p=>p.type==='year').value)===2027;
 });
 list.replaceChildren();
 count.textContent=copy[language()].count(events.length,zoneSelect.selectedOptions[0].text);
 for(const event of events){
  const card=document.createElement('article');card.className='ingress-card';
  const icon=document.createElement('span');icon.className='ingress-card-symbol';icon.textContent=ingressSymbols[event.sign];icon.setAttribute('aria-hidden','true');
  const content=document.createElement('div');const heading=document.createElement('h3');heading.textContent=copy[language()].enters+(language()==='en'?englishSigns[event.sign]:ingressSigns[event.sign]);
  const when=document.createElement('p');when.textContent=formatter.format(event.date);
  content.append(heading,when);card.append(icon,content);list.append(card);
 }
 if(!events.length){const p=document.createElement('p');p.textContent=copy[language()].empty;list.append(p)}
}
monthSelect.addEventListener('change',renderIngressesPage);
zoneSelect.addEventListener('change',()=>{mainZone.value=zoneSelect.value;mainZone.dispatchEvent(new Event('change'));renderIngressesPage()});
mainZone.addEventListener('change',()=>{zoneSelect.value=mainZone.value;renderIngressesPage()});
window.renderIngressesPage=()=>{zoneSelect.value=mainZone.value;renderIngressesPage()};
updateIngressesLanguage();
window.renderIngressesPage();
document.addEventListener('lunar:languagechange',()=>{updateIngressesLanguage();renderIngressesPage()});
})();