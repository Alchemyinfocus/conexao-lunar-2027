'use strict';
(function(){
const btn=document.getElementById('install-app');
const msg=document.getElementById('install-message');
let promptEvent=null;
const secure=location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
const messages={
 insecure:['Instalação indisponível ao abrir um arquivo local. A versão instalável requer um endereço HTTPS; o acesso pelo navegador continua disponível.','Installation is unavailable when opening a local file. The installable version requires HTTPS; browser access remains available.'],
 ready:['Acesso pelo navegador disponível. A instalação é opcional; a disponibilidade offline depende da instalação e do primeiro carregamento completo.','Browser access is available. Installation is optional; offline availability depends on installation and the first complete load.'],
 failed:['Não foi possível preparar o acesso offline neste navegador.','Could not prepare offline access in this browser.'],
 available:['Seu navegador permite instalar este planner. A escolha é sua.','Your browser supports installing this planner. The choice is yours.'],
 installed:['Aplicativo instalado. Exporte backups regularmente para proteger seus registros.','App installed. Export backups regularly to protect your records.'],
 accepted:['Instalação aceita. Verifique o ícone no seu dispositivo.','Installation accepted. Check for the app icon on your device.'],
 canceled:['Instalação cancelada. Você pode continuar usando no navegador.','Installation canceled. You can continue using the browser.'],
 manual:['Se a instalação não estiver disponível aqui, use o menu do navegador: Instalar aplicativo (Chrome/Edge/Android) ou Compartilhar → Adicionar à Tela de Início (Safari no iPhone).','If installation is not available here, use your browser menu: Install app (Chrome/Edge/Android) or Share → Add to Home Screen (Safari on iPhone).']
};
let currentMessage=null;
function showMessage(key){currentMessage=key;msg.textContent=messages[key][window.LunarI18n?.getLanguage()==='en'?1:0]}
document.addEventListener('lunar:languagechange',()=>{if(currentMessage)showMessage(currentMessage)});
if(!secure){btn.disabled=true;showMessage('insecure');return}
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(()=>{showMessage('ready')}).catch(()=>{showMessage('failed')})}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;btn.disabled=false;showMessage('available')});
window.addEventListener('appinstalled',()=>{promptEvent=null;btn.disabled=true;showMessage('installed')});
btn.addEventListener('click',async()=>{if(promptEvent){const event=promptEvent;promptEvent=null;await event.prompt();const result=await event.userChoice;showMessage(result.outcome==='accepted'?'accepted':'canceled');return}showMessage('manual')});
})();
