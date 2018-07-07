var path = require('path')
    , express = require('express')
    , router = express.Router()
    , common_link_service = require(path.resolve(__dirname, '..', 'service', 'common_link'))
    ;

// 该路由器使用的 时间日志 中间件
// router.use(function (req, res, next) {
//     console.log('Come in router at time(ms): ', Date.now());
//     next();
// });

/**
 * 分页查询
 * @param keywords 搜索关键字 <String>
 * @param page_number 当前页码 <Number>
 * @param page_size 每页记录数 <Number>
 */
router.get('/api/common_link/pageSelect.json', function (req, res, next) {
    common_link_service.pageSelect(req.query).then(function (data) {
        res.json(Object.assign({ code: 1, msg: 'success' }, data));
    });
});

module.exports = router;