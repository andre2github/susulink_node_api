module.exports = {
    dev: {
        run_mode: 'dev'
        , port: 8003
        , hostname: 'localhost'
        , mysql: {
            host: 'localhost'
            , port: '3306'
            , user: 'root'
            , password: 'root'
            , database: 'susulink'
        }
    },
    prod: {
        run_mode: 'prod'
        , port: 8003
        , hostname: '172.26.74.127'
        , mysql: {
            host: 'localhost'
            , port: '3306'
            , user: 'root'
            , password: 'root'
            , database: 'susulink'
        }
    }
};