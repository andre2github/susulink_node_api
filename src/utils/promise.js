function Promise() { }

Promise.prototype._then_cb = null;
Promise.prototype._error_cb = null;
Promise.prototype.then = function (cb) {
    this._then_cb = cb;
};
Promise.prototype.error = function (cb) {
    this._error_cb = cb;
};
Promise.prototype.resolve = function (data) {
    this._then_cb && this._then_cb(data);
};
Promise.prototype.reject = function (data) {
    this._error_cb && this._error_cb(data);
};

module.exports = Promise;