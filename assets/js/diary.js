'use strict';
(function(){
const date=document.getElementById('diary-date');
const editor=document.getElementById('diary-entry');
const status=document.getElementById('diary-save-status');
const dayLabel=document.getElementById('diary-day-label');
const prefix='alchemy-lunar-2027:nota:';
const calendarNote=document.getElementById('note');
const calendarStatus=document.getElementById('save-status');
function isEnglish(){return window.LunarI18n?.getLanguage()==='en'}
function message(pt,en){return isEnglish()?en:pt}
function updateDiaryLanguage(){
 const en=isEnglish();
 const content=document.querySelector('.lunar-diary-page');
 if(!content)return;
 const set=(selector,pt,english)=>{const el=content.querySelector(selector);if(el)el.textContent=en?english:pt};
 set('#diary-title','Meu Diário Lunar · 2027','My Lunar Journal · 2027');
 set('.phases-heading p','Um espaço para registrar percepções, intenções e reflexões ao longo do ano.','A space to record insights, intentions, and reflections throughout the year.');
 set('label[for="diary-date"]','Escolha a data','Choose a date');
 set('label[for="diary-entry"]','Minhas anotações','My notes');
 const placeholder=content.querySelector('#diary-entry');
 if(placeholder)placeholder.placeholder=en?'How do I feel today? What are my intentions and reflections?':'Como me sinto hoje? Quais são minhas intenções e reflexões?';
 set('#diary-backup','Exportar backup das notas','Export notes backup');
 const restore=content.querySelector('.diary-restore');
 if(restore){const input=restore.querySelector('input');restore.replaceChildren(document.createTextNode(en?'Restore backup ':'Restaurar backup '));if(input)restore.append(input)}
 set('#diary-print','Imprimir / Salvar PDF','Print / Save PDF');
 set('.phases-source','Os registros ficam armazenados localmente neste navegador e dispositivo, não em uma conta online. Faça backups periódicos para evitar perdas. Ao restaurar, notas existentes nas mesmas datas poderão ser substituídas após confirmação.','Entries are stored locally in this browser and on this device, not in an online account. Back up your notes regularly to prevent data loss. Restoring a backup may overwrite existing notes for the same dates after confirmation.');
 const previous=status.textContent.trim();
 const statuses={
 'Nenhuma anotação salva nesta data.':['No note saved for this date.'],
 'Nota recuperada deste navegador.':['Note loaded from this browser.'],
 'Nota salva neste navegador; exporte um backup para protegê-la.':['Note saved in this browser. Export a backup to protect it.'],
 'Escolha uma data válida de 2027.':['Choose a valid date in 2027.'],
 'Armazenamento local indisponível. Copie suas notas para não perdê-las.':['Local storage is unavailable. Copy your notes to avoid losing them.'],
 'Falha ao salvar. Exporte ou copie o texto antes de sair.':['Save failed. Export or copy your text before leaving.'],
 'Não foi possível transferir o arquivo. Restaure pelo Calendário Anual.':['Could not transfer the file. Restore it from the Annual Calendar.']
 };
 for(const [pt,translations] of Object.entries(statuses)){if(previous===pt||previous===translations[0]){status.textContent=en?translations[0]:pt;break}}
 if(date.value&&validDate(date.value))dayLabel.textContent=new Intl.DateTimeFormat(en?'en-US':'pt-BR',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date.value+'T12:00:00Z'));
}
document.addEventListener('lunar:languagechange',updateDiaryLanguage);
document.addEventListener('DOMContentLoaded',updateDiaryLanguage);

function noteKey(){return prefix+date.value.slice(5)}
function validDate(value){if(!/^2027-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value}
function loadDiary(){
 if(!validDate(date.value)){status.textContent=message('Escolha uma data válida de 2027.','Choose a valid date in 2027.');editor.disabled=true;return}
 editor.disabled=false;
 dayLabel.textContent=new Intl.DateTimeFormat(isEnglish()?'en-US':'pt-BR',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date.value+'T12:00:00Z'));
 try{editor.value=localStorage.getItem(noteKey())||'';status.textContent=editor.value?message('Nota recuperada deste navegador.','Note loaded from this browser.'):message('Nenhuma anotação salva nesta data.','No note saved for this date.')}
 catch(e){editor.value='';status.textContent=message('Armazenamento local indisponível. Copie suas notas para não perdê-las.','Local storage is unavailable. Copy your notes to avoid losing them.')}
}
date.addEventListener('change',loadDiary);
editor.addEventListener('input',()=>{
 if(!validDate(date.value))return;
 try{
  localStorage.setItem(noteKey(),editor.value);
  window.lunarMarkUnsaved?.();
  status.textContent=message('Nota salva neste navegador; exporte um backup para protegê-la.','Note saved in this browser. Export a backup to protect it.');
  if(key()===noteKey()){calendarNote.value=editor.value;calendarStatus.textContent='Nota salva neste navegador.'}
 }catch(e){status.textContent=message('Falha ao salvar. Exporte ou copie o texto antes de sair.','Save failed. Export or copy your text before leaving.')}
});
document.getElementById('diary-backup').addEventListener('click',()=>document.getElementById('backup').click());
const restore=document.getElementById('diary-restore-file');
restore.addEventListener('change',()=>{
 const file=restore.files&&restore.files[0];if(!file)return;
 const target=document.getElementById('restore');
 try{const dt=new DataTransfer();dt.items.add(file);target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(e){status.textContent=message('Não foi possível transferir o arquivo. Restaure pelo Calendário Anual.','Could not transfer the file. Restore it from the Annual Calendar.')}
 restore.value='';
});
document.getElementById('diary-print').addEventListener('click',()=>window.print());
window.renderDiaryPage=()=>{const selected='2027-'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0');date.value=selected;loadDiary();updateDiaryLanguage()};
window.addEventListener('storage',e=>{if(e.key===noteKey())loadDiary()});
window.addEventListener('alchemy-lunar-backup-restored',loadDiary);
loadDiary();
updateDiaryLanguage();
})();
