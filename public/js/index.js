/* 
前端用于请求后台的接口数据，index.js
缺点：出现“回调地狱”的问题，比如：editBook方法中连续两次嵌套发起了ajax请求；而该请求又嵌套在初始化页面请求的ajax中
ES6 promise ES7 async await专门解决这个问题
*/
$(function () {
	// 打开页面获取所有图书列表信息
	function initList() {
		$.ajax({
			type: 'get',
			url: '/books',
			dataType: 'json', // 响应的数据格式
			success: function (data) {
				console.log(data);
				/**
				 * template('模板名称或者id,渲染数据)方法参数
				 * 参数1：模板名或者模板id
				 * 参数2：渲染需要的数据data(根据需要，将data处理成数组或者对象)
				 *
				 * 第二种形式：分两步
				 * var render=template.compile('模板');
				 * var html=template.render(data)
				 *
				 * 第三种形式：
				 * var html=template.render(模板,data);
				 *
				 */
				var html = template('indexTpl', { list: data }); // 渲染成html片段，使用jquery 中html()方法渲染出来
				$('#dataList').html(html);
				// 逻辑：必须在模板渲染完成后，才能操作列表（例外：添加操作在标题上，页面初始化后很快就能渲染）
				// 点击 “修改图书”按钮
				// a.编辑操作
				/**
				 * 思路：通过操作DOM,分别拿到操作栏中的两个a标签，以及第1列，id值（去往修改界面和删除操作都需要id）
				 */

				// var alter = $('#alter');// 只对第一行数据起作用，需要遍历每一行
				$('#dataList')
					.find('tr')
					.each(function (index, el) {
						// 虽然是jquery中的遍历方法，el仍然是原生对象,使用find方法，需要转为jquery对象
						var td5 = $(el).find('td:eq(5)');
						// 当前行的id值
						var td1 = $(el).find('td:eq(0)');
						var id = td1.text(); // td1中的文本内容就是当前行id值
						td5.find('a:eq(0)').click(function () {
							// console.log(1);
							editBook(id);
						});
						// b.删除操作
						// var del = $('#del');// 只对第一行数据起作用，需要遍历每一行
						td5.find('a:eq(1)').click(function () {
							// console.log(2);
							deleteBook(id);
						});
					});
				// 绑定添加图书的单击事件
				addBook();
				// bug:添加图书时，编辑了form表单。下一次，再添加数据时，需要干净的空表单。因此，每次提交添加的图书信息后，应该重置表单
				var form = $('.form');
				form.get(0).reset(); // 原生的reset方法对隐藏域无效，隐藏域id的清空需要重新处理,https://www.cnblogs.com/qlqwjy/p/7831909.html
				form.find('input[name=hidden]').val('');
			}
		});
	}
	initList();
	// 封装编辑图书的函数
	function editBook(id) {
		var form = $('.form');
		$.ajax({
			type: 'get',
			url: '/books/book/' + id,
			dataType: 'json',
			success: function (data) {
				// get请求，data是一个数组
				console.log(data);
				var result = data[0];
				// 初始化弹窗
				var mark = new MarkBox(600, 400, '修改图书信息', form.get(0));
				mark.init();
				// 填充表单
				form.find('input[name=id]').val(result.id);
				form.find('input[name=name]').val(result.name);
				form.find('input[name=author]').val(result.author);
				form.find('input[name=category]').val(result.category);
				form.find('input[name=description]').val(result.description);
				// 对提交按钮，添加和修改操作是重用的。如果先进行添加操作，就就已经绑定过事件了，需要先解绑，然后在绑定事件
				$('#btn')
					.unbind('click')
					.click(function () {
						// 编辑完后，向后台提交数据
						$.ajax({
							type: 'put',
							url: '/books/book',
							data: form.serialize(),
							dataType: 'json',
							success: function (data) {
								if (data.code === 200) {
									// 先关闭弹框
									mark.close();
									// 编辑成功了，跳转至列表页，调用initList函数
									initList();
								}
							}
						});
					});
			}
		});
	}
	// 封装删除图书的函数
	function deleteBook(id) {
		$.ajax({
			type: 'delete',
			url: '/books/book/' + id,
			dataType: 'json',
			success: function (data) {
				console.log(data);
				if (data.code === 200) {
					// 编辑成功了，跳转至列表页，调用initList函数
					initList();
				}
			}
		});
	}
	// 点击 添加图书 按钮，弹框
	function addBook() {
		$('#add').click(function () {
			// a.显示空表单
			var form = $('.form');
			// 1.创建MarkBox构造函数的一个实例独享
			var mark = new MarkBox(600, 400, '添加图书信息', form.get(0));
			// 2.初始化弹窗
			mark.init();
			// b.提交添加的图书信息
			$('.form')
				.find('input[type=button]')
				.unbind('click')
				.click(function () {
					// 发起post请求 http://localhost:3000/books/book
					$.ajax({
						type: 'post',
						url: '/books/book', //url最前面的斜杠必须有，否则将叠加虚拟路径/www/books/book
						data: form.serialize(), // 用户提交的表达数据，序列化后，格式是 a='fdf'&b='fdagf'
						dataType: 'json', // 回调函数中返回的数据格式
						success: function (data) {
							console.log(data);
							if (data.code === 200) {
								// 添加成功
								mark.close();
								// 添加成功后，重定向到/books，重新渲染列表
								initList();
							}
						}
					});
				});
		});
	}
});
