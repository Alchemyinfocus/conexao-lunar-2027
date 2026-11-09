'use strict';
(function(){
const date=document.getElementById('diary-date');
const editor=document.getElementById('diary-entry');
const status=document.getElementById('diary-save-status');
const dayLabel=document.getElementById('diary-day-label');
const prefix='alchemy-lunar-2027:nota:';
const calendarNote=document.getElementById('note');
const calendarStatus=document.getElementById('save-status');
 function updateDiaryLanguage() {
  if (!window.LunarI18n) return;

  const t = window.LunarI18n.translate;
  const title = document.querySelector('.diary-card h3');
  const exportButton = document.getElementById('backup');
  const restoreButton = document.querySelector('.restore-label');

  if (title) title.textContent = t('diaryTitle');
 const noteField = document.getElementById('note');
if (noteField) noteField.placeholder = t('diaryPlaceholder');
  if (exportButton) exportButton.textContent = t('diaryExport');
  if (restoreButton) restoreButton.textContent = t('diaryRestore');
  if (calendarStatus && [
  'As notas são salvas neste navegador.',
  'As notas são salvas neste navegador',
  'Notes are saved in this browser'
].includes(calendarStatus.textContent.trim())) {
  calendarStatus.textContent = t('diaryStorageNote');
}
}

document.addEventListener('lunar:languagechange', updateDiaryLanguage);
document.addEventListener('DOMContentLoaded', updateDiaryLanguage);
function noteKey(){return prefix+date.value.slice(5)}
function validDate(value){if(!/^2027-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value}
function loadDiary(){
 if(!validDate(date.value)){status.textContent='Escolha uma data válida de 2027.';editor.disabled=true;return}
 editor.disabled=false;
 dayLabel.textContent=new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date.value+'T12:00:00Z'));
 try{editor.value=localStorage.getItem(noteKey())||'';status.textContent=editor.value?'Nota recuperada deste navegador.':'Nenhuma anotação salva nesta data.'}
 catch(e){editor.value='';status.textContent='Armazenamento local indisponível. Copie suas notas para não perdê-las.'}
}
date.addEventListener('change',loadDiary);
editor.addEventListener('input',()=>{
 if(!validDate(date.value))return;
 try{
  localStorage.setItem(noteKey(),editor.value);
  window.lunarMarkUnsaved?.();
  status.textContent='Nota salva neste navegador; exporte um backup para protegê-la.';
  if(key()===noteKey()){calendarNote.value=editor.value;calendarStatus.textContent='Nota salva neste navegador.'}
 }catch(e){status.textContent='Falha ao salvar. Exporte ou copie o texto antes de sair.'}
});
document.getElementById('diary-backup').addEventListener('click',()=>document.getElementById('backup').click());
const restore=document.getElementById('diary-restore-file');
restore.addEventListener('change',()=>{
 const file=restore.files&&restore.files[0];if(!file)return;
 const target=document.getElementById('restore');
 try{const dt=new DataTransfer();dt.items.add(file);target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(e){status.textContent='Não foi possível transferir o arquivo. Restaure pelo Calendário Anual.'}
 restore.value='';
});
document.getElementById('diary-print').addEventListener('click',()=>window.print());
window.renderDiaryPage=()=>{const selected='2027-'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0');date.value=selected;loadDiary()};
window.addEventListener('storage',e=>{if(e.key===noteKey())loadDiary()});
window.addEventListener('alchemy-lunar-backup-restored',loadDiary);
loadDiary();
})();
