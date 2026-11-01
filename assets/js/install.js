'use strict';
(function(){
const btn=document.getElementById('install-app');
const msg=document.getElementById('install-message');
let promptEvent=null;
const secure=location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
if(!secure){btn.disabled=true;msg.textContent='Instalação indisponível ao abrir um arquivo local. A versão instalável requer um endereço HTTPS; o acesso pelo navegador continua disponível.';return}
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(()=>{msg.textContent='Acesso pelo navegador disponível. A instalação é opcional; a disponibilidade offline depende da instalação e do primeiro carregamento completo.'}).catch(()=>{msg.textContent='Não foi possível preparar o acesso offline neste navegador.'})}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;btn.disabled=false;msg.textContent='Seu navegador permite instalar este planner. A escolha é sua.'});
window.addEventListener('appinstalled',()=>{promptEvent=null;btn.disabled=true;msg.textContent='Aplicativo instalado. Exporte backups regularmente para proteger seus registros.'});
btn.addEventListener('click',async()=>{if(promptEvent){const event=promptEvent;promptEvent=null;await event.prompt();const result=await event.userChoice;msg.textContent=result.outcome==='accepted'?'Instalação aceita. Verifique o ícone no seu dispositivo.':'Instalação cancelada. Você pode continuar usando no navegador.';return}msg.textContent='Se a instalação não estiver disponível aqui, use o menu do navegador: Instalar aplicativo (Chrome/Edge/Android) ou Compartilhar → Adicionar à Tela de Início (Safari no iPhone).'});
})();
