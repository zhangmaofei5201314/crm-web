(function() {
	window._openMobileMode_ = false;
	window._routeDom_ = false;
	var v = function() {
		if (window._openMobileMode_) {
			window._mobileMode_ = false;
			if (!!window.ActiveXObject || "ActiveXObject" in window) {

			} else {
				var u = navigator.userAgent;
				if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
					$('body').addClass('android mobile')
					$('html').addClass('mobile');
					window._mobileMode_ = true;
				} else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					$('body').addClass('ios mobile');
					$('html').addClass('mobile');
					window._mobileMode_ = true;
				}

			}
		}
	}
	v();
})();

(function(){
	var d = $('[router-dom]')
	if(window._routeDom_){
		d.css({
			'overflow-y': 'scroll'
		})
		if(!d.find('#route-dom').length){
			d.append('<div id="route-dom" class="major"></div>');
		}
	}else {
		d.append('<iframe id="mainFrame" frameborder="no" border="0" name="mainFrame" src="" noresize></iframe>');
	}
})();

(function(window) {

	Array.prototype.loop = function(cb) {
		var i = 0,
			len = this.length
		for (; i < len; i++) {
			cb(this[i], i, this)
		}
		return this
	}

	Array.prototype.extract = function(cb) {
		var i = 0,
			len = this.length,
			_ary = []
		for (; i < len; i++) {
			_ary.push(cb(this[i], i, this))
		}
		return _ary
	}

	Array.prototype.seek = function(cb) {
		var i = 0,
			len = this.length,
			index = -1
		for (; i < len; i++) {
			if (cb(this[i], i, this)) {
				index = i
				break;
			}
		}
		return index
	}

	Array.prototype.$match = function(cb) {
		var i = 0,
			len = this.length,
			index = this.seek(cb)
		if (index >= 0) {
			return this
		}

	}

	Array.prototype.screen = function(cb) {
		var i = 0,
			len = this.length,
			_ary = []

		for (; i < len; i++) {
			if (cb(this[i], i, this)) {
				_ary.push(this[i])
			}
		}
		return _ary
	}

	Array.prototype.matching = function(cb) {
		var i = 0,
			len = this.length,
			_obj = undefined;
		for (; i < len; i++) {
			if (cb(this[i], i, this)) {
				_obj = this[i]
				break;
			}
		}

		return _obj
	}

	if (typeof Array.prototype.reduce != "function") { 
		Array.prototype.reduce = function(callback, initialValue) {
			var previous = initialValue,
				k = 0,
				length = this.length;
			if (typeof initialValue === "undefined") {
				previous = this[0];
				k = 1;
			} 
			if (typeof callback === "function") { 
				for (k; k < length; k++) {
					this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this)); 
				}
			}
			return previous; 
		};
	}

	var extend = $.extend;
	var ajax = $.ajax;

	var h5historyAPI = history && history.pushState;

	var Router = function(options) {
		this.log = {
			now: {},
			history: []
		}
		this.path = '';
		this.allowRouteName = [];
		this.init(options);

	}

	Router.DEFULT_OPTIONS = {
		ajaxRouterContainer: null,
		routes: [],
		launcher: function(item, params) {
			return function() {}
		},
		mode: 'hash',
		beforeHandle: function(to, from, next) {

			next()
		},
		afterHandle: function(to, from) {

		}
	}

	Router.Json2QueryString = function(json, link, symbol) {
		var _qs = [],
			link = typeof link === 'string' ? link : '=';
		for (var k in json) {
			_qs.push(k + link + json[k]);
		}

		return '?' + _qs.join(symbol || '&');
	}

	Router.Json2Query = Router.Json2QueryString;

	Router.prototype = {
		init: function(options) {
			var that = this;
			this.options = extend(true, {}, Router.DEFULT_OPTIONS, options, h5historyAPI ? {} : {
				mode: false
			});

			this.routes = options.routes;
			this.launcher = options.launcher;
			this.router();
			this.options.mode && window.addEventListener('popstate', function(e) {
				var state = e.state;
				if (!(state && state.item && state.item.name)) {
					return false
				}
				that.to(state.item.name, state.params, true);
			})
		},
		addFn: function(name, fn) {
			if (!Router.prototype[name]) {
				Router.prototype[name] = fn;
			} else {
				throw new Error('Router Function Error: Method [' + name + '] already exist!');
				return;
			}
			return this;
		},
		router: function() {
			var that = this;
			this.allowRouteName = this.routes.extract(function(item, i) {
				that.addFn(item.name, function(params, needreplace) {
					var isself = params && (params.isSelf || false) && params.win,
						copy_ = extend(true,{win:{}} ,params);
						delete copy_.win;
					var	URL = item.url + Router.Json2QueryString(copy_);
					if (window.top == window && isself) {
						params.win.location.href = URL;
					} else {
						//that.launcher(item, params);
						that.options.ajaxRouterContainer ? that.ajaxRouter({
							path: item.url,
							name: item.title,
							rel: item.rel,
							params: params

						}) : that.launcher(item, params);
						that.pushLog(item, params);
						that.options.mode && window.top.history[!needreplace ? 'pushState' : 'replaceState']({
							item: item,
							params: params
						}, null, '#/' + item.name);
						that.path = item.name
					}

					return that;
				})
				return item.name;
			})
		},
		to: function(name, params, replace) {
			var that = this;
			if (this.allowRouteName.seek(function(item) {
					return item === name;
				}) !== -1 && this[name]) {
				var now = this.$now,
					to = {
						name: name,
						params: extend(true, {}, params)
					},
					from = {
						path: now.name,
						params: extend(true, {}, now.params)
					};

				this.options.beforeHandle(to, from, function() {
					that[name](params, replace).options.afterHandle(to, from);
				})
			} else {
				throw new Error('Router Function Error: check you Route name , [' + name + '] non-existent!');
				return;
			}

		},
		redirect: function(name) {

		},
		$route: function(name) {
			return this.routes.matching(function(item) {
				return item.name === name;
			})
		},
		$now: function() {
			return this.log.now;
		},
		$router: function() {
			return this.log.history[this.log.history.length - 1];
		},
		$log: function() {
			return this.log;
		},
		pushLog: function(item, params) {
			this.log.history.push(this.log.now = extend(true, {
				item: {},
				params: {}
			}, {
				item: item,
				params: params
			}));
		},
		ajaxRouter: function(route) {
			var that = this;
			var _route = {
				name: '',
				path: '',
				rel: [],
				params: {}
			}
			route = extend(true,{},_route,route);
			ajax({
				url: route.path,
				success: function(res) {
					that.options.ajaxRouterContainer.html('');
					var _rel = route.rel.extract(function(item) {
						return '<script type="text/javascript" src="' + item + '" data-relname="' + route.name + '"><\/script>';
					}).join('');
					res += _rel;
					that.options.ajaxRouterContainer.html(res);
				},
				error: function() {

				}
			})

		}
	}
	window.Router = Router;
})(window);


(function(window) {

	var extend = $.extend;
	var Memory = function(name, options) {
		if (typeof name !== 'string') {
			throw new Error('memory need name!')
			return
		}
		this.store = {};
		this.getName = function() {
			return name;
		}

		this.init(options)
	}

	Memory.DEFAULT_OPTIONS = {
		dictionary: [],
		symbol: '.',
		autosave: true,
		alwaysload: true
	}

	Memory.prototype = {
		init: function(options) {
			this.options = extend(true, {}, Memory.DEFAULT_OPTIONS, options);
			this.inject();
		},
		pathParseData: function(path, mem, data) {
			var pathary = path.split(this.options.symbol);
			return typeof data !== 'undefined' ? pathary.reduce(function(old, item, i) {
				i !== pathary.length - 1 ?
					typeof old[item] === 'undefined' ?
					old[item] = {} :
					old[item] instanceof Object ? old[item] : old[item] = {} :
					old[item] = data;
				return old[item]
			}, mem) : pathary.reduce(function(old, item, i) {
				return typeof old === 'undefined' ? undefined : old[item];
			}, mem)

		},
		get: function(path) {
			this.options.alwaysload && this.load();
			var result = this.pathParseData(path, this.store);
			return result === undefined ? result : JSON.parse(JSON.stringify(result));
		},
		set: function(path, data) {
			this.pathParseData(path, this.store, data);
			this.options.autosave && this.save();
		},
		clean: function() {
			this.store = {};
			this.save();
		},
		save: function() {
			localStorage.setItem(this.getName(), JSON.stringify(this.store));
		},
		load: function() {
			var store = localStorage.getItem(this.getName());
			store && (this.store = JSON.parse(store));
			return this.store;
		},
		inject: function() {
			var that = this;
			that.options.dictionary.loop(function(item, i) {
				that.set(item.name, item.data);
			});
		}
	}
	window.Memory = Memory;
})(window);


/**
 * [Ecif 框架主要代码 不懂逻辑的前提下别改]
 *  
 */
window.console = window.console || (function() {
	var c = {};
	c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
	return c;
})();

var Ecif = function(options) {
	var pathName = window.document.location.pathname;

	var default_options = {
		onload: [],
		destroy: [],
	}

	this.isLogin = false;
	this.localStorageSaveKeys = ['institution', 'institutionName', 'isfristtime', 'token', 'userName', 'id', 'isAdmin', 'comGrade']
	this.cacheDate = {
		system: {

		}
	}

	this.options = $.extend(default_options, options)

	this.projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);


	this.setting = {
		m_open_w: '230px',
		m_close_w: '16px',
		m_open_cl: '_open',
		m_close_cl: '_close',
		ecifFrameURL: '/index.jsp',
		indexURL: '/pages/welcome/welcome.jsp'
	}
	this.default_context = {
		index: function() {
			return window
		}
	}

	this.default_context = {
		index: function() {
			return window
		},
		main: function() {
			return window.mian.leftFrame
		},
		center: function() {
			return window.mian.leftFrame.mainFrame
		},
		left: function() {
			return window.mian.leftFrame.mainFrame.leftFrame
		},
		top: function() {
			return window.mian.leftFrame.topFrame
		}
	}

	this.prop = {
		iframe_center: function(context) {
			return $('#rightFrame', context)
		},
		iframe_center_p: function(context) {
			return $('#rightFrame_td', context)
		},
		iframe_top_menuName: function(context) {
			return $('#menuName', context)
		},
		iframe_center_menuToggleBtn: function(context) {
			return $('#menuToggleIcon', context)
		},
		iframe_center_leftFrame: function(context) {
			return $('#menuTD', context)
		}
	}

	this.doms = {
		page_menu: '#page_menu',
		main_page_aside: '.main_page_aside',
		main_context: '.main_page_context',
		main_context_body: '.main_page_context_body',
		menu_btn: '#menu_btn',
		systime: '#systime',
		mainFrame: '#mainFrame',
		main_header_pos: '.main_header_pos',
		goIndex: '#goIndex',
		changePW: '#changePW',
		changePasswordModal: '#changePasswordModal',
		login_frame: '.login_frame',
		login_user: '#loginuser',
		main_page: '.main_page',
		changePassword: '#changePassword',
		login_dept: '#depttext'
	}
	this.init()
}

//ecif init func
Ecif.prototype.init = function() {
	this.domEvent()
	this.initUI()
}

// 把loaclstorage 数据缓存到  cacheDate 属性
Ecif.prototype.getLocalStorageData = function() {
	var _obj = {},
		i = 0,
		len = this.localStorageSaveKeys.length
	for (; i < len; i++) {
		var key = this.localStorageSaveKeys[i]
		_obj[key] = this.LSGet(key) || ''
	}
	this.cacheDate.system = $.extend({}, _obj)
	return this
}

//初始化ui
Ecif.prototype.initUI = function() {
	this.E(this.doms.systime).text(this.systime())

}
Ecif.prototype.initSYSInfo = function() {
	this.E(this.doms.login_user).text(this.LSGet('userName'))
	this.E(this.doms.login_dept).text(this.LSGet('institutionName'))
	return this
}
// system bind evnet
Ecif.prototype.domEvent = function() {
	var that = this,
		$_main_dom = this.E(this.doms.main_page)
	// system menu ctrl
	this.E(this.doms.menu_btn).on('click', function() {
		that[$_main_dom.hasClass('fold') ? 'menuOpen' : 'menuClose']()
	})
	// goto index page
	this.E(this.doms.goIndex).on('click', function() {
		that.goIndex()
	})

	this.E(this.doms.changePW).on('click', function() {
		that.changePasswordModal(true)
	})

}

//page 加载执行事件 
Ecif.prototype.onload = function() {
	var i = 0,
		len = this.options.onload.length
	for (; i < len; i++) {
		this.options.onload[i](this.cacheDate)
	}
}


// check system token exist
Ecif.prototype.checkToken = function() {
	var token = this.LSGet('token')
	if (token && token !== '') {
		this.closeLogin()
	} else {

	}
}

Ecif.prototype.closeLogin = function() {
	var $_dom = this.E(this.doms.login_frame);
	$_dom.hide()
	this.isLogin = true;
	return this;
}

Ecif.prototype.openLogin = function() {
	var $_dom = this.E(this.doms.login_frame);
	$_dom.show();
	this.isLogin = false;
	return this;
}

// into indexpage
Ecif.prototype.intoIndex = function() {
	this.closeLogin()
	return this

}

//
Ecif.prototype.context = function(name) {
	return this.default_context[name || 'index']().document
}

// iframe change page context
Ecif.prototype.frameJump = function(src, context) {
	var $_frame = this.E(this.doms.mainFrame),
		$_frame_p = this.E(this.doms.main_context_body)
	$_frame[0].contentWindow.document.write('')
	//$_frame[0].contentWindow.document.clear()
	$_frame.remove()
	$_frame_p.append('<iframe id="mainFrame" name="mainFrame" src="' + src + '" noresize frameborder="no" border="0"></iframe>')
	return this
}
//change top postion text
Ecif.prototype.postionName = function(name) {
	var $__dom = this.E(this.doms.main_header_pos)
	$__dom.text('您的位置：' + name)
	return this
}

// system logout
Ecif.prototype.logout = function() {
	localStorage.clear();
	return this;
}
// system login
Ecif.prototype.login = function(data) {
	var that = this
	this.ModifiedDate()
	this.localStorageSaveKeys.loop(function(item) {
		data[item] !== undefined && that.LSSet(item, data[item])
	})

	//window.location.href = this.setting.ecifFrameURL
}
// system aside ctrl
Ecif.prototype.changeAside = function(width) {
	var $_aside = this.E(this.doms.main_page_aside),
		$_context = this.E(this.doms.main_context)
	$_aside.width(width)
	$_context.css({
		paddingLeft: width
	})
}

// ECIF dom getter
Ecif.prototype.E = function(name, ctx) {
	return $(name, ctx || document)
}

// system left side menu ctrl 
Ecif.prototype.menuClose = function(context) {
	// var $__dom = this.prop.iframe_center_menuToggleBtn(context),
	// 	$__dom_menu = this.prop.iframe_center_leftFrame(context)
	var $_dom = this.E(this.doms.main_page),
		$_btn = this.E(this.doms.menu_btn)
	$_dom.addClass('fold');
	//this.changeAside(this.setting.m_close_w)
	$_btn.removeClass(this.setting.m_open_cl).addClass(this.setting.m_close_cl);
	//$__dom.removeClass("icons-left").addClass("icons-right");
	return this
}
// menu open
Ecif.prototype.menuOpen = function(context) {

	// var $__dom = this.prop.iframe_center_menuToggleBtn(context),
	// 	$__dom_menu = this.prop.iframe_center_leftFrame(context)
	var $_dom = this.E(this.doms.main_page),
		$_btn = this.E(this.doms.menu_btn)
	$_dom.removeClass('fold');
	//this.changeAside(this.setting.m_open_w)
	$_btn.removeClass(this.setting.m_close_cl).addClass(this.setting.m_open_cl);
	//$__dom.removeClass("icons-right").addClass("icons-left");
	return this
}

// rewrite localstorage getItem Func
Ecif.prototype.LSGet = function(key) {
	return localStorage.getItem(key)
}

Ecif.prototype.LSSet = function(key, value) {
	return localStorage.setItem(key, value)
}

Ecif.prototype.changePasswordModal = function(isShow) {
	var $_dom = this.E(this.doms.changePasswordModal)
	$_dom.modal(isShow ? 'show' : 'hide')
	return this
}

// system time
Ecif.prototype.systime = function() {
	var date = new Date();
	var year = date.getFullYear(); //获取当前年份   
	var mon = date.getMonth() + 1; //获取当前月份   
	var da = date.getDate(); //获取当前日   
	var day = ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1]; //获取当前星期几   
	var h = date.getHours(); //获取小时   
	var m = date.getMinutes(); //获取分钟   
	var s = date.getSeconds(); //获取秒  
	return '今天是：' + year + '年' + mon + '月' + da + '日' + ' 星期' + day;
}

Ecif.prototype.goIndex = function() {

	this.frameJump(this.setting.indexURL).postionName('首页')
}

Ecif.prototype.showChangePw = function() {
	var $_dom = this.E(this.doms.changePassword)
	$_dom.show()
	return this
}

Ecif.prototype.ModifiedDate = function() {
	this.LSSet('ModifiedDate', (new Date()).valueOf())
}

var Pop = function(options) {
	var defaults = {
		headerText: '提示',
		type: 'alert',
		bodyNode: '',
		alerthide: function() {
			return false
		},
		alertshow: function() {
			return false
		},
		speeds: 100,
		done: function() {
			return true
		},
		cancel: function() {
			return false
		},
		ctx: window.top
	}
	this.$el = ''
	this.options = $.extend(defaults, options)
	this.init()
}

Pop.prototype.init = function() {

	var that = this
	this.initDom()
	this.show()
	this.$el.find('.close-pop').on('click', function() {
		that.hide()
	})
	this.$el.find('.pop-done').on('click', function() {
		that.done()
	})
	this.$el.find('.pop-cancel').on('click', function() {
		that.cancel()
	})


}

Pop.prototype.initDom = function() {
	var $_p_dom = this.initMusk(),
		$_h_dom = this.initHeader(),
		$_b_dom = this.initBody();
	if (this.options.type === 'alert') {
		this.$el = this.alert()
	} else if (this.options.type === 'confirm') {
		this.$el = this.confirm()
	}
	$('body', this.options.ctx.document).append($(this.$el))
}

Pop.prototype.show = function() {
	this.$el.fadeIn(this.options.speeds, this.options.alertshow)
}
Pop.prototype.hide = function() {
	var that = this
	this.$el.fadeOut(this.options.speeds, function() {
		that.options.alerthide()
		that.destroy()
	})
}

Pop.prototype.done = function() {
	var that = this
	this.$el.fadeOut(this.options.speeds, function() {
		that.options.done()
		that.destroy()
	})
}

Pop.prototype.cancel = function() {
	var that = this
	this.$el.fadeOut(this.options.speeds, function() {
		that.options.cancel()
		that.destroy()
	})
}

Pop.prototype.initMusk = function() {
	var domStr = '<div class="ecif-pop">\
					<div class="ecif-pop-maskwarp"></div>\
					<div class="ecif-pop-main">\
						<div class="ecif-pop-body">\
						</div>\
					</div>\
				</div>'
	return domStr
}

Pop.prototype.initHeader = function() {
	var domStr = {
		alert: '<div class="ecif-pop-top">\
					' + this.options.headerText + '\
					<div class="close close-pop"><i class="fa fa-close" aria-hidden="true"></i></div>\
				</div>',
		confirm: '<div class="ecif-pop-top">\
					' + this.options.headerText + '\
					<div class="close pop-cancel"><i class="fa fa-close" aria-hidden="true"></i></div>\
				</div>'
	}
	return domStr[this.options.type]
}

Pop.prototype.initBody = function() {
	var domStr = '<div class="ecif-pop-mid">\
					' + this.options.bodyNode + '\
			  	</div>'
	return domStr
}

Pop.prototype.initFooter = function() {
	var domStr = '<div class="ecif-pop-bot">\
			<div class="ecif-btn close-pop sm">\
				确定\
			</div>\
		</div>'

	var domStr = {
		alert: '<div class="ecif-pop-bot">\
			<button class="ecif-btn close-pop sm">\
				确定\
			</button>\
		</div>',
		confirm: '<div class="ecif-pop-bot">\
			<div class="ecif-btn pop-done sm">\
				确定\
			</div>\
			<div class="ecif-btn pop-cancel ecif-btn-warn sm">\
				取消\
			</div>\
		</div>',
	}
	return domStr[this.options.type]
}

Pop.prototype.alert = function() {
	var $_p_dom = this.initMusk(),
		$_h_dom = this.initHeader(),
		$_b_dom = this.initBody(),
		$_f_dom = this.initFooter()
	return $($_p_dom).find('.ecif-pop-body')
		.append($($_h_dom))
		.append($($_b_dom))
		.append($($_f_dom))
		.end()
}

Pop.prototype.confirm = function() {
	var $_p_dom = this.initMusk(),
		$_h_dom = this.initHeader(),
		$_b_dom = this.initBody(),
		$_f_dom = this.initFooter()
	return $($_p_dom).find('.ecif-pop-body')
		.append($($_h_dom))
		.append($($_b_dom))
		.append($($_f_dom))
		.end()
}


Pop.prototype.destroy = function() {
	this.$el.remove()
}
// var p = new Pop()

// var Popup = {
// 	alert: function(node, cb, scb, ctx) {
// 		return new Pop({
// 			type: 'alert',
// 			alerthide: cb,
// 			headerText: '提示',
// 			bodyNode: node
// 		})
// 	},
// 	confirm: function(node, done, cancel) {
// 		return new Pop({
// 			type: 'confirm',
// 			headerText: '提示',
// 			bodyNode: node,
// 			done: done,
// 			cancel: cancel
// 		})
// 	}

// }


var Verify = function(el, option) {
	var default_option = {
		V_class: ".vif",
		mode: 'target' // target or single
	}
	var check_list = {
		phone: {
			reg: /^1[12345789]\d{9}$/,

		}
	}
	this.options = $.extend(default_option, option)
	this.$el = el
	this.$needCheckList = null
	this._verifyData = []
	this._sameData = []
	this.init()
}
Verify.prototype.init = function() {
	this.initCheckElement()
}

Verify.prototype.clearVerifyData = function() {
	this._verifyData = []
	this._sameData = []
}

Verify.prototype.check = function() {
	this.clearVerifyData()
	var len = this.$needCheckList.length,
		i = 0
	for (; i < len; i++) {
		var dom = $(this.$needCheckList[i]),
			field = dom.attr('data-field') || '',
			obj = ''

		this._verifyData.push(this.loopVif(dom))
	}
	this.loopSameVal()

	return this
}
Verify.prototype.initCheckElement = function() {
	if (this.options.mode === 'target') {
		this.$needCheckList = this.$el.find(this.options.V_class)
	} else {
		this.$needCheckList = this.$el
	}
}
Verify.prototype.must = function(val) {
	var _val = val
	if (_val.length) {
		return Verify.result(true, _val, 'ok')
	}
	return Verify.result(false, _val, '不能为空!')
}
Verify.prototype.typeCheck = function(el) {
	var _val = Verify.trim(el),
		field = el.attr('data-field') || '',
		allowType = el.attr('data-vtype').split(','),
		len = allowType.length,
		i = 0,
		res = {}
	for (; i < len; i++) {
		res[allowType[i]] = this[allowType[i]](_val)
	}

	//thisOBJ['checked'] = res
	return res

}

Verify.prototype.unique = function(ary) {
	var _ary = []
	ary.loop(function(item) {
		!_ary.length ? _ary.push((item + "")) : _ary.loop(function(_) {
			item + '' !== _ + '' && (_ary.push(item + ""))
		})
	})
	return _ary
}

Verify.prototype.loopVif = function(el) {

	var _val = Verify.trim(el),
		field = el.attr('data-field') || '',
		vif = {
			field: field,
			val: _val
		}
	var v1 = this.typeCheck(el)
	var v2 = this.lengthCheck(el)
	var checked = $.extend({}, v1, v2)
	vif['checked'] = checked
	return vif
}

Verify.prototype.lengthCheck = function(el) {
	var _val = Verify.trim(el),
		field = el.attr('data-field') || '',
		max = el.attr('data-vmax') || '',
		min = el.attr('data-vmin') || '',
		_vlength = _val.length,
		_obj = {}
	if (max && _vlength > parseInt(max)) {
		_obj['max'] = Verify.result(false, _val, '长度不能超过' + max + '位')
	}
	if (min && _vlength < parseInt(min)) {
		_obj['min'] = Verify.result(false, _val, '长度不能小于' + min + '位')
	}
	return _obj
}

Verify.prototype.loopSameVal = function(elary) {
	var sameDom = {}
	var len = this.$needCheckList.length,
		i = 0
	for (; i < len; i++) {
		var _dom = $(this.$needCheckList[i]),
			vsame = _dom.attr('data-vsame') || ''
		if (vsame.length) {
			sameDom[vsame] === undefined ? sameDom[vsame] = [_dom] : sameDom[vsame].push(_dom)
		}
	}
	for (var k in sameDom) {
		this._sameData.push(this.checkSameVal(sameDom[k]))
	}
}

Verify.prototype.checkSameVal = function(sameDomAry) {
	var i = 0,
		len = sameDomAry.length,
		field = []
	return this.unique(sameDomAry.extract(function(item) {
		field.push($(item).attr('data-field'))
		return $(item).val()
	})).length != 1 ? {
		field: field,
		flag: false,
		msg: '必须相同'
	} : {
		field: field,
		flag: true,
		msg: ''
	}
}

Verify.prototype.number = function(val) {
	var _val = val
	if (parseFloat(val) === NaN || (parseFloat(val) + '') !== _val) {
		return Verify.result(false, _val)
	}
	return true
}

Verify.prototype.mark = function() {
	var vdata = this._verifyData,
		sdata = this._sameData,
		flagList = [],
		i = 0,
		len = vdata.length
	for (; i < len; i++) {
		for (var key in vdata[i]) {
			var __obj = {
				field: vdata[i].field,
				flag: true
			}
			if (vdata[i].val.length) {
				var checked = vdata[i].checked
				for (var nck in checked) {
					if (!checked[nck].verdict) {
						__obj['msg'] = checked[nck].msg
						__obj['flag'] = false
					}
				}
			} else {
				var checked = vdata[i].checked
				for (var ck in checked) {
					if (ck === 'must' && !checked[ck].verdict) {
						__obj['msg'] = checked[ck].msg
						__obj['flag'] = false
					}
				}
			}

		}
		flagList.push(__obj)
	}
	sdata.loop(function(item) {
		if (!item.flag) {
			flagList.push({
				msg: item.msg,
				flag: false,
				field: item.field.join(',')
			})
		}
	})
	return flagList
}



Verify.trim = function(el) {
	return $.trim(el.val())
}
Verify.result = function(verdict, val, msg) {
	return {
		verdict: verdict,
		msg: msg || '值[' + val + ']: 不合法!',
		val: val
	}
}

Verify.V = function(data, cb) {
	var i = 0,
		len = data.length;
	for (; i < len; i++) {
		if (data[i].flag == false) {
			cb(data[i])
			return false
		}
	}
	return true
}

var Fake = function(data) {
	this.data = data
	//this.data.__cache__ = 'cache'
}

Fake.prototype.done = function(fn) {
	if (fn instanceof Function) {
		fn(this.data)
	}
	return this
}

Fake.prototype.fail = function(fn) {
	fn()
	return this
}

Fake.prototype.always = function(fn) {
	fn()
	return this
}

var Loaded = function(options) {
	this.lid = 'L_' + (parseInt(Math.random() * Math.pow(10, 10)))
	this.init()
}

Loaded.prototype.init = function() {
	this.initDom()
}

Loaded.prototype.initDom = function() {
	var _dom = '<div class="maj-loaded">\
			<div class="maj-loaded-mask"></div>\
			<div class="maj-loaded-warp">\
				<div class="maj-loaded-warp-center">\
					<img src="/assets/imgs/Blocks-1s-200px.gif">\
				</div>\
			</div>\
		</div>';
	this.$el = $(_dom).attr({
		'id': this.lid
	})
	$('body').append(this.$el)
}

Loaded.prototype.open = function() {
	var that = this
	this.$el.fadeIn('200', function() {

	})
}

Loaded.prototype.close = function() {
	var that = this
	this.$el.fadeOut('200', function() {
		that.remove()
	})
}
Loaded.prototype.remove = function() {
	this.$el.remove()
}

var load = function() {
	return new Loaded()
}

var Opener = function() {
	this.win = '';

	this.wins = []
}
Opener.prototype.open = function(name, params, options) {
	var _win = window.open(name + Router.Json2QueryString(params), '', 'height=700,width=1000,resizable=yes,scrollbars=yes');
	//console.log(name + Router.Json2QueryString(params))
	this.wins.push(this.win = _win)

}
Opener.prototype.close = function() {
	if (this.win) {
		this.win.close()
	}
}
Opener.prototype.closeAll = function() {
	this.wins.loop(function(item) {
		item.close();
	});
	this.wins = [];
}


var Dropdown = function(el, options) {
	this.$el = $(el)
	this.$dorp = this.$el.find('.ecif_dropdown_list')
	this.$dorplist = this.$dorp.find('.ecif_dropdown_item')
	this.init()
}

Dropdown.prototype.init = function() {
	this.initEvent()
}
Dropdown.prototype.initEvent = function() {
	var that = this
	this.$el.on('mousemove', function() {
		that.showDorpdown()
	}).on('mouseleave', function() {
		that.hideDorpdown()
	})
	this.$dorplist.on('click', function() {
		that.hideDorpdown()
	})
}

Dropdown.prototype.showDorpdown = function() {
	this.$el.addClass('active')
}

Dropdown.prototype.hideDorpdown = function() {
	this.$el.removeClass('active')
}


$.fn.dropdown = function(options) {
	this.each(function() {
		var data = $(this).data('Dorpdown')
		if (!data) {
			$(this).data('Dorpdown', (data = new Dropdown(this, options)))
		}
	})
	return this
}

$(function() {
	$('[data-dropdown]').dropdown()
});


Array.prototype.loop = function(cb) {
	var i = 0,
		len = this.length
	for (; i < len; i++) {
		cb(this[i], i, this)
	}
	return this
}

Array.prototype.extract = function(cb) {
	var i = 0,
		len = this.length,
		_ary = []
	for (; i < len; i++) {
		_ary.push(cb(this[i], i, this))
	}
	return _ary
}

Array.prototype.seek = function(cb) {
	var i = 0,
		len = this.length,
		index = -1
	for (; i < len; i++) {
		if (cb(this[i], i, this)) {
			index = i
			break;
		}
	}
	return index
}

Array.prototype.$match = function(cb) {
	var i = 0,
		len = this.length,
		index = this.seek(cb)
	if (index >= 0) {
		return this
	}

}

Array.prototype.screen = function(cb) {
	var i = 0,
		len = this.length,
		_ary = []

	for (; i < len; i++) {
		if (cb(this[i], i, this)) {
			_ary.push(this[i])
		}
	}
	return _ary
}

Array.prototype.matching = function(cb) {
	var i = 0,
		len = this.length,
		_obj = undefined;
	for (; i < len; i++) {
		if (cb(this[i], i, this)) {
			_obj = this[i]
			break;
		}
	}

	return _obj
}

if (typeof Array.prototype.reduce != "function") { 
	Array.prototype.reduce = function(callback, initialValue) {
		var previous = initialValue,
			k = 0,
			length = this.length;
		if (typeof initialValue === "undefined") {
			previous = this[0];
			k = 1;
		} 
		if (typeof callback === "function") { 
			for (k; k < length; k++) {
				this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this)); 
			}
		}
		return previous; 
	};
}

var trimval = function() {
	return $.trim($(this).val());
}

$.fn.trimval = trimval


//var WINDOW_OPENERS = new Opener();
// var WINDOW_ROUTERS = new Router();


var Validation = function(el, options) {
	this.$el = el
	this.init(options)
}

Validation.DEFAULT_TYPE = {

}

Validation.DEFAULT_BASETIP = {
	notempty: '不能为空',
	phone: '格式有误',
	email: '格式有误',
	IP: '格式有误! 必须为IP格式',
	PINT: '格式有误! 必须为正整数',
	file: function(types) {
		return '允许上传的格式为 ' + types.split('|').join(', ') + ' 的文件'
	},
	MaxLength: function(l) {
		return '字数长度不能大于' + l
	},
	MinLength: function(l) {
		return '字数长度不能小于' + l
	},
	GNOTEMSIN: function(gmark) {
		var field = gmark[1].matching(function(_item) {
			return !_item.out
		}).field

		return field + '不能为空'
	},
	compare: function(before, after, flag) {
		return before + '需要' + {
			'1': '大于',
			'0': '等于',
			'-1': '小于'
		}[flag] + after
	},
	compareDate: function(before, after, flag) {
		return before + '需要' + {
			'1': '大于',
			'0': '等于',
			'-1': '小于'
		}[flag] + after
	},
	excompareDate: function(before, after, flag) {
		return before + '需要' + {
			'1': '大于',
			'0': '等于',
			'-1': '小于'
		}[flag] + after
	},
	excompareDatetime: function(before, after, flag) {
		return before + '需要' + {
			'1': '大于',
			'0': '等于',
			'-1': '小于'
		}[flag] + after
	},
	GNumber: function(gmark) {
		var field = gmark[1].matching(function(_item) {
			return !_item.out
		}).field
		return field + '格式有误'
	},
	FileSize: function(size) {
		return '文件大小不能超过' + size + 'M'
	}
}

Validation.DEFAULT_OPTIONS = {
	className: '.audit',
	fieldName: 'data-vfield',
	subjectName: 'data-vsub',
	groupClassName: '.audit-g',
	groupName: 'data-gname',
	groupOrder: 'data-vorder',
	reg: {
		email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
		phone: /^1\d{10}$/,
		IP: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
		PINT: /^\+?[1-9][0-9]*$/
	},
	baseTip: Validation.DEFAULT_BASETIP
}


Validation.prototype.init = function(options) {
	this.options = $.extend(true, {}, Validation.DEFAULT_OPTIONS, options)
	this.$verify = this.$el.find('input' + this.options.className + ', select' + this.options.className + ', textarea' + this.options.className)
	this.$verifyGroup = this.$el.find('input' + this.options.groupClassName + ', select' + this.options.groupClassName + ', textarea' + this.options.groupClassName)
	for (var _k in this.options.reg) {
		Validation.prototype['V_' + _k] = this.regTest(_k)
	}
}

Validation.prototype.formatData = function() {
	this.formatScopeData()
	this.formatGroupData()
}

Validation.prototype.formatScopeData = function() {
	var that = this;
	this.items = []
	this.$verify.length && (this.items = this.$verify.map(function() {
		var $this = $(this)
		return that.singleCreate($this)
	}).get())
}

Validation.prototype.singleCreate = function(el) {
	var that = this,
		subject = el.attr(that.options.subjectName) || ''
	return {
		nodeName: el[0].nodeName.toUpperCase(),
		field: el.attr(that.options.fieldName) || '',
		subject: subject && subject.length ? subject.split(',') : [],
		val: $.trim(el.val()) + '',
		v: {},
		type: 'single',
		node: el
	}
}

Validation.prototype.formatGroupData = function() {
	var that = this,
		_group = {},
		createGvj = function(el) {
			var groupName = el.attr(that.options.groupName) || '',
				groupOrder = el.attr(that.options.groupOrder) || '',
				single = that.singleCreate(el),
				mem = {}
			groupOrder && (mem[groupOrder] = single)
			return {
				groupName: groupName,
				member: mem,
				type: 'group',
				subject: single.subject,
				v: {},
				node: el
			}
		},
		updataGvj = function(gvj, el) {
			var single = that.singleCreate(el),
				groupOrder = el.attr(that.options.groupOrder) || '';
			groupOrder && (gvj.member[groupOrder] = single)
			gvj.subject = [].concat(gvj.subject, single.subject)
			return gvj
		}

	this.$verifyGroup.each(function() {
		var $this = $(this),
			groupName = $this.attr(that.options.groupName) || ''
		if (!groupName.length) {
			return
		}
		_group[groupName] = _group[groupName] ? updataGvj(_group[groupName], $this) : createGvj($this)
	})

	for (var _k in _group) {
		this.items.push(_group[_k])
	}

}

Validation.prototype.V_notempty = function(val) {
	val = typeof val === 'object' ? val.val : val
	return val.length > 0
}

Validation.prototype.V_file = function(val, types) {
	var val = typeof val === 'object' ? val.val : val,
		types = types.split('|'),
		fileName = val.substring(val.lastIndexOf(".") + 1).toLowerCase();
	return types.indexOf(fileName) > -1
}

Validation.prototype.V_MaxLength = function(val, length) {
	val = typeof val === 'object' ? val.val : val
	return val.length <= length
}

Validation.prototype.V_MinLength = function(val, length) {
	val = typeof val === 'object' ? val.val : val
	return val.length >= length
}

Validation.prototype.V_FileSize = function(item, size) { //m
	var ua = window.navigator.userAgent,
		isIE = ua.indexOf("MSIE") >= 1

	var filesize = 0
	try {
		if (isIE) {
			var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
			var file = fileSystem.GetFile(item.node[0].value);
			filesize = file.Size;
		} else {
			filesize = item.node[0].files[0].size
		}

	} catch (e) {
		filesize = 0
	}

	return filesize < (size * 1024 * 1024)
}

Validation.prototype.V_compare = function(beforeVal, afterVal, flag) {
	beforeVal = +beforeVal
	afterVal = +afterVal
	if (flag === '-1') {
		return beforeVal <= afterVal
	} else if (flag === '1') {
		return beforeVal >= afterVal
	} else if (flag === '0') {
		return beforeVal == afterVal
	} else {
		return false
	}
}

Validation.prototype.V_compareDate = function(beforeVal, afterVal, flag) {
	beforeVal = +(beforeVal.split('-').join(''))
	afterVal = +(afterVal.split('-').join(''))
	if (flag === '-1') {
		return beforeVal <= afterVal
	} else if (flag === '1') {
		return beforeVal >= afterVal
	} else if (flag === '0') {
		return beforeVal == afterVal
	} else {
		return false
	}
}

Validation.prototype.V_excompareDate = function(beforeVal, afterVal, flag) {
	return this.V_compareDate(beforeVal, afterVal, flag)
}

Validation.prototype.V_excompareDatetime = function(beforeVal, afterVal, flag) {
	beforeVal = +(beforeVal.split(' ')[0].split('-').join('') + beforeVal.split(' ')[1].split(':').join(''))
	afterVal = +(afterVal.split(' ')[0].split('-').join('') + afterVal.split(' ')[1].split(':').join(''))

	if (flag === '-1') {
		return beforeVal <= afterVal
	} else if (flag === '1') {
		return beforeVal >= afterVal
	} else if (flag === '0') {
		return beforeVal == afterVal
	} else {
		return false
	}
}


Validation.prototype.V_Number = function(val) {
	val = typeof val === 'undefined' ? '' : val
	return !(isNaN(val))
}

Validation.prototype.V_GNumber = function(member) {
	var vlist = [],
		flag = true
	for (var k in member) {
		var _flag = this.V_Number(member[k].val)
		if (!_flag) {
			flag = false
		}
		vlist.push({
			field: member[k].field,
			out: _flag
		})
	}
	return [flag, vlist]
}

Validation.prototype.V_GNOTEMSIN = function(member) {
	var that = this,
		hasVal = false,
		vlist = []
	for (var _k in member) {
		if (member[_k].val !== '') {
			hasVal = true
		}
		vlist.push({
			field: member[_k].field,
			out: that.V_notempty(member[_k].val)
		})
	}
	return [!hasVal ? true : vlist.seek(function(item) {
		return item.out === false
	}) === -1, vlist]
}

Validation.prototype.V_GNOTEMALL = function(member) {
	var that = this,
		allHasVal = true,
		vlist = []
	for (var k in member) {
		if (member[k].val === '') {
			allHasVal = false
		}
		vlist.push({
			field: member[k].field,
			out: that.V_notempty(member[k].val)
		})
	}
	return [allHasVal ? true : vlist.seek(function(item) {
		return item.out === false
	}) === -1, vlist]
}

Validation.prototype.regTest = function(type) {
	var reg = this.options.reg
	return function(val) {
		return reg[type].test(val)
	}
}

Validation.prototype.make = function() {
	this.formatData()
	this.mark()
	return this
}

Validation.prototype.mark = function() {
	var that = this
	this.items.loop(function(item) {
		item.result = item.subject && item.subject.length ? item.type && item.type === 'group' ? that.markGroup(item) : that.markSingle(item) : []
	})
}

Validation.prototype.markSingle = function(item) {
	var that = this
	return item.subject.extract(function(_item) {
		var _isl = _item.split('_'),
			out = _isl.length === 2 ? that['V_' + _isl[0]](item, _isl[1]) : that['V_' + _isl[0]](item.val)
		item.v[_item] = out
		return {
			type: _item,
			out: out,
			msg: out ? '' : that.baseTip(_item, item.field)
		}
	})
}

Validation.prototype.markGroup = function(item) {
	var that = this
	return item.subject.extract(function(_item) {
		var _isl = _item.split('_'),
			out,
			gmark = null,
			msg,
			result = {};

		if (_isl[0] === 'compare') {
			var _fn = that['V_GNOTEMSIN'](item.member)
			if (_fn[0]) {
				out = that['V_' + _isl[0]](+item.member.before.val, +item.member.after.val, _isl[1])
				msg = out ? '' : that.options.baseTip[_isl[0]](item.member.before.field, item.member.after.field, _isl[1])
			} else {
				out = _fn[0],
					msg = that.options.baseTip.GNOTEMSIN(_fn)
			}
		}

		if (_isl[0] === 'compareDate') {
			var _fn = that['V_GNOTEMSIN'](item.member)
			if (_fn[0]) {
				out = that['V_' + _isl[0]](item.member.before.val, item.member.after.val, _isl[1])
				msg = out ? '' : that.options.baseTip[_isl[0]](item.member.before.field, item.member.after.field, _isl[1])
			} else {
				out = _fn[0],
					msg = that.options.baseTip.GNOTEMSIN(_fn)
			}
		}

		if (_isl[0] === 'excompareDate') {
			var _fn = that['V_GNOTEMALL'](item.member)
			if (_fn[0]) {
				out = that['V_' + _isl[0]](item.member.before.val, item.member.after.val, _isl[1])
				msg = out ? '' : that.options.baseTip[_isl[0]](item.member.before.field, item.member.after.field, _isl[1])
			} else {
				out = _fn[0],
					msg = that.options.baseTip.GNOTEMSIN(_fn)
			}
		}

		if (_isl[0] === 'excompareDatetime') {
			var _fn = that['V_GNOTEMALL'](item.member)
			if (_fn[0]) {
				out = that['V_' + _isl[0]](item.member.before.val, item.member.after.val, _isl[1])
				msg = out ? '' : that.options.baseTip[_isl[0]](item.member.before.field, item.member.after.field, _isl[1])
			} else {
				out = _fn[0],
					msg = that.options.baseTip.GNOTEMSIN(_fn)
			}
		}

		if (_isl[0] === 'GNumber') {
			var _fn = that['V_GNumber'](item.member)
			if (_fn[0]) {
				out = _fn[0],
					msg = ''
			} else {
				out = _fn[0],
					msg = that.options.baseTip.GNumber(_fn)
			}
		}

		result = {
			type: _item,
			out: out,
			gmark: gmark,
			msg: out ? '' : msg
		}
		item.v[_item] = out
		return result
	})

}

Validation.prototype.summary = function() {
	var that = this

	var summary = {
		needVerify: that.$verify.length,
		pass: that.passSum(),
		hasVal: that.hasValNum()
	}
	return summary
}

Validation.prototype.Vpop = function() {
	this.make()
	var list = []
	this.items.loop(function(item) {
		item.result.loop(function(_item) {
			if (!_item.out) {
				list.push(_item.msg)
			}
		})
	})
	return {
		flag: !list.length,
		list: list
	}
}

Validation.prototype.hasValNum = function() {
	var that = this
	return this.items.reduce(function(old, item) {
		if (item.type === 'single') {
			return that.V_notempty(item.val) ? ++old : old
		} else {
			return that.V_GNOTEMALL(item.member)[0] ? ++old : old
		}
	}, 0)
}

Validation.prototype.passSum = function() {
	this.items.screen(function(item) {
		return item.subject.length ? (item.subject.seek(function(_item) {
			return !item.v[_item]
		}) === -1) : true
	})
}

Validation.prototype.baseTip = function(type, field) {
	var _type = type.split('_'),
		_t = this.options.baseTip[_type[0]]
	return field + (_t instanceof Function ? _t(_type[1]) : _t)
}

Validation.prototype.baseGTip = function(type, gmark) {
	var _type = type.split('_'),
		_t = this.options.baseTip[_type[0]]
	return _t(gmark)
}

$.fn.Validation = function(options) {
	this.each(function() {
		var $this = $(this)
		var _obj = new Validation($this, options)
		$this.data('Validation', _obj)
	})
}

var DownloadFile = function(options) {
	this.init(options)
}

DownloadFile.DEFAULT_OPTIONS = {
	url: '',
	data: {}
}

DownloadFile.prototype.init = function(options) {
	this.options = $.extend(true, {}, DownloadFile.DEFAULT_OPTIONS, options)
	this.form()
}

DownloadFile.prototype.form = function() {
	var _form = '<form class="DownloadFile" method="post" enctype="multipart/form-data" target=""></form>',
		_item = '<input type="hidden" />'
	this.$form = $(_form).attr({
		action: this.options.url
	})
	for (var key in this.options.data) {
		var $_i = $(_item).attr({
			name: key,
			value: this.options.data[key]
		})
		this.$form.append($_i)
	}
	$('body').append(this.$form)
}

DownloadFile.prototype.down = function() {
	this.$form.submit()
}

DownloadFile.of = function(options) {
	return new DownloadFile(options)
}

var DetailTable = function(options) {
	this.field = []
}

DetailTable.DEFAULT_FEILD = {
	name: '',
	field: '',
	formatter: function(val, index, data) {
		return ''
	}
}

var MiniTable = function(options) {
	this.mem = {}
	this.init(options)
}

MiniTable.DEFAULT_OPTIONS = {
	data: {},
	chunk: 3,
	target: {},
	columns: []
}

MiniTable.DEFAULT_COLUMN = {
	field: '',
	title: '',
	format: function(value, data) {
		return value
	}

}

MiniTable.TEMP = {
	td: function(field, title, val) {
		var _val = !!val ? val : ''
		return '<td class="title-cell">' + title + '</td>\
		  <td class="txt-cell" data-field="' + field + '" title="' + _val + '">' + (_val) + '</td>'
	}
}

MiniTable.COLS = function(columns) {
	return columns.extract(function(column) {
		if (column instanceof Array) {
			return MiniTable.COLSTypeAry(column)
		} else {
			return MiniTable.COLSTypeAry()
		}
	})
}

MiniTable.COLSTypeAry = function(column) {
	return {
		field: column[0],
		title: column[1],
		format: typeof column[2] === 'number' ? MiniTable.COLSNumberFnFormat(column[2]) : column[2]
	}
}

MiniTable.COLSNumberFnFormat = function(num) {
	return function(value, data) {
		return !!value && value.length > num ? value.substr(0, num) + '…' : value
	}
}

MiniTable.prototype.init = function(options) {
	var columns = options.columns.extract(function(item) {
		return $.extend(true, {}, MiniTable.DEFAULT_COLUMN, item)
	})
	this.options = $.extend(true, {}, MiniTable.DEFAULT_OPTIONS, options, {
		columns: columns
	})
	this.create()
}

MiniTable.prototype.create = function() {
	var that = this
	var ColDom = this.options.columns.extract(function(item) {
		that.mem[item.field] = item.format
		return MiniTable.TEMP.td(item.field, item.title, that.options.data[item.field] ? item.format(that.options.data[item.field], that.options.data) : '')
	}).reduce(function(old, item, i, ary) {
		if ((i + 1) === ary.length) {
			old += item + '</tr></tbody>'
		} else {
			old += (i + 1) % that.options.chunk === 0 ? item + '</tr><tr>' : item
		}
		return old
	}, '<tbody><tr>')

	this.$body = $(ColDom)
	this.$items = this.$body.find('[data-field]')
	this.options.target.append(this.$body)
}

MiniTable.prototype.setData = function(data) {
	var that = this
	this.options.data = $.extend(true, {}, data)
	this.$items.each(function() {
		var _field = $(this).attr('data-field'),
			_val = that.options.data[_field] || ''
		$(this).attr({
			title: _val
		}).html(that.mem[_field](that.options.data[_field], that.options.data))
	})

}