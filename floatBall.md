### 在tampermonkey插件中的使用

```js

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://frcoder-lh.github.io/js-widget/floatBall.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
})();
```
