const express = require('express');
const router = express.Router();
const service = require('./service.js');
// 获取图书列表-列表里有多条记录，用复数；直接获取数据，用get方式
router.get('/books', service.allBooks);
// 去往请求添加页面
router.get('/books/book', service.toAddBook);
// 提交添加页面
router.post('/books/book', service.addBook);
// 去往修改图书页面
router.get('/books/book/:id', service.toEditBook);
// 修改图书
router.put('/books/book', service.editBook);
// 删除某一本图书
router.delete('/books/book/:id', service.deleteBook);
// 导出模块用module.exports 
// exports.变量(函数)=值（变量值或函数值） 完全等价于 module.exports.变量(函数)=值（变量值或函数值）
module.exports = router;
