var path = require('path')
    , express = require('express')
    , router = express.Router()
    , service = require(path.resolve(__dirname, '..', 'service', 'common_link'));

// 该路由器使用的 时间日志 中间件
// router.use(function (req, res, next) {
//     console.log('Come in router at time(ms): ', Date.now());
//     next();
// });

router.get('/list', function (req, res, next) {
    service.selectAll().then(function (links) {
        res.json({ code: 1, msg: 'success', data: { links: links } });
    });
});

module.exports = router;