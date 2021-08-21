(function initXMLHttpRequestListener() {

    class ApiHistory extends Array {
        find(s) {
            for (let api of this) {
                if (api.api.openArguments[1].indexOf(s) > -1) {
                    return api;
                }
            }
        }
    }

    class Api {
        constructor(openArguments, sendArguments) {
            this.openArguments = openArguments;
            this.sendArguments = sendArguments;
        }

        handle(url = a => a, body = a => a) {
            this.url = url;
            this.body = body;
            return this;
        }

        send(n = 1) {
            for (let i = 0; i < n; i++) {
                this.openArguments[1] = this.url(this.openArguments[1]);
                this.sendArguments[0] = this.body(this.sendArguments[0]);
                let xhr = new XMLHttpRequest();
                xhr.open(...this.openArguments);
                xhr.send(...this.sendArguments);
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
            window.apiHistory.push({api: new Api(this.openArguments, this.sendArguments), response: this.response});
        });

        originOpen.apply(this, arguments);
    };

    // 重写send
    XMLHttpRequest.prototype.send = function () {
        console.debug('send', arguments);
        this.sendArguments = arguments;
        originSend.apply(this, arguments);
    };
})();
