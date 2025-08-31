document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const copyBtn = document.getElementById("copyCmd");
  const status = document.getElementById("status");
  const name = document.getElementById("fileName");
  let links = [];

  copyBtn.addEventListener("click", () => {
    if (!links.length) return;
    const cmd = `ffmpeg -i "${links[0]}" -c copy "${name.value}.mp4"`;
    navigator.clipboard.writeText(cmd).then(() => {
      status.textContent = "Copied ffmpeg command ✅";
      console.log("Command copied:", cmd);
    });
  });

  chrome.runtime.sendMessage({ action: "getM3U8", tabId: tab.id }, (responseLinks) => {
    links = responseLinks || [];
    if (!links.length) {
      status.textContent = "No .m3u8 found on this page.";
      copyBtn.disabled = true;
    }
  });
});