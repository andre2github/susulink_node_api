function Promise() { }

Promise.prototype._then_cb = null;
Promise.prototype._catch_cb = null;
Promise.prototype.then = function (cb) {
    this._then_cb = cb;
    return this;
};
Promise.prototype.catch = function (cb) {
    this._catch_cb = cb;
};
Promise.prototype.resolve = function (data) {
    this._then_cb && this._then_cb(data);
};
Promise.prototype.reject = function (data) {
    this._catch_cb && this._catch_cb(data);
};

module.exports = Promise;