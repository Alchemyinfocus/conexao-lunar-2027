'use strict';


let months = window.LunarI18n.translations[window.LunarI18n.getLanguage()].months;

document.addEventListener('lunar:languagechange', () => {
  months = window.LunarI18n.translations[
    window.LunarI18n.getLanguage()
  ].months;

  render();
});



const weekdays = window.LunarI18n.translations[
  window.LunarI18n.getLanguage()
].weekdays;

const state={year:2027,month:0,day:12};
const $=id=>document.getElementById(id);
function key(){return 'alchemy-lunar-2027:nota:'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0')}
function storeNote(){try{localStorage.setItem(key(),$('note').value);window.lunarMarkUnsaved?.();$('save-status').textContent='Nota salva neste navegador; exporte um backup para protegê-la.'}catch(e){$('save-status').textContent='Armazenamento indisponível. Copie sua nota para não perdê-la.'}}
function loadNote(){try{$('note').value=localStorage.getItem(key())||''}catch(e){$('note').value='';$('save-status').textContent='Armazenamento local indisponível neste navegador.'}}
function render(){const first=new Date(2027,state.month,1).getDay(),days=new Date(2027,state.month+1,0).getDate();$('month-title').textContent=months[state.month]+' 2027';$('date-heading').textContent=state.day+' de '+months[state.month]+' de 2027';$('months').innerHTML='';months.forEach((name,i)=>{const b=document.createElement('button');b.textContent=name;b.setAttribute('aria-current',String(i===state.month));b.onclick=()=>{state.month=i;state.day=1;render()};$('months').append(b)});const grid=$('calendar-grid');grid.innerHTML='';for(let i=0;i<first;i++){const e=document.createElement('span');e.className='empty';grid.append(e)}for(let d=1;d<=days;d++){const b=document.createElement('button');b.className='day';b.textContent=d;b.setAttribute('role','gridcell');b.setAttribute('aria-label',d+' de '+months[state.month]+' de 2027');b.setAttribute('aria-selected',String(d===state.day));b.onclick=()=>{state.day=d;render()};grid.append(b)}const cells=first+days;for(let i=cells;i<Math.ceil(cells/7)*7;i++){const e=document.createElement('span');e.className='empty';grid.append(e)}loadNote();renderPhase();renderIngress()}
function changeMonth(delta){state.month=(state.month+delta+12)%12;state.day=1;render()}
$('prev').onclick=()=>changeMonth(-1);$('next').onclick=()=>changeMonth(1);$('note').addEventListener('input',storeNote);$('focus-note').onclick=()=>{$('note').focus();$('note').scrollIntoView({behavior:'smooth',block:'center'})};$('print').onclick=()=>window.print();$('export').onclick=()=>{alert('Na janela de impressão, escolha “Salvar como PDF”.');window.print()};$('today').onclick=()=>{const now=new Date();if(now.getFullYear()!==2027){alert('Este planner corresponde a 2027. A data atual está fora do ano do produto.');return}state.month=now.getMonth();state.day=now.getDate();render()};$('timezone').onchange=()=>{try{localStorage.setItem('alchemy-lunar-2027:timezone',$('timezone').value)}catch(e){}render();renderIngress()};try{const saved=localStorage.getItem('alchemy-lunar-2027:timezone');if(saved&&[...$('timezone').options].some(o=>o.value===saved))$('timezone').value=saved}catch(e){}

const notePrefix='alchemy-lunar-2027:nota:';
const planningPrefix='alchemy-lunar-2027:planning:';
$('backup').onclick=()=>{
 const notes={},planning={};
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(notePrefix))notes[k]=localStorage.getItem(k);else if(k&&k.startsWith(planningPrefix))planning[k]=JSON.parse(localStorage.getItem(k))}}
 catch(e){alert('Não foi possível preparar o backup completo.');return}
 const data=JSON.stringify({format:'alchemy-lunar-2027-backup-v2',notes,planning},null,2);
 const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='conexao-lunar-2027-backup.json';a.click();window.lunarMarkBackup?.();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
$('restore').onchange=async e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{
  if(file.size>5*1024*1024)throw Error('Arquivo maior que 5 MB');
  const data=JSON.parse(await file.text());
  if(!data||!['alchemy-lunar-2027-backup-v1','alchemy-lunar-2027-backup-v2'].includes(data.format)||!data.notes||typeof data.notes!=='object'||Array.isArray(data.notes))throw Error('Backup inválido');
  const notes=Object.entries(data.notes);
  if(notes.length>366||!notes.every(([k,v])=>/^alchemy-lunar-2027:nota:(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(k)&&typeof v==='string'&&v.length<=100000))throw Error('Notas inválidas');
  const planning=data.format==='alchemy-lunar-2027-backup-v2'?data.planning:{};
  if(!planning||typeof planning!=='object'||Array.isArray(planning))throw Error('Planejamento inválido');
  const plans=Object.entries(planning);
  if(plans.length>12||!plans.every(([k,p])=>/^alchemy-lunar-2027:planning:(0[1-9]|1[0-2])$/.test(k)&&p&&typeof p==='object'&&!Array.isArray(p)&&['intentions','priorities','reflections'].every(n=>typeof p[n]==='string'&&p[n].length<=100000)&&Array.isArray(p.tasks)&&p.tasks.length<=300&&p.tasks.every(t=>t&&typeof t.text==='string'&&t.text.length<=200&&typeof t.done==='boolean')))throw Error('Dados de planejamento inválidos');
  if(!confirm('Restaurar '+notes.length+' notas e '+plans.length+' meses de planejamento? Registros existentes nas mesmas datas e meses serão substituídos.'))return;
  for(const [k,v] of notes)localStorage.setItem(k,v);
  for(const [k,v] of plans)localStorage.setItem(k,JSON.stringify(v));
  window.lunarMarkUnsaved?.();loadNote();window.dispatchEvent(new Event('alchemy-lunar-backup-restored'));alert('Backup restaurado com sucesso.');
 }catch(err){alert('Falha na restauração: '+err.message)}finally{e.target.value=''}
};

/* Fases principais 2027 em UTC, US Naval Observatory:
   https://aa.usno.navy.mil/calculated/moon/phases?year=2027
   A data civil exibida depende do fuso selecionado. */
const phaseRows=[
['2027-01-07T20:24','nova'],['2027-01-15T20:34','crescente'],['2027-01-22T12:17','cheia'],['2027-01-29T10:55','minguante'],
['2027-02-06T15:56','nova'],['2027-02-14T07:58','crescente'],['2027-02-20T23:23','cheia'],['2027-02-28T05:16','minguante'],
['2027-03-08T09:29','nova'],['2027-03-15T16:25','crescente'],['2027-03-22T10:44','cheia'],['2027-03-30T00:54','minguante'],
['2027-04-06T23:51','nova'],['2027-04-13T22:56','crescente'],['2027-04-20T22:27','cheia'],['2027-04-28T20:18','minguante'],
['2027-05-06T10:58','nova'],['2027-05-13T04:44','crescente'],['2027-05-20T10:59','cheia'],['2027-05-28T13:58','minguante'],
['2027-06-04T19:40','nova'],['2027-06-11T10:56','crescente'],['2027-06-19T00:44','cheia'],['2027-06-27T04:54','minguante'],
['2027-07-04T03:02','nova'],['2027-07-10T18:39','crescente'],['2027-07-18T15:45','cheia'],['2027-07-26T16:55','minguante'],
['2027-08-02T10:05','nova'],['2027-08-09T04:54','crescente'],['2027-08-17T07:29','cheia'],['2027-08-25T02:27','minguante'],
['2027-08-31T17:41','nova'],['2027-09-07T18:31','crescente'],['2027-09-15T23:03','cheia'],['2027-09-23T10:20','minguante'],
['2027-09-30T02:36','nova'],['2027-10-07T11:47','crescente'],['2027-10-15T13:47','cheia'],['2027-10-22T17:29','minguante'],
['2027-10-29T13:36','nova'],['2027-11-06T08:00','crescente'],['2027-11-14T03:26','cheia'],['2027-11-21T00:48','minguante'],
['2027-11-28T03:24','nova'],['2027-12-06T05:22','crescente'],['2027-12-13T16:09','cheia'],['2027-12-20T09:11','minguante'],
['2027-12-27T20:12','nova']
];
const phaseNames={nova:'Lua Nova',crescente:'Quarto Crescente',cheia:'Lua Cheia',minguante:'Quarto Minguante'};
const phaseIcons={nova:'●',crescente:'◐',cheia:'○',minguante:'◑'};
const phaseEvents=phaseRows.map(([utc,type])=>({date:new Date(utc+'Z'),type}));
function localParts(date){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:$('timezone').value,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);const v=Object.fromEntries(parts.map(p=>[p.type,p.value]));return {key:v.year+'-'+v.month+'-'+v.day,time:v.hour+':'+v.minute}}
function selectedKey(){return '2027-'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0')}
function renderPhase(){
 updateMoonVisual();
 const today=selectedKey(),matches=phaseEvents.filter(p=>localParts(p.date).key===today);
 const current=Date.parse(today+'T12:00:00Z');
 const upcoming=(state.month===0&&state.day===12)?[
  {date:new Date('2027-01-26T14:32:00Z'),icon:'☾',label:'Lua em Gêmeos'},
  {date:new Date('2027-01-22T08:17:00Z'),icon:'○',label:'Lua Cheia'},
  {date:new Date('2027-01-29T21:49:00Z'),icon:'◑',label:'Lua Minguante'},
  {date:new Date('2027-02-01T06:21:00Z'),icon:'♈',label:'Lua em Áries'}
 ]:[
  ...phaseEvents.filter(p=>p.date.getTime()>current).map(p=>({date:p.date,icon:phaseIcons[p.type],label:phaseNames[p.type]})),
  ...ingressEvents.filter(p=>p.date.getTime()>current).map(p=>({date:p.date,icon:ingressSymbols[p.sign],label:'Lua em '+ingressSigns[p.sign]}))
 ].sort((a,b)=>a.date-b.date).slice(0,4);
 const info=$('phase-info');info.replaceChildren();
 upcoming.forEach(event=>{const row=document.createElement('div');row.className='movement-row';const icon=document.createElement('span');icon.className='movement-row-icon';icon.textContent=event.icon;const text=document.createElement('span');text.className='movement-row-text';text.innerHTML='<strong>'+event.label+'</strong><small>'+new Intl.DateTimeFormat('pt-BR',{timeZone:$('timezone').value,day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(event.date)+'</small>';row.append(icon,text);info.append(row)});
 if(matches.length){matches.forEach(p=>{const line=document.createElement('p');line.className='phase-event';line.textContent=phaseIcons[p.type]+' '+phaseNames[p.type]+' — '+localParts(p.date).time;info.prepend(line)})}
 decorateCalendarDays();
}
/* Representação aproximada/* Representação aproximada baseada na fração do ciclo sinódico entre Luas Novas.
   Não substitui efemérides de posição/iluminação lunar de alta precisão. */
function updateMoonVisual(){
 const selected=new Date(Date.UTC(2027,state.month,state.day,12));
 const newMoons=phaseEvents.filter(e=>e.type==='nova').map(e=>e.date.getTime());
 const anchor=Date.parse('2026-12-09T00:00:00Z');
 const prev=[anchor,...newMoons].filter(t=>t<=selected.getTime()).pop();
 const next=newMoons.find(t=>t>selected.getTime())??prev+29.530588853*86400000;
 const fraction=Math.max(0,Math.min(1,(selected.getTime()-prev)/(next-prev)));
 const illuminated=(1-Math.cos(2*Math.PI*fraction))/2;
 const waxing=fraction<.5;
 const disk=$('dynamic-moon');
 if(!disk)return;
 const width=Math.abs(Math.cos(2*Math.PI*fraction))*100;
 const shadow=illuminated<.5?'#102b20':'#ead49e';
 const base=illuminated<.5?'#ead49e':'#102b20';
 disk.style.background=base;
 disk.style.setProperty('--moon-shadow',shadow);
 disk.style.setProperty('--moon-width',width+'%');
 disk.style.setProperty('--moon-side',waxing?'right':'left');
 disk.style.setProperty('--moon-fraction',String(fraction));
 const stage=fraction<.035||fraction>.965?'Lua Nova':fraction<.215?'Lua Crescente':fraction<.285?'Quarto Crescente':fraction<.465?'Gibosa Crescente':fraction<.535?'Lua Cheia':fraction<.715?'Gibosa Minguante':fraction<.785?'Quarto Minguante':'Lua Minguante';
 $('moon-visual-label').textContent=stage+' · iluminação estimada: '+Math.round(illuminated*100)+'%';
 const phaseAsset={
  'Lua Nova':'01_lua_nova.png','Lua Crescente':'02_lua_crescente.png','Quarto Crescente':'03_quarto_crescente.png','Gibosa Crescente':'04_gibosa_crescente.png',
  'Lua Cheia':'05_lua_cheia.png','Gibosa Minguante':'06_gibosa_minguante.png','Quarto Minguante':'07_quarto_minguante.png','Lua Minguante':'08_lua_minguante.png'
 }[stage];
 const todayMoon=$('today-moon-image');if(todayMoon){todayMoon.src='assets/moon-phases/'+phaseAsset;todayMoon.alt=stage}
 const todayStage=$('today-moon-stage');if(todayStage)todayStage.textContent=(state.month===0&&state.day>=12&&state.day<=14)?'Lua Crescente em Touro':stage;
 const todayDate=$('today-moon-date');if(todayDate){if(state.month===0&&state.day===12)todayDate.innerHTML='Desde 12 jan, 04h27<br>Até 14 jan, 17h19';else todayDate.innerHTML='Data selecionada: '+String(state.day).padStart(2,'0')+' '+months[state.month]+' 2027'}
 const todaySign=$('today-moon-sign');if(todaySign){const latest=[...ingressEvents].reverse().find(e=>localParts(e.date).key<=selectedKey());todaySign.textContent=(state.month===0&&state.day>=12&&state.day<=14)?'♉':latest?ingressSymbols[latest.sign]:'✦'}
 disk.setAttribute('aria-label',stage+', iluminação aproximada '+Math.round(illuminated*100)+' por cento');
 const x= Math.cos(2*Math.PI*fraction);
 const rx=Math.max(.01,Math.abs(x)*48);const lit='#ead49e',dark='#102b20';const right=waxing;const outer=right?'M 48 0 A 48 48 0 0 1 48 96':'M 48 0 A 48 48 0 0 0 48 96';const sweep=(x>=0)!==right?1:0;const path=outer+' A '+rx+' 48 0 0 '+sweep+' 48 0 Z';disk.innerHTML='<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="48" fill="'+dark+'"/><path d="'+path+'" fill="'+lit+'"/></svg>';
}
/* PRÉVIA TÉCNICA — janeiro a dezembro de 2027.
   Lua geocêntrica, zodíaco tropical, fronteiras de 30 graus.
   Calculado com PySwissEph 2.10.03, modo Moshier (FLG_MOSEPH),
   pesquisa de cruzamentos por bisseção. Horários UTC arredondados ao minuto.
   Pendente confronto independente antes de lançamento comercial. */
const ingressSymbols=['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];
const ingressSigns=['Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
const ingressRows=[
['2027-01-01T10:15',7],['2027-01-03T20:57',8],['2027-01-06T09:17',9],['2027-01-08T22:10',10],
['2027-01-11T10:35',11],['2027-01-13T21:13',0],['2027-01-16T04:43',1],['2027-01-18T08:32',2],
['2027-01-20T09:21',3],['2027-01-22T08:45',4],['2027-01-24T08:44',5],['2027-01-26T11:12',6],
['2027-01-28T17:21',7],['2027-01-31T03:13',8],
['2027-02-02T15:32',9],['2027-02-05T04:28',10],['2027-02-07T16:31',11],['2027-02-10T02:48',0],['2027-02-12T10:44',1],['2027-02-14T15:58',2],['2027-02-16T18:38',3],['2027-02-18T19:31',4],['2027-02-20T19:59',5],['2027-02-22T21:44',6],['2027-02-25T02:24',7],['2027-02-27T10:52',8],
['2027-03-01T22:35',9],['2027-03-04T11:31',10],['2027-03-06T23:25',11],['2027-03-09T09:02',0],['2027-03-11T16:16',1],['2027-03-13T21:30',2],['2027-03-16T01:10',3],['2027-03-18T03:40',4],['2027-03-20T05:36',5],['2027-03-22T08:01',6],['2027-03-24T12:18',7],['2027-03-26T19:43',8],['2027-03-29T06:33',9],['2027-03-31T19:19',10],
['2027-04-03T07:25',11],
['2027-04-05T16:48',0],
['2027-04-07T23:10',1],
['2027-04-10T03:21',2],
['2027-04-12T06:32',3],
['2027-04-14T09:30',4],
['2027-04-16T12:39',5],
['2027-04-18T16:22',6],
['2027-04-20T21:21',7],
['2027-04-23T04:37',8],
['2027-04-25T14:52',9],
['2027-04-28T03:24',10],
['2027-04-30T15:52',11],
['2027-05-03T01:43',0],
['2027-05-05T07:53',1],
['2027-05-07T11:07',2],
['2027-05-09T12:59',3],
['2027-05-11T15:01',4],
['2027-05-13T18:06',5],
['2027-05-15T22:34',6],
['2027-05-18T04:33',7],
['2027-05-20T12:27',8],
['2027-05-22T22:43',9],
['2027-05-25T11:05',10],
['2027-05-27T23:55',11],
['2027-05-30T10:39',0],
['2027-06-01T17:33',1],
['2027-06-03T20:43',2],
['2027-06-05T21:39',3],
['2027-06-07T22:13',4],
['2027-06-10T00:00',5],
['2027-06-12T03:57',6],
['2027-06-14T10:17',7],
['2027-06-16T18:53',8],
['2027-06-19T05:35',9],
['2027-06-21T18:01',10],
['2027-06-24T07:01',11],
['2027-06-26T18:35',0],
['2027-06-29T02:46',1],
['2027-07-01T06:56',2],
['2027-07-03T07:58',3],
['2027-07-05T07:40',4],
['2027-07-07T07:57',5],
['2027-07-09T10:24',6],
['2027-07-11T15:55',7],
['2027-07-14T00:33',8],
['2027-07-16T11:39',9],
['2027-07-19T00:16',10],
['2027-07-21T13:14',11],
['2027-07-24T01:09',0],
['2027-07-26T10:28',1],
['2027-07-28T16:10',2],
['2027-07-30T18:25',3],
['2027-08-01T18:25',4],
['2027-08-03T17:57',5],
['2027-08-05T18:55',6],
['2027-08-07T22:53',7],
['2027-08-10T06:36',8],
['2027-08-12T17:34',9],
['2027-08-15T06:20',10],
['2027-08-17T19:12',11],
['2027-08-20T06:54',0],
['2027-08-22T16:33',1],
['2027-08-24T23:27',2],
['2027-08-27T03:21',3],
['2027-08-29T04:43',4],
['2027-08-31T04:44',5],
['2027-09-02T05:07',6],
['2027-09-04T07:44',7],
['2027-09-06T14:01',8],
['2027-09-09T00:12',9],
['2027-09-11T12:50',10],
['2027-09-14T01:39',11],
['2027-09-16T12:56',0],
['2027-09-18T22:05',1],
['2027-09-21T05:06',2],
['2027-09-23T10:02',3],
['2027-09-25T13:00',4],
['2027-09-27T14:28',5],
['2027-09-29T15:31',6],
['2027-10-01T17:45',7],
['2027-10-03T22:56',8],
['2027-10-06T07:59',9],
['2027-10-08T20:10',10],
['2027-10-11T09:02',11],
['2027-10-13T20:10',0],
['2027-10-16T04:37',1],
['2027-10-18T10:46',2],
['2027-10-20T15:25',3],
['2027-10-22T19:03',4],
['2027-10-24T21:54',5],
['2027-10-27T00:21',6],
['2027-10-29T03:23',7],
['2027-10-31T08:24',8],
['2027-11-02T16:41',9],
['2027-11-05T04:13',10],
['2027-11-07T17:09',11],
['2027-11-10T04:38',0],
['2027-11-12T12:58',1],
['2027-11-14T18:14',2],
['2027-11-16T21:39',3],
['2027-11-19T00:28',4],
['2027-11-21T03:25',5],
['2027-11-23T06:53',6],
['2027-11-25T11:10',7],
['2027-11-27T17:01',8],
['2027-11-30T01:18',9],
['2027-12-02T12:26',10],
['2027-12-05T01:20',11],
['2027-12-07T13:30',0],
['2027-12-09T22:36',1],
['2027-12-12T03:55',2],
['2027-12-14T06:24',3],
['2027-12-16T07:41',4],
['2027-12-18T09:17',5],
['2027-12-20T12:13',6],
['2027-12-22T17:01',7],
['2027-12-24T23:50',8],
['2027-12-27T08:51',9],
['2027-12-29T20:04',10]
];
const ingressEvents=ingressRows.map(([utc,sign])=>({date:new Date(utc+'Z'),sign}));
function renderIngress(){
 const el=$('ingress-info');if(!el)return;el.replaceChildren();
 if(state.month>11){$('zodiac-symbol').textContent='✧';$('zodiac-name').textContent='Posição não disponível';$('zodiac-status').textContent='Dados ainda não verificados';el.textContent='Ingressos deste mês ainda não publicados. Janeiro a dezembro disponíveis como prévia técnica.';return}
 const day=selectedKey(),matches=ingressEvents.filter(e=>localParts(e.date).key===day);
 const latest=[...ingressEvents].reverse().find(e=>localParts(e.date).key<=day);
 const transitionToday=matches.length>0;
 $('zodiac-symbol').textContent=transitionToday?'◐':latest?ingressSymbols[latest.sign]:'✧';
 $('zodiac-name').textContent=transitionToday?'Mudança de signo neste dia':latest?'Lua em '+ingressSigns[latest.sign]:'Posição não disponível';
 $('zodiac-status').textContent=transitionToday?'Consulte o horário do ingresso abaixo; o signo varia ao longo do dia':latest?'Posição lunar calculada para a data selecionada':'Aguardando efemérides verificadas';
 const title=document.createElement('p');title.textContent='Ingressos lunares — zodíaco tropical:';el.append(title);
 if(matches.length){for(const event of matches){const p=document.createElement('p');p.textContent='Lua entra em '+ingressSigns[event.sign]+' às '+localParts(event.date).time+' ('+$('timezone').selectedOptions[0].text+')';el.append(p)}}else{const p=document.createElement('p');p.textContent='Nenhum ingresso registrado nesta data.';el.append(p)}
}
function decorateCalendarDays(){
 document.querySelectorAll('#calendar-grid .day').forEach(b=>{
  b.querySelectorAll('.day-meta').forEach(x=>x.remove());
  const d=Number(b.firstChild?.textContent||b.textContent);if(!d)return;
  const k='2027-'+String(state.month+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  const phase=phaseEvents.find(p=>localParts(p.date).key===k);
  const sign=ingressEvents.find(p=>localParts(p.date).key===k);
  if(!phase&&!sign)return;
  const meta=document.createElement('small');meta.className='day-meta';
  if(sign){const item=document.createElement('span');item.textContent=ingressSymbols[sign.sign]+' '+ingressSigns[sign.sign];meta.append(item)}
  if(phase){const item=document.createElement('span');const icon=document.createElement('img');const phaseFiles={nova:'01_nova.svg',crescente:'03_quarto_crescente.svg',cheia:'05_cheia.svg',minguante:'07_quarto_minguante.svg'};icon.src='assets/moon-phases/'+phaseFiles[phase.type];icon.alt='';icon.setAttribute('aria-hidden','true');item.append(icon,document.createTextNode(phaseNames[phase.type]));meta.append(item)}
  b.append(meta);
 });
}

render();
