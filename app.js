/**
 * 开发后台接口-restful形式的数据接口
 * 1.restful不是从数据格式来划分的，而是从URL的格式来表述的
 *
 * 2.restful风格的URL与传统风格的比较：
 *
 * 以图书管理系统为例，展示传统URL风格
 * http://localhost:3000/  获取所有图书
 * http://localhost:3000/toAddBook  去往添加图书页面
 * http://localhost:3000/addBook   提交添加
 * http://localhost:3000/toEditBook?id=1  去往修改图书页面
 * http://localhost:3000/editBook   提交修改
 *
 * restful风格URL 从语义上（单复数的含义）+请求方式上来确定URL
 * http://localhost:3000/books     get请求 获取所有图书信息
 * http://localhost:3000/books/book     get请求 添加图书（一条条的添加）
 * http://localhost:3000/books/book     post请求 提交添加
 * http://localhost:3000/books/book/1     get请求 去往修改页面
 * http://localhost:3000/books/book       put请求 提交修改
 * http://localhost:3000/books/book       delete请求 删除请求
 *
 *
 *  浏览器中输入地址：
 * localhost:3000/allBooks?callback=foo&
 * 请求返回的结果格式(本质是一个含参函数的调用)：
 * foo([{"id":1,"name":"三国演义","author":"罗贯中","category":"……}]);
 * 函数调用，拿到请求返回的结果
 *
 * 充分理解和识记数据接口跨域的两种方案：
 * 1.在路由之前，app.use('*',(req,res,next) =>{
 * 		res.header();
 * })
 * 2.使用cors模块实现跨域
 *
 *
 */
const express = require('express');
const app = express();
const router = require('./router.js');
const cors = require('cors');
/* 
 第一种跨域解决方案：app.use(cors({origin:'',credentials:true}));
 对象可以传值也可以不传。不传则就是对所有请求跨域
*/
// a.对客户端所有请求跨域
app.use(cors({ origin: 'http://localhost:8787', credentials: true }));
// b.对于单个或者多个域名跨域
/* 
app.use(cors({
  origin: ['http://127.0.0.1:3006', 'http://127.0.0.1:5500'],
  credentials: true
}))

*/
// 托管静态资源文件
app.use('/www', express.static('public'));
const bodyParser = require('body-parser');
// 解析提交字符串,对于post请求中，service.js中使用res.body获取
app.use(bodyParser.urlencoded({ extended: false }));
// 解析提交的json格式字符串
// app.use(bodyParser.json());
// 添加一个中间件函数，实现跨域请求，参考：https://www.cnblogs.com/pdcan/p/12201930.html
// app.all('*', (req, res, next) => {
// 	// 设置跨域域名的三种方式：
// 	// 1.设置允许跨域的域名，'*'代表所有域名都可以跨域
// 	// res.header('Access-Control-Allow-Origin', '*');
// 	// 2.允许域名http://localhost:8787跨域
// 	// res.header('Access-Control-Allow-Origin', 'http://localhost:8787');
// 	// 3.如果是要设置多个域名的跨域，可以用数组来存放域名
// 	let originList = ['http://localhost:8787'];
// 	// 数组中是否包含某个元素。如果这个分支成立，说明从客户端发来请求的域名，req.headers.origin存在于数组元素之中
// 	if (originList.includes(req.headers.origin.toLowerCase())) {
// 		// req.headers是属性 req.headers.origin req.header()是方法，req.method是属性，表示请求方式
// 		res.header('Access-Control-Allow-Origin', req.headers.origin);
// 	}
// 	// 允许的header类型
// 	res.header('Access-Control-Allow-Headers', 'Content-type');
// 	// 跨域允许的请求方式
// 	res.header('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST,OPTIONS');
// 	res.header('Access-Control-Max-Age', 172800); // 预请求缓存20天
// 	next();
// });
app.use(router);
const port = 3000;
app.listen(port, () => {
	console.log('Example running at http://localhost:' + port);
});
