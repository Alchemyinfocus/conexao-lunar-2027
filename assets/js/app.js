'use strict';
const months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const weekdays=['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
const state={year:2027,month:0,day:1};
const $=id=>document.getElementById(id);
function key(){return 'alchemy-lunar-2027:nota:'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0')}
function storeNote(){try{localStorage.setItem(key(),$('note').value);$('save-status').textContent='Nota salva neste navegador.'}catch(e){$('save-status').textContent='Armazenamento indisponível. Copie sua nota para não perdê-la.'}}
function loadNote(){try{$('note').value=localStorage.getItem(key())||''}catch(e){$('note').value='';$('save-status').textContent='Armazenamento local indisponível neste navegador.'}}
function render(){const first=new Date(2027,state.month,1).getDay(),days=new Date(2027,state.month+1,0).getDate();$('month-title').textContent=months[state.month]+' 2027';$('date-heading').textContent=state.day+' de '+months[state.month]+' de 2027';$('months').innerHTML='';months.forEach((name,i)=>{const b=document.createElement('button');b.textContent=name;b.setAttribute('aria-current',String(i===state.month));b.onclick=()=>{state.month=i;state.day=1;render()};$('months').append(b)});const grid=$('calendar-grid');grid.innerHTML='';for(let i=0;i<first;i++){const e=document.createElement('span');e.className='empty';grid.append(e)}for(let d=1;d<=days;d++){const b=document.createElement('button');b.className='day';b.textContent=d;b.setAttribute('role','gridcell');b.setAttribute('aria-label',d+' de '+months[state.month]+' de 2027');b.setAttribute('aria-selected',String(d===state.day));b.onclick=()=>{state.day=d;render()};grid.append(b)}const cells=first+days;for(let i=cells;i<Math.ceil(cells/7)*7;i++){const e=document.createElement('span');e.className='empty';grid.append(e)}loadNote();renderPhase();renderIngress()}
function changeMonth(delta){state.month=(state.month+delta+12)%12;state.day=1;render()}
$('prev').onclick=()=>changeMonth(-1);$('next').onclick=()=>changeMonth(1);$('note').addEventListener('input',storeNote);$('focus-note').onclick=()=>{$('note').focus();$('note').scrollIntoView({behavior:'smooth',block:'center'})};$('print').onclick=()=>window.print();$('export').onclick=()=>{alert('Na janela de impressão, escolha “Salvar como PDF”.');window.print()};$('today').onclick=()=>{const now=new Date();if(now.getFullYear()!==2027){alert('Este planner corresponde a 2027. A data atual está fora do ano do produto.');return}state.month=now.getMonth();state.day=now.getDate();render()};$('timezone').onchange=()=>{try{localStorage.setItem('alchemy-lunar-2027:timezone',$('timezone').value)}catch(e){}render();renderIngress()};try{const saved=localStorage.getItem('alchemy-lunar-2027:timezone');if(saved&&[...$('timezone').options].some(o=>o.value===saved))$('timezone').value=saved}catch(e){}

const notePrefix='alchemy-lunar-2027:nota:';
$('backup').onclick=()=>{const notes={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(notePrefix))notes[k]=localStorage.getItem(k)}}catch(e){alert('O navegador não permitiu acessar as notas.');return}const data=JSON.stringify({format:'alchemy-lunar-2027-backup-v1',notes},null,2);const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='conexao-lunar-2027-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
$('restore').onchange=async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;try{if(file.size>5*1024*1024)throw new Error('Arquivo maior que 5 MB');const data=JSON.parse(await file.text());if(data.format!=='alchemy-lunar-2027-backup-v1'||!data.notes||typeof data.notes!=='object'||Array.isArray(data.notes))throw new Error('Backup inválido');const entries=Object.entries(data.notes);if(entries.length>366)throw new Error('Número de registros inválido');if(!entries.every(([k,v])=>/^alchemy-lunar-2027:nota:(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(k)&&typeof v==='string'&&v.length<=100000))throw new Error('Conteúdo de backup inválido');if(!confirm('Restaurar '+entries.length+' notas? Datas existentes serão substituídas.'))return;for(const [k,v] of entries)localStorage.setItem(k,v);loadNote();alert('Backup restaurado com sucesso.')}catch(err){alert('Falha na restauração: '+err.message)}finally{e.target.value=''}};

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
function renderPhase(){updateMoonVisual();const today=selectedKey(),matches=phaseEvents.filter(p=>localParts(p.date).key===today);const current=Date.parse(today+'T12:00:00Z');const prev=[...phaseEvents].reverse().find(p=>p.date.getTime()<=current);const next=phaseEvents.find(p=>p.date.getTime()>current);const info=$('phase-info');info.replaceChildren();if(matches.length){matches.forEach(p=>{const line=document.createElement('p');line.className='phase-event';line.textContent=phaseIcons[p.type]+' '+phaseNames[p.type]+' — '+localParts(p.date).time+' ('+$('timezone').selectedOptions[0].text+')';info.append(line)})}else{const p=document.createElement('p');p.textContent='Nenhuma das quatro fases principais ocorre nesta data.';info.append(p)}const near=document.createElement('p');near.className='phase-near';near.textContent='Próxima fase: '+(next?phaseNames[next.type]+' — '+new Intl.DateTimeFormat('pt-BR',{timeZone:$('timezone').value,day:'2-digit',month:'long',hour:'2-digit',minute:'2-digit'}).format(next.date):'fora de 2027');info.append(near);document.querySelectorAll('#calendar-grid .day').forEach(b=>{const k='2027-'+String(state.month+1).padStart(2,'0')+'-'+String(Number(b.textContent)).padStart(2,'0');const ev=phaseEvents.find(p=>localParts(p.date).key===k);if(ev){b.classList.add('phase-day');const label=document.createElement('small');label.className='phase-marker';label.textContent=phaseIcons[ev.type];label.title=phaseNames[ev.type];b.append(label);b.setAttribute('aria-label',b.getAttribute('aria-label')+', '+phaseNames[ev.type])}})}
/* Representação aproximada baseada na fração do ciclo sinódico entre Luas Novas.
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
 disk.setAttribute('aria-label',stage+', iluminação aproximada '+Math.round(illuminated*100)+' por cento');
 const x= Math.cos(2*Math.PI*fraction);
 const rx=Math.max(.01,Math.abs(x)*48);const lit='#ead49e',dark='#102b20';const right=waxing;const outer=right?'M 48 0 A 48 48 0 0 1 48 96':'M 48 0 A 48 48 0 0 0 48 96';const sweep=(x>=0)!==right?1:0;const path=outer+' A '+rx+' 48 0 0 '+sweep+' 48 0 Z';disk.innerHTML='<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="48" fill="'+dark+'"/><path d="'+path+'" fill="'+lit+'"/></svg>';
}
/* PRÉVIA TÉCNICA — janeiro de 2027.
   Lua geocêntrica, zodíaco tropical, fronteiras de 30 graus.
   Calculado com PySwissEph 2.10.03, modo Moshier (FLG_MOSEPH),
   pesquisa de cruzamentos por bisseção. Horários UTC arredondados ao minuto.
   Pendente confronto independente antes de lançamento comercial. */
const ingressSymbols=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const ingressSigns=['Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
const ingressRows=[
['2027-01-01T10:15',7],['2027-01-03T20:57',8],['2027-01-06T09:17',9],['2027-01-08T22:10',10],
['2027-01-11T10:35',11],['2027-01-13T21:13',0],['2027-01-16T04:43',1],['2027-01-18T08:32',2],
['2027-01-20T09:21',3],['2027-01-22T08:45',4],['2027-01-24T08:44',5],['2027-01-26T11:12',6],
['2027-01-28T17:21',7],['2027-01-31T03:13',8]
];
const ingressEvents=ingressRows.map(([utc,sign])=>({date:new Date(utc+'Z'),sign}));
function renderIngress(){
 const el=$('ingress-info');if(!el)return;el.replaceChildren();
 if(state.month!==0){$('zodiac-symbol').textContent='✧';$('zodiac-name').textContent='Posição não disponível';$('zodiac-status').textContent='Dados ainda não verificados';el.textContent='Ingressos deste mês ainda não publicados. Janeiro disponível como prévia técnica.';return}
 const day=selectedKey(),matches=ingressEvents.filter(e=>localParts(e.date).key===day);
 const latest=[...ingressEvents].reverse().find(e=>localParts(e.date).key<=day);
 $('zodiac-symbol').textContent=latest?ingressSymbols[latest.sign]:'✧';
 $('zodiac-name').textContent=latest?'Lua em '+ingressSigns[latest.sign]:'Posição não disponível';
 $('zodiac-status').textContent=latest?'Prévia técnica · verificar antes da venda':'Aguardando efemérides verificadas';
 const title=document.createElement('p');title.textContent='Ingressos lunares — prévia técnica (zodíaco tropical):';el.append(title);
 if(matches.length){for(const event of matches){const p=document.createElement('p');p.textContent='Lua entra em '+ingressSigns[event.sign]+' às '+localParts(event.date).time+' ('+$('timezone').selectedOptions[0].text+')';el.append(p)}}else{const p=document.createElement('p');p.textContent='Nenhum ingresso registrado nesta data.';el.append(p)}
 const disclaimer=document.createElement('small');disclaimer.textContent='Cálculo preliminar: confirmar em fonte independente antes da venda.';el.append(disclaimer);
}
render();
