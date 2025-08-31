let m3u8Links = {};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes(".m3u8")) {
      if (!m3u8Links[details.tabId]) m3u8Links[details.tabId] = [];
      if (!m3u8Links[details.tabId].includes(details.url)) {
        m3u8Links[details.tabId].push(details.url);
      }
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getM3U8") {
    sendResponse(m3u8Links[msg.tabId] || []);
  }
});