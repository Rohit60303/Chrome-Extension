document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dashboardBtn").addEventListener("click", () => {
    chrome.tabs.create({ url: "dashboard.html" });
  });
});
