'use strict';
(function(){
const zone=document.getElementById('settings-timezone');
const main=document.getElementById('timezone');
const status=document.getElementById('settings-timezone-status');
const en=()=>window.LunarI18n?.getLanguage()==='en';
const tr=(pt,english)=>en()?english:pt;
function translateSettings(){
 const root=document.getElementById('configuracoes');if(!root)return;
 const set=(selector,pt,english)=>{const el=root.querySelector(selector);if(el)el.textContent=tr(pt,english)};
 set('#settings-title','Configurações · 2027','Settings · 2027');
 set('.phases-heading p','Preferências, proteção dos registros e impressão do seu planner.','Preferences, data protection, and printing your planner.');
 set('#backup-safety-status','Os registros ficam neste navegador. Exporte um backup JSON regularmente para protegê-los.','Your records are stored in this browser. Export JSON backups regularly to protect them.');
 const install=root.querySelector('.settings-install-info');
 if(install){
 const h=install.querySelector('h3');if(h)h.textContent=tr('Escolha como utilizar o Conexão Lunar 2027','Choose how to use Lunar Connection 2027');
 const paragraphs=install.querySelectorAll('p');
 const entries=[
 [['Instalar como aplicativo (recomendado):',' a primeira instalação requer internet e um endereço seguro (HTTPS). Após a instalação e o carregamento dos recursos, o uso offline poderá ser disponibilizado. A instalação ainda será habilitada e testada.'],['Install as an app (recommended):',' The first installation requires internet access and a secure HTTPS address. Once installed and its resources are loaded, offline access may become available. Installation still needs to be enabled and tested.']],
 [['Usar no navegador, sem instalar:',' você poderá acessar o conteúdo online sem instalação, mas não deve contar com acesso offline ou preservação garantida das anotações nessa modalidade.'],['Use in your browser without installing:',' You can access the content online without installing it, but offline access and preservation of notes are not guaranteed in this mode.']],
 [['Seus registros:',' são armazenados no dispositivo, sem sincronização automática. Exporte e guarde backups JSON regularmente. Limpar dados do navegador ou desinstalar o aplicativo pode apagar os registros locais.'],['Your records:',' They are stored on your device without automatic syncing. Export and keep JSON backups regularly. Clearing browser data or uninstalling the app may delete local records.']]
 ];
 entries.forEach((pair,i)=>{const p=paragraphs[i];if(!p)return;const [strong,body]=pair[en()?1:0];p.replaceChildren();const b=document.createElement('strong');b.textContent=strong;p.append(b,document.createTextNode(body))});
 if(paragraphs[3])paragraphs[3].textContent=tr('Você poderá escolher a modalidade que preferir quando a versão instalável estiver disponível.','You can choose your preferred mode when the installable version becomes available.');
 }
 set('#install-app','Instalar aplicativo (opcional)','Install app (optional)');
 const panels=root.querySelectorAll('.settings-panel');
 if(panels.length===4){
 const panel=(i,heading,paragraphs)=>{const p=panels[i];p.querySelector('h3').textContent=tr(heading[0],heading[1]);const ps=p.querySelectorAll(':scope > p');paragraphs.forEach((pair,j)=>{if(ps[j]){if(i===2&&j===0){const strong=ps[j].querySelector('strong');ps[j].replaceChildren(document.createTextNode(tr('Abra a página que deseja imprimir e use a impressão do navegador. Na janela de impressão, escolha ','Open the page you want to print and use your browser’s print function. In the print dialog, select ')));const b=document.createElement('strong');b.textContent=tr('Salvar como PDF','Save as PDF');ps[j].append(b,document.createTextNode(tr(' para gerar um arquivo.',' to create a file.')))}else if(i===3&&j===1){ps[j].replaceChildren();const b=document.createElement('strong');b.textContent=tr('Importante:','Important:');ps[j].append(b,document.createTextNode(tr(' excluir dados do navegador, utilizar modo anônimo ou trocar de dispositivo pode tornar seus registros inacessíveis. Guarde cópias do backup em local seguro.',' clearing browser data, using private browsing, or switching devices may make your records inaccessible. Keep backup copies in a safe location.')))}else ps[j].textContent=tr(pair[0],pair[1])}})};
 panel(0,['Fuso horário','Time zone'],[['Os eventos lunares são apresentados no horário da região selecionada.','Lunar events are displayed in the selected region’s time zone.']]);
 panel(1,['Backup e restauração','Backup and restore'],[['Exporte um único arquivo JSON com suas notas do Diário e seus planejamentos mensais.','Export a single JSON file containing your Journal notes and monthly plans.'],['Ao restaurar, registros existentes nas mesmas datas e meses poderão ser substituídos após confirmação.','Restoring may overwrite existing records for the same dates and months after confirmation.']]);
 panel(2,['Impressão e PDF','Printing and PDF'],[['','']]);
 panel(3,['Privacidade e uso offline','Privacy and offline use'],[['As anotações e planejamentos são armazenados neste navegador e neste dispositivo. Não há sincronização automática com outros aparelhos.','Notes and plans are stored in this browser and on this device. There is no automatic synchronization with other devices.'],['','']]);
 const label=panels[0].querySelector('label[for="settings-timezone"]');if(label)label.textContent=tr('Região','Region');
 const options=zone.options;const names=[['Brasília (São Paulo)','Brasília (São Paulo)'],['Nova York','New York'],['Lisboa','Lisbon'],['Londres','London'],['UTC','UTC']];Array.from(options).forEach((o,i)=>{if(names[i])o.textContent=tr(...names[i])});
 set('#settings-backup','Exportar backup completo','Export full backup');
 const restore=root.querySelector('label.diary-restore');if(restore){const input=restore.querySelector('input');restore.replaceChildren(document.createTextNode(tr('Restaurar backup ','Restore backup ')));if(input)restore.append(input)}
 set('#settings-open-calendar','Abrir Calendário Anual','Open Annual Calendar');
 set('#settings-print','Imprimir esta página','Print this page');
 }
 sync();
}
document.addEventListener('lunar:languagechange',translateSettings);
document.addEventListener('DOMContentLoaded',translateSettings);

function sync(){zone.value=main.value;status.textContent=tr('Fuso atual: ','Current time zone: ')+zone.selectedOptions[0].text+'.'}
zone.addEventListener('change',()=>{main.value=zone.value;main.dispatchEvent(new Event('change'));sync()});
main.addEventListener('change',sync);
document.getElementById('settings-backup').addEventListener('click',()=>document.getElementById('backup').click());
document.getElementById('settings-restore-file').addEventListener('change',e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{const dt=new DataTransfer();dt.items.add(file);const target=document.getElementById('restore');target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}))}
 catch(err){alert(tr('Não foi possível selecionar o backup. Use a restauração pelo Calendário Anual.','Could not select the backup. Restore it from the Annual Calendar.'))}
 e.target.value='';
});
document.getElementById('settings-print').addEventListener('click',()=>window.print());
document.getElementById('settings-open-calendar').addEventListener('click',()=>document.querySelector('[data-feature="calendar"]').click());
window.renderSettingsPage=translateSettings;
sync();
translateSettings();
})();