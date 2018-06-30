var path = require('path')
    , fs = require('fs')
    , express = require('express')
    , bodyParser = require('body-parser')
    , MarkdownIt = require('markdown-it')
    , md = new MarkdownIt()
    , env = require(path.resolve(__dirname, 'config', 'env'))[process.env.run_mode]
    , app = express();

// parse all
// app.use(bodyParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

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