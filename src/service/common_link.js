var path = require('path')
    , Promise = require('motto_promise')
    , db = require(path.resolve(__dirname, '..', 'utils', 'db'));

module.exports = {
    /**
     * 分页查询
     * @param dto 参数对象 <Object>
     * @param dto.keywords 搜索关键字 <String>
     * @param dto.page_number 当前页码 <Number>
     * @param dto.page_size 每页记录数 <Number>
     * @returns 承诺对象 <Promise> then 结果对象 <Object> { links: 结果集 <Array>, total: 总数 <Number> } 
     */
    pageSelect: function (dto) {
        if (dto.page_number) dto.page_number = dto.page_number - 0;
        else dto.page_number = 1;
        if (dto.page_size) dto.page_size = dto.page_size - 0;
        else dto.page_size = 20;
        var sql = ' SELECT cl.* ';
        var data = [];
        var has_keywords = !!dto.keywords;
        var like_keywords = has_keywords ? '%' + dto.keywords + '%' : null;
        if (has_keywords) {
            sql += ' , cl.title LIKE ? title_is_like '
                + ' , cl.href LIKE ? href_is_like '
                + ' , cl.summary LIKE ? summary_is_like '
                ;
            data.push(like_keywords, like_keywords, like_keywords);
        }
        sql += ' FROM t_common_link cl WHERE TRUE ';
        if (has_keywords) {
            sql += ' AND ( '
                + ' cl.title LIKE ? '
                + ' OR '
                + ' cl.href LIKE ? '
                + ' OR '
                + ' cl.summary LIKE ? '
                + ' ) '
                ;
            data.push(like_keywords, like_keywords, like_keywords);
        }
        sql += ' ORDER BY ';
        if (has_keywords) {
            sql += ' title_is_like DESC, href_is_like DESC, summary_is_like DESC, ';
        }
        var begin_index = (dto.page_number - 1) * dto.page_size;
        sql += ' cl.id DESC LIMIT ?, ? ';
        data.push(begin_index, dto.page_size);
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            module.exports.count({ keywords: dto.keywords }).then(function (total) {
                promise.resolve({ links: results, total: total });
            });
        });
        return promise;
    },
    /**
     * 计数
     * @param dto 参数对象 <Object>
     * @param dto.keywords 搜索关键字 <String>
     * @returns 承诺对象 <Promise> then 总数 <Number>
     */
    count: function (dto) {
        var sql = ' SELECT COUNT(cl.id) total FROM t_common_link cl WHERE TRUE ';
        var data = [];
        var has_keywords = !!dto.keywords;
        if (has_keywords) {
            var like_keywords = '%' + dto.keywords + '%';
            sql += ' AND ( cl.title LIKE ? OR cl.href LIKE ? OR cl.summary LIKE ? ) ';
            data.push(like_keywords, like_keywords, like_keywords);
        }
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results[0].total);
        });
        return promise;
    }
}