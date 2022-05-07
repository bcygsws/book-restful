/* 
连接数据库
*/
const mysql = require('mysql');
exports.base = (sql, data, callback) => {
	const pool = mysql.createConnection({
		host: 'localhost',
		// 本地安装的mysql默认监听3306端口，可以不声明port属性
		// port: 3306,
		// 对象中没有username这个键，而是user,这个错误导致报错：Error: ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: YES)
		// username: 'root',
		user: 'root',
		password: '123456',
		database: 'book'
	});
	pool.connect();
	pool.query(sql, data, (err, results) => {
		if (err) return;
		callback(results);
	});
	// 关闭数据库连接
	pool.end();
};
