/*
 * @desc: used as a callback in chrome.tabs.sendMessage
 **/
function doStuffWithDom(domContent) {
  console.log("The price is:" + domContent);
  const domContentNumber = parseFloat(domContent.slice(1).replace(/,/g, ""));
  const roundUpNumber = Math.ceil(domContentNumber / 10) * 10;
  console.log(`And the price gap is:\n ${roundUpNumber - domContentNumber}`);
}

// the callback function will be triggered onClick of extension icon.
chrome.action.onClicked.addListener(function (tab) {
  // chrome.tabs.sendMessage(tab.id, { text: "sameer" }, doStuffWithDom);

  // this is to get the active tab only
  chrome.tabs.query({ active: true }, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, { text: "sameer" }, doStuffWithDom);
  });
});
