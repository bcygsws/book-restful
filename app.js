/**
 * 本项目：配合vue-recall项目 实现element+vue+express+mysql+cors 前后端分离项目（图书管理案例）
 *
 * 开发后台接口-restful形式的数据接口
 * 关于RESTFUL 参考：https://blog.csdn.net/qq_41606973/article/details/86352787
 * a.先理解URI的概念：
 * URI 表示资源，表示服务器端领域模型中的实体类，是一种抽象的概念
 * b.URI的规则：
 * Uniform Resource Identifier，URI)是一个用于标识某一互联网资源名称的字符串
 *
 * 1.不用大写字母
 * 2.使用中杠 "-" ，而不用下杠"_"
 * 3.参数要encode(编码)
 * 4.其中的名词要使用复数
 *
 *
 *
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

// app.use(cors({
//   origin: ['http://127.0.0.1:3006', 'http://127.0.0.1:3000'],
//   credentials: true
// }))

// 托管静态资源文件
// 设置虚拟目录 /www 访问时，需要加上
// app.use('/www', express.static('public'));
app.use('/', express.static('public'));
// body-parser中间件，是用来解析http请求体的。参考：https://blog.csdn.net/DlMmU/article/details/55563090
const bodyParser = require('body-parser');
// 解析提交的字符串（application/x-www-form-urlencoded）,使得node后台支持该种请求体，否则service.js文件中req.body拿不到值
app.use(bodyParser.urlencoded({ extended: true }));
// 解析提交的json格式字符串(application/json)，前端axios有时候post请求方式，需要声明该语句
app.use(bodyParser.json());
// 添加一个中间件函数，实现跨域请求，参考：https://www.cnblogs.com/pdcan/p/12201930.html
// app.all('*', (req, res, next) => {
// 	// 设置跨域域名的三种方式：
// 	// 1.设置允许跨域的域名，'*'代表所有域名都可以跨域
// 	// res.header('Access-Control-Allow-Origin', '*');
// 	// 2.允许域名http://localhost:8787跨域
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:8787');
// 	// 3.如果是要设置多个域名的跨域，可以用数组来存放域名
// 	// let originList = ['http://localhost:8787'];
// 	// // 数组中是否包含某个元素。如果这个分支成立，说明从客户端发来请求的域名，req.headers.origin存在于数组元素之中
// 	// if (originList.includes(req.headers.origin.toLowerCase())) {
// 	// 	// req.headers是属性 req.headers.origin req.header()是方法，req.method是属性，表示请求方式
// 	// 	res.header('Access-Control-Allow-Origin', req.headers.origin);
// 	// }
// 	// 允许的header类型
// 	res.header('Access-Control-Allow-Headers', 'Content-type');
// 	// 跨域允许的请求方式
// 	res.header('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST,OPTIONS');
// 	res.header('Access-Control-Max-Age', 1728000); // 预请求缓存20天
// 	next();
// });
app.use(router);
const port = 3001;
app.listen(port, () => {
	console.log('Example running at http://localhost:' + port);
});
