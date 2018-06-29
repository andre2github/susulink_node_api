var path = require('path'),
    express = require('express'),
    envConfig = require(path.resolve(__dirname, 'config', 'env.config'))[process.env.runMode],
    app = express();

app.get('/api/common_link/list', function (req, res, next) {

});

app.listen(envConfig.port, envConfig.hostname, function () {
    console.info('susulink-node-api start at http://%s:%s', envConfig.hostname, envConfig.port);
});