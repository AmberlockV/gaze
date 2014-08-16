function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL(scriptName);
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}

function loadEach(scripts) {
    scripts.forEach(function(script){
        loadScript(script);
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

loadEach(scripts);
