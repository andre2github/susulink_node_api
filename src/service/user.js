var path = require('path')
    , Promise = require('motto_promise')
    , db = require(path.resolve(__dirname, '..', 'utils', 'db'));

var user_service = {

    /**
     * 检查用户名是否存在
     * @param dto 数据传输对象 <Object>
     * @param dto.name 用户名 <String>
     * @returns 承诺对象 <Promise> then 结果 <Boolean>
     */
    hasName: function (dto) {
        var sql = ' SELECT id FROM t_user WHERE name = ? ';
        var data = [dto.name];
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results.length > 0);
        });
        return promise;
    },
    /**
     * 注册
     * @param dto 数据传输对象 <Object>
     * @param dto.name 用户名 <String>
     * @param dto.password 密码 <String>
     * @returns 承诺对象 <Promise> then user <Number>
     */
    reg: function (dto) {
        var sql = ' INSERT t_user(name, password, create_time, update_time) VALUES(?, ?, ?, ?) ';
        var now = new Date();
        var data = [dto.name, dto.password, now, now];
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            user_service.selectById({ id: results.insertId }).then(function (user) {
                promise.resolve(user);
            });
        });
        return promise;
    },
    /**
     * 检查登入
     * @param dto 数据传输对象 <Object>
     * @param dto.name 用户名 <String>
     * @param dto.password 密码 <String>
     * @returns 承诺对象 <Promise> then user <Object>
     */
    checkLogin: function (dto) {
        var sql = ' SELECT * FROM t_user WHERE name = ? AND password = ? ';
        var data = [dto.name, dto.password];
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results[0]);
        });
        return promise;
    },
    selectById: function (dto) {
        var sql = ' SELECT * FROM t_user WHERE id = ? ';
        var data = [dto.id];
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results[0]);
        });
        return promise;
    }

};

module.exports = user_service;