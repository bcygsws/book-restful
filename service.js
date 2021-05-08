const db = require('./db.js');
exports.allBooks = (req, res) => {
	// order by 字段 asc(ascend 升序)  desc (descend降序排列)
	const sql = 'SELECT *from book order by id asc';
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
	// info是一条记录，数据类型是一个对象
	/* 
	比如：成功添加了id=40的这条数据，只需要提供数据就可以了。id会由数据库自动增加
	*/
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
// 分页获取表格数据
exports.getPageBook = (req, res) => {
	// 获取参数对象，格式如：{size：'',current:''}
	const info = req.params;
	// 键值为字符串类型，string。通过遍历将参数转化成number
	for (var key in info) {
		// 将info对象中的键值转化为number类型
		info[key] = parseInt(info[key]);
	}
	console.log(info);
	console.log(typeof info.size);
	const data = [info.size, info.current - 1];
	// 使用inner join进行分页查询
	const sql1 = `select * from book as a inner join (select id from book order by id limit 
  ${data[1]},${data[0]}) as b on a.id=b.id order by a.id;`;
	const sql2 = 'select count(*) as total from book';
	// 存储合并后的结果集
	// let allRes = [];
	db.base(sql1 + sql2, null, results => {
		// const sql2 = 'select count(*) as total from book';
		// db.base(sql2, null, res => {
		// 	console.log(res);
		// 	allRes = results['total'];
		// });
		console.log(results.constructor); // Array
		console.log(results);
		// res.json(allRes);
		res.json(results);
	});
};
