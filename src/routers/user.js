var path = require('path')
    , express = require('express')
    , router = express.Router()
    , user_service = require(path.resolve(__dirname, '..', 'service', 'user'))
    ;

// 该路由器使用的 时间日志 中间件
// router.use(function (req, res, next) {
//     console.log('Come in router at time(ms): ', Date.now());
//     next();
// });

router.post('/reg.json', function (req, res, next) {
    user_service.reg(req.body).then(function (id) {
        if (id > 0) {
            res.json({ code: 1, msg: 'success', id: id });
        } else {
            res.json({ code: -1, msg: 'failure' });
        }
    });
});

router.post('/checkLogin.json', function (req, res, next) {
    user_service.checkLogin(req.body).then(function (user) {
        if (user) {
            res.json({ code: 1, msg: 'success', user: user });
        } else {
            res.json({ code: -1, msg: 'failure' });
        }
    });
});

module.exports = router;