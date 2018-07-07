var path = require('path')
    , Promise = require('motto_promise')
    , db = require(path.resolve(__dirname, '..', 'utils', 'db'));

module.exports = {
    /**
     * 分页查询
     * @param dto 参数对象 <Object>
     * @param dto.user_id 用户id <Number>
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
        var sql = ' SELECT ul.* ';
        var data = [];
        var has_keywords = !!dto.keywords;
        var like_keywords = has_keywords ? '%' + dto.keywords + '%' : null;
        if (has_keywords) {
            sql += ' , ul.title LIKE ? title_is_like '
                + ' , ul.href LIKE ? href_is_like '
                + ' , ul.summary LIKE ? summary_is_like '
                ;
            data.push(like_keywords, like_keywords, like_keywords);
        }
        sql += ' FROM t_user_link ul WHERE ul.user_id = ? ';
        data.push(dto.user_id);
        if (has_keywords) {
            sql += ' AND ( '
                + ' ul.title LIKE ? '
                + ' OR '
                + ' ul.href LIKE ? '
                + ' OR '
                + ' ul.summary LIKE ? '
                + ' ) '
                ;
            data.push(like_keywords, like_keywords, like_keywords);
        }
        sql += ' ORDER BY ';
        if (has_keywords) {
            sql += ' title_is_like DESC, href_is_like DESC, summary_is_like DESC, ';
        }
        var begin_index = (dto.page_number - 1) * dto.page_size;
        sql += ' ul.id DESC LIMIT ?, ? ';
        data.push(begin_index, dto.page_size);
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            module.exports.count({ user_id: dto.user_id, keywords: dto.keywords }).then(function (total) {
                promise.resolve({ links: results, total: total });
            });
        });
        return promise;
    },
    /**
     * 计数
     * @param dto 参数对象 <Object>
     * @param dto.user_id 用户id <Number>
     * @param dto.keywords 搜索关键字 <String>
     * @returns 承诺对象 <Promise> then 总数 <Number>
     */
    count: function (dto) {
        var sql = ' SELECT COUNT(ul.id) total FROM t_user_link ul WHERE ul.user_id = ? ';
        var data = [dto.user_id];
        var has_keywords = !!dto.keywords;
        if (has_keywords) {
            var like_keywords = '%' + dto.keywords + '%';
            sql += ' AND ( ul.title LIKE ? OR ul.href LIKE ? OR ul.summary LIKE ? ) ';
            data.push(like_keywords, like_keywords, like_keywords);
        }
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results[0].total);
        });
        return promise;
    }
}