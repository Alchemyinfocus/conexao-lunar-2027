'use strict';
(function(){
const flag='alchemy-lunar-2027:backup-pendente';
const last='alchemy-lunar-2027:ultimo-backup';
const label=document.getElementById('backup-safety-status');
function update(){
 let pending=true,stamp='';
 try{pending=localStorage.getItem(flag)!=='0';stamp=localStorage.getItem(last)||''}catch(e){}
 const {translate, getLocale} = window.LunarI18n;
 label.textContent = pending ? translate('backupPending') : stamp
  ? translate('backupSavedAt').replace('{date}', new Date(stamp).toLocaleString(getLocale()))
  : translate('backupSaved');
 label.classList.toggle('backup-warning',pending);
}
window.lunarMarkUnsaved=function(){try{localStorage.setItem(flag,'1')}catch(e){}update()};
window.lunarMarkBackup=function(){try{localStorage.setItem(flag,'0');localStorage.setItem(last,new Date().toISOString())}catch(e){}update()};
document.addEventListener('lunar:languagechange', update);
update();
})();