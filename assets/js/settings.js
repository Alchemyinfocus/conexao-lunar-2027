'use strict';
(function(){
const zone=document.getElementById('settings-timezone');
const main=document.getElementById('timezone');
const status=document.getElementById('settings-timezone-status');
const t = window.LunarI18n.translate;
function sync() {
 const zoneLabels = {
  'America/New_York': 'zoneNewYork',
  'Europe/Lisbon': 'zoneLisbon',
  'Europe/London': 'zoneLondon'
 };
 for (const option of zone.options) {
  const label = zoneLabels[option.value];
  if (label) option.textContent = t(label);
 }
 zone.value = main.value;
 status.textContent = t('settingsCurrentZone').replace('{zone}', zone.selectedOptions[0].text);
}
document.addEventListener('lunar:languagechange', sync);
zone.addEventListener('change',()=>{main.value=zone.value;main.dispatchEvent(new Event('change'));sync()});
main.addEventListener('change',sync);
document.getElementById('settings-backup').addEventListener('click',()=>document.getElementById('backup').click());
document.getElementById('settings-restore-file').addEventListener('change',e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{const dt=new DataTransfer();dt.items.add(file);const target=document.getElementById('restore');target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(err){alert(t('restoreSelectFailed'))}
 e.target.value='';
});
document.getElementById('settings-print').addEventListener('click',()=>window.print());
document.getElementById('settings-open-calendar').addEventListener('click',()=>document.querySelector('[data-feature="calendar"]').click());
window.renderSettingsPage=sync;
sync();
})();