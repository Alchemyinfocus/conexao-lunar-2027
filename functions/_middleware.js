// Cloudflare Pages Functions — acesso basico para Conexao Lunar 2027.
// A senha fica somente no segredo ACCESS_PASSWORD do Cloudflare.
const COOKIE = 'cl27_session';
const END = Date.parse('2028-01-01T03:00:00Z'); // 31/12/2027 23:59 em Sao Paulo
const encoder = new TextEncoder();
const bytes = value => encoder.encode(value);
const base64url = array => btoa(String.fromCharCode(...new Uint8Array(array))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function signature(message, password) {
  const key = await crypto.subtle.importKey('raw', bytes(password), {name:'HMAC', hash:'SHA-256'}, false, ['sign']);
  return base64url(await crypto.subtle.sign('HMAC', key, bytes('cl27-v1:'+message)));
}
function equal(a,b) {
  const x=bytes(a), y=bytes(b); let difference=x.length ^ y.length;
  for(let i=0;i<Math.max(x.length,y.length);i++) difference |= (x[i]||0) ^ (y[i]||0);
  return difference===0;
}
function page(error='') {
  const warning=error ? '<p class="error" role="alert">Senha incorreta / Incorrect password.</p>' : '';
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Conexão Lunar 2027 — Acesso</title><style>
  *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#102c20;color:#f5eedc;font-family:Georgia,serif;padding:24px}
  main{width:min(100%,420px);padding:35px 28px;border:1px solid #ae9361;border-radius:12px;background:#193b2c;text-align:center}
  h1{font-weight:normal;font-size:30px;margin:0 0 15px}p{line-height:1.6}small{color:#e4d5b4}
  input,button{width:100%;padding:14px;margin-top:12px;border-radius:6px;font:16px system-ui}
  input{background:#fff;color:#222;border:1px solid #a99571}.password-wrap{position:relative}.password-wrap input{padding-right:66px}.toggle-password{position:absolute;right:5px;top:16px;width:54px;margin:0;padding:9px 3px;background:transparent;color:#173c2b;font-size:13px}button{background:#c7a66b;color:#17271c;border:0;cursor:pointer;font-weight:700}
  .error{color:#ffd2c9}</style></head><body><main><h1>Conexão Lunar 2027</h1><p>Digite a senha fornecida após a compra.<br><small>Enter the password provided after purchase.</small></p>${warning}<form method="POST" action="/_access/login"><div class="password-wrap"><input id="access-password" type="password" name="password" autocomplete="current-password" required aria-label="Senha / Password"><button type="button" class="toggle-password" id="toggle-password" aria-label="Mostrar senha / Show password" aria-pressed="false">Ver / Show</button></div><button type="submit">Entrar / Enter</button></form><script>const input=document.getElementById("access-password");const toggle=document.getElementById("toggle-password");toggle.addEventListener("click",()=>{const visible=input.type==="password";input.type=visible?"text":"password";toggle.textContent=visible?"Ocultar / Hide":"Ver / Show";toggle.setAttribute("aria-pressed",String(visible));toggle.setAttribute("aria-label",visible?"Ocultar senha / Hide password":"Mostrar senha / Show password");});</script></main></body></html>`;
}
function html(body,status=200) {return new Response(body,{status,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-robots-tag':'noindex, nofollow','content-security-policy':"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"}});}
export async function onRequest(context) {
  const {request,env}=context;
  const url=new URL(request.url);
  const password=env.ACCESS_PASSWORD;
  if(!password) return new Response('Access configuration missing / Configuração de acesso ausente.',{status:503,headers:{'cache-control':'no-store'}});
  if(Date.now()>=END) return html('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Conexão Lunar 2027</title><body><p>O período de acesso ao Conexão Lunar 2027 terminou em 31/12/2027.</p><p>The access period ended on December 31, 2027.</p></body></html>',403);
  if(url.pathname==='/_access/login') {
    if(request.method!=='POST') return Response.redirect(new URL('/',url),303);
    const form=await request.formData().catch(()=>null);
    const supplied=String(form?.get('password')??'');
    if(!equal(supplied,password)) return html(page(true),401);
    const expires=Math.min(Date.now()+30*86400000,END);
    const payload=String(expires);
    const token=payload+'.'+await signature(payload,password);
    const headers=new Headers({'location':'/','cache-control':'no-store'});
    headers.append('set-cookie',`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.max(0,Math.floor((expires-Date.now())/1000))}`);
    return new Response(null,{status:303,headers});
  }
  const cookie=(request.headers.get('cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='));
  const token=cookie?.slice(COOKIE.length+1)||'';
  const match=/^(\d+)\.([A-Za-z0-9_-]+)$/.exec(token);
  if(match && Number(match[1])>Date.now() && Number(match[1])<=END && equal(match[2],await signature(match[1],password))) {
    const response=await context.next();
    const headers=new Headers(response.headers);
    headers.set('x-robots-tag','noindex, nofollow');
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  if(request.method!=='GET' && request.method!=='HEAD') return new Response('Unauthorized',{status:401,headers:{'cache-control':'no-store'}});
  return html(page(),401);
}
