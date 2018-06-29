var path = require('path')
    , mysql = require('mysql')
    , Promise = require(path.resolve(__dirname, 'promise'))
    , env = require(path.resolve(__dirname, '..', 'config', 'env'))[process.env.run_mode];

var db = {
    _pool: null
    , getPool: function () {
        if (!db._pool) {
            db._pool = mysql.createPool(env.mysql);

            // {
            //     // 该事件 当池中创建新的连接槽时 触发
            //     db._pool.on('connection', function (connection) {
            //         console.log('Connection %d connection', connection.threadId);
            //     });
            //     // 该事件 当从池中获取连接槽时 触发
            //     db._pool.on('acquire', function (connection) {
            //         console.log('Connection %d acquired', connection.threadId);
            //     });
            //     // 该事件 当把连接槽放入池中时 触发
            //     db._pool.on('release', function (connection) {
            //         console.log('Connection %d released', connection.threadId);
            //     });
            //     // 该事件 当池中连接槽不够用 等待可用连接槽时 触发
            //     db._pool.on('enqueue', function () {
            //         console.log('Waiting for available connection slot');
            //     });
            // }

        }
        return db._pool;
    }
    , query: function (sql, data) {
        var promise = new Promise();
        db.getPool().query(sql, data, function (error, results, fields) {
            if (error) promise.reject(error);
            promise.resolve(results);
        });
        return promise;
    }
};

module.exports = db;