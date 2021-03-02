/* 
连接数据库
*/
const mysql = require('mysql');
exports.base = (sql, data, callback) => {
	const pool = mysql.createConnection({
		host: 'localhost',
		username: 'root',
		password: '',
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
