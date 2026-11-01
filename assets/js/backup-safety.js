'use strict';
(function(){
const flag='alchemy-lunar-2027:backup-pendente';
const last='alchemy-lunar-2027:ultimo-backup';
const label=document.getElementById('backup-safety-status');
function update(){
 let pending=true,stamp='';
 try{pending=localStorage.getItem(flag)!=='0';stamp=localStorage.getItem(last)||''}catch(e){}
 label.textContent=pending?'Atenção: registros armazenados apenas neste navegador. Exporte um backup JSON e guarde o arquivo fora da pasta do produto.':('Backup exportado'+(stamp?' em '+new Date(stamp).toLocaleString('pt-BR'):'')+'. Confira se o arquivo foi salvo em local seguro.');
 label.classList.toggle('backup-warning',pending);
}
window.lunarMarkUnsaved=function(){try{localStorage.setItem(flag,'1')}catch(e){}update()};
window.lunarMarkBackup=function(){try{localStorage.setItem(flag,'0');localStorage.setItem(last,new Date().toISOString())}catch(e){}update()};
update();
})();