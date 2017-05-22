var cids = [];

chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// chrome.browserAction.setBadgeText({text: "your"});

chrome.tabs.executeScript({
    file: 'thirdParty/jquery-1.12.4.min.js'
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
    if(request.method === "count") {
    	chrome.browserAction.setBadgeText({text: request.count});
    	cids = request.actives;
    }
    //also have request.actives containing cid's
    sendResponse({farewell: "goodbye", cids: cids});
  });