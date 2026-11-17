'use strict';
(function(){
const date=document.getElementById('diary-date');
const editor=document.getElementById('diary-entry');
const status=document.getElementById('diary-save-status');
const t = window.LunarI18n.translate;
let messageKey;
function setMessage(key) {
  messageKey = key;
  status.textContent = t(key);
}
document.addEventListener('lunar:languagechange', () => {
  if (messageKey) setMessage(messageKey);
});

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
  if (restoreButton?.firstChild?.nodeType === Node.TEXT_NODE) {
    restoreButton.firstChild.nodeValue = t('diaryRestore') + ' ';
  }
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
function updateDayLabel() {
 dayLabel.textContent = validDate(date.value) ? new Intl.DateTimeFormat(window.LunarI18n.getLocale(), {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
 }).format(new Date(date.value + 'T12:00:00Z')) : '';
}
document.addEventListener('lunar:languagechange', updateDayLabel);
function loadDiary(){
 updateDayLabel();
 if(!validDate(date.value)){setMessage('journalInvalidDate');editor.disabled=true;return}
 editor.disabled=false;
 try{editor.value=localStorage.getItem(noteKey())||'';setMessage(editor.value ? 'journalNoteLoaded' : 'journalNoNote')}
 catch(e){editor.value='';setMessage('journalStorageUnavailable')}
}
date.addEventListener('change',loadDiary);
editor.addEventListener('input',()=>{
 if(!validDate(date.value))return;
 try{
  localStorage.setItem(noteKey(),editor.value);
  window.lunarMarkUnsaved?.();
  setMessage('journalNoteSaved');
  if(key()===noteKey()){calendarNote.value=editor.value;calendarStatus.textContent=t('calendarNoteSaved')}
 }catch(e){setMessage('journalSaveFailed')}
});
document.getElementById('diary-backup').addEventListener('click',()=>document.getElementById('backup').click());
const restore=document.getElementById('diary-restore-file');
restore.addEventListener('change',()=>{
 const file=restore.files&&restore.files[0];if(!file)return;
 const target=document.getElementById('restore');
 try{const dt=new DataTransfer();dt.items.add(file);target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(e){setMessage('journalRestoreFailed')}
 restore.value='';
});
document.getElementById('diary-print').addEventListener('click',()=>window.print());
window.renderDiaryPage=()=>{const selected='2027-'+String(state.month+1).padStart(2,'0')+'-'+String(state.day).padStart(2,'0');date.value=selected;loadDiary()};
window.addEventListener('storage',e=>{if(e.key===noteKey())loadDiary()});
window.addEventListener('alchemy-lunar-backup-restored',loadDiary);
loadDiary();
})();
