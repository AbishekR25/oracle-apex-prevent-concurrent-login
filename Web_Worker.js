let heartbeatTimer = null; self.postMessage({ status: "init",
          message: "Worker file loaded and started!" }); self.onmessage =
          function (e) { const data = e.data; if (data.action === "init") {
          const { username, appId, pageId, sessionId, interval } = data;
          self.postMessage({ status: "init", message: `Worker initialized for
          ${username}` }); const sendHeartbeat = function () { if (!username)
          return; const apexUrl = `${location.origin}/ords/wwv_flow.ajax`; const
          params = new URLSearchParams(); params.append("p_flow_id", appId);
          params.append("p_flow_step_id", pageId); params.append("p_instance",
          sessionId); params.append("p_request",
          "APPLICATION_PROCESS=HEARTBEAT_PROCESS"); params.append("x01",
          username); params.append("x02", "UPDATE"); fetch(apexUrl, { method:
          "POST", headers: { "Content-Type": "application/x-www-form-urlencoded"
          }, body: params.toString() }) .then(r => r.text()) .then(text => { let
          response; try { response = JSON.parse(text); } catch { response = {
          status: "success" }; } if(response.status === "deleted"){
          self.postMessage({ status: "deleted", time: Date.now() });
          clearInterval(heartbeatTimer); } else { self.postMessage({ status:
          "ok", time: Date.now(), data: response }); } }) .catch(err => {
          self.postMessage({ status: "error", message: err.message }); }); };
          sendHeartbeat(); heartbeatTimer = setInterval(sendHeartbeat,
          interval); } if (data.action === "stop") {
          clearInterval(heartbeatTimer); self.postMessage({ status: "stopped",
          message: "Worker stopped" }); } };
