var path = require('path')
    , express = require('express')
    , router = express.Router()
    , user_link_service = require(path.resolve(__dirname, '..', 'service', 'user_link'))
    ;

// 该路由器使用的 时间日志 中间件
// router.use(function (req, res, next) {
//     console.log('Come in router at time(ms): ', Date.now());
//     next();
// });

router.get('/pageSelect.json', function (req, res, next) {
    user_link_service.pageSelect(req.query).then(function (data) {
        res.json(Object.assign({ code: 1, msg: 'success' }, data));
    });
});

module.exports = router;