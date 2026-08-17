const username = "&APP_USER.".trim().toLowerCase(); const
          heartbeatInterval = 3000; const heartbeatTimeout = 7000; const
          storageKey = "heart_beat_save"; const tabId =
          Math.random().toString(36).substr(2, 9);
          sessionStorage.setItem("tab_id", tabId); $s('P0_GET_TAB_ID',tabId);
          function getHeartbeats(){ try { return
          JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {
          localStorage.removeItem(storageKey); return {}; } } function
          setHeartbeats(hb){ localStorage.setItem(storageKey,
          JSON.stringify(hb)); } function cleanHeartbeats(hb){ const now =
          Date.now(); for(const id in hb){ const rec = hb[id]; if(rec && now -
          rec.time > heartbeatTimeout) delete hb[id]; } setHeartbeats(hb);
          return hb; } function isAnotherTabActive(hb){ const now = Date.now();
          return Object.keys(hb).some(id => id !== tabId &&
          hb[id]?.username === username && now - hb[id].time <=
          heartbeatTimeout); } function showSingleTabModal(){ const modal =
          document.getElementById("singleTabModal"); if(modal)
          modal.style.display = "flex"; console.warn("Duplicate tab detected for
          user:", username); } (function(){ let hb =
          cleanHeartbeats(getHeartbeats()); if(isAnotherTabActive(hb)){
          showSingleTabModal(); return; } hb[tabId] = { username, time:
          Date.now() }; setHeartbeats(hb); setInterval(()=>{ const h =
          getHeartbeats(); h[tabId] = { username, time: Date.now() };
          cleanHeartbeats(h); setHeartbeats(h); }, heartbeatInterval);
          window.addEventListener("storage", e => { if(e.key === storageKey){
          const h = cleanHeartbeats(getHeartbeats()); if(isAnotherTabActive(h))
          showSingleTabModal(); } }); window.addEventListener("unload", ()=>{
          const h=getHeartbeats(); delete h[tabId]; setHeartbeats(h); });
          if(window.Worker){ const workerUrl = "#APP_FILES#Web_Worker.js";
          window.worker = new Worker(workerUrl); const appId = $v('pFlowId');
          const pageId = $v('pFlowStepId'); const sessionId = $v('pInstance');
          window.worker.postMessage({ action: "init", username, appId, pageId,
          sessionId, interval: heartbeatInterval }); window.worker.onmessage =
          (e) => { const d = e.data; if(d.status === "init") {
          console.log("Worker init:", d.message); } else if(d.status === "ok"){
          console.log("Worker beat @", new Date(d.time).toLocaleTimeString()); }
          else if(d.status === "deleted"){ stopHeartbeat(); } else if(d.status
          === "stopped"){ console.log("Worker stopped successfully."); } else
          if(d.status === "error"){ console.error("Worker error:", d); } }; }
          })(); let heartbeatStopped = false; function stopHeartbeat() {
          if(window.worker && !heartbeatStopped) {
          window.worker.postMessage({ action: "stop" });
          window.worker.terminate(); heartbeatStopped = true; } }
          window.addEventListener("beforeunload", function() { stopHeartbeat();
          });
