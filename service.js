const db = require('./db.js');
exports.allBooks = (req, res) => {
	const sql = 'SELECT *from book';
	db.base(sql, null, results => {
		// json格式数据
		res.json(results);
	});
};
// 去往添加图书页面
exports.toAddBook = (req, res) => {
	res.json({ code: 200, message: '成功进入添加图书页面' });
};
// 提交添加
exports.addBook = (req, res) => {
	const info = req.body;
	console.log(info);
	const sql = 'insert into book set ?';
	db.base(sql, info, results => {
		if (results.affectedRows === 1) {
			console.log(sql + '\n你成功添加一条数据!');
			res.json({ code: 200, message: '成功添加一条图书信息' });
		} else {
			res.json({ code: 400, message: '请求错误' });
		}
	});
};
// 去往修改图书页面
exports.toEditBook = (req, res) => {
	const id = req.params.id;
	const data = [id];
	const sql = 'select *from book where id=?';
	db.base(sql, data, results => {
		res.json(results);
	});
};
// 提交修改图书
exports.editBook = (req, res) => {
	const info = req.body;
	const sql = 'update book set name=?,author=?,category=?,description=? where id=?';
	const data = [info.name, info.author, info.category, info.description, info.id];
	db.base(sql, data, results => {
		if (results.affectedRows === 1) {
			console.log(sql + '\n你成功更新了1条数据!');
			res.json({ code: 200, message: '你成功更新了1条数据' });
		} else {
			res.json({ code: 400, message: '更新数据失败！' });
		}
	});
};
// 删除图书
exports.deleteBook = (req, res) => {
	const id = req.params.id;
	const sql = 'delete from book where id=?';
	db.base(sql, [id], results => {
		if (results.affectedRows === 1) {
			console.log(sql + '\n你成功删除一条图书信息!');
			// res.redirect(400, '/');
			res.json({ code: 200, message: '成功删除1条数据' });
			// 不能再写了，写了将报错Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
			// 原因是：res.end res.send res.json res.jsonp res.redirect这些响应请求的api,在同一个分之内只能调用其中一个，且最多调用1次
			// 真实情境下，可以在前端实现页面的重定向
			// res.redirect('/');
		} else {
			res.json({ code: 400, message: '删除1条数据失败' });
		}
	});
};
