## 介绍
### 插件简介
`pagination.js`是一款实用纯净js编写的一个前端分页插件。通过扩展`dom`对象的函数来实现。该函数名为`pagination`。目前支持真分页和假分页。未来会用`jquery`来写另一版。具体用法可以用下载demo来体验。
### 参数说明
`pagination`函数需要传入一个对象参数，来初始化配置。下面用一个例子说明该对象需要传入的参数。
```
var options = {
	pageSize : 4,   //页面大小  默认大小为10  选填
	pageNum : 1,    //首页  默认为1  选填
	pageFlag : false,  //true为真分页false为假分页  默认为假分页  选填
	url : "Pagination",  //分页后台服务地址  默认为空  必填
}
```
### 函数说明
假设现在对象page为分页对象，具体怎么获取查看下面的用法。
##### 上一页
```
page.prevPage();
```
##### 下一页
```
page.nextPage();
```
##### 跳转到指定页
```
//该函数接受一个参数，参数为页码
page.skipToPage(param);
```
### 后台服务说明
由于需要前台接受参数，对于假分页只需返回一个对象`list`或者数组，前台就可以实现分页效果。对于真分页，要控制分页就要从前台获取的`pageNum`当前页和`pageSize`页面大小来自己控制每次要返回的列表并要讲数据放入一个对象中，`pageData`为要返回的列表，`pageCount`为总的条数，这两条是必须的。具体可以查看`demo`

## 用法
### 1. 引入pagination.js
```
<script type="text/javascript" src="pagination.js"></script>
```
### 2. 创建承载分页的dom对象
```
<div id="page"></div>
```
创建一个`div`对象，并设置`id`为`page`。
### 3. 创建分页对象
```
//获取dom对象
var ele = document.getELementById("page");
//创建参数对象
var options = {
	pageSize : 4,   //页面大小  默认大小为10  选填
	pageNum : 1,    //首页  默认为1  选填
	pageFlag : false,  //true为真分页false为假分页  默认为假分页  选填
	url : "Pagination",  //分页后台服务地址  默认为空  必填
}
//获取分页对象
var page = ele.pagination(options);
```
### 4. 自由操作分页对象
拿到上面的分页对象，接下来就可以该对象来自由操作了，为了有更大的自由度，未提供内置的样式。分页样式可以自由写。具体可以查看`demo`
