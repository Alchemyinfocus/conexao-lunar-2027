/* Guia Oficial — Conexão Lunar 2027.
 * Os PDFs devem ser publicados em docs/guia-oficial-pt.pdf e docs/official-user-guide-en.pdf.
 * O link só é exibido se o arquivo estiver realmente disponível.
 */
(function () {
  "use strict";
  var files = {
    pt: "docs/guia-oficial-pt.pdf",
    en: "docs/official-user-guide-en.pdf"
  };
  var labels = {
    pt: { title: "Guia Oficial de Utilização", link: "Abrir guia em PDF", info: "Instruções completas do Conexão Lunar 2027." },
    en: { title: "Official User Guide", link: "Open PDF guide", info: "Complete instructions for Lunar Connection 2027." }
  };
  var available = { pt: false, en: false };
  function language() {
    return (document.documentElement.lang || "").toLowerCase().startsWith("en") ? "en" : "pt";
  }
  function render() {
    var panel = document.getElementById("official-user-guide-panel");
    if (!panel) return;
    var lang = language();
    panel.hidden = !available[lang];
    if (!available[lang]) return;
    panel.querySelector("h3").textContent = labels[lang].title;
    panel.querySelector("p").textContent = labels[lang].info;
    var link = panel.querySelector("a");
    link.textContent = labels[lang].link;
    link.href = files[lang];
    link.setAttribute("hreflang", lang === "pt" ? "pt-BR" : "en");
  }
  function init() {
    var grid = document.querySelector("#configuracoes .settings-grid");
    if (!grid || document.getElementById("official-user-guide-panel")) return;
    var panel = document.createElement("article");
    panel.className = "settings-panel";
    panel.id = "official-user-guide-panel";
    panel.hidden = true;
    var heading = document.createElement("h3");
    var info = document.createElement("p");
    var link = document.createElement("a");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "guide-download-link";
    link.style.cssText = "display:inline-block;background:#103823;color:#f8e4b7;padding:10px 15px;border-radius:6px;text-decoration:none;font-weight:bold;border:1px solid #a68447;";
    panel.append(heading, info, link);
    grid.appendChild(panel);
    var observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    document.getElementById("lang-pt")?.addEventListener("click", function () { setTimeout(render, 0); });
    document.getElementById("lang-en")?.addEventListener("click", function () { setTimeout(render, 0); });
    Object.keys(files).forEach(function (lang) {
      fetch(files[lang], { method: "HEAD", cache: "no-store" }).then(function (response) {
        available[lang] = response.ok && (response.headers.get("content-type") || "").toLowerCase().includes("pdf");
        render();
      }).catch(function () { available[lang] = false; render(); });
    });
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
