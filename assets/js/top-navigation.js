'use strict';
(function(){
const panel=document.getElementById('landing-top-panel');
const body=document.getElementById('landing-panel-body');
const close=document.getElementById('landing-panel-close');
const labels={calendar:'Calendário Anual',phases:'Ciclos e Fases da Lua',ingresses:'Ingressos nos Signos',diary:'Diário Lunar',planning:'Planejamento Lunar',settings:'Configurações'};
const routes=Object.keys(labels);
const menuButton=document.querySelector('[data-top="menu"]');
function hide(){panel.hidden=true;body.replaceChildren();menuButton.setAttribute('aria-expanded','false')}
function navigate(name){hide();if(name==='home'){document.getElementById('return-home').click();return}const link=document.querySelector('.landing-hotspots [data-feature="'+name+'"]');if(link)link.click()}
function item(name,detail){const b=document.createElement('button');b.type='button';b.textContent=detail?labels[name]+' — '+detail:labels[name];b.addEventListener('click',()=>navigate(name));return b}
function showMenu(){body.replaceChildren();const h=document.createElement('h2');h.textContent='Navegação';body.append(h);for(const name of routes)body.append(item(name));panel.hidden=false;menuButton.setAttribute('aria-expanded','true')}
function showSearch(){
body.replaceChildren();const h=document.createElement('h2');h.textContent='Pesquisar no planner';const input=document.createElement('input');input.type='search';input.placeholder='Ex.: lua cheia, diário, janeiro';input.setAttribute('aria-label','Pesquisar conteúdo');const results=document.createElement('div');body.append(h,input,results);
const index=[
{name:'calendar',words:'calendário anual 2027 janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro dias datas meses'},
{name:'phases',words:'ciclos fases da lua lua nova crescente cheia minguante horário'},
{name:'ingresses',words:'ingressos signos zodíaco áries touro gêmeos câncer leão virgem libra escorpião sagitário capricórnio aquário peixes'},
{name:'diary',words:'diário lunar anotações reflexões intenções registro escrever'},
{name:'planning',words:'planejamento mensal tarefas compromissos prioridades intenções'},
{name:'settings',words:'configurações backup exportar restaurar fuso horário imprimir instalar'}
];
function render(){results.replaceChildren();const q=input.value.trim().toLocaleLowerCase('pt-BR');if(!q){const msg=document.createElement('p');msg.textContent='Pesquise pelos assuntos e módulos disponíveis.';results.append(msg);return}const matched=index.filter(x=>(labels[x.name]+' '+x.words).toLocaleLowerCase('pt-BR').includes(q));if(!matched.length){const msg=document.createElement('p');msg.textContent='Nenhum módulo encontrado. Experimente outro termo.';results.append(msg)}else matched.forEach(x=>results.append(item(x.name)))}
input.addEventListener('input',render);render();panel.hidden=false;menuButton.setAttribute('aria-expanded','false');input.focus();
}
document.querySelectorAll('[data-top]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();const action=el.dataset.top;if(action==='menu'){if(!panel.hidden&&menuButton.getAttribute('aria-expanded')==='true')hide();else showMenu()}else if(action==='search')showSearch();else navigate(action)}));
close.addEventListener('click',hide);
document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
})();
