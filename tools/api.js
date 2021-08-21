/**
 * 记录页面的请求历史
 *
 * 使用：apiHistory[0].api.send()
 */
(function initApiListener() {

    class ApiHistory extends Array {
        find(s) {
            for (let api of this) {
                if (api.getUrl().indexOf(s) > -1) {
                    return api;
                }
            }
        }
    }

    class Api {

        constructor() {
        }

        getUrl() {
        }

        setUrl(url) {
        }

        getBody() {
        }

        setBody(body) {
        }

        handle(url = a => a, body = a => a) {
            this.url = url;
            this.body = body;
            return this;
        }

        sendOnce() {
        }

        send(n = 1) {
            for (let i = 0; i < n; i++) {
                if (this.url) this.setUrl(this.url(this.getUrl(), i));
                if (this.body) this.setBody(this.body(this.getBody(), i));
                this.sendOnce();
            }
        }
    }

    class XMLHttpRequestApi extends Api {

        constructor() {
            super();
            this.openArguments = arguments[0];
            this.sendArguments = arguments[1];
        }

        getUrl() {
            return this.openArguments[1];
        }

        setUrl(url) {
            this.openArguments[1] = url;
        }

        getBody() {
            return this.sendArguments[0];
        }

        setBody(body) {
            this.sendArguments[0] = body;
        }

        sendOnce() {
            let xhr = new XMLHttpRequest();
            xhr.open(...this.openArguments);
            xhr.send(...this.sendArguments);
        }
    }

    class FetchApi extends Api {

        constructor() {
            super();
            this.fetchArguments = arguments[0];
        }

        getUrl() {
            if (this.fetchArguments[0] instanceof Request) {
                return this.fetchArguments[0].url;
            } else {
                return this.fetchArguments[0];
            }
        }

        setUrl(url) {
            if (this.fetchArguments[0] instanceof Request) {
                return this.fetchArguments[0].url = url;
            } else {
                return this.fetchArguments[0] = url;
            }
        }

        getBody() {
            if (this.fetchArguments[0] instanceof Request) {
                return this.fetchArguments[0].body;
            } else {
                return this.fetchArguments[1].body;
            }
        }

        setBody(body) {
            if (this.fetchArguments[0] instanceof Request) {
                this.fetchArguments[0].body = body;
            } else {
                this.fetchArguments[1].body = body;
            }
        }

        sendOnce() {
            return fetch(...this.fetchArguments);
        }
    }

    // 存储请求
    window.apiHistory = new ApiHistory();

    let originOpen = XMLHttpRequest.prototype.open;
    let originSend = XMLHttpRequest.prototype.send;

    // 重写open
    XMLHttpRequest.prototype.open = function () {
        // this.addEventListener('loadend', function(){ });
        // this.addEventListener('readystatechange', function (obj) { });
        this.openArguments = arguments;
        this.addEventListener('load', function () {
            console.debug('load', this.responseURL, this.status, this.response);
            window.apiHistory.push({api: new XMLHttpRequestApi(this.openArguments, this.sendArguments), response: this.response});
        });

        originOpen.apply(this, arguments);
    };

    // 重写send
    XMLHttpRequest.prototype.send = function () {
        console.debug('send', arguments);
        this.sendArguments = arguments;
        originSend.apply(this, arguments);
    };

    let originFetch = fetch;
    window.fetch = function () {
        console.debug("fetch", arguments);
        let responsePromise = originFetch(...arguments);
        window.apiHistory.push({api: new FetchApi(arguments), response: responsePromise});
        return responsePromise;
    }
})();
