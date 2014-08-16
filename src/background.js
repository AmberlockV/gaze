chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "src/runtime.js"
  });

    /*
  chrome.tabs.executeScript({
    file: "src/app.js"
    //code: 'document.body.style.backgroundColor="red"'
  });
*/
});

