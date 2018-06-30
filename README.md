# susulink node api

1. 查询公共链接列表
    - method: *`POST`*
    - url: *`/api/common_link/list`*
    - response:
        ```js
        {
            code: 1, msg: 'success', data: [
                {
                    id: 1
                    , title: '百度一下，你就知道'
                    , href: 'http://www.baidu.com'
                    , icon_url: ''
                    , summary: '百度搜索引擎'
                    , insert_time: ''
                    , update_time: ''
                }
            ]
        }
        ```