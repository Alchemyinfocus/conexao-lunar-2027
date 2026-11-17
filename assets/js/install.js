'use strict';
(function(){
const btn=document.getElementById('install-app');
const msg=document.getElementById('install-message');
const t = window.LunarI18n.translate;
let messageKey;
function setMessage(key) {
  messageKey = key;
  msg.textContent = t(key);
}
document.addEventListener('lunar:languagechange', () => {
  if (messageKey) setMessage(messageKey);
});

setMessage('installChecking');
let promptEvent=null;
const secure=location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
if(!secure){btn.disabled=true;setMessage('installLocalFile');return}
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(()=>{setMessage('installBrowserAvailable')}).catch(()=>{setMessage('installOfflineUnavailable')})}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;btn.disabled=false;setMessage('installAvailable');});
window.addEventListener('appinstalled',()=>{promptEvent=null;btn.disabled=true;setMessage('installCompleted');});
btn.addEventListener('click',async()=>{if(promptEvent){const event=promptEvent;promptEvent=null;await event.prompt();const result=await event.userChoice;setMessage(result.outcome==='accepted'?'installAccepted':'installCanceled');return}setMessage('installManual');});
})();
