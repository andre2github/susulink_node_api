var path = require('path')
    , Promise = require('motto_promise')
    , db = require(path.resolve(__dirname, '..', 'utils', 'db'));

module.exports = {
    /**
     * 分页查询
     * @param dto 参数对象 <Object>
     * @param dto.user_id 用户id <Number>
     * @param dto.keywords 搜索关键字 <String>
     * @param dto.pageNumber 当前页码 <Number>
     * @param dto.pageSize 每页记录数 <Number>
     * @returns 承诺对象 <Promise> then 结果对象 <Object> { links: 结果集 <Array>, total: 总数 <Number> } 
     */
    pageSelect: function (dto) {
        if (dto.pageNumber) dto.pageNumber = dto.pageNumber - 0;
        else dto.pageNumber = 1;
        if (dto.pageSize) dto.pageSize = dto.pageSize - 0;
        else dto.pageSize = 20;
        var sql = ' SELECT ul.* ';
        var data = [];
        var hasKeywords = !!dto.keywords;
        var likeKeywords = hasKeywords ? '%' + dto.keywords + '%' : null;
        if (hasKeywords) {
            sql += ' , ul.title LIKE ? title_is_like '
                + ' , ul.href LIKE ? href_is_like '
                + ' , ul.summary LIKE ? summary_is_like '
                ;
            data.push(likeKeywords, likeKeywords, likeKeywords);
        }
        sql += ' FROM t_user_link ul WHERE ul.user_id = ? ';
        data.push(dto.user_id);
        if (hasKeywords) {
            sql += ' AND ( '
                + ' ul.title LIKE ? '
                + ' OR '
                + ' ul.href LIKE ? '
                + ' OR '
                + ' ul.summary LIKE ? '
                + ' ) '
                ;
            data.push(likeKeywords, likeKeywords, likeKeywords);
        }
        sql += ' ORDER BY ';
        if (hasKeywords) {
            sql += ' title_is_like DESC, href_is_like DESC, summary_is_like DESC, ';
        }
        var beginIndex = (dto.pageNumber - 1) * dto.pageSize;
        sql += ' ul.id DESC LIMIT ?, ? ';
        data.push(beginIndex, dto.pageSize);
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
        var hasKeywords = !!dto.keywords;
        if (hasKeywords) {
            var likeKeywords = '%' + dto.keywords + '%';
            sql += ' AND ( ul.title LIKE ? OR ul.href LIKE ? OR ul.summary LIKE ? ) ';
            data.push(likeKeywords, likeKeywords, likeKeywords);
        }
        var promise = new Promise();
        db.query(sql, data).then(function (results) {
            promise.resolve(results[0].total);
        });
        return promise;
    }
}