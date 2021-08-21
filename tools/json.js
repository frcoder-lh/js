/**
 * JsonTable
 *
 * 使用：new JT(temp1).h("name").h("id",id=>"ID："+id).p()
 */
class JT {
    #jsonArray;
    #handlers = [];

    constructor(jsonArray) {
        this.#jsonArray = jsonArray;
    }

    h = function handler(name, handle = a => a) {
        this.#handlers.push({name, handle});
        return this;
    }

    p = function print() {
        for (let o of this.#jsonArray) {
            if (this.#handlers.length > 0) {
                let s = [];
                for (let i = 0; i < this.#handlers.length; i++) {
                    s.push(this.#handlers[i].handle(o[this.#handlers[i].name]));
                }
                console.info(s.join("\t"));
            }
        }
    }
}