console.log("🔁 Background script is running");

let activeTabId = null;
let activeStartTime = null;
let trackingInterval = null;

function startTrackingTimer() {
  if (trackingInterval) return;

  trackingInterval = setInterval(async () => {
    if (activeTabId !== null && activeStartTime !== null) {
      try {
        const tab = await chrome.tabs.get(activeTabId);
        if (tab.url && !tab.url.startsWith("chrome://")) {
          const now = Date.now();
          const duration = now - activeStartTime;
          console.log(`📤 Sending data to server: ${tab.url}, ${duration} ms`);
          sendTimeToServer(tab.url, duration);
          activeStartTime = now;
        }
      } catch (err) {
        console.warn("Error tracking tab:", err.message);
      }
    }
  }, 60000); // every 60 seconds
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log("🟢 Tab activated:", activeInfo.tabId);
  activeTabId = activeInfo.tabId;
  activeStartTime = Date.now();
  startTrackingTimer();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (tabId === activeTabId && changeInfo.status === "complete") {
    console.log("🔄 Tab reloaded or changed URL");
    activeStartTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    console.log("🛑 Chrome lost focus - stopping timer");
    clearInterval(trackingInterval);
    trackingInterval = null;
  } else {
    console.log("🟢 Chrome in focus - restarting timer");
    activeStartTime = Date.now();
    startTrackingTimer();
  }
});

function sendTimeToServer(url, duration) {
  fetch("http://localhost:3000/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      duration,
      timestamp: new Date().toISOString()
    })
  }).catch(err => console.error("❌ Failed to send data:", err));
}
