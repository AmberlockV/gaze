console.log("destroying");
function destroyScript(scriptName, callback) {
    var stuff = document.getElementsByTagName("script");
    var scriptSrc = chrome.extension.getURL(scriptName);

    stuff.forEach(function(script){
        if (script.src == scriptSrc) {
            script.parentElement.removeChild(script);
        }
    });
}

function destroyEach(scripts) {
    scripts.forEach(function(script){
        destroyScript(script);
    });
}

var scripts = [
        "lib/jquery-1.10.2.min.js",
        "build/camgaze.js",
        "build/compatibility.js",
        "build/jsfeat.js",
        "cascades/eye.js",
        "cascades/frontalface.js",
        "src/elements.js",
        "src/app.js",
    ];

destroyEach(scripts);
