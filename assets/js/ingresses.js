'use strict';
(function(){
const monthSelect=document.getElementById('ingresses-month');
const zoneSelect=document.getElementById('ingresses-timezone');
const mainZone=document.getElementById('timezone');
const list=document.getElementById('ingresses-list');
const count=document.getElementById('ingresses-count');
const dateFormat=zone=>new Intl.DateTimeFormat('pt-BR',{timeZone:zone,day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const monthFormat=zone=>new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'numeric',year:'numeric'});
function renderIngressesPage(){
 const month=Number(monthSelect.value),zone=zoneSelect.value;
 const formatter=dateFormat(zone),monthFormatter=monthFormat(zone);
 const events=ingressEvents.filter(e=>{
  const parts=monthFormatter.formatToParts(e.date);
  return Number(parts.find(p=>p.type==='month').value)===month+1&&Number(parts.find(p=>p.type==='year').value)===2027;
 });
 list.replaceChildren();
 count.textContent=events.length+' ingressos registrados neste mês · horário de '+zoneSelect.selectedOptions[0].text;
 for(const event of events){
  const card=document.createElement('article');card.className='ingress-card';
  const icon=document.createElement('span');icon.className='ingress-card-symbol';icon.textContent=ingressSymbols[event.sign];icon.setAttribute('aria-hidden','true');
  const content=document.createElement('div');const heading=document.createElement('h3');heading.textContent='Lua entra em '+ingressSigns[event.sign];
  const when=document.createElement('p');when.textContent=formatter.format(event.date);
  content.append(heading,when);card.append(icon,content);list.append(card);
 }
 if(!events.length){const p=document.createElement('p');p.textContent='Nenhum ingresso cadastrado para este mês no fuso selecionado.';list.append(p)}
}
monthSelect.addEventListener('change',renderIngressesPage);
zoneSelect.addEventListener('change',()=>{mainZone.value=zoneSelect.value;mainZone.dispatchEvent(new Event('change'));renderIngressesPage()});
mainZone.addEventListener('change',()=>{zoneSelect.value=mainZone.value;renderIngressesPage()});
window.renderIngressesPage=()=>{zoneSelect.value=mainZone.value;renderIngressesPage()};
window.renderIngressesPage();
})();