//pagination.js
(function(window){
	//假分页
	//分页对象
	Pagination = function (element, options){
		//当前页
		this.pageNum = options.pageNum;
		//页面大小
		this.pageSize = options.pageSize;
		//页面总数
		this.pageCount = 0;
		//页面数据
		this.pageData = null;

		this.pageTotaldata = null;
		
		//调用初始化函数
		Pagination.init.call(element, this, options);
	}

	Pagination.TEMPLATE = 
		'<nav aria-label="Page navigation">' +
  			'<ul class="pagination">' +
    			'<li>' +
      				'<a href="#" aria-label="Previous">' +
        			'<span aria-hidden="true">&laquo;</span>' +
      				'</a>' +
    			'</li>' +
    			'<li>' +
			    	'<a href="#" aria-label="Next">' +
			        '<span aria-hidden="true">&raquo;</span>' +
			      	'</a>' +
			    '</li>' +
			'</ul>' +
		'</nav>';

	//初始化函数
	Pagination.init = function(){
		//获取要渲染的元素
		var _ele = this || document.getElementById("pagination");
		var _this = arguments[0] || null;
		var _opt = arguments[1] || {};
		//如果url不为空则加载数据
		window.isNotEmpty(_opt.url) && Pagination.loadData(_this, _opt.url, _ele);
	}

	//渲染函数  使用bootstrap的样式
	Pagination.render = function(){
		//获取元素
		var _ele = this;
		//数据承载元素
		var _target = document.getElementById(_ele.dataset.target);
		//分页对象
		var _this = arguments[0];

		//渲染
		_ele.innerHTML = Pagination.TEMPLATE;
		//如果页面数已知则添加页码
		if(_this.pageCount !== 0){
			//渲染页码
			var tempNode = document.createDocumentFragment();
			var nodeHtml = "";
			for(var i = 0;i < _this.pageCount;i++){
				var li = document.createElement("li");
				li.innerHTML = '<a href="#">' + (i + 1) + '</a>';
				tempNode.appendChild(li);
			}
			var node = _ele.firstElementChild.firstElementChild;
			node.insertBefore(tempNode, node.lastElementChild);

			//渲染数据
			//移除以前的内容
			_target.firstElementChild && _target.removeChild(_target.firstElementChild);
			//创建承载数据的列表
			var ul = document.createElement("ul");
			_target.appendChild(document.createElement("ul"));
			//遍历数据
			_this.pageData.forEach(function(item, index){
				var li = document.createElement("li");
				li.innerHTML = 'id: ' + item.id + ' user: ' + item.user;
				ul.appendChild(li);
			});
			//将列表加入到页面
			_target.appendChild(ul);
		}
	}


	//绑定事件
	Pagination.bindEvent = function(){
		var _ele = this;
		//上一页元素
		var _prev = _ele.children[0].children[0].firstElementChild;
		//下一页元素
		var _next = _ele.children[0].children[0].lastElementChild;
		//当前对象
		var _this = arguments[0]; 

		_prev.addEventListener("click", function(){
			_this.prevPage(_ele);
		});

		_next.addEventListener("click", function(){
			_this.nextPage(_ele);
		});
	}

	//上一页
	Pagination.prevPage = Pagination.prototype.prevPage = function(){
		Pagination.loadPageData.call(this, this.pageNum--);
		//重新渲染元素
		Pagination.render.call(arguments[0], this);
	}

	//下一页
	Pagination.nextPage = Pagination.prototype.nextPage = function(){
		Pagination.loadPageData.call(this, this.pageNum++);
		//重新渲染元素
		Pagination.render.call(arguments[0], this);
	}

	//加载当前页数据
	Pagination.loadPageData = function(){
		var _this = this;
		//当前页数
		var index = arguments[0] || _this.pageNum;
		//小于1则再次赋值为1
		(_this.pageNum < 1) && (_this.pageNum = 1);
		//大于最后一页页码，则重置为最后一页
		(_this.pageNum > _this.pageCount) && (_this.pageNum = _this.pageCount);
		//为当前页赋值
		_this.pageData = _this.pageTotaldata.slice((index - 1) * _this.pageSize, index * _this.pageSize);
	}

	//从服务器获取数据
	Pagination.loadData = function(){
		//当前对象
		var _this = arguments[0];
		//要渲染的元素
		var _ele = arguments[2];
		//判断是否支持XMLHttpRequest
		if(window.XMLHttpRequest === undefined){
			window.XMLHttpRequest = function(){
				try{
					//如果可用，就使用ActiveX的最新版本
					return ActiveXObject("Msxml2.XMLHTTP.6.0");
				}catch(e){
					try{
						//否则回退为较旧的版本
						return ActiveXObject("Msxml2.XMLHTTP.3.0");
					}catch(e1){
						//抛出错误
						throw new Error("XMLHttpRequest is not supported!");
					}
				}
			}
		}
		//创建request
		var request = new window.XMLHttpRequest;
		//向后台请求数据
		request.open("GET", arguments[1]);
		request.send(null);
		//为request绑定监听函数
		request.addEventListener("readystatechange",function(){
			//响应完成
			if(request.readyState === 4 && request.status === 200){
				var data = request.responseText;
				_this.pageTotaldata = JSON.parse(data);
				//计算总的页数
				_this.pageCount = Math.ceil(_this.pageTotaldata.length / _this.pageSize);
				console.log("request is done!");

				//初始化第一页的数据
				Pagination.loadPageData.call(_this);
				//渲染元素
				Pagination.render.call(_ele, _this);
				//绑定事件
				Pagination.bindEvent.call(_ele, _this);
			}
		});
	}

	//判断字符串是否为空
	window.isNotEmpty = function() {
		//获取要判断的对象
		var obj = arguments[0];
		return obj !== undefined && obj !== null && obj !== "";
	}

})(window);

