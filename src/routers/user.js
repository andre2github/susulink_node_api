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

/**
 * 判断是否存在该name
 * @param name <String>
 */
router.post('/api/user/hasName.json', function (req, res, next) {
    user_service.hasName(req.body).then(function (has) {
        res.json({ code: 1, msg: 'success', has: has });
    });
});

/**
 * 注册
 * @param name 用户名 <String>
 * @param password 密码 <String>
 */
router.post('/api/user/reg.json', function (req, res, next) {
    user_service.reg(req.body).then(function (user) {
        if (user) {
            res.json({ code: 1, msg: 'success', user: user });
        } else {
            res.json({ code: -1, msg: 'failure' });
        }
    });
});

/**
 * 检查登入
 * @param name 用户名 <String>
 * @param password 密码 <String>
 */
router.post('/api/user/checkLogin.json', function (req, res, next) {
    user_service.checkLogin(req.body).then(function (user) {
        if (user) {
            res.json({ code: 1, msg: 'success', user: user });
        } else {
            res.json({ code: -1, msg: 'failure' });
        }
    });
});

/**
 * 根据id查询
 * @param id <Number>
 */
router.post('/api/user/selectById.json', function (req, res, next) {
    user_service.selectById(req.body).then(function (user) {
        res.json({ code: 1, msg: 'success', user: user });
    });
});

module.exports = router;