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
        "build/compatibility.js",
        "build/jsfeat.js",
        "build/camgaze.js",
        "cascades/eye.js",
        "cascades/frontalface.js",
        "src/elements.js",
        "src/app.js",
    ];

//loadEach(scripts);
//can't think, optimize this please
loadScript(scripts[0], function(){
    loadScript(scripts[1], function(){
        loadScript(scripts[2], function(){
            loadScript(scripts[3],function(){
                loadScript(scripts[4], function(){
                    loadScript(scripts[5], function(){
                        loadScript(scripts[6], function(){
                            loadScript(scripts[7]);
                        });
                    });
                });
            });
        });
    });
});

