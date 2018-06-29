var path = require('path'),
    express = require('express'),
    env = require(path.resolve(__dirname, 'config', 'env'))[process.env.run_mode],
    app = express();

app.use('/api/common_link', require(path.resolve(__dirname, 'routers', 'common_link')));

app.listen(env.port, env.hostname, function () {
    console.info('susulink-node-api start at http://%s:%s', env.hostname, env.port);
});