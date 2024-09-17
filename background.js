chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes("https://pronote.rochambeau.org/eleve.html")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: initMutationObserver
      });
    }
  });
  
  function initMutationObserver() {
    if (window.gradeObserver) {
      window.gradeObserver.disconnect();
    }
  
    window.gradeObserver = new MutationObserver((mutations) => {
      calculateAndDisplayMean();
    });
  
    window.gradeObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  
    calculateAndDisplayMean();
  }