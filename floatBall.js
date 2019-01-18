/**
 * 页面悬浮球
 *
 * 只需在目标页面body中追加本js文件即可使用
 * <script src="./floatBall.js"></script>
 */

(function f() {
    var url = "https://www.baidu.com/";
    var styleStr = "";
    styleStr += "\n";
    styleStr += "@keyframes scaleToggleOne { 0 {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "50% {\n";
    styleStr += "transform:scale(2);\n";
    styleStr += "-webkit-transform:scale(2)\n";
    styleStr += "}\n";
    styleStr += "100% {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "}\n";
    styleStr += "@keyframes scaleToggleTwo { 0 {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "20% {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "60% {\n";
    styleStr += "transform:scale(2);\n";
    styleStr += "-webkit-transform:scale(2)\n";
    styleStr += "}\n";
    styleStr += "100% {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "}\n";
    styleStr += "@keyframes scaleToggleThree { 0 {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "33% {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "66% {\n";
    styleStr += "transform:scale(2);\n";
    styleStr += "-webkit-transform:scale(2)\n";
    styleStr += "}\n";
    styleStr += "100% {\n";
    styleStr += "transform:scale(1);\n";
    styleStr += "-webkit-transform:scale(1)\n";
    styleStr += "}\n";
    styleStr += "}\n";
    styleStr += ".animated { -webkit-animation-duration: .5s; animation-duration: .5s; -webkit-animation-fill-mode: both; animation-fill-mode: both }\n";
    styleStr += ".livechat-girl { width: 50px; height: 50px; border-radius: 50%; position: fixed; bottom: 0; right: 40px; opacity: 0; -webkit-box-shadow: 0 5px 10px 0 rgba(35,50,56,.3); box-shadow: 0 5px 10px 0 rgba(35,50,56,.3); z-index: 700; transform: translateY(0); -webkit-transform: translateY(0); -ms-transform: translateY(0); cursor: pointer; -webkit-transition: all 1s cubic-bezier(.86, 0, .07, 1); transition: all 1s cubic-bezier(.86, 0, .07, 1) }\n";
    styleStr += ".livechat-girl:focus { outline: 0 }\n";
    styleStr += ".livechat-girl.animated { opacity: 1; transform: translateY(-40px); -webkit-transform: translateY(-40px); -ms-transform: translateY(-40px) }\n";
    styleStr += ".livechat-girl .girl { position: absolute; top: 0; left: 0; width: 100%; height: auto; z-index: 50 }\n";
    styleStr += ".livechat-girl .animated-circles .circle { background: rgba(38,199,252,.25); width: 50px; height: 50px; border-radius: 50%; position: absolute; z-index: 49; transform: scale(1); -webkit-transform: scale(1) }\n";
    styleStr += ".livechat-girl .animated-circles.animated .c-1 { animation: 2s scaleToggleOne cubic-bezier(.25, .46, .45, .94) forwards }\n";
    styleStr += ".livechat-girl .animated-circles.animated .c-2 { animation: 2.5s scaleToggleTwo cubic-bezier(.25, .46, .45, .94) forwards }\n";
    styleStr += ".livechat-girl .animated-circles.animated .c-3 { animation: 3s scaleToggleThree cubic-bezier(.25, .46, .45, .94) forwards }\n";
    styleStr += ".livechat-girl.animation-stopped .circle { opacity: 0!important }\n";
    styleStr += ".livechat-girl.animation-stopped .circle { opacity: 0!important }\n";
    styleStr += ".livechat-girl .livechat-hint { position: absolute; right: 30px; top: 50%; margin-top: -20px; opacity: 0; z-index: 0; -webkit-transition: all .3s cubic-bezier(.86, 0, .07, 1); transition: all .3s cubic-bezier(.86, 0, .07, 1) }\n";
    styleStr += ".livechat-girl .livechat-hint.show_hint { -webkit-transform: translateX(-40px); transform: translateX(-40px); opacity: 1 }\n";
    styleStr += ".livechat-girl .livechat-hint.hide_hint { opacity: 0; -webkit-transform: translateX(0); transform: translateX(0) }\n";
    styleStr += ".livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 1296px!important }\n";
    styleStr += ".livechat-girl .livechat-hint.rd-notice-tooltip .rd-notice-content { width: auto; overflow: hidden; text-overflow: ellipsis }\n";
    styleStr += "@media only screen and (max-width:1599px) {\n";
    styleStr += ".livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 1060px!important }\n";
    styleStr += "}\n";
    styleStr += "@media only screen and (max-width:1309px) {\n";
    styleStr += ".livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 984px!important }\n";
    styleStr += "}\n";
    styleStr += "@media only screen and (max-width:1124px) {\n";
    styleStr += ".livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 600px!important }\n";
    styleStr += "}\n";
    styleStr += ".rd-notice-tooltip { -webkit-box-shadow: 0 2px 2px rgba(0,0,0,.2); box-shadow: 0 2px 2px rgba(0,0,0,.2); font-size: 14px; border-radius: 3px; line-height: 1.25; position: absolute; z-index: 65; max-width: 350px; opacity: 1 }\n";
    styleStr += ".rd-notice-tooltip:after { position: absolute; display: block; content: ''; height: 20px; width: 20px; -webkit-box-shadow: none; box-shadow: none; -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; z-index: 50 }\n";
    styleStr += ".rd-notice-tooltip .rd-notice-content { background: 0; border-radius: 3px; width: 100%; color: #fff; position: relative; z-index: 60; padding: 10px; font-weight: 400; line-height: 1.45 }\n";
    styleStr += ".rd-notice-type-success { background-color: #26c7fc; -webkit-box-shadow: 0 5px 10px 0 rgba(38,199,252,.2); box-shadow: 0 5px 10px 0 rgba(38,199,252,.2) }\n";
    styleStr += ".rd-notice-type-success .rd-notice-content { background-color: #26c7fc }\n";
    styleStr += ".rd-notice-type-success:after { background-color: #26c7fc; -webkit-box-shadow: 0 5px 10px 0 rgba(38,199,252,.2); box-shadow: 0 5px 10px 0 rgba(38,199,252,.2) }\n";
    styleStr += ".rd-notice-position-left { margin-left: -20px }\n";
    styleStr += ".rd-notice-position-left:after { right: -6px; top: 50%; margin-top: -10px }\n";
    styleStr += ".rd-notice-tooltip.single-line .rd-notice-content { height: 40px; padding: 0 10px; line-height: 40px; white-space: nowrap }\n";
    styleStr += "\n";
    var htmlStr = "";
    htmlStr += "<div class=\"livechat-girl animated\">"
    htmlStr += "<svg t=\"1547788145694\" class=\"icon girl\" style=\"\" viewBox=\"0 0 1026 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1703\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100.1953125\" height=\"100\"><defs><style type=\"text/css\"></style></defs><path d=\"M392.169 373.756 151.421 373.756c-7.911 0-14.279 6.389-14.279 14.28 0 7.851 6.368 14.24 14.279 14.24L392.17 402.276c7.851 0 14.24-6.388 14.24-14.24C406.409 380.146 400.021 373.756 392.169 373.756zM392.169 491.098 151.421 491.098c-7.911 0-14.279 6.408-14.279 14.278 0 7.892 6.368 14.261 14.279 14.261L392.17 519.637c7.851 0 14.24-6.368 14.24-14.261C406.409 497.505 400.021 491.098 392.169 491.098zM392.169 608.479 151.421 608.479c-7.911 0-14.279 6.406-14.279 14.276 0 7.873 6.368 14.261 14.279 14.261L392.17 637.016c7.851 0 14.24-6.388 14.24-14.261C406.409 614.885 400.021 608.479 392.169 608.479zM618.357 388.036c0 7.851 6.367 14.24 14.24 14.24l240.746 0c7.892 0 14.261-6.388 14.261-14.24 0-7.89-6.367-14.28-14.261-14.28L632.599 373.756C624.728 373.756 618.357 380.146 618.357 388.036zM873.347 491.098 632.599 491.098c-7.872 0-14.24 6.408-14.24 14.278 0 7.892 6.368 14.261 14.24 14.261l240.748 0c7.89 0 14.259-6.368 14.259-14.261C887.604 497.505 881.237 491.098 873.347 491.098zM873.347 608.479 632.599 608.479c-7.872 0-14.24 6.406-14.24 14.276 0 7.873 6.368 14.261 14.24 14.261l240.748 0c7.89 0 14.259-6.388 14.259-14.261C887.604 614.885 881.237 608.479 873.347 608.479zM751.301 132.346c-88.362 0-187.057 13.519-238.526 48.247-51.472-34.728-150.145-48.247-238.526-48.247-126.493 0-274.174 27.64-274.174 105.605l0 622.81c0 10.554 4.645 20.487 12.696 27.258 8.051 6.77 18.666 9.652 29.039 7.849 70.136-12.133 150.486-18.545 232.437-18.545 81.953 0 162.302 6.41 232.439 18.545 0.96 0.182 1.901 0.182 2.863 0.282 0.76 0.06 1.5 0.119 2.262 0.141 0.319 0.039 0.643 0.099 0.963 0.099 1.902 0 3.805-0.16 5.688-0.5 0.119-0.022 0.238 0 0.399-0.022 70.139-12.133 150.488-18.545 232.441-18.545 81.949 0 162.32 6.41 232.437 18.545 2.025 0.361 4.084 0.521 6.087 0.521 8.331 0 16.463-2.903 22.949-8.37 8.054-6.771 12.699-16.702 12.699-27.258L1025.474 237.951C1025.474 159.984 877.791 132.346 751.301 132.346zM71.371 819.203 71.371 242.457c14.418-14.121 85.636-38.813 202.876-38.813 117.221 0 188.458 24.693 202.876 38.813l0 576.747c-63.406-8.67-132.659-13.198-202.876-13.198C204.032 806.005 134.758 810.533 71.371 819.203zM954.177 819.203c-126.792-17.304-279.001-17.304-405.755 0L548.422 242.457c14.419-14.121 85.639-38.813 202.879-38.813 117.239 0 188.455 24.693 202.875 38.813L954.177 819.203 954.177 819.203z\" p-id=\"1704\" fill=\"#d4237a\"></path></svg>\n";
    htmlStr += "    <div class=\"livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line show_hint\">\n";
    htmlStr += "        <div class=\"rd-notice-content\">欢迎阅读！<\/div>\n";
    htmlStr += "    <\/div>\n";
    htmlStr += "    <div class=\"animated-circles\">\n";
    htmlStr += "        <div class=\"circle c-1\"><\/div>\n";
    htmlStr += "        <div class=\"circle c-2\"><\/div>\n";
    htmlStr += "        <div class=\"circle c-3\"><\/div>\n";
    htmlStr += "    <\/div>\n";
    htmlStr += "<\/div>\n";

    function loadCssCode(code) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        try {
            style.appendChild(document.createTextNode(code))
        } catch (ex) {
            style.styleSheet.cssText = code
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style)
    }


    function addClass(obj, cls) {
        var obj_class = obj.className;
        var blank = (obj_class != '') ? ' ' : '';
        var added = obj_class + blank + cls;
        obj.className = added
    }

    function removeClass(obj, cls) {
        var obj_class = ' ' + obj.className + ' ';
        obj_class = obj_class.replace(/(\s+)/gi, ' ');
        var removed = obj_class.replace(' ' + cls + ' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        obj.className = removed
    }

    function hasClass(obj, cls) {
        var obj_class = obj.className;
        var obj_class_lst = obj_class.split(/\s+/);
        var x = 0;
        for (x in obj_class_lst) {
            if (obj_class_lst[x] == cls) {
                return true
            }
        }
        return false
    }

    function toggleClass(obj, cls) {
        if (hasClass(obj, cls)) {
            removeClass(obj, cls)
        } else {
            addClass(obj, cls)
        }
    }

    function hover(obj, over, out) {
        obj.addEventListener('mouseover', over, false);
        obj.addEventListener('mouseout', out, false)
    }

    loadCssCode(styleStr);
    document.body.appendChild(new DOMParser().parseFromString(htmlStr, 'text/html').querySelector('.livechat-girl'));
    setInterval(function () {
        toggleClass(document.querySelector(".animated-circles"), "animated")
    }, 3000);
    var wait = setInterval(function () {
        removeClass(document.querySelector(".livechat-hint"), "show_hint");
        addClass(document.querySelector(".livechat-hint"), "hide_hint");
        clearInterval(wait)
    }, 4500);
    hover(document.querySelector(".livechat-girl"), function () {
        clearInterval(wait);
        removeClass(document.querySelector(".livechat-hint"), "hide_hint");
        addClass(document.querySelector(".livechat-hint"), "show_hint")
    }, function () {
        removeClass(document.querySelector(".livechat-hint"), "show_hint");
        addClass(document.querySelector(".livechat-hint"), "hide_hint")
    });
    document.querySelector(".livechat-girl").onclick = function () {
        window.location.href = url;
    };
})();
