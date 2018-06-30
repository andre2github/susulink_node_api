var path = require('path')
    , fs = require('fs')
    , express = require('express')
    , MarkdownIt = require('markdown-it')
    , md = new MarkdownIt()
    , env = require(path.resolve(__dirname, 'config', 'env'))[process.env.run_mode]
    , app = express();

app.get('/', function (req, res, next) {
    fs.readFile(path.resolve(__dirname, '..', 'README.md'), 'utf-8', function (err, data) {
        if (err) {
            res.status(500).send(err.stack);
        } else {
            var result = md.render(data);
            res.send(result);
        }
    });
});

app.use('/api/common_link', require(path.resolve(__dirname, 'routers', 'common_link')));

app.listen(env.port, env.hostname, function () {
    console.info('susulink-node-api start at http://%s:%s', env.hostname, env.port);
});