'use strict';
(function(){
const prefix='alchemy-lunar-2027:planning:';
const month=document.getElementById('planning-month');
const status=document.getElementById('planning-status');
const fields=['intentions','priorities','reflections'];
const inputs=Object.fromEntries(fields.map(n=>[n,document.getElementById('planning-'+n)]));
const list=document.getElementById('planning-task-list');
const progress=document.getElementById('planning-progress');
const key=()=>prefix+String(Number(month.value)+1).padStart(2,'0');
let data;
const isEnglish=()=>window.LunarI18n?.getLanguage()==='en';
const msg=(pt,en)=>isEnglish()?en:pt;
function updatePlanningLanguage(){
 const root=document.querySelector('.planning-page');if(!root)return;
 const set=(selector,pt,en)=>{const el=root.querySelector(selector);if(el)el.textContent=msg(pt,en)};
 set('#planning-title','Planejamento Lunar · 2027','Lunar Planning · 2027');
 set('.phases-heading p','Organize suas intenções, prioridades e tarefas mês a mês, acompanhando seus próprios ciclos.','Organize your intentions, priorities, and tasks month by month, following your own cycles.');
 set('label[for="planning-month"]','Selecione o mês','Select month');
 set('label[for="planning-intentions"]','Intenções do mês','Monthly intentions');
 set('label[for="planning-priorities"]','Prioridades e foco','Priorities and focus');
 set('label[for="planning-reflections"]','Reflexões e aprendizados','Reflections and lessons learned');
 set('.planning-tasks h3','Minhas tarefas e compromissos','My tasks and commitments');
 set('label[for="planning-new-task"]','Nova tarefa','New task');
 set('#planning-add-form button','Adicionar tarefa','Add task');
 set('#planning-backup','Exportar backup completo','Export full backup');
 const restore=root.querySelector('.diary-restore');if(restore){const input=restore.querySelector('input');restore.replaceChildren(document.createTextNode(msg('Restaurar backup ','Restore backup ')));if(input)restore.append(input)}
 set('.phases-source','Os dados são locais e não sincronizam entre dispositivos. Exporte backups regularmente. A organização por mês é pessoal e não constitui previsão astrológica.','Data is stored locally and does not sync between devices. Export backups regularly. Monthly planning is personal and does not constitute an astrological prediction.');
 const placeholders={
 'planning-intentions':['O que desejo cultivar neste mês?','What do I want to cultivate this month?'],
 'planning-priorities':['O que merece minha atenção?','What deserves my attention?'],
 'planning-reflections':['O que aprendi e quero levar adiante?','What have I learned and want to carry forward?'],
 'planning-new-task':['Escreva uma tarefa','Enter a task']
 };
 for(const [id,[pt,en]] of Object.entries(placeholders)){const el=document.getElementById(id);if(el)el.placeholder=msg(pt,en)}
 const names=window.LunarI18n?.translations?.[isEnglish()?'en':'pt']?.months;
 if(names)Array.from(month.options).forEach((option,i)=>{option.textContent=names[i]});
 const known=[
 ['Planejamento carregado deste navegador.','Planning loaded from this browser.'],
 ['Planejamento salvo neste navegador; exporte um backup para protegê-lo.','Planning saved in this browser. Export a backup to protect it.'],
 ['Não foi possível ler os dados deste mês. Não faça alterações antes de recuperar seu backup.','Could not read this month’s data. Do not make changes before restoring your backup.'],
 ['Falha ao salvar. Faça backup ou copie os textos.','Save failed. Back up or copy your text.'],
 ['Não foi possível selecionar o backup. Use a restauração pelo Calendário Anual.','Could not select the backup. Restore it from the Annual Calendar.']
 ];
 for(const [pt,en] of known){if(status.textContent===pt||status.textContent===en){status.textContent=msg(pt,en);break}}
 renderTasks();
}
document.addEventListener('lunar:languagechange',updatePlanningLanguage);
document.addEventListener('DOMContentLoaded',updatePlanningLanguage);
function empty(){return {intentions:'',priorities:'',reflections:'',tasks:[]}}
function valid(obj){return obj&&typeof obj==='object'&&!Array.isArray(obj)&&fields.every(n=>typeof obj[n]==='string'&&obj[n].length<=100000)&&Array.isArray(obj.tasks)&&obj.tasks.length<=300&&obj.tasks.every(t=>t&&typeof t.text==='string'&&t.text.length<=200&&typeof t.done==='boolean')}
function load(){
 try{const saved=localStorage.getItem(key());data=saved?JSON.parse(saved):empty();if(!valid(data))throw Error('Dados inválidos');status.textContent=msg('Planejamento carregado deste navegador.','Planning loaded from this browser.')}
 catch(e){data=empty();status.textContent=msg('Não foi possível ler os dados deste mês. Não faça alterações antes de recuperar seu backup.','Could not read this month’s data. Do not make changes before restoring your backup.');return}
 fields.forEach(n=>inputs[n].value=data[n]);renderTasks();
}
function save(){
 try{localStorage.setItem(key(),JSON.stringify(data));window.lunarMarkUnsaved?.();status.textContent=msg('Planejamento salvo neste navegador; exporte um backup para protegê-lo.','Planning saved in this browser. Export a backup to protect it.')}
 catch(e){status.textContent=msg('Falha ao salvar. Faça backup ou copie os textos.','Save failed. Back up or copy your text.')}
}
function renderTasks(){
 list.replaceChildren();const done=data.tasks.filter(t=>t.done).length;
 progress.textContent=data.tasks.length?done+msg(' de ',' of ')+data.tasks.length+msg(' tarefas concluídas',' tasks completed'):msg('Nenhuma tarefa cadastrada','No tasks added');
 data.tasks.forEach((task,i)=>{
 const li=document.createElement('li');li.className='planning-task';
 const check=document.createElement('input');check.type='checkbox';check.checked=task.done;check.setAttribute('aria-label',msg('Concluir ','Complete ')+task.text);
 check.addEventListener('change',()=>{data.tasks[i].done=check.checked;save();renderTasks()});
 const span=document.createElement('span');span.textContent=task.text;if(task.done)span.className='completed';
 const remove=document.createElement('button');remove.type='button';remove.textContent=msg('Excluir','Delete');remove.setAttribute('aria-label',msg('Excluir ','Delete ')+task.text);
 remove.addEventListener('click',()=>{data.tasks.splice(i,1);save();renderTasks()});
 li.append(check,span,remove);list.append(li);
 });
}
fields.forEach(n=>inputs[n].addEventListener('input',()=>{data[n]=inputs[n].value;save()}));
document.getElementById('planning-add-form').addEventListener('submit',e=>{
 e.preventDefault();const input=document.getElementById('planning-new-task');const text=input.value.trim();if(!text||data.tasks.length>=300)return;
 data.tasks.push({text,done:false});input.value='';save();renderTasks();
});
month.addEventListener('change',load);
document.getElementById('planning-backup').addEventListener('click',()=>document.getElementById('backup').click());
document.getElementById('planning-restore-file').addEventListener('change',e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{const transfer=new DataTransfer();transfer.items.add(file);const target=document.getElementById('restore');target.files=transfer.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(err){status.textContent=msg('Não foi possível selecionar o backup. Use a restauração pelo Calendário Anual.','Could not select the backup. Restore it from the Annual Calendar.')}
 e.target.value='';
});
window.renderPlanningPage=()=>{month.value=String(state.month);load();updatePlanningLanguage()};
window.addEventListener('alchemy-lunar-backup-restored',load);
load();
updatePlanningLanguage();
})();