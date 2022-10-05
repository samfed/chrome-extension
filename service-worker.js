let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

// A function to use as callback
function doStuffWithDom(domContent) {
  console.log("The price is:\n" + domContent);
  console.log("And the price gap is:\n" + domContent);
}

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("tab --->", tab);
  chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDom);
});
