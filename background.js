
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    chrome.storage.sync.set({text : "Nothing selected"}, function() {
      console.log("the text to speek is nothing selected");
    })
});   

var contextMenu = {
  "id" : "readAloud",
  "title" : "Load Text",
  "contexts" : ["selection"]
}

chrome.contextMenus.create(contextMenu);


chrome.contextMenus.onClicked.addListener(function(clickData) {
      console.log("hit the onclick");
      chrome.storage.sync.set({text : clickData.selectionText});
      chrome.runtime.sendMessage({loaded: "true"});
})
