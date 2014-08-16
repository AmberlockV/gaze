var full_status = {};

chrome.browserAction.onClicked.addListener(function(tab) {
  //if (full_status['tab_' + tab.id] == undefined) {
    //full_status['tab_' + tab.id] = "paused";
  //}

  //if (full_status['tab_' + tab.id] == "paused") {
      chrome.tabs.executeScript({
        file: "src/runtime.js"
      });

     //full_status['tab_' + tab.id] = "running";
     chrome.browserAction.setIcon({tabId: tab.id, path:"src/owl.png"});
  //} else {
    //full_status['tab_' + tab.id] = "paused"
  //}
  /*
    else {
      chrome.tabs.executeScript({
        file: "src/remove_runtime.js"
      });

     full_status['tab_' + tab.id] = "paused"
  }
  */
});

