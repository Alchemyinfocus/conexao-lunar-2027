'use strict';
(function(){
const zone=document.getElementById('settings-timezone');
const main=document.getElementById('timezone');
const status=document.getElementById('settings-timezone-status');
function sync(){zone.value=main.value;status.textContent='Fuso atual: '+zone.selectedOptions[0].text+'.'}
zone.addEventListener('change',()=>{main.value=zone.value;main.dispatchEvent(new Event('change'));sync()});
main.addEventListener('change',sync);
document.getElementById('settings-backup').addEventListener('click',()=>document.getElementById('backup').click());
document.getElementById('settings-restore-file').addEventListener('change',e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{const dt=new DataTransfer();dt.items.add(file);const target=document.getElementById('restore');target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(err){alert('Não foi possível selecionar o backup. Use a restauração pelo Calendário Anual.')}
 e.target.value='';
});
document.getElementById('settings-print').addEventListener('click',()=>window.print());
document.getElementById('settings-open-calendar').addEventListener('click',()=>document.querySelector('[data-feature="calendar"]').click());
window.renderSettingsPage=sync;
sync();
})();