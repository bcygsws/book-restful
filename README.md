## 项目名称

-   图书管理系统项目，后端
-   项目 vue-recall，前端，home 主页中，点击"路由数据接口的跨域"
-   前端渲染：后台只提供 Restful 风格(从语义和请求方式上区分)数据接口，前端渲染页面

## 项目启动流程

### 1.启动本地 Mysql

-   以管理员的方式运行一个 cmd 窗口
-   输入命令：net start mysql
-   然后，输入数据库 user 和 password,命令为：mysql -u root -p,回车；继而输入密码
-   窗口，进入 mysql 操作界面(退回：输入 quit 命令)完成数据库的启动，示例：mysql\>

### 2.打开 Navicat

-   这一步不是必须的是，主要用于后续在前端中操作，观察数据库中数据的变化
-   找到连接 MyBook,双击，连接 MyBook;找到这个连接下的 book(数据库)，这个数据库下有一张 book 表，展开 book 表

### 3.启动本项目/11-mybookRestful

-   npm run start 或者使用 nodemon ./app.js,运行后端项目
-   后端项目的初始地址是：db.js 中 host 主机号，app.js 中的监听端口 port=3001，"http:\/\/localhost:3001\/"就是 vue-recall 项目中 main.js 文件配置的根 URL
-   语法：axios.defaults.baseURL="http:\/\/localhost:3001\/"

        -   如果是本地数据库，host 值就是 localhost 或者 127.0.0.1 的
        -   如果是服务器上的数据库，host 中是服务器的 ip 地址

### 4.启动项目 vue-recall

-   主要注意项目运行的主机号+端口，是否在后端跨域中声明，http://localhost:8087，需要在 app.js 文件中跨域进行配置

### 5.当前项目中，public 静态文件中，在执行 1，2，3 步后，在浏览器中输入 http://localhost:3000/index.html 后，可以进入后端渲染的界面，同样进行增删改查的管理，是使用 jQuery 中$.ajax 实现请求的

-   app.js 文件中 app.use(\'/\',express.static(\'public\'))，表示托管静态文件夹 public,托管有以后，直接/index.html 就可以直接访问这个 html 页面了
-   区别：如果 app.use(\'/www\',express.static(\'public\')),设置了虚拟目录"\www"后，使用 http://localhost:3001/www/index.html 才能访问到页面

## 技术栈

express+mysql+jquery
