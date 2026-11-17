'use strict';
(function(){
const prefix='alchemy-lunar-2027:planning:';
const month=document.getElementById('planning-month');
const status=document.getElementById('planning-status');
const t = window.LunarI18n.translate;
let messageKey;
function setMessage(key) {
  messageKey = key;
  status.textContent = t(key);
}
document.addEventListener('lunar:languagechange', () => {
  if (messageKey) setMessage(messageKey);
});

const fields=['intentions','priorities','reflections'];
const inputs=Object.fromEntries(fields.map(n=>[n,document.getElementById('planning-'+n)]));
const list=document.getElementById('planning-task-list');
const progress=document.getElementById('planning-progress');
function updateMonthLabels() {
 const names = t('months');
 for (const option of month.options) option.textContent = names[Number(option.value)];
}
document.addEventListener('lunar:languagechange', () => {
 updateMonthLabels();
 renderTasks();
});
updateMonthLabels();
const key=()=>prefix+String(Number(month.value)+1).padStart(2,'0');
let data;
function empty(){return {intentions:'',priorities:'',reflections:'',tasks:[]}}
function valid(obj){return obj&&typeof obj==='object'&&!Array.isArray(obj)&&fields.every(n=>typeof obj[n]==='string'&&obj[n].length<=100000)&&Array.isArray(obj.tasks)&&obj.tasks.length<=300&&obj.tasks.every(t=>t&&typeof t.text==='string'&&t.text.length<=200&&typeof t.done==='boolean')}
function load(){
 try{const saved=localStorage.getItem(key());data=saved?JSON.parse(saved):empty();if(!valid(data))throw Error('Dados inválidos');setMessage('planningLoaded')}
 catch(e){data=empty();setMessage('planningReadFailed');return}
 fields.forEach(n=>inputs[n].value=data[n]);renderTasks();
}
function save(){
 try{localStorage.setItem(key(),JSON.stringify(data));window.lunarMarkUnsaved?.();setMessage('planningSaved')}
 catch(e){setMessage('planningSaveFailed')}
}
function renderTasks(){
 list.replaceChildren();const done=data.tasks.filter(t=>t.done).length;
 progress.textContent=data.tasks.length?t('planningProgress').replace('{done}', done).replace('{total}', data.tasks.length):t('planningNoTasks');
 data.tasks.forEach((task,i)=>{
 const li=document.createElement('li');li.className='planning-task';
 const check=document.createElement('input');check.type='checkbox';check.checked=task.done;check.setAttribute('aria-label',t('planningCompleteTask')+task.text);
 check.addEventListener('change',()=>{data.tasks[i].done=check.checked;save();renderTasks()});
 const span=document.createElement('span');span.textContent=task.text;if(task.done)span.className='completed';
 const remove=document.createElement('button');remove.type='button';remove.textContent=t('planningDeleteTask');remove.setAttribute('aria-label',t('planningDeleteTaskLabel')+task.text);
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
 catch(err){setMessage('restoreSelectFailed')}
 e.target.value='';
});
window.renderPlanningPage=()=>{month.value=String(state.month);load()};
window.addEventListener('alchemy-lunar-backup-restored',load);
load();
})();