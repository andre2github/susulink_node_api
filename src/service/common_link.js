var path = require('path')
    , db = require(path.resolve(__dirname, '..', 'utils', 'db'));

module.exports = {
    selectAll: function () {
        return db.query('SELECT * FROM t_common_link ORDER BY id DESC');
    }
}