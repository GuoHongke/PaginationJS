Element.prototype.pagination = (function(){
	//分页对象
	var Pagination = function (element, options){
		var _this = this;
		//如果options未传入则使用默认值
		options = Pagination.extend(options,Pagination.DEFAULT);
		//用来判断是真分页还是假分页
		_this.pageFlag = options.pageFlag;
		//当前页
		_this.pageNum = options.pageNum;
		//页面大小
		_this.pageSize = options.pageSize;
		//页面总数
		_this.pageCount = 0;
		//页面数据
		_this.pageData = null;
		//所有数据若是真分页则和pageData相同
		_this.pageTotaldata = null;

		//配置项
		_this.opts = options;
		//页码元素
		_this.opts.ele = element;
		
		//调用初始化函数
		Pagination.init.call(_this);
	}

	//默认配置
	Pagination.DEFAULT = {
		//默认每页10个
		pageSize : 10,
		//默认当前页是1
		pageNum : 1,
		//默认为假分页
		pageFlag : false,
		//默认url为空
		url : ""
	}

	//初始化函数
	Pagination.init = function(){
		var _this = this;
		var _url = _this.opts.url;
		//如果url不为空则加载数据
		Pagination.isNotEmpty(_url) && Pagination.loadData.call(_this);
	}

	//上一页
	Pagination.prevPage = Pagination.prototype.prevPage = function(){
		//加载页面数据
		Pagination.loadPageData.call(this, --this.pageNum);
	}

	//下一页
	Pagination.nextPage = Pagination.prototype.nextPage = function(){
		//加载页面数据
		Pagination.loadPageData.call(this, ++this.pageNum);
	}

	//到指定页面
	Pagination.skipToPage = Pagination.prototype.skipToPage = function(){
		//获取要跳转的页码
		this.pageNum = arguments[0];
		//加载页面数据
		Pagination.loadPageData.call(this, this.pageNum);
	}

	//获取页面数据
	Pagination.getPageData = Pagination.prototype.getPageData = function(){
		return this.pageData;
	}

	//获取页面总数
	Pagination.getPageCount = Pagination.prototype.getPageCount = function(){
		return this.pageCount;
	}

	//获取当前页面
	Pagination.getPageNum = Pagination.prototype.getPageNum = function(){
		return this.pageNum;
	}

	//加载当前页数据
	Pagination.loadPageData = function(){
		var _this = this;
		//当前页数
		var index = arguments[0] || _this.pageNum;
		//回调函数
		var callback = function() {
			//重新渲染元素
			// Pagination.renderData.call(_this);
		}

		//小于1则再次赋值为1
		if(index < 1){
			index = _this.pageNum = 1;
		}
		//大于最后一页页码，则重置为最后一页
		if(index > _this.pageCount){
			index = _this.pageNum = _this.pageCount;
		}
		//如果是真分页
		if(_this.pageFlag){
			Pagination.sendRequest.call(_this, callback);
		}else{
			//为当前页赋值
			_this.pageData = _this.pageTotaldata.slice((index - 1) * _this.pageSize, index * _this.pageSize);
			//重新渲染元素
			callback();
		}
	}

	//从服务器获取数据
	Pagination.loadData = function(){
		//当前对象
		var _this = this;
		//回调函数
		var callback = function(){
			//渲染元素
			if(_this.pageRenderFlag){
				//渲染页码
				Pagination.renderPage.call(_this);
				//绑定事件
				Pagination.bindEvent.call(_this);
			}
			//绑定事件
			
		}

		Pagination.sendRequest.call(_this, callback);
		
	}

	Pagination.sendRequest = function(callback){
		//当前对象
		var _this = this;
		//要渲染的元素
		var _ele = this.opts.ele;
		//请求地址
		var _url = this.opts.url;
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
		var data = {
			pageNum : _this.pageNum,
			pageSize : _this.pageSize
		}
		//向后台请求数据
		if(_this.pageFlag){
			//如果是真分页
			request.open("POST", _url, false);
			request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			request.send(Pagination.parseObject(data));
		}else{
			request.open("GET", _url, false);
			request.send(null);
		}

		var data = JSON.parse(request.responseText);
		//如果是真分页
		if(_this.pageFlag){
			_this.pageTotaldata = data.pageData;
			var rows = data.pageCount || data.pageData.length;
			_this.pageCount = Math.ceil(rows / _this.pageSize);
			_this.pageData = _this.pageTotaldata;
		}else{
			_this.pageTotaldata = data;
			//计算总的页数
			_this.pageCount = Math.ceil(data.length / _this.pageSize);
			_this.pageData = _this.pageTotaldata.slice((_this.pageNum - 1) * _this.pageSize, _this.pageSize);
		}

		console.log("data is loaded");
		//调用回调函数
		callback();

	}

	//合并对象
	Pagination.extend = function(){
		var options = arguments[0] || {};
		var defaultOptions = arguments[1] || Pagination.DEFAULT;
		//遍历默认属性
		for(name in defaultOptions){
			//如果不是自有属性则跳过该属性
			if(!defaultOptions.hasOwnProperty(name)){
				continue;
			}
			//如果name属性不在options中，则添加相应的默认属性
			if(!(name in options)){
				options[name] = defaultOptions[name];
			}
		}
		return options;
	}

	//判断字符串是否为空
	Pagination.isNotEmpty = function(){
		//获取要判断的对象
		var obj = arguments[0];
		return obj !== undefined && obj !== null && obj !== "";
	}

	//解析对象
	Pagination.parseObject = function(){
		//获取要解析的对象
		var obj = arguments[0];
		var result = "";
		//遍历对象
		for(name in obj){
			//如果不是自有属性则跳过该属性
			if(!obj.hasOwnProperty(name)){
				continue;
			}
			if(result === ""){
				result = name + "=" + obj[name];
			}else{
				result += "&" + name + "=" + obj[name];
			}
		}
		return result;
	}

	//判断是否是类数组对象
	Pagination.isArrayLike = function(){
		return typeof this === "Object" && window.isFinite(this.length) && this.length >= 0 && this.length === Math.floor(this.length);
	}

	//判断是否加载完数据
	Pagination.waitToReady = function(){
		var request = arguments[0];
		var statusFlag = request.readyState === 4 && request.status === 200;
		//如果为准备好 则执行空句子
		console.log("waiting to load ......");
		while(!statusFlag){
			statusFlag = request.readyState === 4 && request.status === 200;
		}
		//打印加载完毕信息
		console.log("data is loaded from server!");
	}

	function Plugin(options){
		//创建分页对象
		return new Pagination(this, options);
	}

	return Plugin;
}());