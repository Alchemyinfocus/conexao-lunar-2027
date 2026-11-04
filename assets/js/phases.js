'use strict';
(function(){
const monthSelect=document.getElementById('phases-month');
const timezoneSelect=document.getElementById('phases-timezone');
const list=document.getElementById('phases-list');
const mainTimezone=document.getElementById('timezone');
const names={nova:'Lua Nova',crescente:'Quarto Crescente',cheia:'Lua Cheia',minguante:'Quarto Minguante'};
const symbols={nova:'●',crescente:'◐',cheia:'○',minguante:'◑'};
function renderPhasesPage(){
 const month=Number(monthSelect.value),zone=timezoneSelect.value;
 list.replaceChildren();
 const formatter=new Intl.DateTimeFormat('pt-BR',{timeZone:zone,day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 const monthFormatter=new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'numeric',year:'numeric'});
 const items=phaseEvents.filter(event=>{const parts=monthFormatter.formatToParts(event.date);return Number(parts.find(p=>p.type==='month').value)===month+1&&Number(parts.find(p=>p.type==='year').value)===2027});
 for(const event of items){
  const card=document.createElement('article');card.className='phase-card';
  
const icon=document.createElement('span');icon.className='phase-card-icon';const img=document.createElement('img');const phaseImages={nova:'fase_nova_dourada.png',crescente:'fase_quarto_crescente_dourada.png',cheia:'fase_cheia_dourada.png',minguante:'fase_quarto_minguante_dourada.png'};img.src='assets/fases-douradas/'+phaseImages[event.type];img.alt='';img.style.cssText='width:44px;height:44px;object-fit:contain;display:block';icon.append(img);icon.setAttribute('aria-hidden','true');

  const content=document.createElement('div');const heading=document.createElement('h3');heading.textContent=names[event.type];
  const date=document.createElement('p');date.textContent=formatter.format(event.date);
  content.append(heading,date);card.append(icon,content);list.append(card);
 }
 if(!items.length){const p=document.createElement('p');p.textContent='Nenhuma fase principal cadastrada para este mês no fuso escolhido.';list.append(p)}
}
monthSelect.addEventListener('change',renderPhasesPage);
timezoneSelect.addEventListener('change',()=>{mainTimezone.value=timezoneSelect.value;mainTimezone.dispatchEvent(new Event('change'));renderPhasesPage()});
mainTimezone.addEventListener('change',()=>{timezoneSelect.value=mainTimezone.value;renderPhasesPage()});
window.renderPhasesPage=()=>{timezoneSelect.value=mainTimezone.value;renderPhasesPage()};
window.renderPhasesPage();
})();
