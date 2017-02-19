/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-02-19 18:37:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', 'aaa');
INSERT INTO `message` VALUES ('2', 'bbb');
INSERT INTO `message` VALUES ('3', 'ccc');
INSERT INTO `message` VALUES ('4', 'ddd');
INSERT INTO `message` VALUES ('5', 'eee');
INSERT INTO `message` VALUES ('6', 'fff');
INSERT INTO `message` VALUES ('7', 'ggg');
INSERT INTO `message` VALUES ('8', 'hhh');
INSERT INTO `message` VALUES ('9', 'iii');
INSERT INTO `message` VALUES ('10', 'jjj');
INSERT INTO `message` VALUES ('11', 'kkk');
INSERT INTO `message` VALUES ('12', 'lll');
INSERT INTO `message` VALUES ('13', 'mmm');
INSERT INTO `message` VALUES ('14', 'nnn');
INSERT INTO `message` VALUES ('15', 'ooo');
INSERT INTO `message` VALUES ('16', 'ppp');
INSERT INTO `message` VALUES ('17', 'qqq');
INSERT INTO `message` VALUES ('18', 'rrr');
INSERT INTO `message` VALUES ('19', 'sss');
INSERT INTO `message` VALUES ('20', 'ttt');
INSERT INTO `message` VALUES ('21', 'uuu');
INSERT INTO `message` VALUES ('22', 'vvv');
INSERT INTO `message` VALUES ('23', 'www');
INSERT INTO `message` VALUES ('24', 'xxx');
INSERT INTO `message` VALUES ('25', 'yyy');
INSERT INTO `message` VALUES ('26', 'zzz');
