const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let n=null;t.startBtn.addEventListener("click",(function(){n=setInterval((()=>document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`),1e3),t.startBtn&&(t.startBtn.disabled=!0,t.stopBtn.disabled=!1)})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}));
//# sourceMappingURL=01-color-switcher.33289982.js.map