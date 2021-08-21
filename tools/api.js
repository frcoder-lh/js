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
        static XMLHttpRequestType = "XMLHttpRequest";
        static FetchType = "Fetch";

        constructor(type) {
            this.type = type;
            if (this.type == Api.XMLHttpRequestType) {
                this.openArguments = arguments[1];
                this.sendArguments = arguments[2];
            } else if (this.type == Api.FetchType) {
                this.fetchArguments = arguments[1];
            }
        }

        getUrl() {
            if (this.type == Api.XMLHttpRequestType) {
                return this.openArguments[1];
            } else if (this.type == Api.FetchType) {
                if (this.fetchArguments[0] instanceof Request) {
                    return this.fetchArguments[0].url;
                } else {
                    return this.fetchArguments[0];
                }
            }
        }

        setUrl(url) {
            if (this.type == Api.XMLHttpRequestType) {
                this.openArguments[1] = url;
            } else if (this.type == Api.FetchType) {
                if (this.fetchArguments[0] instanceof Request) {
                    return this.fetchArguments[0].url = url;
                } else {
                    return this.fetchArguments[0] = url;
                }
            }
        }

        getBody() {
            if (this.type == Api.XMLHttpRequestType) {
                return this.sendArguments[0];
            } else if (this.type == Api.FetchType) {
                if (this.fetchArguments[0] instanceof Request) {
                    return this.fetchArguments[0].body;
                } else {
                    return this.fetchArguments[1].body;
                }
            }
        }

        setBody(body) {
            if (this.type == Api.XMLHttpRequestType) {
                this.sendArguments[0] = body;
            } else if (this.type == Api.FetchType) {
                if (this.fetchArguments[0] instanceof Request) {
                    this.fetchArguments[0].body = body;
                } else {
                    this.fetchArguments[1].body = body;
                }
            }
        }

        handle(url = a => a, body = a => a) {
            this.url = url;
            this.body = body;
            return this;
        }

        send(n = 1) {
            for (let i = 0; i < n; i++) {
                if (this.url) this.setUrl(this.url(this.getUrl(), i));
                if (this.body) this.setBody(this.body(this.getBody(), i));
                if (this.type == Api.XMLHttpRequestType) {
                    let xhr = new XMLHttpRequest();
                    xhr.open(...this.openArguments);
                    xhr.send(...this.sendArguments);
                } else if (this.type == Api.FetchType) {
                    return fetch(...this.fetchArguments);
                }
            }
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
            window.apiHistory.push({api: new Api(Api.XMLHttpRequestType, this.openArguments, this.sendArguments), response: this.response});
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
        window.apiHistory.push({api: new Api(Api.FetchType, arguments), response: responsePromise});
        return responsePromise;
    }
})();
