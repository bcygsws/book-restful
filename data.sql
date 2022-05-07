DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
insert into book (name,author,category,description) values('三国演义','罗贯中','文学','一个杀伐纷争的年代');
insert into book (name,author,category,description) values('水浒传','施耐庵','文学','一百零八将的故事');
insert into book (name,author,category,description) values('红楼梦','曹雪芹','文学','封建贵族的荣誉兴衰');
insert into book (name,author,category,description) values('西游记','吴承恩','文学','佛教和道教的斗争故事');
insert into book (name,author,category,description) values('天龙八部','金庸','武侠','胡汉恩仇，红颜薄命');
insert into book (name,author,category,description) values('小李飞刀','古龙','武侠','小李飞刀，例不虚发');
insert into book (name,author,category,description) values('浪潮之巅','吴军','计算机','IT巨头的兴衰史');
insert into book (name,author,category,description) values('平凡的世界','路遥','文学','平凡的伟大');